import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, ExternalLink, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: string;
  titleEn: string;
  titleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  date: string;
  type: 'announcement' | 'event' | 'publication';
  link?: string;
  isLinkedIn?: boolean;
}

const newsItems: NewsItem[] = [
  {
    id: '2',
    titleEn: 'ARCHIPELAGO Project Kick-off Meeting',
    titleFr: 'Réunion de lancement du projet ARCHIPELAGO',
    descriptionEn:
      'The kick-off meeting of the ARCHIPELAGO project was successfully held on 15 December 2025, marking the official start of the project and bringing together all consortium partners to align on objectives, roles, and next steps.',
    descriptionFr:
      'La réunion de lancement du projet ARCHIPELAGO s’est tenue avec succès le 15 décembre 2025, marquant le démarrage officiel du projet et réunissant l’ensemble des partenaires du consortium afin de s’aligner sur les objectifs, les rôles et les prochaines étapes.',
    date: '2025-12-15',
    type: 'event',
    link: 'https://www.linkedin.com/posts/intelligent-computer-systems-and-applications-icsa_archipelago-archipelago-archipelago-activity-7407017286626095104-5UJa',
    isLinkedIn: true,
  },
  {
    id: '2',
    titleEn: 'Consortium Partnership Established',
    titleFr: 'Partenariat du consortium établi',
    descriptionEn: 'Six partner institutions from Greece, Slovakia, Fiji, Comoros, and Trinidad and Tobago have joined forces to address digital education challenges in Small Island Developing States.',
    descriptionFr: 'Six institutions partenaires de Grèce, Slovaquie, Fidji, Comores et Trinité-et-Tobago ont uni leurs forces pour relever les défis de l\'éducation numérique dans les petits États insulaires en développement.',
    date: '2025-01-15',
    type: 'announcement',
  },
];

const News = () => {
  const { t, language } = useLanguage();

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'announcement':
        return language === 'en' ? 'Announcement' : 'Annonce';
      case 'event':
        return language === 'en' ? 'Event' : 'Événement';
      case 'publication':
        return language === 'en' ? 'Publication' : 'Publication';
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement':
        return 'bg-archipelago-teal text-white';
      case 'event':
        return 'bg-archipelago-orange text-white';
      case 'publication':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t('news.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('news.subtitle')}
          </p>
        </div>

        {/* News Grid */}
        <div className="space-y-8">
          {newsItems.map((item, index) => (
            <article 
              key={item.id}
              className={`bg-card rounded-3xl p-8 border border-border hover:border-primary/30 transition-all duration-300 animate-slide-up stagger-${index + 1}`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                      {getTypeLabel(item.type)}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.date).toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    {item.isLinkedIn && (
                      <div className="flex items-center gap-1 text-[#0077B5]">
                        <Linkedin className="w-4 h-4" />
                        <span className="text-xs font-medium">LinkedIn</span>
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4">
                    {language === 'en' ? item.titleEn : item.titleFr}
                  </h2>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {language === 'en' ? item.descriptionEn : item.descriptionFr}
                  </p>
                  
                  {item.link && (
                    <Button asChild variant="outline" className="gap-2">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("news.readMore")}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}

                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-16 text-center">
          <div className="bg-muted/50 rounded-2xl p-8 inline-block">
            <p className="text-muted-foreground">{t('news.comingSoon')}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;
