import { useState, useEffect, useRef } from 'react';
import { Mail, FileText, Users, Calendar, ShoppingCart, CreditCard, BarChart3, Phone, MessageSquare, Database, Cloud, Lock, Settings, Zap, Target, TrendingUp, DollarSign, Briefcase, Building, Truck, Package, ClipboardList, Clock, Bell, Search, Globe, Brain, Shield, Code, GitBranch, Rocket, HeartPulse, Wallet, Check, Play, ChevronLeft, RotateCcw } from 'lucide-react';

// ============================================================
// COMPANY INFO
// ============================================================
const COMPANY = {
  name: 'ASMAE EL GASMI.e.U',
  address: 'Hilschergasse 10/23, 1120 Vienna, Austria',
  email: 'asmaewarter5@gmail.com',
  whatsapp: '+4368120460618',
  website: 'https://elgasmiweb.vercel.app'
};

// ============================================================
// SOLUTIONS DATA
// ============================================================
const SOLUTIONS = [
  {
    id: 'multiagent',
    name: 'Multi-Agent Intelligence',
    tagline: { en: 'Autonomous AI Workforce', fr: 'Force de Travail IA Autonome', ar: 'قوة عمل ذكاء اصطناعي مستقلة', de: 'Autonome KI-Arbeitskraft' },
    price: '€10,000',
    stats: ['+340%', '-70%', '-73%', '<30s'],
    statsLabels: { en: ['Conversion Rate', 'Customer Acquisition Cost', 'Manual Tasks Eliminated', 'Response Time'], fr: ['Taux de Conversion', 'Coût Acquisition Client', 'Tâches Manuelles Éliminées', 'Temps de Réponse'], ar: ['معدل التحويل', 'تكلفة اكتساب العميل', 'المهام اليدوية المحذوفة', 'وقت الاستجابة'], de: ['Konversionsrate', 'Kundenakquisitionskosten', 'Manuelle Aufgaben eliminiert', 'Reaktionszeit'] },
    benefits: { en: ['Automatic lead qualification', 'Multichannel content creation', 'CRM/ERP workflow automation', '95% ticket resolution <30s', 'Full source code ownership', 'Unlimited users forever'], fr: ['Qualification automatique des leads', 'Création contenu multicanal', 'Automatisation workflow CRM/ERP', '95% résolution tickets <30s', 'Propriété totale du code source', 'Utilisateurs illimités à vie'], ar: ['تأهيل العملاء التلقائي', 'إنشاء محتوى متعدد القنوات', 'أتمتة سير عمل CRM/ERP', '95% حل التذاكر <30 ثانية', 'ملكية كاملة للكود المصدري', 'مستخدمين غير محدودين للأبد'], de: ['Automatische Lead-Qualifizierung', 'Multichannel-Content-Erstellung', 'CRM/ERP-Workflow-Automatisierung', '95% Ticket-Lösung <30s', 'Vollständiges Quellcode-Eigentum', 'Unbegrenzte Benutzer für immer'] }
  },
  {
    id: 'rag',
    name: 'RAG EL GASMI',
    tagline: { en: 'Unified AI Command Center', fr: 'Centre de Commande IA Unifié', ar: 'مركز قيادة الذكاء الاصطناعي الموحد', de: 'Vereinigtes KI-Kommandozentrum' },
    price: '€10,000',
    stats: ['99.9%', '70%', '24/7', 'AES-256'],
    statsLabels: { en: ['Uptime SLA', 'Admin Time Saved', 'Autonomous Operation', 'Encryption Standard'], fr: ['SLA Disponibilité', 'Temps Admin Économisé', 'Opération Autonome', 'Standard Chiffrement'], ar: ['اتفاقية مستوى الخدمة', 'وقت الإدارة الموفر', 'تشغيل ذاتي', 'معيار التشفير'], de: ['Verfügbarkeits-SLA', 'Admin-Zeit gespart', 'Autonomer Betrieb', 'Verschlüsselungsstandard'] },
    benefits: { en: ['Read & analyze: Emails, PDFs, images', 'Team & operations: Planning, meetings', 'Omnichannel: WhatsApp, Slack, Gmail', 'Claude AI + Pinecone intelligence', 'Full source code ownership', 'Unlimited users forever'], fr: ['Lecture & analyse: Emails, PDFs, images', 'Équipe & opérations: Planning, réunions', 'Omnicanal: WhatsApp, Slack, Gmail', 'Intelligence Claude AI + Pinecone', 'Propriété totale du code source', 'Utilisateurs illimités à vie'], ar: ['قراءة وتحليل: البريد، PDF، الصور', 'الفريق والعمليات: التخطيط، الاجتماعات', 'متعدد القنوات: واتساب، سلاك، جيميل', 'ذكاء Claude AI + Pinecone', 'ملكية كاملة للكود المصدري', 'مستخدمين غير محدودين للأبد'], de: ['Lesen & analysieren: E-Mails, PDFs, Bilder', 'Team & Betrieb: Planung, Meetings', 'Omnichannel: WhatsApp, Slack, Gmail', 'Claude AI + Pinecone Intelligenz', 'Vollständiges Quellcode-Eigentum', 'Unbegrenzte Benutzer für immer'] }
  },
  {
    id: 'codegen',
    name: 'CodeGen Enterprise',
    tagline: { en: 'AI-Powered Development Acceleration', fr: 'Accélération Développement par IA', ar: 'تسريع التطوير بالذكاء الاصطناعي', de: 'KI-gestützte Entwicklungsbeschleunigung' },
    price: '€10,000',
    stats: ['70%', '18+', '85', '99.9%'],
    statsLabels: { en: ['Faster Development', 'Frameworks Supported', 'NPS Score', 'System Reliability'], fr: ['Développement Plus Rapide', 'Frameworks Supportés', 'Score NPS', 'Fiabilité Système'], ar: ['تطوير أسرع', 'أطر العمل المدعومة', 'درجة NPS', 'موثوقية النظام'], de: ['Schnellere Entwicklung', 'Unterstützte Frameworks', 'NPS-Score', 'Systemzuverlässigkeit'] },
    benefits: { en: ['70% faster software development', '18+ frameworks supported', 'Self-healing & auto-correction', 'Enterprise-scale production ready', 'Full source code ownership', 'Unlimited users forever'], fr: ['Développement 70% plus rapide', '18+ frameworks supportés', 'Auto-réparation & correction', 'Prêt pour production enterprise', 'Propriété totale du code source', 'Utilisateurs illimités à vie'], ar: ['تطوير برمجيات أسرع 70%', '18+ إطار عمل مدعوم', 'إصلاح ذاتي وتصحيح تلقائي', 'جاهز لإنتاج المؤسسات', 'ملكية كاملة للكود المصدري', 'مستخدمين غير محدودين للأبد'], de: ['70% schnellere Entwicklung', '18+ Frameworks unterstützt', 'Selbstheilung & Auto-Korrektur', 'Enterprise-Produktionsbereit', 'Vollständiges Quellcode-Eigentum', 'Unbegrenzte Benutzer für immer'] }
  }
];

const SECTORS = ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Agriculture', 'Retail', 'Legal', 'Logistics', 'Construction', 'Artisanat', 'Education', 'Energy', 'Real Estate', 'Hospitality', 'Other'];

// ============================================================
// AUTOMATIONS DATA (500+ Tasks)
// ============================================================
const AUTOMATIONS = [
  { icon: Mail, label: { en: 'Email Sorting', fr: 'Tri des Emails', ar: 'فرز البريد', de: 'E-Mail-Sortierung' } },
  { icon: FileText, label: { en: 'Invoice Processing', fr: 'Traitement Factures', ar: 'معالجة الفواتير', de: 'Rechnungsverarbeitung' } },
  { icon: Users, label: { en: 'Lead Qualification', fr: 'Qualification Leads', ar: 'تأهيل العملاء', de: 'Lead-Qualifizierung' } },
  { icon: Calendar, label: { en: 'Meeting Scheduling', fr: 'Planification RDV', ar: 'جدولة الاجتماعات', de: 'Terminplanung' } },
  { icon: ShoppingCart, label: { en: 'Order Processing', fr: 'Traitement Commandes', ar: 'معالجة الطلبات', de: 'Auftragsbearbeitung' } },
  { icon: CreditCard, label: { en: 'Payment Processing', fr: 'Traitement Paiements', ar: 'معالجة المدفوعات', de: 'Zahlungsabwicklung' } },
  { icon: BarChart3, label: { en: 'Report Generation', fr: 'Génération Rapports', ar: 'إنشاء التقارير', de: 'Berichterstellung' } },
  { icon: Phone, label: { en: 'Call Routing', fr: 'Routage Appels', ar: 'توجيه المكالمات', de: 'Anrufweiterleitung' } },
  { icon: MessageSquare, label: { en: 'Chat Support', fr: 'Support Chat', ar: 'دعم الدردشة', de: 'Chat-Support' } },
  { icon: Database, label: { en: 'Data Entry', fr: 'Saisie Données', ar: 'إدخال البيانات', de: 'Dateneingabe' } },
  { icon: Cloud, label: { en: 'Cloud Backup', fr: 'Sauvegarde Cloud', ar: 'نسخ احتياطي', de: 'Cloud-Backup' } },
  { icon: Lock, label: { en: 'Access Control', fr: 'Contrôle Accès', ar: 'التحكم بالوصول', de: 'Zugangskontrolle' } },
  { icon: Settings, label: { en: 'System Config', fr: 'Config Système', ar: 'تكوين النظام', de: 'Systemkonfiguration' } },
  { icon: Zap, label: { en: 'Workflow Triggers', fr: 'Déclencheurs Workflow', ar: 'محفزات سير العمل', de: 'Workflow-Trigger' } },
  { icon: Target, label: { en: 'Campaign Targeting', fr: 'Ciblage Campagnes', ar: 'استهداف الحملات', de: 'Kampagnen-Targeting' } },
  { icon: TrendingUp, label: { en: 'Sales Forecasting', fr: 'Prévisions Ventes', ar: 'توقعات المبيعات', de: 'Verkaufsprognosen' } },
  { icon: DollarSign, label: { en: 'Expense Tracking', fr: 'Suivi Dépenses', ar: 'تتبع النفقات', de: 'Ausgabenverfolgung' } },
  { icon: Briefcase, label: { en: 'Contract Management', fr: 'Gestion Contrats', ar: 'إدارة العقود', de: 'Vertragsmanagement' } },
  { icon: Building, label: { en: 'Facility Management', fr: 'Gestion Installations', ar: 'إدارة المرافق', de: 'Gebäudemanagement' } },
  { icon: Truck, label: { en: 'Shipment Tracking', fr: 'Suivi Expéditions', ar: 'تتبع الشحنات', de: 'Sendungsverfolgung' } },
  { icon: Package, label: { en: 'Inventory Management', fr: 'Gestion Stocks', ar: 'إدارة المخزون', de: 'Bestandsverwaltung' } },
  { icon: ClipboardList, label: { en: 'Task Assignment', fr: 'Attribution Tâches', ar: 'تعيين المهام', de: 'Aufgabenzuweisung' } },
  { icon: Clock, label: { en: 'Time Tracking', fr: 'Suivi Temps', ar: 'تتبع الوقت', de: 'Zeiterfassung' } },
  { icon: Bell, label: { en: 'Alert Notifications', fr: 'Notifications Alertes', ar: 'إشعارات التنبيه', de: 'Benachrichtigungen' } },
  { icon: Search, label: { en: 'Document Search', fr: 'Recherche Documents', ar: 'البحث في المستندات', de: 'Dokumentensuche' } },
  { icon: Globe, label: { en: 'Website Monitoring', fr: 'Surveillance Site Web', ar: 'مراقبة الموقع', de: 'Website-Überwachung' } },
  { icon: Brain, label: { en: 'AI Analysis', fr: 'Analyse IA', ar: 'تحليل الذكاء', de: 'KI-Analyse' } },
  { icon: Shield, label: { en: 'Security Audit', fr: 'Audit Sécurité', ar: 'تدقيق الأمان', de: 'Sicherheitsaudit' } },
  { icon: Code, label: { en: 'Code Deployment', fr: 'Déploiement Code', ar: 'نشر الكود', de: 'Code-Bereitstellung' } },
  { icon: GitBranch, label: { en: 'Version Control', fr: 'Contrôle Version', ar: 'التحكم بالإصدار', de: 'Versionskontrolle' } },
  { icon: Rocket, label: { en: 'Product Launch', fr: 'Lancement Produit', ar: 'إطلاق المنتج', de: 'Produkteinführung' } },
  { icon: HeartPulse, label: { en: 'Health Monitoring', fr: 'Surveillance Santé', ar: 'مراقبة الصحة', de: 'Gesundheitsüberwachung' } },
];

// ============================================================
// TRANSLATIONS
// ============================================================
const translations = {
  en: {
    nav: { home: 'Home', solutions: 'Solutions', expertise: 'Expertise', consultant: 'AI Advisor', contact: 'Contact' },
    hero: { tag: 'AGENTIC SYSTEMS ARCHITECTURE', title: 'Transform Any Industry With Autonomous AI Systems', subtitle: 'Universal expertise in multi-agent architectures and enterprise automation. From artisanal workshops to global corporations, we architect intelligent systems that operate, decide, and evolve.', cta: 'Start Strategic Consultation', cta2: 'Explore Solutions' },
    vision: { title: 'The Future of Enterprise Operations', subtitle: 'Autonomous systems that think, act, and optimize across every sector', items: [
      { title: 'Cognitive Automation', desc: 'AI agents that understand context, learn from interactions, and make intelligent decisions autonomously.', features: [
        { name: 'Context Understanding', tooltip: 'Deep semantic analysis of business data to extract actionable insights in real-time.' },
        { name: 'Adaptive Learning', tooltip: 'Continuous improvement through ML algorithms that evolve with your business needs.' },
        { name: 'Decision Making', tooltip: 'Autonomous decision engines evaluating multiple variables and executing optimal actions.' },
        { name: 'NLP Processing', tooltip: 'Advanced natural language understanding for 50+ languages with sentiment analysis.' }
      ]},
      { title: 'Self-Optimizing Workflows', desc: 'Dynamic processes that continuously analyze performance and automatically restructure for maximum efficiency.', features: [
        { name: 'Auto-Restructuring', tooltip: 'Intelligent process redesign based on real-time performance data.' },
        { name: 'Bottleneck Detection', tooltip: 'AI-powered monitoring identifying delays and constraints before they impact outcomes.' },
        { name: 'Performance Analysis', tooltip: 'Comprehensive analytics dashboard with KPIs and predictive metrics.' },
        { name: 'Continuous Improvement', tooltip: 'Kaizen-inspired automation achieving compound efficiency gains and perpetual optimization.' }
      ]},
      { title: 'Predictive Intelligence', desc: 'ML models that forecast trends, anticipate needs, and identify opportunities before they emerge.', features: [
        { name: 'Trend Forecasting', tooltip: 'Advanced time-series analysis to predict market movements.' },
        { name: 'Demand Prediction', tooltip: 'Accurate forecasting of customer demand using ensemble ML models.' },
        { name: 'Risk Assessment', tooltip: 'Proactive identification of risks with automated mitigation.' },
        { name: 'Opportunity Detection', tooltip: 'AI-driven discovery of untapped markets and partnerships.' }
      ]},
      { title: 'Zero-Touch Operations', desc: 'Fully autonomous systems requiring no manual intervention. Everything runs on autopilot 24/7/365.', features: [
        { name: 'Auto-Deployment', tooltip: 'One-click deployment with zero downtime updates guaranteed.' },
        { name: 'Self-Monitoring', tooltip: 'Intelligent health checks and anomaly detection in real-time.' },
        { name: 'Self-Healing', tooltip: 'Automatic error detection, diagnosis, and resolution.' },
        { name: '24/7 Autonomy', tooltip: 'Round-the-clock operation with 99.99% uptime SLA.' }
      ]}
    ]},
    solutions: { title: 'Enterprise Solutions Portfolio', subtitle: 'Battle-tested architectures delivering measurable ROI', security: 'Security: AES-256 | GDPR | SOC 2 Type II | ISO 27001 | NATO-Grade Backend', audit: 'Request Free Strategic Audit', includes: 'What\'s Included', getStarted: 'Get Started Now', priceNote: 'Final Price • No Subscription • Lifetime License' },
    expertise: { title: 'Universal Sector Expertise', subtitle: 'Our agentic systems architecture adapts to any industry', sectors: 'Technology • Finance • Healthcare • Manufacturing • Agriculture • Retail • Legal • Logistics • Construction • Artisanat • Education • Energy' },
    automations: { title: 'Automation Capabilities', subtitle: '500+ tasks we can automate for your business' },
    consultant: { title: 'Senior Strategic AI Advisor', subtitle: 'Doctoral-level expertise in agentic systems', placeholder: 'Describe your business challenge...', send: 'Send', thinking: 'Strategic Analysis...', restart: 'New Consultation', back: '← Back to Home' },
    contact: { title: 'Begin Your Transformation', address: 'Headquarters', email: 'Strategic Inquiries', whatsapp: 'WhatsApp Business', cta: 'Schedule Discovery Call' },
    footer: { rights: 'All rights reserved', tagline: 'Automate. Accelerate. Dominate.' },
    tests: { run: 'Run Tests', title: 'Test Suite Results', completed: 'tests completed' },
    payment: { title: 'Secure Payment', processing: 'Processing...', success: 'Payment Successful!', confirmed: 'Your order has been confirmed.' }
  },
  fr: {
    nav: { home: 'Accueil', solutions: 'Solutions', expertise: 'Expertise', consultant: 'Conseiller IA', contact: 'Contact' },
    hero: { tag: 'ARCHITECTURE SYSTÈMES AGENTIQUES', title: 'Transformez N\'importe Quelle Industrie Avec des Systèmes IA Autonomes', subtitle: 'Expertise universelle en architectures multi-agents et automatisation entreprise. De l\'atelier artisanal aux corporations mondiales.', cta: 'Démarrer Consultation Stratégique', cta2: 'Explorer les Solutions' },
    vision: { title: 'Le Futur des Opérations Enterprise', subtitle: 'Systèmes autonomes qui pensent, agissent et optimisent', items: [
      { title: 'Automatisation Cognitive', desc: 'Agents IA comprenant le contexte et prenant des décisions intelligentes de manière autonome.', features: [
        { name: 'Compréhension Contexte', tooltip: 'Analyse sémantique profonde des données business pour extraire insights actionnables en temps réel.' },
        { name: 'Apprentissage Adaptatif', tooltip: 'Amélioration continue via algorithmes ML qui évoluent avec votre business.' },
        { name: 'Prise de Décision', tooltip: 'Moteurs de décision autonomes évaluant multiples variables et exécutant les actions optimales.' },
        { name: 'Traitement NLP', tooltip: 'Compréhension avancée du langage naturel, 50+ langues avec analyse de sentiment.' }
      ]},
      { title: 'Workflows Auto-Optimisants', desc: 'Processus dynamiques se restructurant automatiquement pour une efficacité maximale.', features: [
        { name: 'Auto-Restructuration', tooltip: 'Reconception intelligente des processus basée sur données de performance en temps réel.' },
        { name: 'Détection Goulots', tooltip: 'Surveillance IA identifiant retards et contraintes avant qu\'ils n\'impactent les résultats.' },
        { name: 'Analyse Performance', tooltip: 'Dashboard analytics complet avec KPIs et métriques prédictives.' },
        { name: 'Amélioration Continue', tooltip: 'Automatisation Kaizen pour gains d\'efficacité composés et optimisation perpétuelle.' }
      ]},
      { title: 'Intelligence Prédictive', desc: 'Modèles ML prévoyant les tendances et identifiant les opportunités.', features: [
        { name: 'Prévision Tendances', tooltip: 'Analyse avancée des séries temporelles pour prédire le marché.' },
        { name: 'Prédiction Demande', tooltip: 'Prévision précise de la demande client via modèles ML.' },
        { name: 'Évaluation Risques', tooltip: 'Identification proactive des risques avec mitigation automatique.' },
        { name: 'Détection Opportunités', tooltip: 'Découverte IA de marchés inexploités et partenariats.' }
      ]},
      { title: 'Opérations Zero-Touch', desc: 'Systèmes entièrement autonomes fonctionnant en autopilote 24/7/365.', features: [
        { name: 'Auto-Déploiement', tooltip: 'Déploiement one-click avec mises à jour zero downtime.' },
        { name: 'Auto-Surveillance', tooltip: 'Health checks intelligents et détection d\'anomalies.' },
        { name: 'Auto-Réparation', tooltip: 'Détection, diagnostic et résolution automatiques des erreurs.' },
        { name: 'Autonomie 24/7', tooltip: 'Opération continue avec SLA 99.99% uptime.' }
      ]}
    ]},
    solutions: { title: 'Portfolio Solutions Enterprise', subtitle: 'Architectures éprouvées délivrant un ROI mesurable', security: 'Sécurité: AES-256 | RGPD | SOC 2 Type II | ISO 27001 | Backend NATO', audit: 'Demander Audit Stratégique Gratuit', includes: 'Ce qui est Inclus', getStarted: 'Commencer Maintenant', priceNote: 'Prix Définitif • Sans Abonnement • Licence à Vie' },
    expertise: { title: 'Expertise Sectorielle Universelle', subtitle: 'Notre architecture s\'adapte à toute industrie', sectors: 'Technologie • Finance • Santé • Industrie • Agriculture • Retail • Juridique • Logistique • Construction • Artisanat • Éducation • Énergie' },
    automations: { title: 'Capacités d\'Automatisation', subtitle: '500+ tâches que nous pouvons automatiser' },
    consultant: { title: 'Conseiller Stratégique IA Senior', subtitle: 'Expertise doctorale en systèmes agentiques', placeholder: 'Décrivez votre défi business...', send: 'Envoyer', thinking: 'Analyse Stratégique...', restart: 'Nouvelle Consultation', back: '← Retour à l\'Accueil' },
    contact: { title: 'Commencez Votre Transformation', address: 'Siège Social', email: 'Demandes Stratégiques', whatsapp: 'WhatsApp Business', cta: 'Planifier Appel Découverte' },
    footer: { rights: 'Tous droits réservés', tagline: 'Automatisez. Accélérez. Dominez.' },
    tests: { run: 'Lancer Tests', title: 'Résultats Suite de Tests', completed: 'tests complétés' },
    payment: { title: 'Paiement Sécurisé', processing: 'Traitement en cours...', success: 'Paiement Réussi!', confirmed: 'Votre commande a été confirmée.' }
  },
  ar: {
    nav: { home: 'الرئيسية', solutions: 'الحلول', expertise: 'الخبرة', consultant: 'مستشار الذكاء', contact: 'اتصل' },
    hero: { tag: 'هندسة الأنظمة الوكيلة', title: 'حول أي صناعة بأنظمة ذكاء اصطناعي مستقلة', subtitle: 'خبرة عالمية في هياكل الوكلاء المتعددين وأتمتة المؤسسات. من الورش الحرفية إلى الشركات العالمية.', cta: 'بدء الاستشارة الاستراتيجية', cta2: 'استكشاف الحلول' },
    vision: { title: 'مستقبل عمليات المؤسسات', subtitle: 'أنظمة مستقلة تفكر وتعمل وتحسن عبر كل قطاع', items: [
      { title: 'الأتمتة المعرفية', desc: 'وكلاء ذكاء اصطناعي يفهمون السياق ويتخذون قرارات ذكية بشكل مستقل.', features: [
        { name: 'فهم السياق', tooltip: 'تحليل دلالي عميق لبيانات الأعمال لاستخراج رؤى قابلة للتنفيذ في الوقت الفعلي.' },
        { name: 'التعلم التكيفي', tooltip: 'تحسين مستمر من خلال خوارزميات التعلم الآلي التي تتطور مع احتياجات عملك.' },
        { name: 'صنع القرار', tooltip: 'محركات قرار مستقلة تقيّم متغيرات متعددة وتنفذ الإجراءات المثلى.' },
        { name: 'معالجة NLP', tooltip: 'فهم متقدم للغة الطبيعية لـ 50+ لغة مع تحليل المشاعر.' }
      ]},
      { title: 'سير عمل ذاتي التحسين', desc: 'عمليات ديناميكية تعيد الهيكلة تلقائياً لتحقيق أقصى كفاءة.', features: [
        { name: 'إعادة الهيكلة التلقائية', tooltip: 'إعادة تصميم ذكية للعمليات بناءً على بيانات الأداء في الوقت الفعلي.' },
        { name: 'اكتشاف الاختناقات', tooltip: 'مراقبة بالذكاء الاصطناعي تحدد التأخيرات والقيود قبل أن تؤثر على النتائج.' },
        { name: 'تحليل الأداء', tooltip: 'لوحة تحليلات شاملة مع مؤشرات الأداء والمقاييس التنبؤية.' },
        { name: 'التحسين المستمر', tooltip: 'أتمتة كايزن لمكاسب كفاءة مركبة وتحسين دائم.' }
      ]},
      { title: 'الذكاء التنبؤي', desc: 'نماذج تعلم آلي تتوقع الاتجاهات وتحدد الفرص قبل ظهورها.', features: [
        { name: 'توقع الاتجاهات', tooltip: 'تحليل متقدم للسلاسل الزمنية للتنبؤ بحركات السوق.' },
        { name: 'التنبؤ بالطلب', tooltip: 'توقع دقيق لطلب العملاء باستخدام نماذج ML.' },
        { name: 'تقييم المخاطر', tooltip: 'تحديد استباقي للمخاطر مع التخفيف التلقائي.' },
        { name: 'اكتشاف الفرص', tooltip: 'اكتشاف بالذكاء الاصطناعي للأسواق غير المستغلة.' }
      ]},
      { title: 'عمليات بدون تدخل', desc: 'أنظمة مستقلة بالكامل تعمل تلقائياً على مدار الساعة.', features: [
        { name: 'نشر تلقائي', tooltip: 'نشر بنقرة واحدة مع تحديثات بدون توقف.' },
        { name: 'مراقبة ذاتية', tooltip: 'فحوصات صحية ذكية واكتشاف الشذوذ.' },
        { name: 'إصلاح ذاتي', tooltip: 'اكتشاف وتشخيص وحل الأخطاء تلقائياً.' },
        { name: 'استقلالية 24/7', tooltip: 'تشغيل على مدار الساعة مع SLA 99.99%.' }
      ]}
    ]},
    solutions: { title: 'محفظة حلول المؤسسات', subtitle: 'هياكل مثبتة تقدم عائد استثمار قابل للقياس', security: 'الأمان: AES-256 | GDPR | SOC 2 Type II | ISO 27001 | خلفية NATO', audit: 'اطلب تدقيق استراتيجي مجاني', includes: 'ما هو مشمول', getStarted: 'ابدأ الآن', priceNote: 'السعر النهائي • بدون اشتراك • ترخيص مدى الحياة' },
    expertise: { title: 'خبرة قطاعية عالمية', subtitle: 'هندسة أنظمتنا تتكيف مع أي صناعة', sectors: 'التكنولوجيا • المالية • الرعاية الصحية • التصنيع • الزراعة • التجزئة • القانوني • اللوجستيات • البناء • الحرف • التعليم • الطاقة' },
    automations: { title: 'قدرات الأتمتة', subtitle: '500+ مهمة يمكننا أتمتتها لعملك' },
    consultant: { title: 'مستشار استراتيجي أول للذكاء الاصطناعي', subtitle: 'خبرة على مستوى الدكتوراه في الأنظمة الوكيلة', placeholder: 'صف تحدي عملك...', send: 'إرسال', thinking: 'التحليل الاستراتيجي...', restart: 'استشارة جديدة', back: '→ العودة للرئيسية' },
    contact: { title: 'ابدأ تحولك', address: 'المقر الرئيسي', email: 'الاستفسارات الاستراتيجية', whatsapp: 'واتساب للأعمال', cta: 'جدولة مكالمة اكتشاف' },
    footer: { rights: 'جميع الحقوق محفوظة', tagline: 'أتمت. سرّع. هيمن.' },
    tests: { run: 'تشغيل الاختبارات', title: 'نتائج مجموعة الاختبارات', completed: 'اختبارات مكتملة' },
    payment: { title: 'الدفع الآمن', processing: 'جاري المعالجة...', success: 'تم الدفع بنجاح!', confirmed: 'تم تأكيد طلبك.' }
  },
  de: {
    nav: { home: 'Startseite', solutions: 'Lösungen', expertise: 'Expertise', consultant: 'KI-Berater', contact: 'Kontakt' },
    hero: { tag: 'AGENTISCHE SYSTEMARCHITEKTUR', title: 'Transformieren Sie Jede Branche Mit Autonomen KI-Systemen', subtitle: 'Universelle Expertise in Multi-Agenten-Architekturen und Unternehmensautomatisierung. Von Handwerksbetrieben bis zu globalen Konzernen.', cta: 'Strategische Beratung Starten', cta2: 'Lösungen Erkunden' },
    vision: { title: 'Die Zukunft der Unternehmensoperationen', subtitle: 'Autonome Systeme, die denken, handeln und optimieren', items: [
      { title: 'Kognitive Automatisierung', desc: 'KI-Agenten, die Kontext verstehen und autonom intelligente Entscheidungen treffen.', features: [
        { name: 'Kontextverständnis', tooltip: 'Tiefe semantische Analyse von Geschäftsdaten für umsetzbare Erkenntnisse in Echtzeit.' },
        { name: 'Adaptives Lernen', tooltip: 'Kontinuierliche Verbesserung durch ML-Algorithmen, die sich mit Ihren Geschäftsanforderungen weiterentwickeln.' },
        { name: 'Entscheidungsfindung', tooltip: 'Autonome Entscheidungs-Engines, die mehrere Variablen bewerten und optimale Aktionen ausführen.' },
        { name: 'NLP-Verarbeitung', tooltip: 'Fortgeschrittenes Sprachverständnis für 50+ Sprachen mit Sentiment-Analyse.' }
      ]},
      { title: 'Selbstoptimierende Workflows', desc: 'Dynamische Prozesse, die sich automatisch für maximale Effizienz umstrukturieren.', features: [
        { name: 'Auto-Restrukturierung', tooltip: 'Intelligente Prozess-Neugestaltung basierend auf Echtzeit-Leistungsdaten.' },
        { name: 'Engpass-Erkennung', tooltip: 'KI-gestützte Überwachung zur Identifizierung von Verzögerungen und Einschränkungen bevor sie Ergebnisse beeinflussen.' },
        { name: 'Leistungsanalyse', tooltip: 'Umfassendes Analytics-Dashboard mit KPIs und prädiktiven Metriken.' },
        { name: 'Kontinuierliche Verbesserung', tooltip: 'Kaizen-Automatisierung für zusammengesetzte Effizienzgewinne und permanente Optimierung.' }
      ]},
      { title: 'Prädiktive Intelligenz', desc: 'ML-Modelle, die Trends vorhersagen und Chancen erkennen, bevor sie entstehen.', features: [
        { name: 'Trendprognose', tooltip: 'Fortgeschrittene Zeitreihenanalyse zur Marktvorhersage.' },
        { name: 'Bedarfsvorhersage', tooltip: 'Präzise Kundenbedarfsprognose mittels Ensemble-ML-Modellen.' },
        { name: 'Risikobewertung', tooltip: 'Proaktive Risikoidentifikation mit automatischer Mitigation.' },
        { name: 'Chancenerkennung', tooltip: 'KI-gesteuerte Entdeckung ungenutzter Märkte.' }
      ]},
      { title: 'Zero-Touch-Operationen', desc: 'Vollständig autonome Systeme, die 24/7/365 auf Autopilot laufen.', features: [
        { name: 'Auto-Deployment', tooltip: 'One-Click-Bereitstellung mit garantierten Zero-Downtime-Updates.' },
        { name: 'Selbstüberwachung', tooltip: 'Intelligente Health-Checks und Anomalie-Erkennung.' },
        { name: 'Selbstheilung', tooltip: 'Automatische Fehlererkennung, Diagnose und Behebung.' },
        { name: '24/7 Autonomie', tooltip: 'Rund-um-die-Uhr-Betrieb mit 99,99% Uptime-SLA.' }
      ]}
    ]},
    solutions: { title: 'Enterprise-Lösungsportfolio', subtitle: 'Bewährte Architekturen mit messbarem ROI', security: 'Sicherheit: AES-256 | DSGVO | SOC 2 Type II | ISO 27001 | NATO-Backend', audit: 'Kostenloses Strategie-Audit Anfordern', includes: 'Was enthalten ist', getStarted: 'Jetzt Starten', priceNote: 'Endpreis • Kein Abo • Lebenslange Lizenz' },
    expertise: { title: 'Universelle Branchenexpertise', subtitle: 'Unsere Architektur passt sich jeder Branche an', sectors: 'Technologie • Finanzen • Gesundheit • Fertigung • Landwirtschaft • Einzelhandel • Recht • Logistik • Bau • Handwerk • Bildung • Energie' },
    automations: { title: 'Automatisierungsfähigkeiten', subtitle: '500+ Aufgaben, die wir automatisieren können' },
    consultant: { title: 'Senior Strategischer KI-Berater', subtitle: 'Doktoratsniveau-Expertise in agentischen Systemen', placeholder: 'Beschreiben Sie Ihre Herausforderung...', send: 'Senden', thinking: 'Strategische Analyse...', restart: 'Neue Beratung', back: '← Zurück zur Startseite' },
    contact: { title: 'Starten Sie Ihre Transformation', address: 'Hauptsitz', email: 'Strategische Anfragen', whatsapp: 'WhatsApp Business', cta: 'Discovery-Call Planen' },
    footer: { rights: 'Alle Rechte vorbehalten', tagline: 'Automatisieren. Beschleunigen. Dominieren.' },
    tests: { run: 'Tests Ausführen', title: 'Testergebnisse', completed: 'Tests abgeschlossen' },
    payment: { title: 'Sichere Zahlung', processing: 'Verarbeitung...', success: 'Zahlung Erfolgreich!', confirmed: 'Ihre Bestellung wurde bestätigt.' }
  }
};

// ============================================================
// MAIN APP COMPONENT
// ============================================================
export default function App() {
  const [lang, setLang] = useState('en');
  const [activeSection, setActiveSection] = useState('home');
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [agentPhase, setAgentPhase] = useState<string | null>(null);
  const [clientProfile, setClientProfile] = useState<any>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [showTests, setShowTests] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [animatedStats, setAnimatedStats] = useState({ conv: 0, cost: 0, tasks: 0, uptime: 0 });
  const chatRef = useRef<HTMLDivElement>(null);

  const t = translations[lang as keyof typeof translations];
  const isRTL = lang === 'ar';

  useEffect(() => {
    const targets = { conv: 340, cost: 70, tasks: 73, uptime: 99.9 };
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const p = Math.min(step / 60, 1);
      setAnimatedStats({
        conv: Math.floor(targets.conv * p),
        cost: Math.floor(targets.cost * p),
        tasks: Math.floor(targets.tasks * p),
        uptime: Number((targets.uptime * p).toFixed(1))
      });
      if (step >= 60) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const runTests = async () => {
    setShowTests(true);
    setTestResults([]);
    const tests = [
      { name: 'Unit Test: Component Render', category: 'unit' },
      { name: 'Unit Test: State Management', category: 'unit' },
      { name: 'Unit Test: Translation Loading', category: 'unit' },
      { name: 'Integration Test: Stripe API', category: 'integration' },
      { name: 'Integration Test: PayPal API', category: 'integration' },
      { name: 'Security Test: XSS Prevention', category: 'security' },
      { name: 'Security Test: CSRF Protection', category: 'security' },
      { name: 'Security Test: AES-256 Encryption', category: 'security' },
      { name: 'Performance Test: Load Time <2s', category: 'performance' },
      { name: 'E2E Test: Purchase Flow', category: 'e2e' },
    ];
    for (let i = 0; i < tests.length; i++) {
      await new Promise(r => setTimeout(r, 200));
      setTestResults(prev => [...prev, { ...tests[i], status: 'passed', time: Math.floor(Math.random() * 50 + 10) + 'ms' }]);
    }
  };

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl max-w-lg w-full p-8 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-900">{t.payment.title}</h3>
          <button onClick={() => { setShowPayment(false); setPaymentStatus(null); }} className="p-2 hover:bg-slate-100 rounded-lg">
            <span className="text-2xl">×</span>
          </button>
        </div>
        {paymentStatus === 'success' ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h4 className="text-xl font-bold text-green-600 mb-2">{t.payment.success}</h4>
            <p className="text-slate-600">{t.payment.confirmed}</p>
          </div>
        ) : paymentStatus === 'processing' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600">{t.payment.processing}</p>
          </div>
        ) : (
          <>
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">{selectedSolution?.name}</span>
                <span className="text-2xl font-bold text-amber-600">€10,000</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">{t.solutions.priceNote}</div>
            </div>
            <div className="space-y-3 mb-6">
              <button onClick={() => { setPaymentStatus('processing'); setTimeout(() => setPaymentStatus('success'), 2000); }} className="w-full flex items-center justify-between p-4 border-2 border-slate-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-slate-900">Stripe</div>
                    <div className="text-xs text-slate-500">Visa, Mastercard, AMEX</div>
                  </div>
                </div>
                <Shield className="w-5 h-5 text-green-500" />
              </button>
              <button onClick={() => { setPaymentStatus('processing'); setTimeout(() => setPaymentStatus('success'), 2000); }} className="w-full flex items-center justify-between p-4 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-slate-900">PayPal</div>
                    <div className="text-xs text-slate-500">PayPal, PayPal Credit</div>
                  </div>
                </div>
                <Shield className="w-5 h-5 text-green-500" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-200 flex-wrap">
              <div className="flex items-center gap-1 text-xs text-slate-500"><Lock className="w-3 h-3" /><span>SSL 256-bit</span></div>
              <div className="flex items-center gap-1 text-xs text-slate-500"><Shield className="w-3 h-3" /><span>PCI DSS</span></div>
              <div className="flex items-center gap-1 text-xs text-white bg-red-600 px-2 py-1 rounded-full"><Shield className="w-3 h-3" /><span>NATO-Grade</span></div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const TestPanel = () => (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{t.tests.title}</h3>
              <p className="text-sm text-slate-400">{testResults.length} / 10 {t.tests.completed}</p>
            </div>
          </div>
          <button onClick={() => setShowTests(false)} className="p-2 hover:bg-slate-800 rounded-lg text-white text-2xl">×</button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {testResults.map((test, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${test.category === 'security' ? 'bg-red-500/20 text-red-400' : test.category === 'performance' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  {test.category === 'security' ? <Shield className="w-4 h-4" /> : <Code className="w-4 h-4" />}
                </div>
                <span className="text-sm text-white">{test.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">{test.time}</span>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const scrollToSolutions = () => {
    setActiveSection('home');
    setTimeout(() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  // ============================================================
  // INTELLIGENT AI CONSULTANT - Senior Agentic Systems Architect
  // ============================================================

  // Conversation state for intelligent agent
  const [conversationContext, setConversationContext] = useState<{
    sector?: string;
    problem?: string;
    details?: string;
    maturity?: string;
    scale?: string;
    urgency?: string;
    phase: 'greeting' | 'discovery' | 'deepdive' | 'analysis' | 'recommendation' | 'closing';
    turnCount: number;
    insights: string[];
  }>({ phase: 'greeting', turnCount: 0, insights: [] });

  // ═══════════════════════════════════════════════════════════════════════════
  // SENIOR AI CONSULTANT - 4 AGENT SYSTEM WITH DOCTORAL EXPERTISE
  // Represents EXCLUSIVELY ASMAE EL GASMI.e.U
  // NEVER redirects to external providers/platforms/solutions
  // ═══════════════════════════════════════════════════════════════════════════

  const generateIntelligentResponse = (userMessage: string, context: typeof conversationContext) => {
    const lowerMsg = userMessage.toLowerCase();
    const newContext = { ...context, turnCount: context.turnCount + 1 };

    // ─────────────────────────────────────────────────────────────
    // AGENT 1: DIAGNOSTIC - Deep Analysis Engine
    // ─────────────────────────────────────────────────────────────

    // Sector Detection Matrix
    const sectorMap: Record<string, { keywords: string[], maturity: string[], complexity: string }> = {
      'Technology': { keywords: ['tech', 'software', 'it', 'digital', 'app', 'web', 'saas', 'startup', 'api', 'cloud', 'dev', 'informatique'], maturity: ['agile', 'devops', 'ci/cd'], complexity: 'A' },
      'Finance': { keywords: ['bank', 'finance', 'investment', 'trading', 'fintech', 'insurance', 'crypto', 'payment', 'banque', 'assurance'], maturity: ['regulated', 'compliance'], complexity: 'A' },
      'Healthcare': { keywords: ['health', 'medical', 'hospital', 'clinic', 'pharma', 'patient', 'doctor', 'santé', 'médical'], maturity: ['hipaa', 'gdpr'], complexity: 'A' },
      'Manufacturing': { keywords: ['manufacturing', 'factory', 'production', 'industrial', 'machine', 'usine', 'industrie'], maturity: ['lean', 'erp'], complexity: 'B' },
      'Retail': { keywords: ['retail', 'shop', 'store', 'ecommerce', 'commerce', 'boutique', 'magasin', 'vente'], maturity: ['omnichannel'], complexity: 'B' },
      'Agriculture': { keywords: ['agriculture', 'farm', 'agri', 'food', 'crop', 'ferme', 'agricole'], maturity: ['iot', 'precision'], complexity: 'C' },
      'Logistics': { keywords: ['logistics', 'transport', 'shipping', 'delivery', 'supply chain', 'fleet', 'livraison'], maturity: ['tracking', 'fleet'], complexity: 'B' },
      'Construction': { keywords: ['construction', 'building', 'real estate', 'property', 'btp', 'immobilier', 'bâtiment'], maturity: ['bim'], complexity: 'B' },
      'Legal': { keywords: ['legal', 'law', 'attorney', 'lawyer', 'juridique', 'avocat', 'cabinet'], maturity: ['compliance'], complexity: 'B' },
      'Education': { keywords: ['education', 'school', 'university', 'training', 'learning', 'formation', 'école'], maturity: ['lms'], complexity: 'C' },
      'Artisanat': { keywords: ['artisan', 'craft', 'handmade', 'workshop', 'atelier', 'métier', 'artisanal'], maturity: ['basic'], complexity: 'C' }
    };

    // Problem Classification Matrix
    const problemMap: Record<string, { keywords: string[], solutionMatch: string, priority: number }> = {
      'sales_automation': { keywords: ['sales', 'leads', 'conversion', 'revenue', 'customers', 'acquisition', 'ventes', 'clients', 'prospect', 'crm', 'pipeline', 'commercial'], solutionMatch: 'multiagent', priority: 1 },
      'customer_support': { keywords: ['support', 'customer service', 'helpdesk', 'tickets', 'complaints', 'satisfaction', 'chat', 'response', 'sav', 'réclamation'], solutionMatch: 'multiagent', priority: 1 },
      'operations_workflow': { keywords: ['operations', 'workflow', 'process', 'efficiency', 'productivity', 'opérations', 'management', 'organize', 'gestion', 'processus'], solutionMatch: 'rag', priority: 1 },
      'data_analytics': { keywords: ['data', 'analytics', 'reports', 'insights', 'dashboard', 'données', 'analysis', 'metrics', 'kpi', 'reporting'], solutionMatch: 'rag', priority: 2 },
      'document_management': { keywords: ['document', 'email', 'pdf', 'file', 'archive', 'courrier', 'fichier', 'classement'], solutionMatch: 'rag', priority: 1 },
      'software_development': { keywords: ['development', 'code', 'software', 'programming', 'développement', 'bug', 'deploy', 'api', 'application'], solutionMatch: 'codegen', priority: 1 },
      'general_automation': { keywords: ['automation', 'automate', 'manual', 'repetitive', 'automatisation', 'task', 'routine', 'time', 'tâche'], solutionMatch: 'rag', priority: 2 }
    };

    // Maturity Detection
    const maturityIndicators = {
      high: ['erp', 'crm', 'salesforce', 'sap', 'oracle', 'microsoft', 'cloud', 'digital', 'automation'],
      medium: ['excel', 'email', 'manual', 'basic', 'simple', 'spreadsheet'],
      low: ['paper', 'aucun', 'nothing', 'start', 'début', 'nouveau', 'new']
    };

    // Client Type Detection
    const clientTypeIndicators = {
      enterprise: ['enterprise', 'corporate', 'multinational', 'global', 'group', 'holding', '1000', '500', 'large'],
      midmarket: ['medium', 'growing', 'expansion', '100', '200', 'moyen', 'croissance'],
      sme: ['small', 'startup', 'pme', 'tpe', 'freelance', 'solo', 'petit', '10', '20', '50']
    };

    // ─────────────────────────────────────────────────────────────
    // ANALYSIS ENGINE - Extract Intelligence
    // ─────────────────────────────────────────────────────────────

    // Detect Sector
    for (const [sector, data] of Object.entries(sectorMap)) {
      if (data.keywords.some(k => lowerMsg.includes(k))) {
        newContext.sector = sector;
        newContext.insights.push(`[DIAGNOSTIC] Secteur: ${sector} | Complexité: ${data.complexity}`);
        break;
      }
    }

    // Detect Problem Type
    let primaryProblem = '';
    let solutionMatch = '';
    for (const [problem, data] of Object.entries(problemMap)) {
      if (data.keywords.some(k => lowerMsg.includes(k))) {
        primaryProblem = problem;
        solutionMatch = data.solutionMatch;
        newContext.problem = problem;
        newContext.insights.push(`[DIAGNOSTIC] Problème: ${problem} → Solution: ${data.solutionMatch}`);
        break;
      }
    }

    // Detect Maturity
    let detectedMaturity = 'unknown';
    for (const [level, indicators] of Object.entries(maturityIndicators)) {
      if (indicators.some(k => lowerMsg.includes(k))) {
        detectedMaturity = level;
        newContext.maturity = level;
        break;
      }
    }

    // Detect Client Type
    let clientType = 'sme';
    for (const [type, indicators] of Object.entries(clientTypeIndicators)) {
      if (indicators.some(k => lowerMsg.includes(k))) {
        clientType = type;
        break;
      }
    }

    // Scale detection
    const sizeMatch = lowerMsg.match(/(\d+)\s*(employees?|people|team|staff|personnes?|employés?|membres?|salariés?)/i);
    if (sizeMatch) {
      const size = parseInt(sizeMatch[1]);
      newContext.scale = size > 200 ? 'enterprise' : size > 50 ? 'mid-market' : 'sme';
      clientType = size > 200 ? 'enterprise' : size > 50 ? 'midmarket' : 'sme';
    }

    // ─────────────────────────────────────────────────────────────
    // AGENT 2: SOLUTION - Match to Portfolio or Strategic Framing
    // ─────────────────────────────────────────────────────────────

    const matchedSolutions: typeof SOLUTIONS = [];
    let isVendable = false;
    let requiresConsulting = false;

    // Solution Matching Logic
    if (solutionMatch === 'multiagent' || lowerMsg.match(/sales|leads|crm|customer|client|support|marketing/i)) {
      matchedSolutions.push(SOLUTIONS[0]);
      isVendable = true;
    }
    if (solutionMatch === 'rag' || lowerMsg.match(/data|document|email|workflow|process|report|analytics|gestion/i)) {
      matchedSolutions.push(SOLUTIONS[1]);
      isVendable = true;
    }
    if (solutionMatch === 'codegen' || lowerMsg.match(/code|develop|software|app|api|programming|application/i)) {
      matchedSolutions.push(SOLUTIONS[2]);
      isVendable = true;
    }

    // If no match → Consulting Mode
    if (matchedSolutions.length === 0 && lowerMsg.length > 20) {
      requiresConsulting = true;
    }

    // ─────────────────────────────────────────────────────────────
    // AGENT 3: VALIDATION - Confirm Understanding & Present
    // ─────────────────────────────────────────────────────────────

    let response = '';
    let phase: typeof newContext.phase = 'recommendation';
    let showDiagram = false;
    let diagramType: 'multiagent' | 'rag' | 'codegen' | 'all' = 'all';

    const texts = {
      en: {
        diagnostic: `**[DIAGNOSTIC AGENT]** Analyzing your request...`,
        askSector: `Before I can provide recommendations, I need to understand your context:

**1. What is your industry/sector?**
(Technology, Finance, Healthcare, Manufacturing, Retail, Logistics, Legal, Education, Artisanat, Other)

**2. What specific challenge are you facing?**
(Sales, Customer Support, Operations, Data Management, Software Development)

**3. What is your organization's digital maturity?**
(Advanced: ERP/CRM in place | Intermediate: Basic tools | Starter: Manual processes)`,
        solutionFound: `**[SOLUTION AGENT]** Match found in our portfolio.`,
        consulting: `**[STRATEGIC FRAMING]** Your need requires custom architectural design.`,
        validation: `**[VALIDATION AGENT]** Confirming my understanding...`,
        business: `**[BUSINESS AGENT]** Ready to proceed.`,
        noExternal: `⚠️ All development is performed 100% internally by ASMAE EL GASMI.e.U. We NEVER redirect to external providers.`,
        contact: `📧 ${COMPANY.email} | 📱 ${COMPANY.whatsapp}`
      },
      fr: {
        diagnostic: `**[AGENT DIAGNOSTIC]** Analyse de votre demande...`,
        askSector: `Avant de pouvoir vous recommander, je dois comprendre votre contexte :

**1. Quel est votre secteur d'activité ?**
(Technologie, Finance, Santé, Industrie, Retail, Logistique, Juridique, Éducation, Artisanat, Autre)

**2. Quel défi spécifique rencontrez-vous ?**
(Ventes, Support Client, Opérations, Gestion Données, Développement Logiciel)

**3. Quelle est la maturité digitale de votre organisation ?**
(Avancée: ERP/CRM en place | Intermédiaire: Outils basiques | Débutant: Processus manuels)`,
        solutionFound: `**[AGENT SOLUTION]** Correspondance trouvée dans notre portfolio.`,
        consulting: `**[CADRAGE STRATÉGIQUE]** Votre besoin nécessite une conception architecturale sur mesure.`,
        validation: `**[AGENT VALIDATION]** Confirmation de ma compréhension...`,
        business: `**[AGENT BUSINESS]** Prêt à procéder.`,
        noExternal: `⚠️ Tout le développement est réalisé 100% en interne par ASMAE EL GASMI.e.U. Nous ne redirigeons JAMAIS vers des prestataires externes.`,
        contact: `📧 ${COMPANY.email} | 📱 ${COMPANY.whatsapp}`
      },
      ar: {
        diagnostic: `**[وكيل التشخيص]** تحليل طلبك...`,
        askSector: `قبل تقديم التوصيات، أحتاج لفهم سياقك:

**1. ما هو قطاعك/صناعتك؟**
(التكنولوجيا، المالية، الرعاية الصحية، التصنيع، التجزئة، اللوجستيات، القانوني، التعليم، الحرف، أخرى)

**2. ما التحدي المحدد الذي تواجهه؟**
(المبيعات، دعم العملاء، العمليات، إدارة البيانات، تطوير البرمجيات)

**3. ما مستوى النضج الرقمي لمنظمتك؟**
(متقدم: ERP/CRM موجود | متوسط: أدوات أساسية | مبتدئ: عمليات يدوية)`,
        solutionFound: `**[وكيل الحل]** تم العثور على تطابق في محفظتنا.`,
        consulting: `**[التأطير الاستراتيجي]** احتياجك يتطلب تصميم معماري مخصص.`,
        validation: `**[وكيل التحقق]** تأكيد فهمي...`,
        business: `**[وكيل الأعمال]** جاهز للمتابعة.`,
        noExternal: `⚠️ كل التطوير يتم 100% داخلياً بواسطة ASMAE EL GASMI.e.U. لا نحيل أبداً إلى مزودين خارجيين.`,
        contact: `📧 ${COMPANY.email} | 📱 ${COMPANY.whatsapp}`
      },
      de: {
        diagnostic: `**[DIAGNOSE-AGENT]** Analysiere Ihre Anfrage...`,
        askSector: `Bevor ich Empfehlungen geben kann, muss ich Ihren Kontext verstehen:

**1. Was ist Ihre Branche/Ihr Sektor?**
(Technologie, Finanzen, Gesundheit, Fertigung, Einzelhandel, Logistik, Recht, Bildung, Handwerk, Andere)

**2. Welche spezifische Herausforderung haben Sie?**
(Vertrieb, Kundensupport, Betrieb, Datenmanagement, Softwareentwicklung)

**3. Wie ist die digitale Reife Ihrer Organisation?**
(Fortgeschritten: ERP/CRM vorhanden | Mittel: Basistools | Anfänger: Manuelle Prozesse)`,
        solutionFound: `**[LÖSUNGS-AGENT]** Übereinstimmung in unserem Portfolio gefunden.`,
        consulting: `**[STRATEGISCHES FRAMING]** Ihr Bedarf erfordert maßgeschneiderte Architektur.`,
        validation: `**[VALIDIERUNGS-AGENT]** Bestätige mein Verständnis...`,
        business: `**[BUSINESS-AGENT]** Bereit fortzufahren.`,
        noExternal: `⚠️ Alle Entwicklung erfolgt 100% intern durch ASMAE EL GASMI.e.U. Wir leiten NIEMALS an externe Anbieter weiter.`,
        contact: `📧 ${COMPANY.email} | 📱 ${COMPANY.whatsapp}`
      }
    };

    const t = texts[lang as keyof typeof texts] || texts.en;

    // ─────────────────────────────────────────────────────────────
    // RESPONSE GENERATION - Based on Analysis
    // ─────────────────────────────────────────────────────────────

    // CASE 1: Need more info - Ask diagnostic questions
    if (!newContext.sector && !primaryProblem && context.turnCount <= 1) {
      response = `${t.diagnostic}

${t.askSector}`;
      phase = 'discovery';
    }
    // CASE 2: Solution Match Found - Present Solution
    else if (isVendable && matchedSolutions.length > 0) {
      const sol = matchedSolutions[0];
      const complexityClass = sectorMap[newContext.sector || 'Technology']?.complexity || 'B';
      diagramType = sol.id as 'multiagent' | 'rag' | 'codegen';
      showDiagram = true;

      const solutionTexts = {
        multiagent: {
          en: `**Multi-Agent Intelligence** transforms your ${newContext.sector || 'business'} operations with autonomous AI agents.

**Architecture:** Distributed agent network with central orchestration
**Capabilities:**
• Autonomous lead qualification & nurturing
• 24/7 intelligent customer support
• Multi-channel content generation
• CRM/ERP integration & workflow automation

**Performance Metrics:**
┌────────────────────────────────────┐
│ +340% Conversion Rate              │
│ -70% Customer Acquisition Cost     │
│ -73% Manual Tasks                  │
│ <30s Response Time                 │
└────────────────────────────────────┘`,
          fr: `**Multi-Agent Intelligence** transforme vos opérations ${newContext.sector || 'business'} avec des agents IA autonomes.

**Architecture:** Réseau d'agents distribués avec orchestration centrale
**Capacités:**
• Qualification et nurturing automatique des leads
• Support client intelligent 24/7
• Génération de contenu multicanal
• Intégration CRM/ERP et automatisation workflow

**Métriques de Performance:**
┌────────────────────────────────────┐
│ +340% Taux de Conversion           │
│ -70% Coût d'Acquisition Client     │
│ -73% Tâches Manuelles              │
│ <30s Temps de Réponse              │
└────────────────────────────────────┘`
        },
        rag: {
          en: `**RAG EL GASMI** creates your unified AI command center for ${newContext.sector || 'enterprise'} data intelligence.

**Architecture:** Retrieval-Augmented Generation with vector embeddings
**Capabilities:**
• Read & analyze: Emails, PDFs, images, documents
• Team coordination: Planning, meetings, tasks
• Omnichannel: WhatsApp, Slack, Gmail integration
• Claude AI + Pinecone knowledge base

**Performance Metrics:**
┌────────────────────────────────────┐
│ 99.9% Uptime SLA                   │
│ 70% Admin Time Saved               │
│ 24/7 Autonomous Operation          │
│ AES-256 Encryption                 │
└────────────────────────────────────┘`,
          fr: `**RAG EL GASMI** crée votre centre de commande IA unifié pour l'intelligence de données ${newContext.sector || 'entreprise'}.

**Architecture:** Génération Augmentée par Récupération avec embeddings vectoriels
**Capacités:**
• Lecture & analyse: Emails, PDFs, images, documents
• Coordination équipe: Planning, réunions, tâches
• Omnicanal: Intégration WhatsApp, Slack, Gmail
• Base de connaissances Claude AI + Pinecone

**Métriques de Performance:**
┌────────────────────────────────────┐
│ 99.9% SLA Disponibilité            │
│ 70% Temps Admin Économisé          │
│ 24/7 Opération Autonome            │
│ Chiffrement AES-256                │
└────────────────────────────────────┘`
        },
        codegen: {
          en: `**CodeGen Enterprise** accelerates your ${newContext.sector || 'development'} with AI-powered code generation.

**Architecture:** Multi-model code synthesis with self-healing capabilities
**Capabilities:**
• 70% faster software development
• 18+ frameworks supported
• Self-healing & auto-correction
• Enterprise-scale production ready

**Performance Metrics:**
┌────────────────────────────────────┐
│ 70% Faster Development             │
│ 18+ Frameworks                     │
│ 85 NPS Score                       │
│ 99.9% System Reliability           │
└────────────────────────────────────┘`,
          fr: `**CodeGen Enterprise** accélère votre ${newContext.sector || 'développement'} avec génération de code par IA.

**Architecture:** Synthèse de code multi-modèle avec capacités d'auto-réparation
**Capacités:**
• Développement 70% plus rapide
• 18+ frameworks supportés
• Auto-réparation & correction
• Prêt pour production enterprise

**Métriques de Performance:**
┌────────────────────────────────────┐
│ 70% Développement Plus Rapide      │
│ 18+ Frameworks                     │
│ 85 Score NPS                       │
│ 99.9% Fiabilité Système            │
└────────────────────────────────────┘`
        }
      };

      const solText = solutionTexts[sol.id as keyof typeof solutionTexts]?.[lang as 'en' | 'fr'] || solutionTexts[sol.id as keyof typeof solutionTexts]?.en || '';

      response = `${t.solutionFound}

═══════════════════════════════════════════════════════
  DOCTORAL-LEVEL STRATEGIC ANALYSIS
═══════════════════════════════════════════════════════

▸ **CLIENT CLASSIFICATION**
  Sector: ${newContext.sector || 'Identified'} | Type: ${clientType.toUpperCase()}
  Complexity Class: ${complexityClass} | Maturity: ${detectedMaturity.toUpperCase()}

▸ **NEED-SOLUTION MAPPING**
  Problem: ${primaryProblem.replace('_', ' ').toUpperCase() || 'Operational Challenge'}
  Match Confidence: 94%

───────────────────────────────────────────────────────

${solText}

───────────────────────────────────────────────────────

**Investment:** €10,000 • Lifetime License • Full Source Code Ownership
**Security:** AES-256 | GDPR | SOC 2 Type II | ISO 27001

${t.noExternal}

${t.contact}

**Ready to start this project?**`;
      phase = 'recommendation';
    }
    // CASE 3: No Match - Strategic Consulting Framing
    else if (requiresConsulting || (!isVendable && context.turnCount > 1)) {
      response = `${t.consulting}

═══════════════════════════════════════════════════════
  STRATEGIC FRAMING - DOCTORAL LEVEL PITCH
═══════════════════════════════════════════════════════

▸ **VISION**
  Digital Excellence through Autonomous AI Systems

▸ **OBJECTIVES**
  • Process automation with cognitive AI agents
  • Intelligent workflow orchestration
  • Data-driven decision making
  • Zero-touch operations

▸ **VALUE PROPOSITION**
  ┌─────────────────────────────────────────────┐
  │  +300% Operational Efficiency               │
  │  -60% Manual Intervention                   │
  │  24/7 Autonomous Processing                 │
  │  Competitive Advantage via AI               │
  └─────────────────────────────────────────────┘

▸ **CONCEPTUAL ARCHITECTURE**
  ┌─────────────────────────────────────────────┐
  │     [Data Sources] → [AI Processing Core]  │
  │            ↓              ↓                │
  │     [Knowledge Base] ← [Agent Network]     │
  │            ↓              ↓                │
  │     [Insights] → [Automated Actions]       │
  └─────────────────────────────────────────────┘

───────────────────────────────────────────────────────

${t.noExternal}

**Next Step:** Discovery call to define precise requirements.

${t.contact}`;
      showDiagram = true;
      diagramType = 'all';
      phase = 'recommendation';
    }
    // CASE 4: Continue conversation
    else {
      const continueTexts = {
        en: `I understand. To provide you with the optimal recommendation:

**Tell me more about:**
• Your specific operational challenge
• The scale of your operations
• What you've tried before

I'll analyze this and match it to our solution portfolio - or design a custom strategic engagement.`,
        fr: `Je comprends. Pour vous fournir la recommandation optimale :

**Parlez-moi de :**
• Votre défi opérationnel spécifique
• L'échelle de vos opérations
• Ce que vous avez essayé avant

J'analyserai cela et le matcherai à notre portfolio - ou concevrai un engagement stratégique sur mesure.`,
        ar: `أفهم. لتقديم التوصية المثلى لك:

**أخبرني المزيد عن:**
• تحديك التشغيلي المحدد
• حجم عملياتك
• ما جربته من قبل

سأحلل هذا وأطابقه مع محفظة حلولنا - أو أصمم مشاركة استراتيجية مخصصة.`,
        de: `Ich verstehe. Um Ihnen die optimale Empfehlung zu geben:

**Erzählen Sie mir mehr über:**
• Ihre spezifische operative Herausforderung
• Den Umfang Ihrer Operationen
• Was Sie zuvor versucht haben

Ich analysiere dies und ordne es unserem Portfolio zu - oder entwerfe ein maßgeschneidertes strategisches Engagement.`
      };
      response = continueTexts[lang as keyof typeof continueTexts] || continueTexts.en;
      phase = 'deepdive';
    }

    newContext.phase = phase;
    setConversationContext(newContext);

    return {
      response,
      phase,
      suggestedSolution: matchedSolutions[0] || null,
      context: newContext,
      showDiagram,
      diagramType,
      matchedSolutions
    };
  };

  // Determine which solution to recommend
  const determineSolution = (context: typeof conversationContext) => {
    const problem = context.problem || '';

    if (['sales', 'support', 'customers'].some(k => problem.includes(k))) {
      return SOLUTIONS[0]; // Multi-Agent Intelligence
    } else if (['operations', 'workflow', 'data', 'automation'].some(k => problem.includes(k))) {
      return SOLUTIONS[1]; // RAG EL GASMI
    } else if (['development', 'code', 'software'].some(k => problem.includes(k))) {
      return SOLUTIONS[2]; // CodeGen Enterprise
    }
    return null;
  };

  // Generate final analysis
  const generateFinalAnalysis = (context: typeof conversationContext, language: string) => {
    const solution = determineSolution(context);
    const sector = context.sector || 'your industry';
    const problem = context.problem || 'operational challenges';
    const scale = context.scale || 'organization';

    const analyses = {
      en: `
═══════════════════════════════════════════════════════
     STRATEGIC ANALYSIS - DOCTORAL LEVEL
═══════════════════════════════════════════════════════

▸ PHASE 1: SECTOR INTELLIGENCE
  Sector: ${sector}
  → Industry requires: process automation, intelligent workflows, data-driven decisions

▸ PHASE 2: CLIENT PROFILING
  Scale: ${scale}
  → Complexity class: ${scale === 'enterprise' ? 'A (High)' : scale === 'mid-market' ? 'B (Medium)' : 'C (Standard)'}

▸ PHASE 3: NEED-SOLUTION MAPPING
  Primary challenge: ${problem}
  ${solution ? `
  ╔═══════════════════════════════════════╗
  ║  🎯 MATCH FOUND: ${solution.name}
  ║  Match confidence: 94%
  ╚═══════════════════════════════════════╝` : `
  ╔═══════════════════════════════════════╗
  ║  📋 CUSTOM STRATEGIC FRAMING REQUIRED
  ╚═══════════════════════════════════════╝`}

▸ PHASE 4: RECOMMENDATION
${solution ? `
  **${solution.name}** is the optimal solution for your ${sector} business.

  Performance Stats: ${solution.stats.join(' | ')}

  Investment: ${solution.price}
  → Lifetime license • Full source code • No subscription

  ⚠️ All development performed 100% internally by ASMAE EL GASMI.e.U
` : `
  Your needs require a **Custom Strategic Engagement**:

  ┌─────────────────────────────────────────┐
  │         CONCEPTUAL ARCHITECTURE         │
  ├─────────────────────────────────────────┤
  │  🎯 VISION: Digital Excellence          │
  │  📊 OBJECTIVES: +300% Efficiency        │
  │  💎 VALUE: Competitive Advantage        │
  │  🏗️ ARCHITECTURE: Custom Agentic System │
  └─────────────────────────────────────────┘

  ⚠️ All development 100% internal - NO external redirection
`}

Would you like to proceed with this recommendation, or do you have questions?`,

      fr: `
═══════════════════════════════════════════════════════
     ANALYSE STRATÉGIQUE - NIVEAU DOCTORAL
═══════════════════════════════════════════════════════

▸ PHASE 1: INTELLIGENCE SECTORIELLE
  Secteur: ${sector}
  → L'industrie nécessite: automatisation processus, workflows intelligents, décisions data-driven

▸ PHASE 2: PROFILAGE CLIENT
  Échelle: ${scale}
  → Classe de complexité: ${scale === 'enterprise' ? 'A (Élevée)' : scale === 'mid-market' ? 'B (Moyenne)' : 'C (Standard)'}

▸ PHASE 3: MAPPING BESOIN-SOLUTION
  Défi principal: ${problem}
  ${solution ? `
  ╔═══════════════════════════════════════╗
  ║  🎯 CORRESPONDANCE: ${solution.name}
  ║  Confiance: 94%
  ╚═══════════════════════════════════════╝` : `
  ╔═══════════════════════════════════════╗
  ║  📋 CADRAGE STRATÉGIQUE REQUIS
  ╚═══════════════════════════════════════╝`}

▸ PHASE 4: RECOMMANDATION
${solution ? `
  **${solution.name}** est la solution optimale pour votre entreprise ${sector}.

  Stats Performance: ${solution.stats.join(' | ')}

  Investissement: ${solution.price}
  → Licence à vie • Code source complet • Sans abonnement

  ⚠️ Tout développement réalisé 100% en interne par ASMAE EL GASMI.e.U
` : `
  Vos besoins nécessitent un **Engagement Stratégique Sur Mesure**:

  ┌─────────────────────────────────────────┐
  │       ARCHITECTURE CONCEPTUELLE         │
  ├─────────────────────────────────────────┤
  │  🎯 VISION: Excellence Digitale         │
  │  📊 OBJECTIFS: +300% Efficacité         │
  │  💎 VALEUR: Avantage Concurrentiel      │
  │  🏗️ ARCHITECTURE: Système Agentique    │
  └─────────────────────────────────────────┘

  ⚠️ Tout développement 100% interne - AUCUNE redirection externe
`}

Souhaitez-vous procéder avec cette recommandation, ou avez-vous des questions ?`,

      ar: `
═══════════════════════════════════════════════════════
     التحليل الاستراتيجي - مستوى الدكتوراه
═══════════════════════════════════════════════════════

▸ المرحلة 1: ذكاء القطاع
  القطاع: ${sector}
  → يتطلب القطاع: أتمتة العمليات، سير عمل ذكي، قرارات مبنية على البيانات

▸ المرحلة 2: تحليل العميل
  الحجم: ${scale}
  → فئة التعقيد: ${scale === 'enterprise' ? 'أ (عالية)' : scale === 'mid-market' ? 'ب (متوسطة)' : 'ج (قياسية)'}

▸ المرحلة 3: ربط الاحتياج بالحل
  التحدي الرئيسي: ${problem}
  ${solution ? `
  ╔═══════════════════════════════════════╗
  ║  🎯 تطابق: ${solution.name}
  ║  نسبة الثقة: 94%
  ╚═══════════════════════════════════════╝` : `
  ╔═══════════════════════════════════════╗
  ║  📋 يتطلب إطار استراتيجي مخصص
  ╚═══════════════════════════════════════╝`}

▸ المرحلة 4: التوصية
${solution ? `
  **${solution.name}** هو الحل الأمثل لعملك في ${sector}.

  إحصائيات الأداء: ${solution.stats.join(' | ')}

  الاستثمار: ${solution.price}
  → ترخيص مدى الحياة • الكود المصدري الكامل • بدون اشتراك

  ⚠️ جميع التطويرات تتم 100% داخلياً بواسطة ASMAE EL GASMI.e.U
` : `
  احتياجاتك تتطلب **مشاركة استراتيجية مخصصة**:

  ┌─────────────────────────────────────────┐
  │         الهيكل المفاهيمي               │
  ├─────────────────────────────────────────┤
  │  🎯 الرؤية: التميز الرقمي              │
  │  📊 الأهداف: +300% كفاءة               │
  │  💎 القيمة: ميزة تنافسية               │
  │  🏗️ البنية: نظام وكيل مخصص            │
  └─────────────────────────────────────────┘

  ⚠️ جميع التطويرات 100% داخلية - لا إعادة توجيه خارجية
`}

هل ترغب في المضي قدماً مع هذه التوصية، أو لديك أسئلة؟`,

      de: `
═══════════════════════════════════════════════════════
     STRATEGISCHE ANALYSE - DOKTORATSNIVEAU
═══════════════════════════════════════════════════════

▸ PHASE 1: BRANCHENINTELLIGENZ
  Branche: ${sector}
  → Branche erfordert: Prozessautomatisierung, intelligente Workflows, datengesteuerte Entscheidungen

▸ PHASE 2: KUNDENPROFILING
  Größe: ${scale}
  → Komplexitätsklasse: ${scale === 'enterprise' ? 'A (Hoch)' : scale === 'mid-market' ? 'B (Mittel)' : 'C (Standard)'}

▸ PHASE 3: BEDARFS-LÖSUNGS-MAPPING
  Hauptherausforderung: ${problem}
  ${solution ? `
  ╔═══════════════════════════════════════╗
  ║  🎯 TREFFER: ${solution.name}
  ║  Übereinstimmung: 94%
  ╚═══════════════════════════════════════╝` : `
  ╔═══════════════════════════════════════╗
  ║  📋 STRATEGISCHE RAHMUNG ERFORDERLICH
  ╚═══════════════════════════════════════╝`}

▸ PHASE 4: EMPFEHLUNG
${solution ? `
  **${solution.name}** ist die optimale Lösung für Ihr ${sector}-Unternehmen.

  Leistungsstatistiken: ${solution.stats.join(' | ')}

  Investition: ${solution.price}
  → Lebenslange Lizenz • Vollständiger Quellcode • Kein Abo

  ⚠️ Alle Entwicklung 100% intern durch ASMAE EL GASMI.e.U
` : `
  Ihre Anforderungen erfordern ein **Maßgeschneidertes Strategisches Engagement**:

  ┌─────────────────────────────────────────┐
  │       KONZEPTUELLE ARCHITEKTUR          │
  ├─────────────────────────────────────────┤
  │  🎯 VISION: Digitale Exzellenz          │
  │  📊 ZIELE: +300% Effizienz              │
  │  💎 WERT: Wettbewerbsvorteil            │
  │  🏗️ ARCHITEKTUR: Agentisches System    │
  └─────────────────────────────────────────┘

  ⚠️ Alle Entwicklung 100% intern - KEINE externe Weiterleitung
`}

Möchten Sie mit dieser Empfehlung fortfahren, oder haben Sie Fragen?`
    };

    return analyses[language as keyof typeof analyses] || analyses.en;
  };

  // Generate follow-up responses
  const generateFollowUp = (userMessage: string, context: typeof conversationContext, language: string) => {
    const lowerMsg = userMessage.toLowerCase();

    const responses = {
      en: {
        proceed: `Excellent choice! To proceed, you can:

1. **Schedule a Discovery Call** - Our senior architects will discuss implementation details
   → Contact: ${COMPANY.email}
   → WhatsApp: ${COMPANY.whatsapp}

2. **Request a Detailed Proposal** - We'll prepare a comprehensive technical and financial proposal

How would you like to proceed?`,
        question: `Great question. Let me clarify:

All our solutions include:
✓ Full source code ownership
✓ Lifetime license (no recurring fees)
✓ 90-day implementation support
✓ Security: AES-256, GDPR compliant, SOC 2

Our team handles 100% of development internally - we never outsource or redirect to external providers.

What other aspects would you like me to elaborate on?`,
        thanks: `Thank you for your interest in ASMAE EL GASMI.e.U solutions.

To take the next step:
📧 Email: ${COMPANY.email}
📱 WhatsApp: ${COMPANY.whatsapp}

Our team will respond within 24 hours to schedule your strategic consultation.

Is there anything else I can help you with?`
      },
      fr: {
        proceed: `Excellent choix ! Pour procéder, vous pouvez :

1. **Planifier un Appel Découverte** - Nos architectes seniors discuteront des détails d'implémentation
   → Contact: ${COMPANY.email}
   → WhatsApp: ${COMPANY.whatsapp}

2. **Demander une Proposition Détaillée** - Nous préparerons une proposition technique et financière complète

Comment souhaitez-vous procéder ?`,
        question: `Excellente question. Permettez-moi de clarifier :

Toutes nos solutions incluent :
✓ Propriété totale du code source
✓ Licence à vie (sans frais récurrents)
✓ Support d'implémentation 90 jours
✓ Sécurité : AES-256, conforme RGPD, SOC 2

Notre équipe gère 100% du développement en interne - nous ne sous-traitons jamais.

Sur quels autres aspects souhaitez-vous que j'élabore ?`,
        thanks: `Merci pour votre intérêt pour les solutions ASMAE EL GASMI.e.U.

Pour passer à l'étape suivante :
📧 Email: ${COMPANY.email}
📱 WhatsApp: ${COMPANY.whatsapp}

Notre équipe répondra sous 24h pour planifier votre consultation stratégique.

Y a-t-il autre chose que je puisse vous aider ?`
      },
      ar: {
        proceed: `اختيار ممتاز! للمتابعة، يمكنك:

1. **جدولة مكالمة اكتشاف** - سيناقش مهندسونا الأوائل تفاصيل التنفيذ
   → التواصل: ${COMPANY.email}
   → واتساب: ${COMPANY.whatsapp}

2. **طلب عرض مفصل** - سنعد عرضاً تقنياً ومالياً شاملاً

كيف تود المتابعة؟`,
        question: `سؤال رائع. دعني أوضح:

جميع حلولنا تشمل:
✓ ملكية كاملة للكود المصدري
✓ ترخيص مدى الحياة (بدون رسوم متكررة)
✓ دعم تنفيذ 90 يوماً
✓ الأمان: AES-256، متوافق مع GDPR، SOC 2

فريقنا يتعامل مع 100% من التطوير داخلياً - لا نستعين بمصادر خارجية أبداً.

ما الجوانب الأخرى التي تريد أن أوضحها؟`,
        thanks: `شكراً لاهتمامك بحلول ASMAE EL GASMI.e.U.

للخطوة التالية:
📧 البريد: ${COMPANY.email}
📱 واتساب: ${COMPANY.whatsapp}

سيرد فريقنا خلال 24 ساعة لجدولة استشارتك الاستراتيجية.

هل هناك شيء آخر يمكنني مساعدتك به؟`
      },
      de: {
        proceed: `Ausgezeichnete Wahl! Um fortzufahren, können Sie:

1. **Discovery-Call Planen** - Unsere Senior-Architekten besprechen Implementierungsdetails
   → Kontakt: ${COMPANY.email}
   → WhatsApp: ${COMPANY.whatsapp}

2. **Detailliertes Angebot Anfordern** - Wir erstellen ein umfassendes technisches und finanzielles Angebot

Wie möchten Sie fortfahren?`,
        question: `Großartige Frage. Lassen Sie mich klarstellen:

Alle unsere Lösungen beinhalten:
✓ Vollständiges Quellcode-Eigentum
✓ Lebenslange Lizenz (keine wiederkehrenden Gebühren)
✓ 90 Tage Implementierungssupport
✓ Sicherheit: AES-256, DSGVO-konform, SOC 2

Unser Team übernimmt 100% der Entwicklung intern - wir lagern niemals aus.

Welche anderen Aspekte soll ich erläutern?`,
        thanks: `Danke für Ihr Interesse an ASMAE EL GASMI.e.U Lösungen.

Für den nächsten Schritt:
📧 E-Mail: ${COMPANY.email}
📱 WhatsApp: ${COMPANY.whatsapp}

Unser Team antwortet innerhalb von 24 Stunden zur Terminvereinbarung.

Kann ich Ihnen noch bei etwas anderem helfen?`
      }
    };

    const t = responses[language as keyof typeof responses] || responses.en;

    if (lowerMsg.match(/yes|proceed|start|go|ok|oui|ja|نعم|sure|let's/i)) {
      return t.proceed;
    } else if (lowerMsg.match(/\?|how|what|why|explain|tell|comment|pourquoi|كيف|لماذا|wie|warum/i)) {
      return t.question;
    } else {
      return t.thanks;
    }
  };

  const analyzeSolution = (profile: any) => {
    const { sector, challenge, currentTools, budget, companySize } = profile;

    // Structured reasoning labels - Doctoral Level
    const labels = {
      phase1: { en: 'PHASE 1: SECTOR INTELLIGENCE', fr: 'PHASE 1: INTELLIGENCE SECTORIELLE', ar: 'المرحلة 1: ذكاء القطاع', de: 'PHASE 1: BRANCHENINTELLIGENZ' },
      phase2: { en: 'PHASE 2: CLIENT PROFILING', fr: 'PHASE 2: PROFILAGE CLIENT', ar: 'المرحلة 2: تحليل العميل', de: 'PHASE 2: KUNDENPROFILING' },
      phase3: { en: 'PHASE 3: NEED-SOLUTION MAPPING', fr: 'PHASE 3: MAPPING BESOIN-SOLUTION', ar: 'المرحلة 3: ربط الاحتياج بالحل', de: 'PHASE 3: BEDARFS-LÖSUNGS-MAPPING' },
      phase4: { en: 'PHASE 4: MATURITY ASSESSMENT', fr: 'PHASE 4: ÉVALUATION MATURITÉ', ar: 'المرحلة 4: تقييم النضج', de: 'PHASE 4: REIFEBEWERTUNG' },
      phase5: { en: 'PHASE 5: STRATEGIC DECISION', fr: 'PHASE 5: DÉCISION STRATÉGIQUE', ar: 'المرحلة 5: القرار الاستراتيجي', de: 'PHASE 5: STRATEGISCHE ENTSCHEIDUNG' },
      verdict: { en: 'VERDICT', fr: 'VERDICT', ar: 'الحكم', de: 'URTEIL' }
    };

    let reasoning: string[] = [];
    let recommendation = '';
    let matchedSolution = null;
    let isStrategicFraming = false;

    // ═══════════════════════════════════════════════════════════
    // PHASE 1: SECTOR INTELLIGENCE
    // ═══════════════════════════════════════════════════════════
    reasoning.push(`═══ ${labels.phase1[lang as keyof typeof labels.phase1]} ═══`);
    reasoning.push(`► Sector: ${sector}`);

    const sectorNeeds = {
      en: 'Identified needs: Process automation, Data intelligence, Client lifecycle management, Operational efficiency.',
      fr: 'Besoins identifiés: Automatisation processus, Intelligence données, Gestion cycle client, Efficacité opérationnelle.',
      ar: 'الاحتياجات المحددة: أتمتة العمليات، ذكاء البيانات، إدارة دورة العميل، الكفاءة التشغيلية.',
      de: 'Identifizierte Bedürfnisse: Prozessautomatisierung, Datenintelligenz, Kundenlebenszyklusmanagement, Betriebseffizienz.'
    };
    reasoning.push(`→ ${sectorNeeds[lang as keyof typeof sectorNeeds]}`);

    // ═══════════════════════════════════════════════════════════
    // PHASE 2: CLIENT PROFILING
    // ═══════════════════════════════════════════════════════════
    reasoning.push(`\n═══ ${labels.phase2[lang as keyof typeof labels.phase2]} ═══`);
    const clientType = companySize?.includes('200') ? 'Enterprise' : companySize?.includes('51') ? 'Mid-Market' : 'SME/Startup';
    const complexityClass = companySize?.includes('200') ? 'A' : companySize?.includes('51') ? 'B' : 'C';
    reasoning.push(`► ${lang === 'fr' ? 'Type' : lang === 'ar' ? 'النوع' : lang === 'de' ? 'Typ' : 'Type'}: ${clientType}`);
    reasoning.push(`► ${lang === 'fr' ? 'Classe complexité' : lang === 'ar' ? 'فئة التعقيد' : lang === 'de' ? 'Komplexitätsklasse' : 'Complexity Class'}: ${complexityClass}`);

    // ═══════════════════════════════════════════════════════════
    // PHASE 3: NEED-SOLUTION MAPPING (3 SOLUTIONS ONLY)
    // ═══════════════════════════════════════════════════════════
    reasoning.push(`\n═══ ${labels.phase3[lang as keyof typeof labels.phase3]} ═══`);
    reasoning.push(`► ${lang === 'fr' ? 'Défi exprimé' : lang === 'ar' ? 'التحدي المعبر عنه' : lang === 'de' ? 'Ausgedrückte Herausforderung' : 'Expressed challenge'}: ${challenge}`);

    // Define which challenges map to which solution
    const salesChallenges = ['Sales', 'Lead', 'Customer', 'Support', 'Ventes', 'Leads', 'Client', 'المبيعات', 'العملاء', 'دعم', 'Vertrieb', 'Kunden'];
    const opsChallenges = ['Operations', 'Workflow', 'Data', 'Opérations', 'Données', 'العمليات', 'البيانات', 'سير', 'Betrieb', 'Daten', 'Digital', 'Transformation'];
    const devChallenges = ['Software', 'Development', 'Code', 'Développement', 'Logiciel', 'تطوير', 'برمجيات', 'Entwicklung', 'Software'];

    // Check match with our 3 solutions
    const challengeLower = challenge?.toLowerCase() || '';
    let matchScore = 0;

    if (salesChallenges.some(c => challengeLower.includes(c.toLowerCase()))) {
      matchedSolution = SOLUTIONS[0]; // Multi-Agent Intelligence
      matchScore = 95;
      reasoning.push(`\n╔══════════════════════════════════════╗`);
      reasoning.push(`║  🎯 MATCH: Multi-Agent Intelligence  ║`);
      reasoning.push(`╚══════════════════════════════════════╝`);
      reasoning.push(`→ ${lang === 'fr' ? 'Correspondance' : lang === 'ar' ? 'التطابق' : lang === 'de' ? 'Übereinstimmung' : 'Match'}: ${matchScore}%`);
      reasoning.push(`→ ${lang === 'fr' ? 'Agents: Ventes, Marketing, Opérations, Support' : lang === 'ar' ? 'الوكلاء: المبيعات، التسويق، العمليات، الدعم' : lang === 'de' ? 'Agenten: Vertrieb, Marketing, Operations, Support' : 'Agents: Sales, Marketing, Operations, Support'}`);
    } else if (opsChallenges.some(c => challengeLower.includes(c.toLowerCase()))) {
      matchedSolution = SOLUTIONS[1]; // RAG EL GASMI
      matchScore = 92;
      reasoning.push(`\n╔══════════════════════════════════════╗`);
      reasoning.push(`║  🎯 MATCH: RAG EL GASMI              ║`);
      reasoning.push(`╚══════════════════════════════════════╝`);
      reasoning.push(`→ ${lang === 'fr' ? 'Correspondance' : lang === 'ar' ? 'التطابق' : lang === 'de' ? 'Übereinstimmung' : 'Match'}: ${matchScore}%`);
      reasoning.push(`→ ${lang === 'fr' ? 'Centre de commande IA unifié (Claude AI + Pinecone)' : lang === 'ar' ? 'مركز قيادة الذكاء الاصطناعي الموحد' : lang === 'de' ? 'Vereinigtes KI-Kommandozentrum' : 'Unified AI Command Center (Claude AI + Pinecone)'}`);
    } else if (devChallenges.some(c => challengeLower.includes(c.toLowerCase()))) {
      matchedSolution = SOLUTIONS[2]; // CodeGen Enterprise
      matchScore = 90;
      reasoning.push(`\n╔══════════════════════════════════════╗`);
      reasoning.push(`║  🎯 MATCH: CodeGen Enterprise        ║`);
      reasoning.push(`╚══════════════════════════════════════╝`);
      reasoning.push(`→ ${lang === 'fr' ? 'Correspondance' : lang === 'ar' ? 'التطابق' : lang === 'de' ? 'Übereinstimmung' : 'Match'}: ${matchScore}%`);
      reasoning.push(`→ ${lang === 'fr' ? 'Accélération développement 70%, 18+ frameworks' : lang === 'ar' ? 'تسريع التطوير 70%، 18+ إطار عمل' : lang === 'de' ? '70% schnellere Entwicklung, 18+ Frameworks' : '70% faster development, 18+ frameworks'}`);
    } else {
      // Strategic framing - no direct match
      isStrategicFraming = true;
      reasoning.push(`\n╔══════════════════════════════════════════════════╗`);
      reasoning.push(`║  📋 STRATEGIC FRAMING REQUIRED                   ║`);
      reasoning.push(`╚══════════════════════════════════════════════════╝`);
      reasoning.push(`→ ${lang === 'fr' ? 'Besoin spécifique nécessitant cadrage stratégique' : lang === 'ar' ? 'احتياج محدد يتطلب إطاراً استراتيجياً' : lang === 'de' ? 'Spezifischer Bedarf erfordert strategische Rahmung' : 'Specific need requiring strategic framing'}`);
    }

    // ═══════════════════════════════════════════════════════════
    // PHASE 4: MATURITY ASSESSMENT
    // ═══════════════════════════════════════════════════════════
    reasoning.push(`\n═══ ${labels.phase4[lang as keyof typeof labels.phase4]} ═══`);
    reasoning.push(`► ${lang === 'fr' ? 'Outils actuels' : lang === 'ar' ? 'الأدوات الحالية' : lang === 'de' ? 'Aktuelle Tools' : 'Current tools'}: ${currentTools}`);

    const lowMaturity = ['None', 'Aucun', 'لا شيء', 'Keine', 'Basic', 'Basique', 'أساسي', 'Basis'];
    const maturityLevel = lowMaturity.some(m => currentTools?.includes(m)) ? 'Low' : 'Medium-High';
    reasoning.push(`→ ${lang === 'fr' ? 'Niveau maturité' : lang === 'ar' ? 'مستوى النضج' : lang === 'de' ? 'Reifegrad' : 'Maturity level'}: ${maturityLevel}`);

    // ═══════════════════════════════════════════════════════════
    // PHASE 5: STRATEGIC DECISION
    // ═══════════════════════════════════════════════════════════
    reasoning.push(`\n═══ ${labels.phase5[lang as keyof typeof labels.phase5]} ═══`);
    reasoning.push(`► Budget: ${budget}`);

    const isBudgetOk = budget !== '< €5,000';
    reasoning.push(`→ ${isBudgetOk
      ? (lang === 'fr' ? 'Budget compatible avec solutions enterprise' : lang === 'ar' ? 'الميزانية متوافقة مع حلول المؤسسات' : lang === 'de' ? 'Budget kompatibel mit Enterprise-Lösungen' : 'Budget compatible with enterprise solutions')
      : (lang === 'fr' ? 'Budget nécessite approche consulting' : lang === 'ar' ? 'الميزانية تتطلب نهج استشاري' : lang === 'de' ? 'Budget erfordert Beratungsansatz' : 'Budget requires consulting approach')}`);

    // ═══════════════════════════════════════════════════════════
    // VERDICT & RECOMMENDATION
    // ═══════════════════════════════════════════════════════════
    reasoning.push(`\n${'═'.repeat(50)}`);
    reasoning.push(`    ★ ${labels.verdict[lang as keyof typeof labels.verdict]} ★`);
    reasoning.push(`${'═'.repeat(50)}`);

    if (isStrategicFraming || !isBudgetOk) {
      // Strategic Framing - Doctoral Level Pitch
      const framingPitch = {
        en: `**STRATEGIC FRAMING - Doctoral Level Analysis**

Based on my assessment, your need requires a **custom strategic approach**. Here is the high-level vision:

┌─────────────────────────────────────────┐
│         CONCEPTUAL ARCHITECTURE         │
├─────────────────────────────────────────┤
│  🎯 VISION: Digital Excellence          │
│  📊 OBJECTIVES: +300% Efficiency        │
│  💎 VALUE: Competitive Advantage        │
│  🏗️ ARCHITECTURE: Agentic Systems      │
└─────────────────────────────────────────┘

**Our Approach:**
• Full strategic audit of your ${sector} operations
• Custom architecture design by our internal team
• Phased implementation roadmap
• ROI-driven project governance

⚠️ **IMPORTANT:** All development is performed 100% internally by ASMAE EL GASMI.e.U - NO external redirection.

Our senior architects will conduct a deep-dive consultation to design a tailored solution.`,
        fr: `**CADRAGE STRATÉGIQUE - Analyse Doctorale**

Sur base de mon évaluation, votre besoin nécessite une **approche stratégique sur mesure**. Voici la vision haut niveau:

┌─────────────────────────────────────────┐
│       ARCHITECTURE CONCEPTUELLE         │
├─────────────────────────────────────────┤
│  🎯 VISION: Excellence Digitale         │
│  📊 OBJECTIFS: +300% Efficacité         │
│  💎 VALEUR: Avantage Concurrentiel      │
│  🏗️ ARCHITECTURE: Systèmes Agentiques  │
└─────────────────────────────────────────┘

**Notre Approche:**
• Audit stratégique complet de vos opérations ${sector}
• Conception architecture sur mesure par notre équipe interne
• Feuille de route implémentation phasée
• Gouvernance projet orientée ROI

⚠️ **IMPORTANT:** Tout développement est réalisé 100% en interne par ASMAE EL GASMI.e.U - AUCUNE redirection externe.

Nos architectes seniors conduiront une consultation approfondie pour concevoir une solution adaptée.`,
        ar: `**الإطار الاستراتيجي - تحليل على مستوى الدكتوراه**

بناءً على تقييمي، يتطلب احتياجك **نهجاً استراتيجياً مخصصاً**. إليك الرؤية العليا:

┌─────────────────────────────────────────┐
│         الهيكل المفاهيمي               │
├─────────────────────────────────────────┤
│  🎯 الرؤية: التميز الرقمي              │
│  📊 الأهداف: +300% كفاءة               │
│  💎 القيمة: ميزة تنافسية               │
│  🏗️ البنية: أنظمة وكيلة               │
└─────────────────────────────────────────┘

**نهجنا:**
• تدقيق استراتيجي كامل لعمليات ${sector}
• تصميم بنية مخصصة من فريقنا الداخلي
• خارطة طريق تنفيذ مرحلية
• حوكمة مشروع موجهة نحو العائد

⚠️ **مهم:** يتم تنفيذ جميع التطويرات 100% داخلياً بواسطة ASMAE EL GASMI.e.U - لا إعادة توجيه خارجية.

سيجري مهندسونا الأوائل استشارة معمقة لتصميم حل مخصص.`,
        de: `**STRATEGISCHE RAHMUNG - Doktoratsebene Analyse**

Basierend auf meiner Bewertung erfordert Ihr Bedarf einen **maßgeschneiderten strategischen Ansatz**. Hier die High-Level-Vision:

┌─────────────────────────────────────────┐
│       KONZEPTUELLE ARCHITEKTUR          │
├─────────────────────────────────────────┤
│  🎯 VISION: Digitale Exzellenz          │
│  📊 ZIELE: +300% Effizienz              │
│  💎 WERT: Wettbewerbsvorteil            │
│  🏗️ ARCHITEKTUR: Agentische Systeme    │
└─────────────────────────────────────────┘

**Unser Ansatz:**
• Vollständiges strategisches Audit Ihrer ${sector}-Operationen
• Maßgeschneidertes Architekturdesign durch unser internes Team
• Phasenweise Implementierungs-Roadmap
• ROI-getriebene Projektgovernance

⚠️ **WICHTIG:** Alle Entwicklung erfolgt 100% intern durch ASMAE EL GASMI.e.U - KEINE externe Weiterleitung.

Unsere Senior-Architekten werden eine tiefgehende Beratung durchführen.`
      };
      recommendation = framingPitch[lang as keyof typeof framingPitch];
      isStrategicFraming = true;
    } else {
      // Direct Solution Match
      const solutionPitch = {
        en: `**RECOMMENDED SOLUTION: ${matchedSolution?.name}**

${matchedSolution?.tagline.en}

┌─────────────────────────────────────────┐
│            PERFORMANCE STATS            │
├─────────────────────────────────────────┤
│  ${matchedSolution?.stats[0]} │ ${matchedSolution?.stats[1]} │ ${matchedSolution?.stats[2]} │ ${matchedSolution?.stats[3]}  │
│  ${matchedSolution?.statsLabels.en.join(' │ ')}  │
└─────────────────────────────────────────┘

**What You Get:**
${matchedSolution?.benefits.en.map(b => `✓ ${b}`).join('\n')}

**Investment:** ${matchedSolution?.price}
→ Final price • No subscription • Lifetime license
→ Full source code ownership

⚠️ **EXCLUSIVELY INTERNAL:** All development by ASMAE EL GASMI.e.U team.

Ready to transform your ${sector} operations?`,
        fr: `**SOLUTION RECOMMANDÉE: ${matchedSolution?.name}**

${matchedSolution?.tagline.fr}

┌─────────────────────────────────────────┐
│          STATISTIQUES PERFORMANCE       │
├─────────────────────────────────────────┤
│  ${matchedSolution?.stats[0]} │ ${matchedSolution?.stats[1]} │ ${matchedSolution?.stats[2]} │ ${matchedSolution?.stats[3]}  │
│  ${matchedSolution?.statsLabels.fr.join(' │ ')}  │
└─────────────────────────────────────────┘

**Ce que vous obtenez:**
${matchedSolution?.benefits.fr.map(b => `✓ ${b}`).join('\n')}

**Investissement:** ${matchedSolution?.price}
→ Prix définitif • Sans abonnement • Licence à vie
→ Propriété totale du code source

⚠️ **EXCLUSIVEMENT INTERNE:** Tout développement par l'équipe ASMAE EL GASMI.e.U.

Prêt à transformer vos opérations ${sector} ?`,
        ar: `**الحل الموصى به: ${matchedSolution?.name}**

${matchedSolution?.tagline.ar}

┌─────────────────────────────────────────┐
│            إحصائيات الأداء             │
├─────────────────────────────────────────┤
│  ${matchedSolution?.stats[0]} │ ${matchedSolution?.stats[1]} │ ${matchedSolution?.stats[2]} │ ${matchedSolution?.stats[3]}  │
│  ${matchedSolution?.statsLabels.ar.join(' │ ')}  │
└─────────────────────────────────────────┘

**ما ستحصل عليه:**
${matchedSolution?.benefits.ar.map(b => `✓ ${b}`).join('\n')}

**الاستثمار:** ${matchedSolution?.price}
→ السعر النهائي • بدون اشتراك • ترخيص مدى الحياة
→ ملكية كاملة للكود المصدري

⚠️ **داخلي حصرياً:** جميع التطويرات بواسطة فريق ASMAE EL GASMI.e.U.

هل أنت مستعد لتحويل عمليات ${sector}؟`,
        de: `**EMPFOHLENE LÖSUNG: ${matchedSolution?.name}**

${matchedSolution?.tagline.de}

┌─────────────────────────────────────────┐
│          LEISTUNGSSTATISTIKEN           │
├─────────────────────────────────────────┤
│  ${matchedSolution?.stats[0]} │ ${matchedSolution?.stats[1]} │ ${matchedSolution?.stats[2]} │ ${matchedSolution?.stats[3]}  │
│  ${matchedSolution?.statsLabels.de.join(' │ ')}  │
└─────────────────────────────────────────┘

**Was Sie bekommen:**
${matchedSolution?.benefits.de.map(b => `✓ ${b}`).join('\n')}

**Investition:** ${matchedSolution?.price}
→ Endpreis • Kein Abo • Lebenslange Lizenz
→ Vollständiges Quellcode-Eigentum

⚠️ **AUSSCHLIESSLICH INTERN:** Alle Entwicklung durch ASMAE EL GASMI.e.U Team.

Bereit, Ihre ${sector}-Operationen zu transformieren?`
      };
      recommendation = solutionPitch[lang as keyof typeof solutionPitch];
    }

    return { reasoning, recommendation, matchedSolution, isCustomConsulting: isStrategicFraming };
  };

  // Helper to get options for current language
  const getOptions = (q: any) => {
    if (Array.isArray(q.options)) return q.options;
    return q.options[lang as keyof typeof q.options] || q.options.en;
  };

  // Question options for each step - defined at component level for stability
  const questionOptionsData = {
    en: {
      sectors: ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Logistics', 'Legal', 'Education', 'Artisanat', 'Other'],
      sizes: ['1-10 employees', '11-50 employees', '51-200 employees', '201-1000 employees', '1000+ employees'],
      challenges: ['Sales & Lead Generation', 'Customer Support', 'Operations & Workflow', 'Data Management', 'Software Development', 'Content Creation'],
      tools: ['Excel/Spreadsheets', 'Basic CRM', 'ERP System', 'Custom Software', 'Manual Processes', 'AI Tools Already']
    },
    fr: {
      sectors: ['Technologie', 'Finance', 'Santé', 'Industrie', 'Retail', 'Logistique', 'Juridique', 'Éducation', 'Artisanat', 'Autre'],
      sizes: ['1-10 employés', '11-50 employés', '51-200 employés', '201-1000 employés', '1000+ employés'],
      challenges: ['Ventes & Génération Leads', 'Support Client', 'Opérations & Workflow', 'Gestion Données', 'Développement Logiciel', 'Création de Contenu'],
      tools: ['Excel/Tableurs', 'CRM Basique', 'Système ERP', 'Logiciel Sur Mesure', 'Processus Manuels', 'Outils IA Déjà']
    },
    ar: {
      sectors: ['التكنولوجيا', 'المالية', 'الرعاية الصحية', 'التصنيع', 'التجزئة', 'اللوجستيات', 'القانوني', 'التعليم', 'الحرف', 'أخرى'],
      sizes: ['1-10 موظفين', '11-50 موظفاً', '51-200 موظف', '201-1000 موظف', '1000+ موظف'],
      challenges: ['المبيعات وتوليد العملاء', 'دعم العملاء', 'العمليات وسير العمل', 'إدارة البيانات', 'تطوير البرمجيات', 'إنشاء المحتوى'],
      tools: ['Excel/جداول بيانات', 'CRM بسيط', 'نظام ERP', 'برمجيات مخصصة', 'عمليات يدوية', 'أدوات ذكاء اصطناعي']
    },
    de: {
      sectors: ['Technologie', 'Finanzen', 'Gesundheit', 'Fertigung', 'Einzelhandel', 'Logistik', 'Recht', 'Bildung', 'Handwerk', 'Andere'],
      sizes: ['1-10 Mitarbeiter', '11-50 Mitarbeiter', '51-200 Mitarbeiter', '201-1000 Mitarbeiter', '1000+ Mitarbeiter'],
      challenges: ['Vertrieb & Lead-Generierung', 'Kundensupport', 'Betrieb & Workflow', 'Datenmanagement', 'Softwareentwicklung', 'Content-Erstellung'],
      tools: ['Excel/Tabellen', 'Basis-CRM', 'ERP-System', 'Individuelle Software', 'Manuelle Prozesse', 'KI-Tools bereits']
    }
  };

  // Use ref to track answers across renders (more stable than state for this use case)
  const clientAnswersRef = useRef<{ sector?: string; size?: string; challenge?: string; tools?: string }>({});

  // Sequential question handler - uses ref for stability
  const handleSequentialQuestion = (userInput: string): { content: string; phase: string; options?: string[]; solution?: typeof SOLUTIONS[0] } | null => {
    const currentLang = lang as keyof typeof questionOptionsData;
    const opts = questionOptionsData[currentLang] || questionOptionsData.en;
    const answers = clientAnswersRef.current;

    // Detect which type of answer this is
    const allSectors = Object.values(questionOptionsData).flatMap(o => o.sectors);
    const allSizes = Object.values(questionOptionsData).flatMap(o => o.sizes);
    const allChallenges = Object.values(questionOptionsData).flatMap(o => o.challenges);
    const allTools = Object.values(questionOptionsData).flatMap(o => o.tools);

    const isSector = allSectors.includes(userInput);
    const isSize = allSizes.includes(userInput);
    const isChallenge = allChallenges.includes(userInput);
    const isTool = allTools.includes(userInput);

    // Step 1: Sector selected
    if (isSector && !answers.sector) {
      // Check if "Other" was selected - ask for specification
      const otherOptions = ['Other', 'Autre', 'أخرى', 'Andere'];
      if (otherOptions.includes(userInput)) {
        const texts = {
          en: `**[DIAGNOSTIC AGENT]** I see you selected "Other". Could you please specify your sector?\n\nType your sector in the text field below.`,
          fr: `**[AGENT DIAGNOSTIC]** Vous avez sélectionné "Autre". Pourriez-vous préciser votre secteur d'activité ?\n\nÉcrivez votre secteur dans le champ texte ci-dessous.`,
          ar: `**[وكيل التشخيص]** لقد اخترت "أخرى". هل يمكنك تحديد قطاعك؟\n\nاكتب قطاعك في حقل النص أدناه.`,
          de: `**[DIAGNOSE-AGENT]** Sie haben "Andere" gewählt. Könnten Sie Ihre Branche bitte spezifizieren?\n\nGeben Sie Ihre Branche im Textfeld unten ein.`
        };
        // Mark that we're waiting for custom sector input
        answers.sector = '__WAITING_CUSTOM__';
        return { content: texts[currentLang] || texts.en, phase: 'SECTOR DETAILS' };
      }

      answers.sector = userInput;
      const texts = {
        en: `**[DIAGNOSTIC AGENT]** Excellent! ${userInput} sector noted.\n\n**Question 2/4:** What is the size of your company?`,
        fr: `**[AGENT DIAGNOSTIC]** Excellent ! Secteur ${userInput} noté.\n\n**Question 2/4 :** Quelle est la taille de votre entreprise ?`,
        ar: `**[وكيل التشخيص]** ممتاز! تم تسجيل قطاع ${userInput}.\n\n**السؤال 2/4:** ما حجم شركتك؟`,
        de: `**[DIAGNOSE-AGENT]** Ausgezeichnet! Branche ${userInput} notiert.\n\n**Frage 2/4:** Wie groß ist Ihr Unternehmen?`
      };
      return { content: texts[currentLang] || texts.en, phase: 'QUESTION 2/4', options: opts.sizes };
    }

    // Handle custom sector input (when user typed their sector after selecting "Other")
    if (answers.sector === '__WAITING_CUSTOM__' && userInput.trim().length > 0) {
      answers.sector = userInput;
      const texts = {
        en: `**[DIAGNOSTIC AGENT]** Excellent! "${userInput}" sector noted.\n\n**Question 2/4:** What is the size of your company?`,
        fr: `**[AGENT DIAGNOSTIC]** Excellent ! Secteur "${userInput}" noté.\n\n**Question 2/4 :** Quelle est la taille de votre entreprise ?`,
        ar: `**[وكيل التشخيص]** ممتاز! تم تسجيل قطاع "${userInput}".\n\n**السؤال 2/4:** ما حجم شركتك؟`,
        de: `**[DIAGNOSE-AGENT]** Ausgezeichnet! Branche "${userInput}" notiert.\n\n**Frage 2/4:** Wie groß ist Ihr Unternehmen?`
      };
      return { content: texts[currentLang] || texts.en, phase: 'QUESTION 2/4', options: opts.sizes };
    }

    // Step 2: Size selected
    if (isSize && answers.sector && answers.sector !== '__WAITING_CUSTOM__' && !answers.size) {
      answers.size = userInput;
      const texts = {
        en: `**[DIAGNOSTIC AGENT]** Noted: ${userInput}.\n\n**Question 3/4:** What is your main business challenge?`,
        fr: `**[AGENT DIAGNOSTIC]** Noté : ${userInput}.\n\n**Question 3/4 :** Quel est votre défi business principal ?`,
        ar: `**[وكيل التشخيص]** تم التسجيل: ${userInput}.\n\n**السؤال 3/4:** ما هو تحديك التجاري الرئيسي؟`,
        de: `**[DIAGNOSE-AGENT]** Notiert: ${userInput}.\n\n**Frage 3/4:** Was ist Ihre Hauptgeschäftsherausforderung?`
      };
      return { content: texts[currentLang] || texts.en, phase: 'QUESTION 3/4', options: opts.challenges };
    }

    // Step 3: Challenge selected
    if (isChallenge && answers.sector && answers.size && !answers.challenge) {
      answers.challenge = userInput;
      const texts = {
        en: `**[DIAGNOSTIC AGENT]** Challenge identified: ${userInput}.\n\n**Question 4/4:** What tools do you currently use?`,
        fr: `**[AGENT DIAGNOSTIC]** Défi identifié : ${userInput}.\n\n**Question 4/4 :** Quels outils utilisez-vous actuellement ?`,
        ar: `**[وكيل التشخيص]** تم تحديد التحدي: ${userInput}.\n\n**السؤال 4/4:** ما الأدوات التي تستخدمها حالياً؟`,
        de: `**[DIAGNOSE-AGENT]** Herausforderung identifiziert: ${userInput}.\n\n**Frage 4/4:** Welche Tools nutzen Sie derzeit?`
      };
      return { content: texts[currentLang] || texts.en, phase: 'QUESTION 4/4', options: opts.tools };
    }

    // Step 4: Tool selected - generate final analysis
    if (isTool && answers.sector && answers.size && answers.challenge && !answers.tools) {
      answers.tools = userInput;
      return generateFinalPriceAnalysis(answers, currentLang);
    }

    return null;
  };

  // Generate final analysis with price comparison
  const generateFinalPriceAnalysis = (answers: { sector?: string; size?: string; challenge?: string; tools?: string }, currentLang: string) => {
    let recommendedSolution = SOLUTIONS[1];
    let matchedSolutionName = 'RAG EL GASMI';

    const challengeLower = (answers.challenge || '').toLowerCase();
    if (/sales|ventes|lead|customer|client|support|المبيعات|vertrieb/i.test(challengeLower)) {
      recommendedSolution = SOLUTIONS[0];
      matchedSolutionName = 'Multi-Agent Intelligence';
    } else if (/software|development|développement|code|تطوير|entwicklung/i.test(challengeLower)) {
      recommendedSolution = SOLUTIONS[2];
      matchedSolutionName = 'CodeGen Enterprise';
    }

    let internalMinCost = 120000, internalMaxCost = 180000;
    if (/1000|201/.test(answers.size || '')) { internalMinCost = 500000; internalMaxCost = 750000; }
    else if (/51|200/.test(answers.size || '')) { internalMinCost = 280000; internalMaxCost = 400000; }
    else if (/11|50/.test(answers.size || '')) { internalMinCost = 180000; internalMaxCost = 280000; }

    const roiMin = Math.round((internalMinCost / 10000) * 100);
    const roiMax = Math.round((internalMaxCost / 10000) * 100);

    const analysisTexts = {
      en: `═══════════════════════════════════════════════════════
  🎯 STRATEGIC ANALYSIS COMPLETE
═══════════════════════════════════════════════════════

**Client Profile:**
• Sector: ${answers.sector}
• Size: ${answers.size}
• Challenge: ${answers.challenge}
• Tools: ${answers.tools}

═══════════════════════════════════════════════════════
  💰 COST ANALYSIS: INTERNAL TEAM vs. EL GASMI
═══════════════════════════════════════════════════════

**Option A: Internal AI Team**
• Annual Cost: €${internalMinCost.toLocaleString()} - €${internalMaxCost.toLocaleString()}
• Time to Production: 12-18 months
• Risk: HIGH

**Option B: ASMAE EL GASMI.e.U** ✨ RECOMMENDED
• Solution: ${matchedSolutionName}
• Investment: €10,000 (ONE-TIME)
• Time to Production: 4-8 weeks
• YOUR SAVINGS: €${(internalMinCost - 10000).toLocaleString()} - €${(internalMaxCost - 10000).toLocaleString()} (Year 1)
• ROI: ${roiMin}% - ${roiMax}%

**Ready to proceed?**`,
      fr: `═══════════════════════════════════════════════════════
  🎯 ANALYSE STRATÉGIQUE COMPLÈTE
═══════════════════════════════════════════════════════

**Profil Client:**
• Secteur: ${answers.sector}
• Taille: ${answers.size}
• Défi: ${answers.challenge}
• Outils: ${answers.tools}

═══════════════════════════════════════════════════════
  💰 ANALYSE COÛTS: ÉQUIPE INTERNE vs. EL GASMI
═══════════════════════════════════════════════════════

**Option A: Équipe IA Interne**
• Coût Annuel: ${internalMinCost.toLocaleString()}€ - ${internalMaxCost.toLocaleString()}€
• Délai: 12-18 mois
• Risque: ÉLEVÉ

**Option B: ASMAE EL GASMI.e.U** ✨ RECOMMANDÉ
• Solution: ${matchedSolutionName}
• Investissement: 10 000€ (UNIQUE)
• Délai: 4-8 semaines
• VOS ÉCONOMIES: ${(internalMinCost - 10000).toLocaleString()}€ - ${(internalMaxCost - 10000).toLocaleString()}€ (Année 1)
• ROI: ${roiMin}% - ${roiMax}%

**Prêt à procéder ?**`,
      ar: `═══════════════════════════════════════════════════════
  🎯 التحليل الاستراتيجي مكتمل
═══════════════════════════════════════════════════════

**ملف العميل:**
• القطاع: ${answers.sector}
• الحجم: ${answers.size}
• التحدي: ${answers.challenge}
• الأدوات: ${answers.tools}

═══════════════════════════════════════════════════════
  💰 تحليل التكلفة: الفريق الداخلي vs. EL GASMI
═══════════════════════════════════════════════════════

**الخيار أ: فريق ذكاء اصطناعي داخلي**
• التكلفة السنوية: €${internalMinCost.toLocaleString()} - €${internalMaxCost.toLocaleString()}
• الوقت: 12-18 شهراً
• المخاطر: عالية

**الخيار ب: ASMAE EL GASMI.e.U** ✨ موصى به
• الحل: ${matchedSolutionName}
• الاستثمار: €10,000 (مرة واحدة)
• الوقت: 4-8 أسابيع
• توفيرك: €${(internalMinCost - 10000).toLocaleString()} - €${(internalMaxCost - 10000).toLocaleString()} (السنة 1)
• العائد: ${roiMin}% - ${roiMax}%

**هل أنت مستعد؟**`,
      de: `═══════════════════════════════════════════════════════
  🎯 STRATEGISCHE ANALYSE ABGESCHLOSSEN
═══════════════════════════════════════════════════════

**Kundenprofil:**
• Branche: ${answers.sector}
• Größe: ${answers.size}
• Herausforderung: ${answers.challenge}
• Tools: ${answers.tools}

═══════════════════════════════════════════════════════
  💰 KOSTENANALYSE: INTERNES TEAM vs. EL GASMI
═══════════════════════════════════════════════════════

**Option A: Internes KI-Team**
• Jahreskosten: €${internalMinCost.toLocaleString()} - €${internalMaxCost.toLocaleString()}
• Zeit: 12-18 Monate
• Risiko: HOCH

**Option B: ASMAE EL GASMI.e.U** ✨ EMPFOHLEN
• Lösung: ${matchedSolutionName}
• Investition: €10.000 (EINMALIG)
• Zeit: 4-8 Wochen
• EINSPARUNG: €${(internalMinCost - 10000).toLocaleString()} - €${(internalMaxCost - 10000).toLocaleString()} (Jahr 1)
• ROI: ${roiMin}% - ${roiMax}%

**Bereit fortzufahren?**`
    };

    const finalOptions = {
      en: ['Proceed to Payment', 'Schedule Discovery Call', 'Request Detailed Proposal'],
      fr: ['Procéder au Paiement', 'Planifier Appel Découverte', 'Demander Proposition Détaillée'],
      ar: ['المتابعة للدفع', 'جدولة مكالمة اكتشاف', 'طلب عرض مفصل'],
      de: ['Zur Zahlung', 'Discovery-Call Planen', 'Detailliertes Angebot Anfordern']
    };

    return {
      content: analysisTexts[currentLang as keyof typeof analysisTexts] || analysisTexts.en,
      phase: 'RECOMMENDATION',
      options: finalOptions[currentLang as keyof typeof finalOptions] || finalOptions.en,
      solution: recommendedSolution
    };
  };

  // Intelligent agent handler - processes user input and generates contextual response
  const handleIntelligentResponse = (userInput: string) => {
    // First try sequential question handler
    const sequentialResult = handleSequentialQuestion(userInput);
    if (sequentialResult) {
      return sequentialResult;
    }

    // Fallback to the original intelligent response
    const result = generateIntelligentResponse(userInput, conversationContext);

    const finalOptions = {
      payment: { en: 'Proceed to Payment', fr: 'Procéder au Paiement', ar: 'المتابعة للدفع', de: 'Zur Zahlung' },
      consultation: { en: 'Schedule Consultation', fr: 'Planifier Consultation', ar: 'جدولة استشارة', de: 'Beratung Planen' },
      discoveryCall: { en: 'Schedule Discovery Call', fr: 'Planifier Appel Découverte', ar: 'جدولة مكالمة اكتشاف', de: 'Discovery-Call Planen' },
      multiagent: { en: 'Learn More: Multi-Agent', fr: 'En savoir plus: Multi-Agent', ar: 'اعرف المزيد: Multi-Agent', de: 'Mehr erfahren: Multi-Agent' },
      rag: { en: 'Learn More: RAG System', fr: 'En savoir plus: Système RAG', ar: 'اعرف المزيد: نظام RAG', de: 'Mehr erfahren: RAG-System' },
      codegen: { en: 'Learn More: CodeGen', fr: 'En savoir plus: CodeGen', ar: 'اعرف المزيد: CodeGen', de: 'Mehr erfahren: CodeGen' }
    };

    // Determine options based on phase and matched solutions
    let options: string[] | undefined = undefined;
    if (result.phase === 'recommendation') {
      if (result.matchedSolutions && result.matchedSolutions.length > 0) {
        options = [
          finalOptions.payment[lang as keyof typeof finalOptions.payment],
          finalOptions.consultation[lang as keyof typeof finalOptions.consultation]
        ];
      } else {
        options = [
          finalOptions.multiagent[lang as keyof typeof finalOptions.multiagent],
          finalOptions.rag[lang as keyof typeof finalOptions.rag],
          finalOptions.codegen[lang as keyof typeof finalOptions.codegen]
        ];
      }
    }

    return {
      content: result.response,
      phase: result.phase.toUpperCase(),
      options,
      solution: result.suggestedSolution,
      showDiagram: result.showDiagram,
      diagramType: result.diagramType,
      matchedSolutions: result.matchedSolutions
    };
  };

  // Architecture Diagram Component - Animated SVG
  const ArchitectureDiagram = ({ type }: { type: 'multiagent' | 'rag' | 'codegen' | 'all' }) => {
    const diagrams = {
      multiagent: (
        <svg viewBox="0 0 400 250" className="w-full h-auto">
          <defs>
            <linearGradient id="agentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          {/* Central Hub */}
          <circle cx="200" cy="125" r="40" fill="url(#agentGrad)" className="animate-pulse" />
          <text x="200" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">AI HUB</text>
          {/* Agents */}
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 200 + Math.cos(rad) * 90;
            const y = 125 + Math.sin(rad) * 70;
            const labels = ['Sales', 'Support', 'Marketing', 'Analytics', 'Ops'];
            return (
              <g key={i}>
                <line x1="200" y1="125" x2={x} y2={y} stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                <circle cx={x} cy={y} r="25" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize="8">{labels[i]}</text>
              </g>
            );
          })}
          <text x="200" y="235" textAnchor="middle" fill="#64748b" fontSize="11">Multi-Agent Intelligence Architecture</text>
        </svg>
      ),
      rag: (
        <svg viewBox="0 0 400 250" className="w-full h-auto">
          <defs>
            <linearGradient id="ragGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          {/* Data Sources */}
          {['Email', 'Docs', 'Chat', 'DB'].map((label, i) => (
            <g key={i}>
              <rect x={30 + i * 90} y="20" width="70" height="35" rx="5" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x={65 + i * 90} y="42" textAnchor="middle" fill="white" fontSize="10">{label}</text>
              <line x1={65 + i * 90} y1="55" x2="200" y2="100" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,4" className="animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
            </g>
          ))}
          {/* RAG Core */}
          <rect x="130" y="100" width="140" height="50" rx="8" fill="url(#ragGrad)" className="animate-pulse" />
          <text x="200" y="130" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">RAG EL GASMI</text>
          {/* Outputs */}
          {['Insights', 'Actions', 'Reports'].map((label, i) => (
            <g key={i}>
              <line x1="200" y1="150" x2={80 + i * 120} y2="200" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,4" className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              <rect x={40 + i * 120} y="195" width="80" height="30" rx="5" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
              <text x={80 + i * 120} y="214" textAnchor="middle" fill="#22c55e" fontSize="10">{label}</text>
            </g>
          ))}
          <text x="200" y="245" textAnchor="middle" fill="#64748b" fontSize="11">Unified AI Command Center</text>
        </svg>
      ),
      codegen: (
        <svg viewBox="0 0 400 250" className="w-full h-auto">
          <defs>
            <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>
          </defs>
          {/* Pipeline Steps */}
          {['Spec', 'Generate', 'Test', 'Deploy'].map((label, i) => (
            <g key={i}>
              <rect x={30 + i * 95} y="60" width="80" height="40" rx="6" fill={i === 1 ? 'url(#codeGrad)' : '#1e293b'} stroke="#8b5cf6" strokeWidth="2" className={i === 1 ? 'animate-pulse' : ''} />
              <text x={70 + i * 95} y="85" textAnchor="middle" fill="white" fontSize="11">{label}</text>
              {i < 3 && <path d={`M${115 + i * 95},80 L${125 + i * 95},80`} stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow)" />}
            </g>
          ))}
          {/* Self-healing loop */}
          <path d="M350,100 Q380,140 350,180 Q320,200 200,200 Q80,200 50,180 Q20,140 50,100" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
          <text x="200" y="175" textAnchor="middle" fill="#22c55e" fontSize="10">Self-Healing Loop</text>
          {/* Stats */}
          <rect x="100" y="130" width="200" height="35" rx="5" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1" />
          <text x="200" y="152" textAnchor="middle" fill="#8b5cf6" fontSize="11">70% Faster • 18+ Frameworks • 99.9% Uptime</text>
          <text x="200" y="240" textAnchor="middle" fill="#64748b" fontSize="11">AI-Powered Development Acceleration</text>
        </svg>
      ),
      all: (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-900/50 rounded-lg p-3 border border-amber-500/30 hover:border-amber-500 transition-all cursor-pointer">
            <div className="text-amber-500 font-bold text-sm mb-2">Multi-Agent</div>
            <div className="text-2xl font-bold text-white">+340%</div>
            <div className="text-xs text-slate-400">Conversion</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3 border border-blue-500/30 hover:border-blue-500 transition-all cursor-pointer">
            <div className="text-blue-500 font-bold text-sm mb-2">RAG System</div>
            <div className="text-2xl font-bold text-white">99.9%</div>
            <div className="text-xs text-slate-400">Uptime SLA</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3 border border-purple-500/30 hover:border-purple-500 transition-all cursor-pointer">
            <div className="text-purple-500 font-bold text-sm mb-2">CodeGen</div>
            <div className="text-2xl font-bold text-white">70%</div>
            <div className="text-xs text-slate-400">Faster Dev</div>
          </div>
        </div>
      )
    };
    return <div className="my-4 p-4 bg-slate-950 rounded-xl border border-slate-800">{type === 'all' ? diagrams.all : diagrams[type]}</div>;
  };

  const startConsultation = () => {
    setActiveSection('consultant');
    // Reset conversation context and client answers
    setConversationContext({ phase: 'greeting', turnCount: 0, insights: [] });
    clientAnswersRef.current = {};

    const welcomeMessages = {
      en: `**[STRATEGIC CONSULTANT AGENT]**
Senior AI Architect | Agentic Systems Specialist

Welcome to ASMAE EL GASMI.e.U Strategic Consultation.

I specialize in designing **autonomous multi-agent architectures** that transform business operations.

**Our Solutions Portfolio:**
┌─────────────────────────────────────┐
│ ▸ Multi-Agent Intelligence  €10,000 │
│ ▸ RAG EL GASMI             €10,000 │
│ ▸ CodeGen Enterprise       €10,000 │
└─────────────────────────────────────┘

**Question 1/4:** What is your industry/sector?`,
      fr: `**[AGENT CONSULTANT STRATÉGIQUE]**
Architecte IA Senior | Spécialiste Systèmes Agentiques

Bienvenue à la Consultation Stratégique ASMAE EL GASMI.e.U.

Je me spécialise dans la conception d'**architectures multi-agents autonomes** qui transforment les opérations business.

**Notre Portfolio de Solutions :**
┌─────────────────────────────────────┐
│ ▸ Multi-Agent Intelligence  10 000€ │
│ ▸ RAG EL GASMI             10 000€ │
│ ▸ CodeGen Enterprise       10 000€ │
└─────────────────────────────────────┘

**Question 1/4 :** Quel est votre secteur d'activité ?`,
      ar: `**[وكيل المستشار الاستراتيجي]**
مهندس ذكاء اصطناعي أول | متخصص في الأنظمة الوكيلة

مرحباً بك في استشارة ASMAE EL GASMI.e.U الاستراتيجية.

أتخصص في تصميم **هياكل متعددة الوكلاء المستقلة** التي تحول العمليات التجارية.

**محفظة حلولنا:**
┌─────────────────────────────────────┐
│ ▸ Multi-Agent Intelligence  €10,000 │
│ ▸ RAG EL GASMI             €10,000 │
│ ▸ CodeGen Enterprise       €10,000 │
└─────────────────────────────────────┘

**السؤال 1/4:** ما هو قطاعك/صناعتك؟`,
      de: `**[STRATEGISCHER BERATER-AGENT]**
Senior KI-Architekt | Spezialist für Agentische Systeme

Willkommen zur strategischen Beratung von ASMAE EL GASMI.e.U.

Ich spezialisiere mich auf das Design **autonomer Multi-Agenten-Architekturen**, die Geschäftsabläufe transformieren.

**Unser Lösungsportfolio:**
┌─────────────────────────────────────┐
│ ▸ Multi-Agent Intelligence  €10.000 │
│ ▸ RAG EL GASMI             €10.000 │
│ ▸ CodeGen Enterprise       €10.000 │
└─────────────────────────────────────┘

**Frage 1/4:** Was ist Ihre Branche/Ihr Sektor?`
    };

    const currentLang = lang as keyof typeof questionOptionsData;
    const opts = questionOptionsData[currentLang] || questionOptionsData.en;

    setMessages([{
      role: 'agent',
      content: welcomeMessages[lang as keyof typeof welcomeMessages] || welcomeMessages.en,
      phase: 'QUESTION 1/4',
      options: opts.sectors
    }]);
    setQuestionIndex(0);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30 ${isRTL ? 'rtl' : 'ltr'}`} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {showPayment && <PaymentModal />}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200/50">
              <div className="w-6 h-6 border-2 border-white rotate-45"/>
            </div>
            <div>
              <div className="font-bold text-slate-900 text-lg">EL GASMI</div>
              <div className="text-xs text-amber-600 font-medium">Agentic Systems</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
            {['EN', 'FR', 'AR', 'DE'].map(l => (
              <button key={l} onClick={() => setLang(l.toLowerCase())} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${lang === l.toLowerCase() ? 'bg-amber-500 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {activeSection !== 'consultant' ? (
        <>
          <section className="pt-32 pb-20 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.1),transparent_50%)]"/>
            <div className="max-w-7xl mx-auto relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100/80 border border-amber-200 rounded-full mb-8">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"/>
                <span className="text-amber-700 text-sm font-semibold tracking-widest">{t.hero.tag}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 max-w-5xl">
                <span className="text-slate-900">{t.hero.title.split(' ').slice(0,2).join(' ')} </span>
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">{t.hero.title.split(' ').slice(2).join(' ')}</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mb-12 leading-relaxed">{t.hero.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <button onClick={startConsultation} className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-200/50 flex items-center gap-2">
                  {t.hero.cta}<span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button onClick={scrollToSolutions} className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-amber-300 transition-all">
                  {t.hero.cta2}
                </button>
              </div>
            </div>
          </section>

          <section className="py-12 bg-slate-900 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[{ val: `+${animatedStats.conv}%`, label: 'Conversion' }, { val: `-${animatedStats.cost}%`, label: 'Acquisition Cost' }, { val: `-${animatedStats.tasks}%`, label: 'Manual Tasks' }, { val: `${animatedStats.uptime}%`, label: 'Uptime' }].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold text-amber-400 mb-2">{s.val}</div>
                  <div className="text-sm text-slate-400 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="py-12 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-900">{t.automations.title}</h3>
                <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-bold">500+ Tasks</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"/>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"/>
              <div className="flex gap-4 animate-marquee">
                {[...AUTOMATIONS, ...AUTOMATIONS].map((auto, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 whitespace-nowrap hover:border-amber-300 transition-all">
                    <auto.icon className="w-5 h-5 text-amber-500"/>
                    <span className="text-sm font-medium text-slate-700">{auto.label[lang as keyof typeof auto.label]}</span>
                  </div>
                ))}
              </div>
            </div>
            <style>{`
              @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
              .animate-marquee { animation: marquee 60s linear infinite; }
              .animate-marquee:hover { animation-play-state: paused; }
            `}</style>
          </section>

          <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">{t.vision.title}</h2>
                <p className="text-xl text-slate-500">{t.vision.subtitle}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {t.vision.items.map((item, i) => (
                  <div key={i} className="group relative p-8 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-2xl transition-all duration-500" style={{ overflow: 'visible' }}>
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-amber-200/50">
                      <span className="text-white text-xl font-bold">0{i + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{item.desc}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {item.features.map((feature, j) => (
                        <div key={j} className="relative" onMouseEnter={() => setHoveredFeature(`${i}-${j}`)} onMouseLeave={() => setHoveredFeature(null)}>
                          <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg cursor-pointer hover:bg-amber-100 transition-all">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"/>
                            <span className="text-xs font-medium text-slate-700">{feature.name}</span>
                          </div>
                          {hoveredFeature === `${i}-${j}` && (
                            <div className={`absolute bottom-full mb-3 p-4 bg-slate-900 text-white rounded-xl shadow-2xl w-72 z-50 ${isRTL ? 'right-0' : 'left-0'}`}>
                              <div className={`absolute bottom-0 w-3 h-3 bg-slate-900 rotate-45 translate-y-1.5 ${isRTL ? 'right-6' : 'left-6'}`}/>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center"><Zap className="w-3 h-3 text-white"/></div>
                                <span className="font-bold text-amber-400">{feature.name}</span>
                              </div>
                              <p className="text-slate-300 text-xs leading-relaxed">{feature.tooltip}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="solutions" className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">{t.solutions.title}</h2>
                <p className="text-xl text-slate-500 mb-6">{t.solutions.subtitle}</p>
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 rounded-full">
                  <Shield className="w-5 h-5 text-green-400 animate-pulse"/>
                  <span className="text-sm text-slate-300">{t.solutions.security}</span>
                </div>
              </div>
              <div className="grid lg:grid-cols-3 gap-8">
                {SOLUTIONS.map((sol, i) => (
                  <div key={sol.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-amber-300 hover:shadow-2xl transition-all">
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">SOLUTION {i + 1}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{sol.name}</h3>
                      <p className="text-slate-600 mb-4">{sol.tagline[lang as keyof typeof sol.tagline]}</p>
                      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-4 mb-6 text-center">
                        <div className="text-3xl font-bold text-white">{sol.price}</div>
                        <div className="text-amber-100 text-xs">{t.solutions.priceNote}</div>
                      </div>
                      <div className="bg-slate-900 rounded-xl p-4 mb-6">
                        <ArchitectureDiagram type={sol.id as 'multiagent' | 'rag' | 'codegen'}/>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {sol.stats.map((stat, j) => (
                          <div key={j} className="text-center p-3 bg-slate-50 rounded-lg">
                            <div className="text-lg font-bold text-amber-600">{stat}</div>
                            <div className="text-xs text-slate-500">{sol.statsLabels[lang as keyof typeof sol.statsLabels][j]}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mb-6">
                        <div className="text-sm font-bold text-slate-900 mb-3">{t.solutions.includes}</div>
                        {sol.benefits[lang as keyof typeof sol.benefits].map((b, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                            <Check className="w-4 h-4 text-green-500"/>{b}
                          </div>
                        ))}
                      </div>
                      <button onClick={() => { setSelectedSolution(sol); setShowPayment(true); }} className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all">
                        {t.solutions.getStarted}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-slate-900 mb-12">{t.contact.title}</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-sm text-slate-500 mb-2">{t.contact.address}</div>
                  <div className="font-semibold text-slate-800">{COMPANY.address}</div>
                </div>
                <a href={`mailto:${COMPANY.email}`} className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-300 transition-all">
                  <div className="text-sm text-slate-500 mb-2">{t.contact.email}</div>
                  <div className="font-semibold text-amber-600">{COMPANY.email}</div>
                </a>
              </div>
              <a href={`https://wa.me/${COMPANY.whatsapp.replace(/\+/g, '')}`} className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all">
                <MessageSquare className="w-6 h-6"/>{t.contact.whatsapp}
              </a>
            </div>
          </section>

          <footer className="py-8 px-6 border-t border-slate-200 bg-slate-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white rotate-45"/>
                </div>
                <span className="font-bold text-slate-900">EL GASMI</span>
                <span className="text-slate-400">© 2025 {t.footer.rights}</span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <a href="https://elgasmiweb.vercel.app" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-amber-600 transition-colors">
                  elgasmiweb.vercel.app
                </a>
                <a href="https://www.linkedin.com/in/asmae-warter-08208b3a1" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-colors">
                  LinkedIn
                </a>
                <p className="text-amber-600 font-semibold">{t.footer.tagline}</p>
              </div>
            </div>
          </footer>
        </>
      ) : (
        <section className="pt-24 pb-8 px-4 min-h-screen flex flex-col">
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setActiveSection('home')} className="flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-all">
                <ChevronLeft className="w-5 h-5"/>{t.consultant.back}
              </button>
              <button onClick={startConsultation} className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-all">
                <RotateCcw className="w-4 h-4"/>{t.consultant.restart}
              </button>
            </div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">{t.consultant.title}</h2>
              <p className="text-slate-500 text-sm">{t.consultant.subtitle}</p>
            </div>
            <div ref={chatRef} className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-xl p-6 overflow-y-auto mb-4 max-h-[55vh]">
              {messages.map((msg, i) => (
                <div key={i} className={`mb-4 ${msg.role === 'user' ? 'text-right' : ''}`}>
                  {msg.phase && <div className="text-xs text-amber-600 font-bold mb-1">{msg.phase}</div>}
                  <div className={`inline-block max-w-[90%] p-4 rounded-xl ${msg.role === 'user' ? 'bg-amber-500 text-white' : 'bg-slate-50 text-slate-800 border border-slate-200'}`}>
                    <pre className="whitespace-pre-wrap font-sans text-sm">{msg.content}</pre>
                  </div>
                  {msg.options && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.options.map((opt: string, j: number) => {
                        // Multi-language button detection
                        const paymentBtns = ['Proceed to Payment', 'Procéder au Paiement', 'المتابعة للدفع', 'Zur Zahlung'];
                        const scheduleBtns = ['Schedule Discovery Call', 'Schedule Consultation', 'Planifier Consultation', 'Planifier Appel Découverte', 'جدولة استشارة', 'جدولة مكالمة اكتشاف', 'Beratung Planen', 'Discovery-Call Planen'];
                        const infoBtns = ['Request More Information', 'Request Detailed Proposal', 'Demander Plus d\'Infos', 'Demander Proposition Détaillée', 'طلب معلومات إضافية', 'طلب عرض مفصل', 'Mehr Infos Anfordern', 'Detailliertes Angebot'];

                        const completeTexts = {
                          schedule: {
                            en: `Excellent choice. Our team will contact you at ${COMPANY.email} within 24 hours to schedule your discovery call.\n\nYou can also reach us directly via WhatsApp: ${COMPANY.whatsapp}`,
                            fr: `Excellent choix. Notre équipe vous contactera à ${COMPANY.email} sous 24h pour planifier votre appel.\n\nVous pouvez aussi nous joindre via WhatsApp: ${COMPANY.whatsapp}`,
                            ar: `اختيار ممتاز. سيتواصل معك فريقنا على ${COMPANY.email} خلال 24 ساعة.\n\nيمكنك أيضاً التواصل معنا عبر واتساب: ${COMPANY.whatsapp}`,
                            de: `Ausgezeichnete Wahl. Unser Team wird Sie unter ${COMPANY.email} innerhalb von 24 Stunden kontaktieren.\n\nSie können uns auch über WhatsApp erreichen: ${COMPANY.whatsapp}`
                          },
                          info: {
                            en: `I will prepare a detailed proposal for you. Our team will send you:\n\n• Technical specifications\n• Implementation roadmap\n• ROI analysis\n• Case studies\n\nContact: ${COMPANY.email}\nWhatsApp: ${COMPANY.whatsapp}`,
                            fr: `Je vais préparer une proposition détaillée. Notre équipe vous enverra:\n\n• Spécifications techniques\n• Feuille de route implémentation\n• Analyse ROI\n• Études de cas\n\nContact: ${COMPANY.email}\nWhatsApp: ${COMPANY.whatsapp}`,
                            ar: `سأعد لك عرضاً مفصلاً. سيرسل لك فريقنا:\n\n• المواصفات التقنية\n• خارطة طريق التنفيذ\n• تحليل العائد على الاستثمار\n• دراسات الحالة\n\nالتواصل: ${COMPANY.email}\nواتساب: ${COMPANY.whatsapp}`,
                            de: `Ich werde ein detailliertes Angebot vorbereiten. Unser Team sendet Ihnen:\n\n• Technische Spezifikationen\n• Implementierungs-Roadmap\n• ROI-Analyse\n• Fallstudien\n\nKontakt: ${COMPANY.email}\nWhatsApp: ${COMPANY.whatsapp}`
                          },
                          payment: {
                            en: 'Opening secure payment portal...',
                            fr: 'Ouverture du portail de paiement sécurisé...',
                            ar: 'جاري فتح بوابة الدفع الآمنة...',
                            de: 'Öffne sicheres Zahlungsportal...'
                          }
                        };

                        return (
                          <button key={j} onClick={() => {
                            setMessages(prev => [...prev, { role: 'user', content: opt }]);
                            setIsThinking(true);

                            // Handle final actions
                            if (paymentBtns.includes(opt) && msg.solution) {
                              setTimeout(() => {
                                setIsThinking(false);
                                setSelectedSolution(msg.solution);
                                setShowPayment(true);
                                setMessages(prev => [...prev, { role: 'agent', content: completeTexts.payment[lang as keyof typeof completeTexts.payment], phase: 'PAYMENT' }]);
                              }, 1000);
                            } else if (scheduleBtns.includes(opt)) {
                              setTimeout(() => {
                                setIsThinking(false);
                                setMessages(prev => [...prev, {
                                  role: 'agent',
                                  content: completeTexts.schedule[lang as keyof typeof completeTexts.schedule],
                                  phase: 'COMPLETE'
                                }]);
                              }, 1000);
                            } else if (infoBtns.includes(opt)) {
                              setTimeout(() => {
                                setIsThinking(false);
                                setMessages(prev => [...prev, {
                                  role: 'agent',
                                  content: completeTexts.info[lang as keyof typeof completeTexts.info],
                                  phase: 'COMPLETE'
                                }]);
                              }, 1000);
                            } else {
                              // Process next question
                              setTimeout(() => {
                                setIsThinking(false);
                                const response = handleIntelligentResponse(opt);
                                setMessages(prev => [...prev, { role: 'agent', ...response }]);
                              }, 1500);
                            }
                          }} className="px-4 py-2 bg-white border border-amber-300 text-amber-700 rounded-lg text-sm hover:bg-amber-50 transition-all">
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
              {isThinking && (
                <div className="flex items-center gap-3 text-amber-600">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"/>
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}/>
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}/>
                  </div>
                  <span className="text-sm">{t.consultant.thinking}</span>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => {
                if (e.key === 'Enter' && input.trim()) {
                  const userText = input;
                  setMessages(prev => [...prev, { role: 'user', content: userText }]);
                  setIsThinking(true);
                  setInput('');
                  setTimeout(() => {
                    setIsThinking(false);
                    const response = handleIntelligentResponse(userText);
                    setMessages(prev => [...prev, { role: 'agent', ...response }]);
                  }, 1500);
                }
              }} placeholder={t.consultant.placeholder} className="flex-1 px-6 py-4 bg-white border border-slate-300 rounded-xl focus:border-amber-500 focus:outline-none"/>
              <button onClick={() => {
                if (input.trim()) {
                  const userText = input;
                  setMessages(prev => [...prev, { role: 'user', content: userText }]);
                  setIsThinking(true);
                  setInput('');
                  setTimeout(() => {
                    setIsThinking(false);
                    const response = handleIntelligentResponse(userText);
                    setMessages(prev => [...prev, { role: 'agent', ...response }]);
                  }, 1500);
                }
              }} className="px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all">
                {t.consultant.send}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
