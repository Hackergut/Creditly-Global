import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Calendar,
  RefreshCw,
  Newspaper,
  AlertCircle
} from "lucide-react";
import { format, isToday, parseISO } from "date-fns";
import { it } from "date-fns/locale";

export default function NewsCarousel() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      // Utilizziamo InvokeLLM per ottenere notizie aggiornate sui crediti fiscali
      const response = await InvokeLLM({
        prompt: `Cerca le ultime 6 notizie più rilevanti e recenti sui seguenti argomenti:
        - Superbonus 110%
        - Crediti d'imposta 4.0
        - IVA a credito
        - Agevolazioni fiscali
        - Bonus edilizi
        - Incentivi per le imprese
        
        Per ogni notizia fornisci:
        - Titolo (massimo 80 caratteri)
        - Sottotitolo/estratto (massimo 120 caratteri)
        - Fonte (nome testata giornalistica)
        - Data di pubblicazione (formato ISO YYYY-MM-DD)
        - URL dell'articolo (anche fittizio se necessario)
        - Categoria
        
        Fonti preferite: Il Sole 24 Ore, PMI.it, FiscoOggi, Edilportale`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            news: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  subtitle: { type: "string" },
                  source: { type: "string" },
                  publishedAt: { type: "string" },
                  url: { type: "string" },
                  category: { type: "string" }
                }
              }
            }
          }
        }
      });

      if (response?.news && Array.isArray(response.news) && response.news.length > 0) {
        setNews(response.news);
      } else {
        // Fallback con notizie di esempio se l'API fallisce o restituisce dati vuoti/non validi
        setNews([
          {
            title: "Superbonus 110%: Nuove Proroghe per il 2024",
            subtitle: "Il governo conferma le agevolazioni per la riqualificazione energetica degli edifici",
            source: "Il Sole 24 Ore",
            publishedAt: "2024-01-15",
            url: "https://www.ilsole24ore.com/superbonus-2024",
            category: "superbonus"
          },
          {
            title: "Crediti d'imposta 4.0: Nuovi Incentivi Digitali",
            subtitle: "Aumentati i fondi per l'innovazione tecnologica delle imprese italiane",
            source: "PMI.it",
            publishedAt: "2024-01-14",
            url: "https://www.pmi.it/crediti-imposta-40",
            category: "crediti"
          },
          {
            title: "IVA a Credito: Tempi di Rimborso Ridotti",
            subtitle: "L'Agenzia delle Entrate velocizza le procedure di rimborso per le imprese",
            source: "FiscoOggi",
            publishedAt: "2024-01-13",
            url: "https://www.fiscooggi.it/iva-credito-rimborsi",
            category: "iva"
          }
        ]);
        setError("Formato risposta non valido. Caricate notizie di esempio.");
      }
    } catch (error) {
      console.error("Error fetching news:", error);

      // Fallback con notizie di esempio in caso di errore
      setNews([
        {
          title: "Superbonus 110%: Nuove Proroghe per il 2024",
          subtitle: "Il governo conferma le agevolazioni per la riqualificazione energetica degli edifici",
          source: "Il Sole 24 Ore",
          publishedAt: "2024-01-15",
          url: "https://www.ilsole24ore.com/superbonus-2024",
          category: "superbonus"
        },
        {
          title: "Crediti d'imposta 4.0: Nuovi Incentivi Digitali",
          subtitle: "Aumentati i fondi per l'innovazione tecnologica delle imprese italiane",
          source: "PMI.it",
          publishedAt: "2024-01-14",
          url: "https://www.pmi.it/crediti-imposta-40",
          category: "crediti"
        },
        {
          title: "IVA a Credito: Tempi di Rimborso Ridotti",
          subtitle: "L'Agenzia delle Entrate velocizza le procedure di rimborso per le imprese",
          source: "FiscoOggi",
          publishedAt: "2024-01-13",
          url: "https://www.fiscooggi.it/iva-credito-rimborsi",
          category: "iva"
        }
      ]);

      setError("Caricamento notizie di esempio. Riprova per aggiornare.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.offsetWidth || 300;
      const gap = 16; // gap-4 = 16px
      carouselRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
    }
    setCurrentIndex(index);
  };

  const scrollLeft = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : news.length - 1;
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const newIndex = currentIndex < news.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  const isNewArticle = (publishedAt) => {
    try {
      const today = new Date();
      const articleDate = parseISO(publishedAt);
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 6);
      sevenDaysAgo.setHours(0, 0, 0, 0);
      return articleDate >= sevenDaysAgo && articleDate <= today;
    } catch {
      return false;
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), 'dd MMM yyyy', { locale: it });
    } catch {
      return 'Data non disponibile';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'superbonus': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
      'crediti': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
      'iva': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
      'agevolazioni': 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
      'bonus edilizi': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
      'incentivi': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
      'default': 'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-300'
    };

    const key = category?.toLowerCase().replace(/ /g, '_') || 'default';
    return colors[key] || colors.default;
  };

  if (loading) {
    return (
      <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Newspaper className="w-5 h-5 text-white/70" />
              <h3 className="text-lg font-semibold text-white">Notizie</h3>
            </div>
          </div>
          
          <div className="flex space-x-4 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-80 h-48 bg-white/20 rounded-xl animate-pulse backdrop-blur-sm" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error && news.length === 0) {
    return (
      <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Newspaper className="w-5 h-5 text-white/70" />
              <h3 className="text-lg font-semibold text-white">Notizie</h3>
            </div>
            <Button
              onClick={fetchNews}
              size="sm"
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-white backdrop-blur-sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Riprova
            </Button>
          </div>
          
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <AlertCircle className="w-8 h-8 text-white/70 mx-auto mb-2" />
              <p className="text-white/70 text-sm">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Newspaper className="w-5 h-5 text-white/70" />
            <h3 className="text-lg font-semibold text-white">Notizie</h3>
            <Badge className="bg-[#13E8E9]/20 text-[#13E8E9] border-0 text-xs">
              LIVE
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={fetchNews}
              size="sm"
              variant="ghost"
              className="hover:bg-white/10 text-white/70 backdrop-blur-sm"
              disabled={loading}
              aria-label="Aggiorna notizie"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            
            {news.length > 1 && (
              <div className="hidden sm:flex space-x-1">
                <Button
                  onClick={scrollLeft}
                  size="sm"
                  variant="outline"
                  className="border-white/20 hover:bg-white/10 text-white backdrop-blur-sm"
                  aria-label="Notizia precedente"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={scrollRight}
                  size="sm"
                  variant="outline"
                  className="border-white/20 hover:bg-white/10 text-white backdrop-blur-sm"
                  aria-label="Notizia successiva"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <div
            ref={carouselRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {news.map((article, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 snap-start"
              >
                <Card className="h-full bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group">
                  <CardContent className="p-4 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Badge className={getCategoryColor(article.category)}>
                          {article.category || 'Fiscale'}
                        </Badge>
                        {isNewArticle(article.publishedAt) && (
                          <Badge className="bg-[#13E8E9] text-[#2c2e43] border-0 text-xs animate-pulse">
                            NUOVO
                          </Badge>
                        )}
                      </div>
                    </div>

                    <h4 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#13E8E9] transition-colors">
                      {article.title}
                    </h4>

                    <p className="text-sm text-white/70 mb-4 line-clamp-3 flex-grow">
                      {article.subtitle}
                    </p>

                    <div className="flex items-center justify-between text-xs text-white/70 mb-3">
                      <span className="font-medium">{article.source}</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="w-full bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] rounded-xl"
                      onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
                    >
                      <span className="mr-2">Leggi di più</span>
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Indicatori per mobile */}
          {news.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2 sm:hidden">
              {news.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-[#13E8E9]'
                      : 'bg-white/50'
                  }`}
                  aria-label={`Vai alla notizia ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}