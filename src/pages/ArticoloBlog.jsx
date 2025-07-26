import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { BlogArticle } from '@/api/entities';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import SimpleBackground from '../components/background/SimpleBackground';

export default function ArticoloBlog() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchArticle = async () => {
      const params = new URLSearchParams(location.search);
      const slug = params.get('slug');
      if (slug) {
        try {
          const articles = await BlogArticle.filter({ slug: slug });
          if (articles.length > 0) {
            setArticle(articles[0]);
          } else {
            console.error("Articolo non trovato");
          }
        } catch (error) {
          console.error("Errore nel caricamento dell'articolo:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchArticle();
  }, [location.search]);

  if (loading) {
    return (
      <SimpleBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#13E8E9]"></div>
        </div>
      </SimpleBackground>
    );
  }

  if (!article) {
    return (
      <SimpleBackground>
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-xl text-white/80 mb-8">Articolo non trovato.</p>
          <Link to={createPageUrl("GuidaCrediti")}>
            <Button className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] rounded-xl">
              Torna alla Guida
            </Button>
          </Link>
        </div>
      </SimpleBackground>
    );
  }

  return (
    <SimpleBackground>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link to={createPageUrl("GuidaCrediti")}>
              <Button variant="outline" size="icon" className="rounded-xl border-white/20 hover:bg-white/10 text-white backdrop-blur-sm mb-6">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Article Card */}
          <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm overflow-hidden">
            {/* Article Header */}
            <div className="relative">
              <div className="h-96 overflow-hidden">
                <img 
                  src={article.featured_image_url} 
                  alt={article.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              
              {/* Article Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <Badge className="bg-[#13E8E9]/90 text-[#2c2e43] border-0 mb-4 px-4 py-2 font-semibold backdrop-blur-sm">
                  {article.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                  {article.title}
                </h1>
                <p className="text-xl text-white/90 mb-6 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>

            {/* Author and Date Info */}
            <CardContent className="p-8 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#13E8E9]/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <img 
                      src={article.author_avatar_url} 
                      alt={article.author_name} 
                      className="w-12 h-12 rounded-full border-2 border-white/20" 
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{article.author_name}</p>
                    <p className="text-sm text-white/70">Esperto Creditly Global</p>
                  </div>
                </div>
                <div className="flex items-center text-white/70">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {format(new Date(article.publication_date), 'dd MMMM yyyy', { locale: it })}
                  </span>
                </div>
              </div>
            </CardContent>

            {/* Article Content */}
            <CardContent className="p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none text-white/90 leading-relaxed">
                <div className="space-y-6">
                  <ReactMarkdown 
                    className="markdown-content"
                    components={{
                      h1: ({children}) => <h1 className="text-3xl font-bold text-white mb-6 mt-8">{children}</h1>,
                      h2: ({children}) => <h2 className="text-2xl font-bold text-white mb-4 mt-6">{children}</h2>,
                      h3: ({children}) => <h3 className="text-xl font-bold text-white mb-3 mt-5">{children}</h3>,
                      p: ({children}) => <p className="text-white/90 mb-4 leading-relaxed">{children}</p>,
                      ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-white/90 space-y-2">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-white/90 space-y-2">{children}</ol>,
                      li: ({children}) => <li className="text-white/90">{children}</li>,
                      strong: ({children}) => <strong className="font-bold text-white">{children}</strong>,
                      em: ({children}) => <em className="italic text-white/80">{children}</em>,
                      blockquote: ({children}) => (
                        <blockquote className="border-l-4 border-[#13E8E9] pl-4 py-2 bg-white/5 rounded-r-lg my-6">
                          <div className="text-white/90 italic">{children}</div>
                        </blockquote>
                      ),
                      code: ({children}) => (
                        <code className="bg-white/10 text-[#13E8E9] px-2 py-1 rounded font-mono text-sm">
                          {children}
                        </code>
                      ),
                      pre: ({children}) => (
                        <pre className="bg-white/10 p-4 rounded-xl overflow-x-auto mb-6 border border-white/20">
                          <code className="text-white/90 font-mono text-sm">{children}</code>
                        </pre>
                      )
                    }}
                  >
                    {article.content}
                  </ReactMarkdown>
                </div>
              </div>
            </CardContent>

            {/* Article Footer */}
            <CardContent className="p-8 border-t border-white/20 bg-white/5">
              <div className="text-center">
                <p className="text-white/80 mb-4">
                  Hai trovato utile questo articolo? Condividilo con i tuoi colleghi!
                </p>
                <div className="flex justify-center space-x-4">
                  <Link to={createPageUrl("GuidaCrediti")}>
                    <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white backdrop-blur-sm rounded-xl">
                      Altri Articoli
                    </Button>
                  </Link>
                  <Link to={createPageUrl("CreditRequest")}>
                    <Button className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] rounded-xl">
                      Richiedi Credito
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SimpleBackground>
  );
}