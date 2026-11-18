export const TRUST_LABELS = [
  "Custom Software Engineering",
  "AI-Powered Solutions",
  "Web & Mobile Development",
  "Business Automation",
  "API & System Integration",
];

export const HOME_SERVICES_BENTO = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    description:
      "Tailored enterprise applications, internal operations platforms, and legacy system modernization engineered around your exact business rules.",
    size: "wide",
    accent: "teal",
    icon: "cpu",
  },
  {
    slug: "ai-powered-business-automation",
    title: "AI-Powered Business Automation",
    description:
      "Production-grade AI agents, RAG pipelines, LLM integrations, and intelligent document workflows that remove manual operational bottlenecks.",
    size: "wide",
    accent: "purple",
    icon: "sparkles",
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    description:
      "Fast, resilient React web applications, customer portals, and real-time operational dashboards built for clarity and scale.",
    size: "standard",
    accent: "teal",
    icon: "globe",
  },
  {
    slug: "mobile-application-development",
    title: "Mobile Application Development",
    description:
      "Android, iOS, and cross-platform mobile apps tightly connected to secure backend APIs and enterprise data.",
    size: "standard",
    accent: "teal",
    icon: "smartphone",
  },
  {
    slug: "saas-product-development",
    title: "SaaS Product Development",
    description:
      "Multi-tenant SaaS architectures with role-based access control, billing foundations, and automated cloud deployment.",
    size: "standard",
    accent: "purple",
    icon: "layers",
  },
  {
    slug: "api-development-and-integration",
    title: "API Development & Integration",
    description:
      "Clean, versioned REST APIs and reliable system-to-system integrations connecting your core platforms without brittle glue code.",
    size: "standard",
    accent: "teal",
    icon: "link",
  },
];

export const WHY_TECHORCAS = [
  {
    title: "Business-First Approach",
    description:
      "Every architectural decision starts with measurable operational outcomes, clear domain modeling, and pragmatic scope control.",
    icon: "target",
  },
  {
    title: "Scalable Architecture",
    description:
      "Modular codebases, clean database indexing, and decoupled API boundaries designed to grow cleanly as traffic and teams expand.",
    icon: "layers",
  },
  {
    title: "Modern Technology Stack",
    description:
      "Proven full-stack foundations combining React, Java/Spring Boot, Node.js, PostgreSQL, MongoDB, and Spring AI.",
    icon: "code",
  },
  {
    title: "Long-Term Technical Partnership",
    description:
      "Transparent communication, maintainable documentation, and continuous post-launch support that treats your product as a long-term asset.",
    icon: "shield",
  },
];

export const FEATURED_SOLUTIONS_SUMMARY = [
  {
    id: "enterprise-management",
    title: "Enterprise Management Systems",
    challenge: "Fragmented spreadsheets and disconnected department workflows slow decision-making.",
    outcome: "Unified operational hubs with role-based access, audit trails, and live reporting.",
    category: "Enterprise Software",
    tech: ["Java", "Spring Boot", "PostgreSQL", "React"],
  },
  {
    id: "process-automation",
    title: "Business Process Automation",
    challenge: "Repetitive approvals, manual data entry, and error-prone file handoffs.",
    outcome: "Event-driven pipelines that synchronize systems, validate data, and route exceptions.",
    category: "Automation",
    tech: ["Node.js", "REST APIs", "Workflow Automation", "Docker"],
  },
  {
    id: "crm-systems",
    title: "Customer Relationship Management Systems",
    challenge: "Off-the-shelf CRMs rarely match specialized sales and onboarding pipelines.",
    outcome: "Custom CRM workspaces tailored to your account lifecycle, billing, and support SLAs.",
    category: "Customer Operations",
    tech: ["React", "TypeScript", "Spring Boot", "MySQL"],
  },
  {
    id: "ecommerce-platforms",
    title: "E-commerce Platforms",
    challenge: "Performance bottlenecks, rigid checkout flows, and out-of-sync inventory.",
    outcome: "High-conversion storefronts integrated directly with catalog, payment, and fulfillment APIs.",
    category: "Commerce",
    tech: ["React", "Node.js", "PostgreSQL", "Nginx"],
  },
  {
    id: "ai-applications",
    title: "AI-Powered Applications",
    challenge: "Unstructured knowledge bases, slow document triage, and manual support queues.",
    outcome: "RAG knowledge assistants, structured extraction, and guarded AI agent workflows.",
    category: "AI & Automation",
    tech: ["Spring AI", "LLM Integration", "RAG", "AI Agents"],
  },
  {
    id: "custom-saas",
    title: "Custom SaaS Platforms",
    challenge: "Turning a domain-specific service offering into a secure multi-tenant subscription product.",
    outcome: "Production SaaS platforms with tenant isolation, observability, and clean onboarding.",
    category: "SaaS Products",
    tech: ["React", "Express.js", "MongoDB", "Docker"],
  },
];

export const TECH_STACK_CATEGORIES = [
  {
    category: "Frontend",
    accent: "teal",
    items: ["React", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    category: "Backend",
    accent: "teal",
    items: ["Java", "Spring Boot", "Node.js", "Express.js"],
  },
  {
    category: "Database",
    accent: "teal",
    items: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    category: "AI & Automation",
    accent: "purple",
    items: ["Spring AI", "LLM Integration", "RAG", "AI Agents", "Workflow Automation"],
  },
  {
    category: "Infrastructure",
    accent: "teal",
    items: ["Docker", "Nginx", "Git", "REST APIs"],
  },
];

export const DEVELOPMENT_PROCESS = [
  {
    step: "01",
    title: "Discover",
    description:
      "Understand the business problem, operational constraints, user roles, and integration requirements.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Plan domain models, system architecture, API contracts, and clean user experience flows.",
  },
  {
    step: "03",
    title: "Develop",
    description:
      "Build modular frontend and backend components with automated checks and iterative demos.",
  },
  {
    step: "04",
    title: "Deploy & Scale",
    description:
      "Launch with containerized infrastructure, monitor production health, and continuously improve.",
  },
];

export const ALL_SERVICES = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    category: "Core Engineering",
    shortDesc:
      "Enterprise applications, internal tools, custom workflows, and legacy application modernization built for reliability.",
    deliverables: [
      "Enterprise applications",
      "Business management systems",
      "Custom workflows",
      "Internal business tools",
      "Legacy application modernization",
    ],
    problems: [
      "Disconnected spreadsheets and manual workarounds limiting team velocity.",
      "Legacy software that is expensive to maintain and cannot integrate with modern APIs.",
      "Off-the-shelf tools forcing compromises on core operational workflows.",
    ],
    features: [
      "Clean domain-driven architecture and maintainable codebases",
      "Role-based access control and audit logging",
      "Incremental migration paths from legacy systems",
      "Comprehensive API and operational documentation",
    ],
    technologies: ["Java", "Spring Boot", "Node.js", "React", "TypeScript", "PostgreSQL"],
    approach:
      "We map your existing operational bottlenecks first, define strict data and API boundaries, and ship functional milestones in tight engineering cycles.",
    faqs: [
      {
        q: "How do you approach modernizing an existing legacy application?",
        a: "We audit data schemas and critical workflows first, introduce clean API boundaries around core capabilities, and migrate modules incrementally to reduce operational risk.",
      },
      {
        q: "Do we retain full ownership of the source code and architecture?",
        a: "Yes. Every custom engagement delivers full repository access, clean documentation, and zero vendor lock-in.",
      },
    ],
  },
  {
    slug: "website-development",
    title: "Website Development",
    category: "Digital Presence",
    shortDesc:
      "High-performance corporate websites, landing pages, and CMS-powered platforms designed for technical credibility.",
    deliverables: [
      "Corporate websites",
      "Business websites",
      "Landing pages",
      "CMS-powered websites",
      "Performance optimization",
    ],
    problems: [
      "Slow, outdated websites that fail to communicate technical capability.",
      "Rigid templates that make publishing product updates and articles difficult.",
      "Poor mobile responsiveness and weak technical SEO structure.",
    ],
    features: [
      "Semantic HTML, structured metadata, and clean URL architecture",
      "Fast initial load times and responsive grid layouts",
      "Editorial publishing workflows for engineering and product teams",
      "Accessible navigation and keyboard-friendly interactions",
    ],
    technologies: ["React", "HTML", "CSS", "JavaScript", "Nginx"],
    approach:
      "We pair deliberate design systems with lightweight frontend delivery so your public presence communicates authority within seconds.",
    faqs: [
      {
        q: "Can our team publish blog posts and product updates without developer help?",
        a: "Yes. We build intuitive editorial dashboards and structured CMS workflows tailored to your content format.",
      },
    ],
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    category: "Product Engineering",
    shortDesc:
      "Custom web applications, SaaS platforms, enterprise dashboards, customer portals, and admin panels.",
    deliverables: [
      "Custom web applications",
      "SaaS platforms",
      "Enterprise dashboards",
      "Customer portals",
      "Admin panels",
    ],
    problems: [
      "Complex operational data buried in static reports instead of actionable interfaces.",
      "Customer onboarding and self-service tasks still handled manually over email.",
      "Frontends that degrade in performance as data volume grows.",
    ],
    features: [
      "Component-driven React & TypeScript interfaces",
      "Real-time filtering, pagination, and state synchronization",
      "Secure JWT and session-based authentication flows",
      "Responsive layouts optimized for desktop and tablet operations",
    ],
    technologies: ["React", "TypeScript", "JavaScript", "Node.js", "Express.js", "Spring Boot"],
    approach:
      "We design around real user tasks, establish predictable API contracts early, and verify every interactive workflow end-to-end.",
    faqs: [
      {
        q: "Can you integrate a new web portal with our existing backend database?",
        a: "Yes. We build clean REST API layers over PostgreSQL, MySQL, MongoDB, or existing enterprise services.",
      },
    ],
  },
  {
    slug: "mobile-application-development",
    title: "Mobile Application Development",
    category: "Mobile Engineering",
    shortDesc:
      "Android, iOS, and cross-platform business applications seamlessly connected to your backend APIs.",
    deliverables: [
      "Android applications",
      "iOS applications",
      "Cross-platform development",
      "Business applications",
      "API-connected mobile solutions",
    ],
    problems: [
      "Field teams and customers lacking reliable mobile access to core workflows.",
      "Inconsistent user experiences between web dashboards and mobile tools.",
      "Fragile sync behavior when mobile networks are intermittent.",
    ],
    features: [
      "Shared API contracts with web platforms for consistent business logic",
      "Secure token authentication and encrypted data transport",
      "Clean, responsive mobile UI patterns",
      "Push notifications and background sync readiness",
    ],
    technologies: ["React", "JavaScript", "TypeScript", "REST APIs", "Node.js", "Spring Boot"],
    approach:
      "We unify mobile and web around a single well-documented backend API so business rules stay consistent across every device.",
    faqs: [
      {
        q: "Do mobile apps share the same backend as our web platform?",
        a: "Yes. We design unified REST APIs that serve web, Android, and iOS clients cleanly.",
      },
    ],
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    category: "Commerce",
    shortDesc:
      "Custom online stores with product management, payment integrations, inventory systems, and order workflows.",
    deliverables: [
      "Custom online stores",
      "Product management",
      "Payment integrations",
      "Inventory systems",
      "Order management",
    ],
    problems: [
      "Template storefronts struggling with custom pricing rules or B2B ordering.",
      "Inventory mismatches between warehouse counts and online availability.",
      "Slow checkout flows that hurt conversion on mobile devices.",
    ],
    features: [
      "Flexible catalog modeling and search filtering",
      "Transactional order and inventory state integrity",
      "Secure payment gateway webhooks and reconciliation",
      "Admin dashboards for fulfillment and order tracking",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "MySQL", "REST APIs", "Docker"],
    approach:
      "We prioritize transactional accuracy, fast storefront rendering, and reliable payment/inventory synchronization.",
    faqs: [
      {
        q: "Can our storefront integrate with existing accounting or warehouse tools?",
        a: "Yes. We build webhook and REST API connectors to keep orders, invoices, and stock synchronized.",
      },
    ],
  },
  {
    slug: "saas-product-development",
    title: "SaaS Product Development",
    category: "Product Engineering",
    shortDesc:
      "Multi-tenant SaaS architectures with subscription workflows, authentication, authorization, and cloud deployment.",
    deliverables: [
      "SaaS architecture",
      "Multi-tenant applications",
      "Subscription management",
      "Authentication and authorization",
      "Cloud deployment",
    ],
    problems: [
      "Early prototypes that break when onboarding multiple enterprise tenants.",
      "Missing role permissions, billing hooks, or tenant data isolation.",
      "Deployment pipelines that require manual intervention for every release.",
    ],
    features: [
      "Strict tenant data isolation and RBAC enforcement",
      "Modular subscription & entitlement architecture",
      "Containerized deployment with Docker and Nginx",
      "Clean API design ready for customer integrations",
    ],
    technologies: ["React", "TypeScript", "Java", "Spring Boot", "PostgreSQL", "Docker"],
    approach:
      "We structure multi-tenancy, authentication, and observability from day one so your SaaS product scales smoothly.",
    faqs: [
      {
        q: "Should we start with an MVP or full multi-tenant architecture?",
        a: "We design lean MVPs on clean multi-tenant foundations so you can ship quickly without rewriting core auth and data models later.",
      },
    ],
  },
  {
    slug: "crm-and-erp-development",
    title: "CRM & ERP Development",
    category: "Enterprise Systems",
    shortDesc:
      "Custom CRM and ERP platforms unifying inventory, sales pipelines, operations, and business reporting.",
    deliverables: [
      "Custom CRM",
      "ERP solutions",
      "Inventory management",
      "Sales management",
      "Business reporting",
    ],
    problems: [
      "High per-seat licensing costs for rigid tools that teams barely adopt.",
      "Sales, inventory, and finance operating in disconnected data silos.",
      "Lack of accurate real-time reporting across operational departments.",
    ],
    features: [
      "Custom pipeline stages, approvals, and activity timelines",
      "Unified customer, order, and inventory ledgers",
      "Exportable operational reports and role-scoped views",
      "Audit logs across critical financial and inventory mutations",
    ],
    technologies: ["Java", "Spring Boot", "PostgreSQL", "MySQL", "React", "TypeScript"],
    approach:
      "We interview operational stakeholders to model exact workflows before writing schema migrations, ensuring high team adoption.",
    faqs: [
      {
        q: "Can we roll out a custom ERP module by module?",
        a: "Yes. Phased rollouts—starting with your highest-friction module like inventory or sales—keep operations running smoothly.",
      },
    ],
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    category: "Automation",
    shortDesc:
      "Automated workflows, document processing, cross-system data sync, reporting pipelines, and third-party connectors.",
    deliverables: [
      "Workflow automation",
      "Document processing",
      "Data synchronization",
      "Reporting automation",
      "Third-party integrations",
    ],
    problems: [
      "Teams spending hours copying data between spreadsheets, emails, and internal apps.",
      "Delayed weekly or monthly reporting assembled manually.",
      "Human errors introduced during repetitive multi-step handoffs.",
    ],
    features: [
      "Idempotent background jobs with retry and failure alerting",
      "Automated document ingestion and structured parsing",
      "Scheduled and event-driven cross-system synchronization",
      "Clear execution logs for operational visibility",
    ],
    technologies: ["Node.js", "Java", "Spring Boot", "Workflow Automation", "REST APIs", "Docker"],
    approach:
      "We identify high-volume manual steps, design deterministic automation with clear exception paths, and monitor every run.",
    faqs: [
      {
        q: "What happens when an external API fails during an automated sync?",
        a: "We build idempotent retries, dead-letter queues, and clear status alerts so no records are silently dropped.",
      },
    ],
  },
  {
    slug: "api-development-and-integration",
    title: "API Development & Integration",
    category: "Core Engineering",
    shortDesc:
      "Secure, high-throughput REST APIs and third-party system integrations with clean contracts and observability.",
    deliverables: [
      "REST API development",
      "Third-party integrations",
      "System-to-system communication",
      "API security",
      "API performance optimization",
    ],
    problems: [
      "Brittle point-to-point scripts that break when external vendors update payloads.",
      "Unsecured or undocumented internal endpoints slowing partner integrations.",
      "Slow API responses caused by N+1 queries or missing pagination.",
    ],
    features: [
      "Contract-first REST API design with consistent error envelopes",
      "JWT/OAuth2 authentication, rate controls, and input validation",
      "Adapter layers isolating third-party API changes",
      "Query tuning, indexing, and payload optimization",
    ],
    technologies: ["Java", "Spring Boot", "Node.js", "Express.js", "REST APIs", "Nginx"],
    approach:
      "We establish explicit request/response schemas and build resilient integration adapters backed by automated contract tests.",
    faqs: [
      {
        q: "Can you integrate our platform with external payment, CRM, or logistics APIs?",
        a: "Yes. We build clean integration adapters with webhook verification and resilient error handling.",
      },
    ],
  },
  {
    slug: "database-design-and-development",
    title: "Database Design & Development",
    category: "Data Engineering",
    shortDesc:
      "Database architecture, relational and document modeling, query optimization, migrations, and maintenance.",
    deliverables: [
      "Database architecture",
      "Data modeling",
      "Query optimization",
      "Data migration",
      "Database maintenance",
    ],
    problems: [
      "Slow application screens caused by unindexed queries and poor schema design.",
      "Data integrity issues from missing constraints or ad-hoc migrations.",
      "Risky database upgrades or transfers between legacy and modern engines.",
    ],
    features: [
      "Normalized PostgreSQL/MySQL schemas and purposeful MongoDB document models",
      "Execution plan analysis and composite index optimization",
      "Repeatable, reversible schema and data migration scripts",
      "Backup, retention, and connection pooling configuration",
    ],
    technologies: ["PostgreSQL", "MySQL", "MongoDB", "Java", "Node.js"],
    approach:
      "We model schemas around actual query access patterns and integrity rules rather than treating the database as a dumb dump.",
    faqs: [
      {
        q: "How do you decide between PostgreSQL, MySQL, and MongoDB?",
        a: "We match the engine to your data shape—relational integrity and complex joins favor PostgreSQL/MySQL, while flexible hierarchical documents fit MongoDB.",
      },
    ],
  },
  {
    slug: "ai-powered-business-automation",
    title: "AI-Powered Business Automation",
    category: "AI & Automation",
    shortDesc:
      "AI agents, LLM integrations, RAG knowledge systems, intelligent document processing, and workflow automation.",
    deliverables: [
      "AI agents",
      "LLM integrations",
      "RAG-based applications",
      "Intelligent document processing",
      "AI-powered customer support",
      "Business workflow automation",
    ],
    problems: [
      "Teams unable to quickly surface accurate answers across large internal document sets.",
      "Manual triage of inbound support tickets, invoices, and unstructured forms.",
      "Uncontrolled LLM experiments lacking grounded citations or guardrails.",
    ],
    features: [
      "Retrieval-Augmented Generation (RAG) grounded in your verified documents",
      "Structured LLM tool-calling and human-in-the-loop approval flows",
      "Spring AI and Node.js orchestration layers integrated into existing backends",
      "Deterministic validation and fallback handling around model outputs",
    ],
    technologies: ["Spring AI", "LLM Integration", "RAG", "AI Agents", "Workflow Automation", "Java"],
    approach:
      "We treat AI as an engineered system component—with grounded retrieval, strict schema validation, and clear evaluation criteria.",
    faqs: [
      {
        q: "How do you prevent AI assistants from fabricating answers?",
        a: "We pair RAG retrieval with strict source grounding, citation requirements, and deterministic validation before actions execute.",
      },
    ],
  },
  {
    slug: "maintenance-and-technical-support",
    title: "Maintenance & Technical Support",
    category: "Operations",
    shortDesc:
      "Ongoing bug resolution, application monitoring, performance tuning, security updates, and iterative enhancements.",
    deliverables: [
      "Bug fixing",
      "Application monitoring",
      "Performance optimization",
      "Security updates",
      "Continuous improvements",
    ],
    problems: [
      "Production apps left without active dependency updates or security patches.",
      "Recurring bugs without root-cause diagnosis or regression safeguards.",
      "Lack of engineering capacity to ship steady post-launch improvements.",
    ],
    features: [
      "Structured issue triage and root-cause remediation",
      "Dependency, runtime, and security patch management",
      "Log monitoring and API latency profiling",
      "Predictable monthly enhancement velocity",
    ],
    technologies: ["Docker", "Nginx", "Git", "React", "Java", "Node.js"],
    approach:
      "We stabilize critical paths first, establish clean release hygiene, and iterate systematically based on production telemetry.",
    faqs: [
      {
        q: "Can TechOrcas maintain software originally built by another team?",
        a: "Yes. We begin with a structured codebase and infrastructure audit to map risks before taking over maintenance.",
      },
    ],
  },
];

export const SOLUTIONS_DATA = [
  {
    id: "business-process-automation",
    title: "Business Process Automation",
    sector: "Cross-Industry Operations",
    challenge:
      "Manual handoffs across emails, spreadsheets, and disconnected tools slow execution and introduce costly human errors.",
    solution:
      "Event-driven automation pipelines and intelligent document workflows that validate, route, and sync operational data automatically.",
    benefits: [
      "Eliminates repetitive manual data entry",
      "Enforces consistent approval and audit rules",
      "Provides real-time visibility into pending exceptions",
    ],
    technologies: ["Node.js", "Spring Boot", "Workflow Automation", "REST APIs", "Docker"],
    serviceSlug: "business-process-automation",
  },
  {
    id: "enterprise-software-solutions",
    title: "Enterprise Software Solutions",
    sector: "Enterprise Operations",
    challenge:
      "Growing organizations outgrow generic SaaS tools and face fragmented workflows across departments.",
    solution:
      "Custom internal management systems and unified web portals engineered around exact governance, permissions, and reporting rules.",
    benefits: [
      "Consolidates fragmented tools into one source of truth",
      "Granular role-based access control across teams",
      "Long-term adaptability without per-seat license bloat",
    ],
    technologies: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL"],
    serviceSlug: "custom-software-development",
  },
  {
    id: "ai-powered-business-solutions",
    title: "AI-Powered Business Solutions",
    sector: "Knowledge & Support",
    challenge:
      "High volumes of unstructured documents, support inquiries, and internal SOPs strain operational teams.",
    solution:
      "Grounded RAG knowledge bases, intelligent document extraction, and guarded AI agents embedded directly in business tools.",
    benefits: [
      "Faster, source-backed answers from internal documentation",
      "Automated triage and structured extraction from incoming files",
      "Human-in-the-loop safeguards for sensitive decisions",
    ],
    technologies: ["Spring AI", "LLM Integration", "RAG", "AI Agents", "PostgreSQL"],
    serviceSlug: "ai-powered-business-automation",
  },
  {
    id: "customer-management-solutions",
    title: "Customer Management Solutions",
    sector: "Sales & Client Services",
    challenge:
      "Standard CRMs force rigid workflows that do not reflect specialized onboarding, quoting, or service SLAs.",
    solution:
      "Bespoke CRM platforms and client self-service portals synchronizing communications, contracts, and account health.",
    benefits: [
      "Tailored pipeline stages matching how your team actually sells",
      "Unified client portal for documents, status, and requests",
      "Clean API sync with billing and support systems",
    ],
    technologies: ["React", "JavaScript", "Spring Boot", "MySQL", "REST APIs"],
    serviceSlug: "crm-and-erp-development",
  },
  {
    id: "inventory-operations-management",
    title: "Inventory & Operations Management",
    sector: "Logistics & Manufacturing",
    challenge:
      "Delayed stock updates and disconnected warehouse, procurement, and fulfillment records cause stockouts or over-ordering.",
    solution:
      "Real-time inventory ledgers, barcode/API-ready tracking workflows, and automated reorder threshold alerts.",
    benefits: [
      "Accurate real-time stock visibility across locations",
      "Traceable movement logs for audits and compliance",
      "Automated procurement triggers and vendor sync",
    ],
    technologies: ["Java", "Spring Boot", "PostgreSQL", "React", "Docker"],
    serviceSlug: "crm-and-erp-development",
  },
  {
    id: "ecommerce-solutions",
    title: "E-commerce Solutions",
    sector: "Retail & E-commerce",
    challenge:
      "Off-the-shelf commerce plugins struggle with complex B2B catalogs, custom pricing tiers, and ERP integration.",
    solution:
      "Custom React storefronts backed by transactional order, catalog, payment, and inventory services.",
    benefits: [
      "Fast page loads and frictionless mobile checkout",
      "Real-time catalog and inventory accuracy",
      "Direct integration with fulfillment and accounting tools",
    ],
    technologies: ["React", "Node.js", "Express.js", "PostgreSQL", "Nginx"],
    serviceSlug: "ecommerce-development",
  },
  {
    id: "data-reporting-solutions",
    title: "Data & Reporting Solutions",
    sector: "Financial & Real Estate Operations",
    challenge:
      "Decision-makers wait days for manual spreadsheet exports compiled from multiple operational databases.",
    solution:
      "Automated data aggregation pipelines and role-scoped analytics dashboards powered by tuned SQL and document queries.",
    benefits: [
      "Live operational KPIs instead of stale weekly exports",
      "Consistent definitions across departments",
      "Fast query performance even on growing datasets",
    ],
    technologies: ["PostgreSQL", "MySQL", "MongoDB", "React", "Spring Boot"],
    serviceSlug: "database-design-and-development",
  },
  {
    id: "saas-product-solutions",
    title: "SaaS Product Solutions",
    sector: "Education & Digital Platforms",
    challenge:
      "Launching a scalable multi-tenant SaaS platform requires rock-solid auth, tenant isolation, and automated delivery.",
    solution:
      "End-to-end SaaS architecture combining React interfaces, secure REST backends, multi-tenant data models, and Dockerized ops.",
    benefits: [
      "Faster time from validated concept to production launch",
      "Built-in multi-tenant security and role management",
      "Containerized deployment ready for horizontal scaling",
    ],
    technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Docker", "Nginx"],
    serviceSlug: "saas-product-development",
  },
];

export const SOLUTION_INDUSTRIES = [
  {
    name: "Manufacturing",
    focus: "Production tracking, BOM/inventory workflows, and vendor coordination tools.",
  },
  {
    name: "Healthcare",
    focus: "Secure patient/admin portals, structured document processing, and scheduling systems.",
  },
  {
    name: "Logistics",
    focus: "Shipment visibility, warehouse operations, and API-connected dispatch dashboards.",
  },
  {
    name: "Retail & E-commerce",
    focus: "Custom storefronts, omnichannel inventory sync, and order management platforms.",
  },
  {
    name: "Real Estate",
    focus: "Property management portals, lead pipelines, and automated lease/document workflows.",
  },
  {
    name: "Financial Services",
    focus: "Audit-ready internal portals, automated reporting, and high-integrity data pipelines.",
  },
  {
    name: "Education",
    focus: "Learning portals, student/admin management systems, and AI-assisted knowledge search.",
  },
];

export const PORTFOLIO_PROJECTS = [
  {
    slug: "techorcas-engineering-blog-platform",
    title: "TechOrcas Engineering Blog & Publishing Platform",
    category: "Web Development",
    badge: "Live Platform",
    shortDesc:
      "Full-stack MERN publishing and editorial platform powering TechOrcas Insights, complete with JWT auth, rich-text authoring, reading lists, and interactive comments.",
    overview:
      "Built directly on React, Express.js, Node.js, and MongoDB Atlas, this platform enables engineering teams to author long-form technical articles with rich formatting, image uploads, reading-time estimation, and reader engagement.",
    challenge:
      "Technical publications need clean distraction-free reading ergonomics, code-friendly typography, instant search and category filtering, and reliable authentication for authors and readers.",
    solution:
      "Engineered a modular REST API with Mongoose schemas, Multer asset handling, JWT authorization, and a dark-navy editorial React frontend with table-of-contents tracking and reading lists.",
    functionalities: [
      "JWT-authenticated authoring, editing, and profile management",
      "Rich-text CKEditor publishing with featured image upload",
      "Live search, category filtering, and server-backed pagination",
      "Reader bookmarks (Reading List), article likes, and threaded comments with star ratings",
      "Auto-generated Table of Contents and copy-ready code blocks",
    ],
    technologies: ["React", "JavaScript", "CSS", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    liveUrl: "/blog",
  },
  {
    slug: "spring-ai-rag-workflow-accelerator",
    title: "Enterprise RAG & Workflow Orchestrator Blueprint",
    category: "AI & Automation",
    badge: "Reference Architecture",
    shortDesc:
      "Reference architecture for grounded Retrieval-Augmented Generation (RAG) and deterministic business workflow automation built on Java, Spring Boot, and Spring AI.",
    overview:
      "A modular engineering blueprint demonstrating how enterprise teams can connect internal documentation and relational data to LLMs with strict citations and approval guardrails.",
    challenge:
      "Organizations adopting LLMs often struggle with unverified outputs, missing audit trails, and disconnected manual triggers across legacy systems.",
    solution:
      "Structured a Spring AI orchestration service paired with PostgreSQL storage, document chunk indexing, and REST endpoints that keep human reviewers in control of critical workflow actions.",
    functionalities: [
      "Source-grounded document ingestion and retrieval pipelines",
      "Structured JSON extraction for downstream enterprise workflows",
      "Audit logging of prompts, retrieved context, and tool executions",
      "Containerized deployment blueprint using Docker and Nginx",
    ],
    technologies: ["Java", "Spring Boot", "Spring AI", "RAG", "LLM Integration", "PostgreSQL", "Docker"],
  },
  {
    slug: "multi-tenant-saas-control-plane",
    title: "Multi-Tenant SaaS Control Plane Blueprint",
    category: "SaaS Products",
    badge: "Reference Architecture",
    shortDesc:
      "Production-ready SaaS foundation featuring tenant isolation, role-based access control, admin analytics, and clean REST API boundaries.",
    overview:
      "Designed to accelerate B2B SaaS launches by establishing clean separation between tenant data, authentication middleware, and modular React dashboards.",
    challenge:
      "SaaS teams frequently lose months rebuilding authentication, role permissions, pagination, and tenant-scoped queries from scratch.",
    solution:
      "Combined a TypeScript-ready React dashboard shell with a layered backend API supporting strict tenant context enforcement and containerized local/cloud parity.",
    functionalities: [
      "Tenant-scoped authorization middleware and role management",
      "Modular dashboard layout with Bento metric and operational cards",
      "Centralized error handling and consistent API response contracts",
      "Docker Compose and Nginx reverse-proxy configuration",
    ],
    technologies: ["React", "TypeScript", "Java", "Spring Boot", "PostgreSQL", "Docker", "Nginx"],
  },
  {
    slug: "unified-operations-erp-portal",
    title: "Unified Operations & Inventory Portal Architecture",
    category: "Enterprise Applications",
    badge: "Reference Architecture",
    shortDesc:
      "Custom internal operations portal blueprint connecting order management, inventory ledgers, and cross-system REST API synchronization.",
    overview:
      "An internal web application architecture crafted for operations teams managing multi-stage approvals, stock movements, and automated status reporting.",
    challenge:
      "Manual reconciliation between inventory spreadsheets, customer portals, and accounting exports creates delays and stock discrepancies.",
    solution:
      "Built around normalized relational data modeling, atomic inventory mutations, and background sync adapters for third-party APIs.",
    functionalities: [
      "Atomic stock and order state transitions with audit history",
      "Searchable operations table with role-based permissions",
      "Automated exception reporting and scheduled synchronization",
      "Responsive interface usable on desktop and warehouse tablets",
    ],
    technologies: ["React", "JavaScript", "Node.js", "MySQL", "REST APIs", "Workflow Automation"],
  },
  {
    slug: "field-operations-mobile-api-suite",
    title: "API-Connected Field Operations Mobile Suite",
    category: "Mobile Applications",
    badge: "Reference Architecture",
    shortDesc:
      "Cross-platform mobile client architecture backed by resilient REST APIs for field inspections, status updates, and real-time operational sync.",
    overview:
      "Demonstrates how mobile field applications share unified validation, authentication, and reporting pipelines with web-based management consoles.",
    challenge:
      "Field teams often rely on paper forms or disconnected messaging apps, leaving headquarters without timely operational data.",
    solution:
      "Paired a mobile-first client workflow with token-secured REST endpoints, image upload pipelines, and real-time admin status views.",
    functionalities: [
      "Unified JWT authentication across mobile and web portals",
      "Structured field checklists and media attachment uploads",
      "Consistent REST API contract with optimistic UI feedback",
      "Centralized admin review and export workflow",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
];

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Web Development",
  "Enterprise Applications",
  "AI & Automation",
  "SaaS Products",
  "Mobile Applications",
];

export const BLOG_CATEGORIES = [
  "All",
  "AI & Machine Learning",
  "Software Development",
  "Web Development",
  "Java & Spring Boot",
  "Cloud & DevOps",
  "Business Automation",
  "Technology Trends",
  "Engineering Insights",
];
