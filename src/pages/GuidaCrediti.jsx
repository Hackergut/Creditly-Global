
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BlogArticle } from "@/api/entities";
import { NewsArticle } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  BookOpen,
  Search,
  Calendar,
  User,
  Clock,
  TrendingUp,
  ArrowRight,
  Star,
  ExternalLink,
  Rss,
  Sparkles,
  Filter
} from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export default function GuidaCrediti() {
  const [articles, setArticles] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('guide');

  const categories = ['Superbonus', 'Credito d\'Imposta', 'IVA', 'Incentivi', 'Normative'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allArticles = await BlogArticle.list('-publication_date');
        const featured = allArticles.find(a => a.is_featured) || allArticles[0];
        setFeaturedArticle(featured);
        setArticles(allArticles.filter(a => a.id !== featured?.id));
        await fetchNews();
      } catch (error) {
        console.error("Errore nel caricamento:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchNews = async () => {
    setNewsLoading(true);
    try {
      const existingNews = await NewsArticle.list('-published_at', 20);
      
      if (existingNews.length === 0) {
        // News di esempio ottimizzate
        setNewsArticles([
          {
            id: 'sample-1',
            title: 'Superbonus 110%: Nuove Proroghe in Vista per il 2024',
            subtitle: 'Il governo valuta un\'estensione del Superbonus con nuove modalità di accesso',
            source: 'Il Sole 24 Ore',
            author: 'Marco Bianchi',
            published_at: new Date().toISOString(),
            url: '#',
            image_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
            category: 'superbonus',
            is_featured: true,
            read_time: 5
          },
          {
            id: 'sample-2',
            title: 'Crediti 4.0: Investimenti Record nel Settore Manifatturiero',
            subtitle: 'Le aziende italiane accelerano la digitalizzazione',
            source: 'Corriere della Sera',
            author: 'Laura Rossi',
            published_at: new Date(Date.now() - 86400000).toISOString(),
            url: '#',
            image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
            category: 'crediti',
            is_featured: false,
            read_time: 3
          }
        ]);
      } else {
        setNewsArticles(existingNews);
      }
    } catch (error) {
      console.error("Errore nel caricamento news:", error);
    } finally {
      setNewsLoading(false);
    }
  };

  // Filtri ottimizzati con useMemo
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = !searchTerm || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchTerm, selectedCategory]);

  const getCategoryColor = (category) => {
    const colors = {
      'Superbonus': 'bg-green-100 text-green-800',
      'Credito d\'Imposta': 'bg-blue-100 text-blue-800',
      'IVA': 'bg-purple-100 text-purple-800',
      'Incentivi': 'bg-orange-100 text-orange-800',
      'Normative': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header con stile moderno della Dashboard */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-xs font-medium text-green-400 mb-4">
                <Sparkles className="w-3 h-3" />
                <span>Guida ai Crediti</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                Guida ai Crediti
              </h1>
              <p className="text-slate-400 text-lg">
                Tutto quello che devi sapere sui crediti fiscali
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-500/20 text-green-400 border-0 px-4 py-2 text-sm font-semibold">
                {articles.length} Articoli
              </Badge>
            </div>
          </div>
        </div>

        {/* Search Bar con dark mode */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl mb-8">
          <CardContent className="p-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Cerca articoli, guide e tutorial..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 text-lg h-14 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-slate-800/50 border-slate-600/50 text-white">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="all" className="text-white hover:bg-slate-700">Tutte le categorie</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category} className="text-white hover:bg-slate-700">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                variant="outline" 
                className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600 bg-slate-900/50 backdrop-blur-sm transition-all duration-300"
              >
                <Filter className="w-4 h-4 mr-2" />
                Reset Filtri
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Risultati di ricerca in tempo reale */}
        {searchTerm && (
          <div className="mb-4 text-sm text-slate-400">
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
              {filteredArticles.length} risultati per "{searchTerm}"
            </span>
          </div>
        )}

        {/* Tabs Navigation con stile moderno */}
        <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl p-6 mb-8 shadow-xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-600 rounded-xl p-1">
              <TabsTrigger 
                value="guide" 
                className="data-[state=active]:bg-[#13E8E9] data-[state=active]:text-[#2c2e43] text-slate-300 hover:text-white rounded-lg font-semibold"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Guide e Tutorial
              </TabsTrigger>
              <TabsTrigger 
                value="news" 
                className="data-[state=active]:bg-[#13E8E9] data-[state=active]:text-[#2c2e43] text-slate-300 hover:text-white rounded-lg font-semibold"
              >
                <Rss className="w-4 h-4 mr-2" />
                Notizie e Aggiornamenti
              </TabsTrigger>
            </TabsList>

            {/* Tab Content: Guide e Articoli */}
            <TabsContent value="guide" className="space-y-8">
              {/* The old Search and Filters section was removed from here as it's now global */}

              {/* Articles Grid con stile moderno */}
              {filteredArticles.length === 0 ? (
                <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
                  <div className="p-12 text-center">
                    <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Nessun articolo trovato
                    </h3>
                    <p className="text-slate-400 mb-6">
                      Non abbiamo trovato articoli che corrispondono ai tuoi criteri di ricerca.
                    </p>
                    <Button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                      }}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl"
                    >
                      Mostra tutti gli articoli
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map((article) => (
                    <div key={article.id} className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden group shadow-xl flex flex-col h-full">
                      <div className="relative h-48 overflow-hidden flex-shrink-0">
                        <img 
                          src={article.featured_image_url} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={`${getCategoryColor(article.category)} border-0`}>
                            {article.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-green-400 transition-colors flex-shrink-0">
                          {article.title}
                        </h3>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 flex-shrink-0">
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{article.author_name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{format(new Date(article.publication_date), 'dd MMM yyyy', { locale: it })}</span>
                          </div>
                        </div>
                        <Link to={createPageUrl(`ArticoloBlog?slug=${article.slug}`)} className="flex-shrink-0">
                          <Button variant="outline" className="w-full border-slate-600/50 text-slate-300 hover:bg-slate-800/30 hover:text-white hover:border-green-400/50 transition-colors rounded-xl bg-slate-800/20 backdrop-blur-sm">
                            Leggi di più
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Tab Content: News con stile moderno */}
            <TabsContent value="news" className="space-y-8">
              <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
                <div className="p-6 text-center">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-green-500/25 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      News & Aggiornamenti
                    </h2>
                  </div>
                  <p className="text-slate-400">
                    Resta aggiornato sulle ultime novità nel mondo dei crediti fiscali
                  </p>
                </div>
              </div>

              {newsLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl animate-pulse shadow-xl">
                      <div className="h-48 bg-slate-700/50"></div>
                      <div className="p-6">
                        <div className="h-4 bg-slate-700/50 rounded mb-2"></div>
                        <div className="h-4 bg-slate-700/50 rounded w-4/5 mb-4"></div>
                        <div className="space-y-2 mb-4">
                          <div className="h-3 bg-slate-700/50 rounded"></div>
                          <div className="h-3 bg-slate-700/50 rounded"></div>
                          <div className="h-3 bg-slate-700/50 rounded w-3/4"></div>
                        </div>
                        <div className="h-8 bg-slate-700/50 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newsArticles.map((news, index) => (
                    <div key={news.id || index} className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden group shadow-xl flex flex-col h-full">
                      {news.image_url && (
                        <div className="relative h-48 overflow-hidden flex-shrink-0">
                          <img 
                            src={news.image_url} 
                            alt={news.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-red-500/90 text-white border-0">
                              {news.source}
                            </Badge>
                          </div>
                          {news.is_featured && (
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-green-500/90 text-white border-0">
                                <Star className="w-3 h-3 mr-1" />
                                Hot
                              </Badge>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-green-400 transition-colors flex-shrink-0">
                          {news.title}
                        </h3>
                        {news.subtitle && (
                          <p className="text-slate-400 text-sm mb-3 line-clamp-2 flex-grow">
                            {news.subtitle}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 flex-shrink-0">
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{news.author || 'Redazione'}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{news.read_time || 3} min</span>
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 mb-4 flex-shrink-0">
                          {format(new Date(news.published_at), 'dd MMM yyyy HH:mm', { locale: it })}
                        </div>
                        <a 
                          href={news.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block flex-shrink-0"
                        >
                          <Button variant="outline" className="w-full border-slate-600/50 text-slate-300 hover:bg-slate-800/30 hover:text-white hover:border-green-400/50 transition-colors rounded-xl bg-slate-800/20 backdrop-blur-sm">
                            Leggi su {news.source}
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
