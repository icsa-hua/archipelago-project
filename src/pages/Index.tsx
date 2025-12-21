import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Target, Users, Laptop, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { t } = useLanguage();

  const highlights = [
    { icon: Target, title: "5 Work Packages", desc: "Structured approach to digital transformation" },
    { icon: Users, title: "6 Partners", desc: "From Europe, Pacific, Caribbean & Indian Ocean" },
    { icon: Laptop, title: "Digital Education", desc: "Toolkits for students, faculty & staff" },
    { icon: Globe, title: "SIDS Focus", desc: "Small Island Developing States" },
  ];

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />

        {/* Highlights */}
        <section className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className={`bg-card rounded-2xl p-6 border border-border text-center hover:border-primary/50 transition-all animate-slide-up stagger-${index + 1}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="my-12 rounded-3xl bg-gradient-to-br from-archipelago-teal/20 to-archipelago-orange/20 p-12 text-center animate-scale-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('overview.title')}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('overview.scopeText').slice(0, 200)}...
          </p>
          <Link 
            to="/overview"
            className="inline-flex px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
          >
            {t('hero.learnMore')}
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
