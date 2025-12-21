import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.overview': 'Overview',
    'nav.news': 'News & Events',
    'nav.results': 'Results',
    'nav.consortium': 'Consortium',
    'nav.contact': 'Contact Us',
    
    // Hero
    'hero.title': 'ARCHIPELAGO',
    'hero.subtitle': 'Addressing Remote Coastal Higher Education Inequalities through Platform Enabled Learning Approaches for a Green and resilient Ocean',
    'hero.description': 'Digital Education Capacity Building for HEIs in Small Island Developing States',
    'hero.learnMore': 'Learn More',
    'hero.contactUs': 'Contact Us',
    
    // Overview
    'overview.title': 'Project Overview',
    'overview.scope': 'Project Scope',
    'overview.scopeText': 'ARCHIPELAGO aims to enhance the digital capacity of higher education institutions (HEIs) in Small Island Developing States (SIDS) by developing and implementing targeted digital education solutions. The core objective is to overcome the geographical, infrastructural, and resource-based challenges faced by these regions, improving the accessibility, quality, and sustainability of higher education.',
    'overview.duration': 'Duration',
    'overview.durationText': '24 months',
    'overview.countries': 'Participating Countries',
    'overview.countriesText': 'Fiji, Trinidad and Tobago, Comoros, Greece, Slovakia',
    'overview.objectives': 'Specific Objectives',
    'overview.obj1': 'Enhance digital competencies of students, faculty, and administrative staff by expanding access to digital learning tools and e-learning platforms.',
    'overview.obj2': 'Support professional development of faculty through training in digital pedagogy, inclusive education, and technology integration.',
    'overview.obj3': 'Establish a regional network of universities in SIDS to share knowledge, best practices, and resources.',
    'overview.obj4': 'Implement blended learning models combining in-person and online instruction for flexible, accessible learning.',
    'overview.obj5': 'Create a holistic approach to higher education modernization integrating digital transformation and inclusive education.',
    'overview.workPackages': 'Work Packages',
    
    // Work Packages
    'wp1.title': 'WP1: Project Management',
    'wp1.description': 'Coordination and general management ensuring the project runs smoothly and effectively. Establishes communication, monitors progress, and manages risks.',
    'wp1.lead': 'Lead: HUA (Greece)',
    
    'wp2.title': 'WP2: Research and Toolkits',
    'wp2.description': 'Conducts needs analysis of digital education landscape and develops 3 toolkits for students, faculty, and administrative staff.',
    'wp2.lead': 'Lead: VERDE (Greece)',
    
    'wp3.title': 'WP3: Capacity Building',
    'wp3.description': 'Training academic staff through workshops and pilot testing. Includes virtual mobility programs for international collaboration.',
    'wp3.lead': 'Lead: SUA (Slovakia)',
    
    'wp4.title': 'WP4: Digital Knowledge Hub',
    'wp4.description': 'Creation of centralized digital platform for storing and sharing resources, online courses, and digital materials.',
    'wp4.lead': 'Lead: USP (Fiji)',
    
    'wp5.title': 'WP5: Dissemination',
    'wp5.description': 'Communication and promotion of project results through multiplier events, publications, and final dissemination conference.',
    'wp5.lead': 'Lead: UDC (Comoros)',
    
    // News
    'news.title': 'News & Events',
    'news.subtitle': 'Stay updated with the latest developments from the ARCHIPELAGO project',
    'news.comingSoon': 'More news coming soon...',
    'news.readMore': 'Read more',
    
    // Results
    'results.title': 'Results & Deliverables',
    'results.subtitle': 'Project outputs and expected outcomes',
    'results.deliverables': 'Deliverables',
    'results.upcoming': 'Upcoming',
    'results.inProgress': 'In Progress',
    'results.completed': 'Completed',
    
    // Deliverables
    'd1.1': 'Project Management Handbook',
    'd1.2': 'Quality Assurance Plan',
    'd1.3': 'Legal and Ethical Plan',
    'd1.4': 'Environmental Sustainability Plan',
    'd2.1': 'Needs Assessment Report',
    'd2.2': 'Global Good Practices Report',
    'd2.3': 'Toolkit for Academic Staff',
    'd2.4': 'Toolkit for Administrative Staff',
    'd2.5': 'Toolkit for Students',
    'd2.6': 'Trainer\'s Manual',
    
    // Consortium
    'consortium.title': 'Consortium',
    'consortium.subtitle': 'Our partner organizations from Europe, Pacific, Caribbean, and Indian Ocean',
    'consortium.coordinator': 'Coordinator',
    'consortium.partner': 'Partner',
    
    // Partners
    'partner.hua.name': 'Harokopio University of Athens',
    'partner.hua.country': 'Greece',
    'partner.hua.type': 'Higher Education Institution',
    'partner.hua.description': 'Coordinator of the ARCHIPELAGO project, responsible for project management and digital components.',
    
    'partner.verde.name': 'VERDE Research Center',
    'partner.verde.country': 'Greece',
    'partner.verde.type': 'Research Institute',
    'partner.verde.description': 'Research Center for Innovation and Sustainable Development, leading Quality Assurance and toolkit development.',
    
    'partner.sua.name': 'Slovak University of Agriculture in Nitra',
    'partner.sua.country': 'Slovakia',
    'partner.sua.type': 'Higher Education Institution',
    'partner.sua.description': 'Leading capacity building activities and environmental sustainability planning.',
    
    'partner.usp.name': 'University of the South Pacific',
    'partner.usp.country': 'Fiji',
    'partner.usp.type': 'Higher Education Institution',
    'partner.usp.description': 'Regional university serving 12 Pacific member countries, leading the Knowledge Hub development.',
    
    'partner.udc.name': 'Université des Comores',
    'partner.udc.country': 'Comoros',
    'partner.udc.type': 'Higher Education Institution',
    'partner.udc.description': 'Leading scientific publications and dissemination activities.',
    
    'partner.utt.name': 'University of Trinidad and Tobago',
    'partner.utt.country': 'Trinidad and Tobago',
    'partner.utt.type': 'Higher Education Institution',
    'partner.utt.description': 'Leading student toolkit development and dissemination planning.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with the ARCHIPELAGO project team',
    'contact.coordinator': 'Project Coordinator',
    'contact.email': 'Email',
    'contact.address': 'Address',
    
    // Footer
    'footer.fundedBy': 'Funded by the European Union',
    'footer.erasmus': 'Erasmus+ Programme',
    'footer.disclaimer': 'The European Commission\'s support for the production of this content does not constitute an endorsement of the contents, which reflect the views only of the authors, and the Commission cannot be held responsible for any use which may be made of the information contained therein.',
    'footer.rights': '© 2025 ARCHIPELAGO. All rights reserved.',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.overview': 'Aperçu',
    'nav.news': 'Actualités',
    'nav.results': 'Résultats',
    'nav.consortium': 'Consortium',
    'nav.contact': 'Contactez-nous',
    
    // Hero
    'hero.title': 'ARCHIPELAGO',
    'hero.subtitle': 'Répondre aux inégalités de l\'enseignement supérieur côtier distant grâce à des approches d\'apprentissage par plateforme pour un océan vert et résilient',
    'hero.description': 'Renforcement des capacités en éducation numérique pour les EES des petits États insulaires en développement',
    'hero.learnMore': 'En savoir plus',
    'hero.contactUs': 'Contactez-nous',
    
    // Overview
    'overview.title': 'Aperçu du Projet',
    'overview.scope': 'Portée du Projet',
    'overview.scopeText': 'ARCHIPELAGO vise à renforcer les capacités numériques des établissements d\'enseignement supérieur (EES) dans les petits États insulaires en développement (PEID) en développant et en mettant en œuvre des solutions d\'éducation numérique ciblées. L\'objectif principal est de surmonter les défis géographiques, infrastructurels et de ressources auxquels ces régions sont confrontées.',
    'overview.duration': 'Durée',
    'overview.durationText': '24 mois',
    'overview.countries': 'Pays Participants',
    'overview.countriesText': 'Fidji, Trinité-et-Tobago, Comores, Grèce, Slovaquie',
    'overview.objectives': 'Objectifs Spécifiques',
    'overview.obj1': 'Améliorer les compétences numériques des étudiants, du corps professoral et du personnel administratif.',
    'overview.obj2': 'Soutenir le développement professionnel du corps professoral par la formation en pédagogie numérique.',
    'overview.obj3': 'Établir un réseau régional d\'universités dans les PEID pour partager les connaissances et les meilleures pratiques.',
    'overview.obj4': 'Mettre en œuvre des modèles d\'apprentissage mixte combinant enseignement en présentiel et en ligne.',
    'overview.obj5': 'Créer une approche holistique de la modernisation de l\'enseignement supérieur.',
    'overview.workPackages': 'Lots de Travail',
    
    // Work Packages
    'wp1.title': 'WP1: Gestion de Projet',
    'wp1.description': 'Coordination et gestion générale assurant le bon déroulement du projet. Établit la communication, surveille les progrès et gère les risques.',
    'wp1.lead': 'Responsable: HUA (Grèce)',
    
    'wp2.title': 'WP2: Recherche et Outils',
    'wp2.description': 'Analyse des besoins du paysage de l\'éducation numérique et développement de 3 boîtes à outils pour les étudiants, le corps professoral et le personnel administratif.',
    'wp2.lead': 'Responsable: VERDE (Grèce)',
    
    'wp3.title': 'WP3: Renforcement des Capacités',
    'wp3.description': 'Formation du personnel académique par des ateliers et des tests pilotes. Comprend des programmes de mobilité virtuelle.',
    'wp3.lead': 'Responsable: SUA (Slovaquie)',
    
    'wp4.title': 'WP4: Hub de Connaissances',
    'wp4.description': 'Création d\'une plateforme numérique centralisée pour le stockage et le partage des ressources et des cours en ligne.',
    'wp4.lead': 'Responsable: USP (Fidji)',
    
    'wp5.title': 'WP5: Diffusion',
    'wp5.description': 'Communication et promotion des résultats du projet à travers des événements multiplicateurs et des publications.',
    'wp5.lead': 'Responsable: UDC (Comores)',
    
    // News
    'news.title': 'Actualités et Événements',
    'news.subtitle': 'Restez informé des derniers développements du projet ARCHIPELAGO',
    'news.comingSoon': 'Plus d\'actualités à venir...',
    'news.readMore': 'Lire la suite',
    
    // Results
    'results.title': 'Résultats et Livrables',
    'results.subtitle': 'Productions et résultats attendus du projet',
    'results.deliverables': 'Livrables',
    'results.upcoming': 'À venir',
    'results.inProgress': 'En cours',
    'results.completed': 'Terminé',
    
    // Deliverables
    'd1.1': 'Manuel de Gestion de Projet',
    'd1.2': 'Plan d\'Assurance Qualité',
    'd1.3': 'Plan Juridique et Éthique',
    'd1.4': 'Plan de Durabilité Environnementale',
    'd2.1': 'Rapport d\'Évaluation des Besoins',
    'd2.2': 'Rapport sur les Bonnes Pratiques Mondiales',
    'd2.3': 'Boîte à Outils pour le Personnel Académique',
    'd2.4': 'Boîte à Outils pour le Personnel Administratif',
    'd2.5': 'Boîte à Outils pour les Étudiants',
    'd2.6': 'Manuel du Formateur',
    
    // Consortium
    'consortium.title': 'Consortium',
    'consortium.subtitle': 'Nos organisations partenaires d\'Europe, du Pacifique, des Caraïbes et de l\'océan Indien',
    'consortium.coordinator': 'Coordinateur',
    'consortium.partner': 'Partenaire',
    
    // Partners
    'partner.hua.name': 'Université Harokopio d\'Athènes',
    'partner.hua.country': 'Grèce',
    'partner.hua.type': 'Établissement d\'Enseignement Supérieur',
    'partner.hua.description': 'Coordinateur du projet ARCHIPELAGO, responsable de la gestion du projet et des composantes numériques.',
    
    'partner.verde.name': 'Centre de Recherche VERDE',
    'partner.verde.country': 'Grèce',
    'partner.verde.type': 'Institut de Recherche',
    'partner.verde.description': 'Centre de Recherche pour l\'Innovation et le Développement Durable.',
    
    'partner.sua.name': 'Université Slovaque d\'Agriculture de Nitra',
    'partner.sua.country': 'Slovaquie',
    'partner.sua.type': 'Établissement d\'Enseignement Supérieur',
    'partner.sua.description': 'Direction des activités de renforcement des capacités et de la planification de la durabilité environnementale.',
    
    'partner.usp.name': 'Université du Pacifique Sud',
    'partner.usp.country': 'Fidji',
    'partner.usp.type': 'Établissement d\'Enseignement Supérieur',
    'partner.usp.description': 'Université régionale desservant 12 pays membres du Pacifique.',
    
    'partner.udc.name': 'Université des Comores',
    'partner.udc.country': 'Comores',
    'partner.udc.type': 'Établissement d\'Enseignement Supérieur',
    'partner.udc.description': 'Direction des publications scientifiques et des activités de diffusion.',
    
    'partner.utt.name': 'Université de Trinité-et-Tobago',
    'partner.utt.country': 'Trinité-et-Tobago',
    'partner.utt.type': 'Établissement d\'Enseignement Supérieur',
    'partner.utt.description': 'Direction du développement de la boîte à outils pour étudiants.',
    
    // Contact
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Entrez en contact avec l\'équipe du projet ARCHIPELAGO',
    'contact.coordinator': 'Coordinateur du Projet',
    'contact.email': 'Courriel',
    'contact.address': 'Adresse',
    
    // Footer
    'footer.fundedBy': 'Financé par l\'Union Européenne',
    'footer.erasmus': 'Programme Erasmus+',
    'footer.disclaimer': 'Le soutien de la Commission européenne à la production de ce contenu ne constitue pas une approbation du contenu, qui reflète uniquement les opinions des auteurs, et la Commission ne peut être tenue responsable de l\'utilisation qui pourrait être faite des informations qu\'il contient.',
    'footer.rights': '© 2025 ARCHIPELAGO. Tous droits réservés.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
