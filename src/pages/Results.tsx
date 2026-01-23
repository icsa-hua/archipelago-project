import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, Clock, CheckCircle, Loader2 } from "lucide-react";

interface Deliverable {
  id: string;
  titleKey: string;
  workPackage: number;
  dueMonth: number;
  status: 'upcoming' | 'in-progress' | 'completed';
  lead: string;
}

const deliverables: Deliverable[] = [
  {
    id: "D2.2",
    titleKey: "d2.2",
    workPackage: 2,
    dueMonth: 10,
    status: "upcoming",
    lead: "SUA",
  },
  {
    id: "D2.3",
    titleKey: "d2.3",
    workPackage: 2,
    dueMonth: 12,
    status: "upcoming",
    lead: "SUA",
  },
  {
    id: "D3.2",
    titleKey: "d3.2",
    workPackage: 3,
    dueMonth: 20,
    status: "upcoming",
    lead: "SUA",
  },
  {
    id: "D4.1",
    titleKey: "d4.1",
    workPackage: 4,
    dueMonth: 20,
    status: "upcoming",
    lead: "UDC",
  },
  {
    id: "D4.2",
    titleKey: "d4.2",
    workPackage: 4,
    dueMonth: 20,
    status: "upcoming",
    lead: "UTT",
  },
  {
    id: "D4.3",
    titleKey: "d4.3",
    workPackage: 4,
    dueMonth: 20,
    status: "upcoming",
    lead: "HUA",
  },
  {
    id: "D5.2",
    titleKey: "d5.2",
    workPackage: 5,
    dueMonth: 20,
    status: "upcoming",
    lead: "HUA",
  },
  {
    id: "D5.4",
    titleKey: "d5.4",
    workPackage: 5,
    dueMonth: 6,
    status: "completed",
    lead: "HUA",
  },
];


const Results = () => {
  const { t } = useLanguage();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Loader2 className="w-5 h-5 text-archipelago-orange animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return t('results.completed');
      case 'in-progress':
        return t('results.inProgress');
      default:
        return t('results.upcoming');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'in-progress':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getWPColor = (wp: number) => {
    return wp % 2 === 1 ? 'bg-archipelago-teal' : 'bg-archipelago-orange';
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t('results.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('results.subtitle')}
          </p>
        </div>

        {/* Deliverables Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            {t('results.deliverables')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {deliverables.map((deliverable, index) => (
              <div 
                key={deliverable.id}
                className={`bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 animate-slide-up stagger-${Math.min(index + 1, 6)}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 ${getWPColor(deliverable.workPackage)} text-white text-xs font-bold rounded-lg`}>
                        {deliverable.id}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(deliverable.status)}`}>
                        {getStatusLabel(deliverable.status)}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">
                      {t(deliverable.titleKey)}
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>WP{deliverable.workPackage}</span>
                      <span>M{deliverable.dueMonth}</span>
                      <span>{deliverable.lead}</span>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    {getStatusIcon(deliverable.status)}
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

export default Results;
