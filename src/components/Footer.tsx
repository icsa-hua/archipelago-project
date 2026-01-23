import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo_archipelago.png';
import euFunding from "@/assets/eu-cofunded.png";


const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border mt-16 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* EU Funding Notice */}
        <div className="bg-muted/50 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0">
              <img
                src={euFunding}
                alt="Co-funded by the European Union"
                className="h-14 w-auto object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">{t('footer.fundedBy')} - {t('footer.erasmus')}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('footer.disclaimer')}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">{t('nav.overview')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/overview" className="hover:text-accent transition-colors">{t('nav.overview')}</Link></li>
              <li><Link to="/consortium" className="hover:text-accent transition-colors">{t('consortium.title')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('nav.results')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/results" className="hover:text-accent transition-colors">{t('results.deliverables')}</Link></li>
              <li><Link to="/news" className="hover:text-accent transition-colors">{t('nav.news')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('nav.contact')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-accent transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>
          <div>
            <img src={logo} alt="ARCHIPELAGO" className="h-12 object-contain" />
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
