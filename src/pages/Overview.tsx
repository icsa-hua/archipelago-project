import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Target, Clock, Globe, BookOpen, Users, Laptop, Share2 } from "lucide-react";

const Overview = () => {
  const { t } = useLanguage();

  const objectives = [
    { key: 'overview.obj1', icon: Laptop },
    { key: 'overview.obj2', icon: Users },
    { key: 'overview.obj3', icon: Share2 },
    { key: 'overview.obj4', icon: BookOpen },
    { key: 'overview.obj5', icon: Target },
  ];

  const workPackages = [
    { 
      number: 1,
      titleKey: 'wp1.title',
      descKey: 'wp1.description',
      leadKey: 'wp1.lead',
      color: 'bg-archipelago-teal'
    },
    { 
      number: 2,
      titleKey: 'wp2.title',
      descKey: 'wp2.description',
      leadKey: 'wp2.lead',
      color: 'bg-archipelago-orange'
    },
    { 
      number: 3,
      titleKey: 'wp3.title',
      descKey: 'wp3.description',
      leadKey: 'wp3.lead',
      color: 'bg-archipelago-teal'
    },
    { 
      number: 4,
      titleKey: 'wp4.title',
      descKey: 'wp4.description',
      leadKey: 'wp4.lead',
      color: 'bg-archipelago-orange'
    },
    { 
      number: 5,
      titleKey: 'wp5.title',
      descKey: 'wp5.description',
      leadKey: 'wp5.lead',
      color: 'bg-archipelago-teal'
    },
  ];

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t('overview.title')}
          </h1>
        </div>

        {/* Scope Section */}
        <section className="mb-16 animate-slide-up">
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">{t('overview.scope')}</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('overview.scopeText')}
            </p>
          </div>
        </section>

        {/* Quick Info */}
        <section className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-card rounded-3xl p-8 border border-border animate-slide-up stagger-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">{t('overview.duration')}</h3>
            </div>
            <p className="text-2xl font-bold text-primary">{t('overview.durationText')}</p>
          </div>

          <div className="bg-card rounded-3xl p-8 border border-border animate-slide-up stagger-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">{t('overview.countries')}</h3>
            </div>
            <p className="text-lg text-muted-foreground">{t('overview.countriesText')}</p>
          </div>
        </section>

        {/* Objectives */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{t('overview.objectives')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((obj, index) => (
              <div 
                key={index}
                className={`bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 animate-slide-up stagger-${index + 1}`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <obj.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-muted-foreground">{t(obj.key)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Work Packages */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{t('overview.workPackages')}</h2>
          <div className="space-y-6">
            {workPackages.map((wp, index) => (
              <div 
                key={wp.number}
                className={`bg-card rounded-2xl p-6 md:p-8 border border-border hover:shadow-lg transition-all duration-300 animate-slide-up stagger-${index + 1}`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className={`w-14 h-14 ${wp.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-xl">{wp.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{t(wp.titleKey)}</h3>
                    <p className="text-muted-foreground mb-3">{t(wp.descKey)}</p>
                    <span className="text-sm text-primary font-medium">{t(wp.leadKey)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Overview;
