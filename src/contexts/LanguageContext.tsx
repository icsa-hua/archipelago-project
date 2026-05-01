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
    'nav.exchange': 'Exchange',
    'nav.news': 'News & Events',
    'nav.results': 'Results',
    'nav.consortium': 'Consortium',
    'nav.contact': 'Contact Us',
    
    // Hero
    'hero.title': 'ARCHIPELAGO',
    'hero.subtitle': 'ARCHIPELAGO is an Erasmus+ Capacity Building project supporting universities in Small Island Developing States through digital education and collaboration.',
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
    'wp1.title': 'WP1: Project Management and Coordination',
    'wp1.description': 'Coordination and general management ensuring the project runs smoothly and effectively. Establishes communication, monitors progress, and manages risks.',
    'wp1.lead': 'Lead: HUA (Greece)',
    
    'wp2.title': 'WP2: Need Analysis and Toolkit Development',
    'wp2.description': 'Conducts needs analysis of digital education landscape and develops 3 toolkits for students, faculty, and administrative staff.',
    'wp2.lead': 'Lead: VERDE (Greece)',
    
    'wp3.title': 'WP3: Capacity Building and Pilot Testing',
    'wp3.description': 'Training academic staff through workshops and pilot testing. Includes virtual mobility programs for international collaboration.',
    'wp3.lead': 'Lead: UTT (Trinidad and Tobago)',
    
    'wp4.title': 'WP4: Digital Knowledge Hub',
    'wp4.description': 'Creation of centralized digital platform for storing and sharing resources, online courses, and digital materials.',
    'wp4.lead': 'Lead: HUA (Greece)',
    
    'wp5.title': 'WP5: Dissemination, Communication and Exploitation',
    'wp5.description': 'Communication and promotion of project results through multiplier events, publications, and final dissemination conference.',
    'wp5.lead': 'Lead: UTT (Trinidad and Tobago)',
    
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
    'd2.2': 'Toolkits for Administrative and Academic Staff and Students',
    'd2.3': 'Trainer Manual',
    'd3.2': 'Final Version of Toolkits',
    'd4.1': 'Digital Literacy Content for MOOC',
    'd4.2': 'Training Materials and Report',
    'd4.3': 'Beta Version of the Platform',
    'd5.2': 'Scientific Papers and Publications',
    'd5.4': 'Project Website',
    
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
    'partner.sua.description': 'Leverages expertise in digitalization, precision agriculture, and sustainability to support digital learning integration in higher education sustainability planning.',
    
    'partner.usp.name': 'University of the South Pacific',
    'partner.usp.country': 'Fiji',
    'partner.usp.type': 'Higher Education Institution',
    'partner.usp.description': 'Contributes expertise in digital education, policy alignment, and capacity building to bridge the digital connectivity gap across higher education institutions.',
    
    'partner.udc.name': 'Université des Comores',
    'partner.udc.country': 'Comoros',
    'partner.udc.type': 'Higher Education Institution',
    'partner.udc.description': 'Acts as a national pilot and implementation hub, applying and validating digital education solutions across its multi-campus, multi-island higher education system.',
    
    'partner.utt.name': 'University of Trinidad and Tobago',
    'partner.utt.country': 'Trinidad and Tobago',
    'partner.utt.type': 'Higher Education Institution',
    'partner.utt.description': 'Contribute expertise in higher education capacity building, international collaboration, and digital learning.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with the ARCHIPELAGO project team',
    'contact.coordinator': 'Project Coordinator',
    'contact.email': 'Email',
    'contact.address': 'Address',
    
    // Footer
    'footer.fundedBy': 'This projet is co-funded by the European Union under the ',
    'footer.erasmus': 'Erasmus+ Programme',
    'footer.disclaimer': 'Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them.',
    'footer.rights': '© 2025 ARCHIPELAGO. All rights reserved.',
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.overview": "Aperçu",
    "nav.exchange": "Échange",
    "nav.news": "Actualités et événements",
    "nav.results": "Résultats",
    "nav.consortium": "Consortium",
    "nav.contact": "Contact",

    // Hero
    "hero.title": "ARCHIPELAGO",
    "hero.subtitle":
      "ARCHIPELAGO est un projet Erasmus+ de renforcement des capacités visant à soutenir les universités des petits États insulaires en développement à travers l’éducation numérique et la coopération internationale.",
    "hero.description":
      "Renforcement des capacités en éducation numérique pour les établissements d’enseignement supérieur des petits États insulaires en développement",
    "hero.learnMore": "En savoir plus",
    "hero.contactUs": "Contactez-nous",

    // Overview
    "overview.title": "Aperçu du projet",
    "overview.scope": "Portée du projet",
    "overview.scopeText":
      "ARCHIPELAGO vise à renforcer les capacités numériques des établissements d’enseignement supérieur (EES) des petits États insulaires en développement (PEID) par le développement et la mise en œuvre de solutions ciblées d’éducation numérique. L’objectif principal est de surmonter les défis géographiques, infrastructurels et liés aux ressources auxquels ces régions sont confrontées, afin d’améliorer l’accessibilité, la qualité et la durabilité de l’enseignement supérieur.",
    "overview.duration": "Durée",
    "overview.durationText": "24 mois",
    "overview.countries": "Pays participants",
    "overview.countriesText": "Fidji, Trinité-et-Tobago, Comores, Grèce, Slovaquie",
    "overview.objectives": "Objectifs spécifiques",
    "overview.obj1":
      "Renforcer les compétences numériques des étudiants, du corps enseignant et du personnel administratif en élargissant l’accès aux outils d’apprentissage numérique et aux plateformes d’e-learning.",
    "overview.obj2":
      "Soutenir le développement professionnel du corps enseignant par des formations en pédagogie numérique, éducation inclusive et intégration des technologies.",
    "overview.obj3":
      "Établir un réseau régional d’universités des PEID afin de partager les connaissances, les bonnes pratiques et les ressources.",
    "overview.obj4":
      "Mettre en œuvre des modèles d’apprentissage hybride combinant enseignement en présentiel et en ligne pour un apprentissage flexible et accessible.",
    "overview.obj5":
      "Développer une approche globale de la modernisation de l’enseignement supérieur intégrant la transformation numérique et l’éducation inclusive.",
    "overview.workPackages": "Lots de travail",

    // Work Packages
    "wp1.title": "WP1 : Gestion et coordination du projet",
    "wp1.description":
      "Coordination et gestion générale garantissant la bonne mise en œuvre du projet. Mise en place de la communication, suivi de l’avancement et gestion des risques.",
    "wp1.lead": "Responsable : HUA (Grèce)",

    "wp2.title": "WP2 : Analyse des besoins et développement des outils",
    "wp2.description":
      "Analyse du paysage de l’éducation numérique et développement de trois boîtes à outils destinées aux étudiants, au corps enseignant et au personnel administratif.",
    "wp2.lead": "Responsable : VERDE (Grèce)",

    "wp3.title": "WP3 : Renforcement des capacités et tests pilotes",
    "wp3.description":
      "Formation du personnel académique à travers des ateliers et des phases de test pilote. Inclut des programmes de mobilité virtuelle favorisant la collaboration internationale.",
    "wp3.lead": "Responsable : UTT (Trinité-et-Tobago)",

    "wp4.title": "WP4 : Pôle numérique de connaissances",
    "wp4.description":
      "Création d’une plateforme numérique centralisée pour le stockage et le partage de ressources, de cours en ligne et de contenus éducatifs numériques.",
    "wp4.lead": "Responsable : HUA (Grèce)",

    "wp5.title": "WP5 : Diffusion, communication et exploitation",
    "wp5.description":
      "Communication et valorisation des résultats du projet à travers des événements multiplicateurs, des publications et une conférence finale de diffusion.",
    "wp5.lead": "Responsable : UTT (Trinité-et-Tobago)",

    // News
    "news.title": "Actualités et événements",
    "news.subtitle":
      "Restez informé des dernières évolutions du projet ARCHIPELAGO",
    "news.comingSoon": "D’autres actualités seront bientôt disponibles…",
    "news.readMore": "Lire la suite",

    // Results
    "results.title": "Résultats et livrables",
    "results.subtitle": "Productions du projet et résultats attendus",
    "results.deliverables": "Livrables",
    "results.upcoming": "À venir",
    "results.inProgress": "En cours",
    "results.completed": "Terminés",

    // Deliverables
    "d2.2": "Boîtes à outils pour le personnel administratif, le personnel académique et les étudiants",
    "d2.3": "Manuel du formateur",
    "d3.2": "Version finale des boîtes à outils",
    "d4.1": "Contenus de littératie numérique pour le MOOC",
    "d4.2": "Matériels de formation et rapport",
    "d4.3": "Version bêta de la plateforme",
    "d5.2": "Publications et articles scientifiques",
    "d5.4": "Site web du projet",

    // Consortium
    "consortium.title": "Consortium",
    "consortium.subtitle":
      "Nos organisations partenaires d’Europe, du Pacifique, des Caraïbes et de l’océan Indien",
    "consortium.coordinator": "Coordinateur",
    "consortium.partner": "Partenaire",

    // Partners
    "partner.hua.name": "Université Harokopio d’Athènes",
    "partner.hua.country": "Grèce",
    "partner.hua.type": "Établissement d’enseignement supérieur",
    "partner.hua.description":
      "Coordinateur du projet ARCHIPELAGO, responsable de la gestion du projet et des composantes numériques.",

    "partner.verde.name": "Centre de recherche VERDE",
    "partner.verde.country": "Grèce",
    "partner.verde.type": "Institut de recherche",
    "partner.verde.description":
      "Centre de recherche pour l’innovation et le développement durable, responsable de l’assurance qualité et du développement des boîtes à outils.",

    "partner.sua.name": "Université slovaque d’agriculture de Nitra",
    "partner.sua.country": "Slovaquie",
    "partner.sua.type": "Établissement d’enseignement supérieur",
    "partner.sua.description":
      "Apporte son expertise en numérisation, agriculture de précision et durabilité pour soutenir l’intégration de l’apprentissage numérique.",

    "partner.usp.name": "Université du Pacifique Sud",
    "partner.usp.country": "Fidji",
    "partner.usp.type": "Établissement d’enseignement supérieur",
    "partner.usp.description":
      "Contribue par son expertise en éducation numérique, alignement des politiques et renforcement des capacités afin de réduire la fracture numérique.",

    "partner.udc.name": "Université des Comores",
    "partner.udc.country": "Comores",
    "partner.udc.type": "Établissement d’enseignement supérieur",
    "partner.udc.description":
      "Agit comme site pilote national et pôle de mise en œuvre, en appliquant et validant les solutions d’éducation numérique.",

    "partner.utt.name": "Université de Trinité-et-Tobago",
    "partner.utt.country": "Trinité-et-Tobago",
    "partner.utt.type": "Établissement d’enseignement supérieur",
    "partner.utt.description":
      "Contribue au renforcement des capacités, à la collaboration internationale et au développement de l’apprentissage numérique.",

    // Contact
    "contact.title": "Contact",
    "contact.subtitle":
      "Prenez contact avec l’équipe du projet ARCHIPELAGO",
    "contact.coordinator": "Coordinateur du projet",
    "contact.email": "Courriel",
    "contact.address": "Adresse",

    // Footer (FR)
    'footer.fundedBy': 'Ce projet est cofinancé par l’Union européenne dans le cadre du ',
    'footer.erasmus': 'programme Erasmus+',
    'footer.disclaimer':
      'Les points de vue et opinions exprimés n’engagent que leur(s) auteur(s) et ne reflètent pas nécessairement ceux de l’Union européenne ou de l’Agence exécutive européenne pour l’éducation et la culture (EACEA). Ni l’Union européenne ni l’EACEA ne peuvent en être tenues responsables.',
    'footer.rights': '© 2025 ARCHIPELAGO. Tous droits réservés.',

  }
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
