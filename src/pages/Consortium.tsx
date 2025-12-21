import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Building2, Crown } from "lucide-react";

interface Partner {
  id: string;
  nameKey: string;
  countryKey: string;
  typeKey: string;
  descriptionKey: string;
  isCoordinator: boolean;
  flag: string;
}

const partners: Partner[] = [
  {
    id: 'hua',
    nameKey: 'partner.hua.name',
    countryKey: 'partner.hua.country',
    typeKey: 'partner.hua.type',
    descriptionKey: 'partner.hua.description',
    isCoordinator: true,
    flag: '🇬🇷',
  },
  {
    id: 'verde',
    nameKey: 'partner.verde.name',
    countryKey: 'partner.verde.country',
    typeKey: 'partner.verde.type',
    descriptionKey: 'partner.verde.description',
    isCoordinator: false,
    flag: '🇬🇷',
  },
  {
    id: 'sua',
    nameKey: 'partner.sua.name',
    countryKey: 'partner.sua.country',
    typeKey: 'partner.sua.type',
    descriptionKey: 'partner.sua.description',
    isCoordinator: false,
    flag: '🇸🇰',
  },
  {
    id: 'usp',
    nameKey: 'partner.usp.name',
    countryKey: 'partner.usp.country',
    typeKey: 'partner.usp.type',
    descriptionKey: 'partner.usp.description',
    isCoordinator: false,
    flag: '🇫🇯',
  },
  {
    id: 'udc',
    nameKey: 'partner.udc.name',
    countryKey: 'partner.udc.country',
    typeKey: 'partner.udc.type',
    descriptionKey: 'partner.udc.description',
    isCoordinator: false,
    flag: '🇰🇲',
  },
  {
    id: 'utt',
    nameKey: 'partner.utt.name',
    countryKey: 'partner.utt.country',
    typeKey: 'partner.utt.type',
    descriptionKey: 'partner.utt.description',
    isCoordinator: false,
    flag: '🇹🇹',
  },
];

const Consortium = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t('consortium.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('consortium.subtitle')}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div 
              key={partner.id}
              className={`bg-card rounded-3xl p-8 border ${partner.isCoordinator ? 'border-primary shadow-lg shadow-primary/10' : 'border-border'} hover:border-primary/50 transition-all duration-300 animate-slide-up stagger-${index + 1}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="text-5xl">{partner.flag}</div>
                {partner.isCoordinator && (
                  <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full">
                    <Crown className="w-4 h-4" />
                    <span className="text-xs font-semibold">{t('consortium.coordinator')}</span>
                  </div>
                )}
              </div>
              
              {/* Name */}
              <h3 className="text-xl font-bold mb-2">
                {t(partner.nameKey)}
              </h3>
              
              {/* Location & Type */}
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {t(partner.countryKey)}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  {t(partner.typeKey)}
                </div>
              </div>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(partner.descriptionKey)}
              </p>
            </div>
          ))}
        </div>

        {/* Map Section Placeholder */}
        <section className="mt-20">
          <div className="bg-gradient-to-br from-archipelago-teal/10 to-archipelago-orange/10 rounded-3xl p-12 text-center">
            <div className="text-6xl mb-4">🌍</div>
            <h2 className="text-2xl font-bold mb-2">Global Partnership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our consortium spans across Europe, the Pacific, the Caribbean, and the Indian Ocean, 
              bringing together diverse expertise to address digital education challenges in Small Island Developing States.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Consortium;
