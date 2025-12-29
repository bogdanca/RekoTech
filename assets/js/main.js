document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");

  const themes = ["theme-1", "theme-2", "theme-3", "theme-4", "theme-5"];
  const storageKey = "reko-theme";
  let currentIndex = 0;

  const themePalette = {
    "theme-1": { primary: "#4f46e5", secondary: "#a855f7" },
    "theme-2": { primary: "#22c55e", secondary: "#22d3ee" },
    "theme-3": { primary: "#f97316", secondary: "#facc15" },
    "theme-4": { primary: "#3b82f6", secondary: "#22d3ee" },
    "theme-5": { primary: "#ec4899", secondary: "#a855f7" },
  };



  if (root) {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(storageKey) : null;
    const storedIndex = stored ? themes.indexOf(stored) : -1;

    if (storedIndex >= 0) {
      themes.forEach((t) => root.classList.remove(t));
      root.classList.add(themes[storedIndex]);
      currentIndex = storedIndex;
    } else {
      const existing = themes.findIndex((t) => root.classList.contains(t));
      if (existing >= 0) {
        currentIndex = existing;
      } else {
        root.classList.add(themes[currentIndex]);
      }
    }
  }

  if (themeToggle && root) {
    themeToggle.addEventListener("click", () => {
      const nextIndex = (currentIndex + 1) % themes.length;
      themes.forEach((t) => root.classList.remove(t));
      root.classList.add(themes[nextIndex]);
      currentIndex = nextIndex;

      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(storageKey, themes[nextIndex]);
        }
      } catch (_) {
        // ignore storage errors (private mode, blocked cookies, etc.)
      }
    });
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const mobilePanel = document.getElementById("mobileNav");
  const mobileClose = document.querySelector(".mobile-nav-close");
  const mobileLinks = document.querySelectorAll(".mobile-nav-links a");
  const mobileContent = document.querySelector(".mobile-nav-content");
  const langButtons = document.querySelectorAll(".lang-btn");
  const langStorageKey = "reko-lang";

  const translations = {
    en: {
      theme_toggle: "Toggle theme",
      nav_home: "Home",
      nav_about: "About",
      nav_skills: "Skills",
      nav_experience: "Experience",
      nav_contact: "Contact",
      hero_tag: "IT Consultant · Front-End · ServiceNow · Cloud · AI Prompt Engineer · SEO · Digital Design",
      hero_title: "IT professional turning complex problems into clean digital experiences.",
      hero_sub:
        "I help businesses design, build, and maintain modern web, mobile, and enterprise solutions. From UX/UI to front-end and SQL, and on-premise infrastructure.",
      hero_cta_primary: "Contact me",
      hero_cta_secondary: "View 9 years of experience",
      hero_meta_1: "9+ years in IT",
      hero_meta_2: "Web Developer & Mobile",
      hero_meta_3: "Graphic Design & Art",
      hero_pill: "Currently available for remote & on-site work",
      hero_card_title: "Tech snapshot",
      hero_li_1: "Web design, UX/UI, presentation websites",
      hero_li_2: "Front end & SQL development & SEO",
      hero_li_3: "WordPress, Shopify, custom integrations",
      hero_li_4: "ServiceNow development & administration",
      hero_li_5: "Data manipulation, Excel analysis, automation",
      hero_li_6: "Mobile Applications Development",
      hero_li_7: "Local IT, Service Desk and Customer Service",
      hero_li_8: "Active Directory, Exchange, and other Microsoft products",
      hero_li_9: "Cloud Computing, AWS, Azure, and other cloud services",
      hero_li_10: "Graphic Design and art",
      about_title: "About",
      about_sub: "9 years across web, infrastructure, and enterprise IT.",
      about_body_1:
        "Hello, my name is Bogdan Cameniță and I am an IT professional with 9+ years of hands-on experience across software development, IT operations, and digital transformation. I move comfortably between design, code, and infrastructure and a background in Customer Service.",
      about_body_2:
        "My work ranges from crafting fast, responsive presentation websites and mobile apps to configuring ServiceNow, Active Directory, Exchange, and business applications. I focus on reliable delivery, clear communication, and solutions that are maintainable long-term.",
      skills_title: "Core skills",
      skills_sub: "End-to-end IT delivery, from pixels to production.",
      skills_card1_title: "Web & Mobile",
      skills_card1_li1: "Web design & UX/UI",
      skills_card1_li2: "Front end & back end development",
      skills_card1_li3: "Responsive presentation websites",
      skills_card1_li4: "Phone apps & APIs",
      skills_card1_li5: "SEO implementation",
      skills_card2_title: "Platforms & Integrations",
      skills_card2_li1: "WordPress, Shopify, custom themes",
      skills_card2_li2: "ServiceNow development & administration",
      skills_card2_li3: "REST integrations & automation",
      skills_card2_li4: "Microsoft Exchange, AD, SaaS tools",
      skills_card3_title: "Business & Data",
      skills_card3_li1: "Financial app setup (e.g. SmartBill)",
      skills_card3_li2: "Business application roll-outs",
      skills_card3_li3: "Excel power-user, data analysis",
      skills_card3_li4: "Data manipulation & reporting",
      skills_card4_title: "IT Operations",
      skills_card4_li1: "Windows installation & licensing",
      skills_card4_li2: "Asset management & inventory",
      skills_card4_li3: "On-prem & hybrid environments",
      skills_card4_li4: "Monitoring, troubleshooting",
      skills_card4_li5: "Local IT, Service Desk and Customer Service",
      experience_title: "Experience",
      exp1_period: "Jan 2025 – Present",
      exp1_role: "Senior Technical Engineer – Aurachain",
      exp1_desc:
        "Operating the Aurachain low-code platform, troubleshooting and resolving production incidents, and implementing applications on Aurachain.",
      exp2_period: "Feb 2022 – May 2024",
      exp2_role: "Senior Technical Engineer – Oracle Romania, Bucharest",
      exp2_desc:
        "Part of the EMEA Fusion B2B Service team, covering Fusion Service Cloud components and performance issues to ensure a smooth and reliable customer experience. Worked with HCM, SCM, Finance and other Oracle Fusion Cloud applications.",
      exp3_period: "Jul 2021 – Aug 2023",
      exp3_role: "ServiceNow Developer – Infosys, Bucharest",
      exp3_desc:
        "Developed and configured ServiceNow modules and workflows, implemented catalog items and custom business rules, and supported integrations with existing IT systems while following best practices and documentation standards.",
      exp4_period: "Nov 2020 – Apr 2021",
      exp4_role: "ServiceNow Administrator – Stefanini, Bucharest",
      exp4_desc:
        "Administered and optimized ServiceNow instances, customized forms and lists, maintained user and group management, and supported incident, problem and change management processes for enterprise customers.",
      exp5_period: "Dec 2018 – Nov 2020",
      exp5_role: "Service Desk Engineer L1/2 – Stefanini, Bucharest",
      exp5_desc:
        "Provided L1/L2 support for end users, troubleshooting hardware, software, and network issues, documenting incidents, and collaborating with higher-level teams to restore services within agreed SLAs.",
      exp6_period: "Sep 2016 – Mar 2018",
      exp6_role: "Spirit Order Support Escalations – CGS Romania",
      exp6_desc:
        "Handled complex Order Management escalations, investigated incidents across billing, logistics, and delivery flows, and acted as a point of contact between customers and internal technical teams.",
      contact_title: "Contact",
      contact_sub: "Tell me briefly what you need and I’ll get back with concrete options.",
      contact_name_label: "Name",
      contact_name_placeholder: "Your name",
      contact_email_label: "Email",
      contact_email_placeholder: "you@example.com",
      contact_company_label: "Company (optional)",
      contact_company_placeholder: "Your company",
      contact_topic_label: "What do you need?",
      contact_topic_opt1: "Presentation website",
      contact_topic_opt2: "Full-stack project",
      contact_topic_opt3: "ServiceNow / ITSM",
      contact_topic_opt4: "Data & Excel / reporting",
      contact_topic_opt5: "IT infrastructure & setup",
      contact_topic_opt6: "Other / not sure yet",
      contact_message_label: "Project details",
      contact_message_placeholder: "Short description, goals, timelines...",
      contact_submit: "Send request",
      contact_status_sending: "Sending…",
      contact_status_success: "Thanks! I’ll reply soon.",
      contact_status_error: "Something went wrong. Please retry.",
      contact_status_rate_limited: "Please wait 10 minutes before sending another request.",
      contact_links_title: "Direct links",
      contact_github_title: "GitHub",
      contact_github_desc: "Peek at current builds, experiments, and in-progress ideas.",
      contact_linkedin_title: "LinkedIn",
      contact_linkedin_desc: "See recommendations, roles, and the full IT journey.",
      contact_gmail_title: "Gmail",
      contact_gmail_desc: "Drop a direct brief and get a reply with tailored next steps.",
      footer_note: "Reko Tech - Bogdan Cameniță.",
    },
    ro: {
      theme_toggle: "Schimbă tema",
      nav_home: "Acasă",
      nav_about: "Despre",
      nav_skills: "Abilități",
      nav_experience: "Experiență",
      nav_contact: "Contact",
      hero_tag: "Consultant IT · Front-End · ServiceNow · Cloud · Inginer Prompt AI · SEO · Design Digital",
      hero_title: "Specialist IT care transformă problemele complexe în soluții digitale simple și eficiente.",
      hero_sub: "Ajut companiile să proiecteze, construiască și să mențină soluții moderne web, mobile și enterprise. De la UX/UI la front-end și SQL, și infrastructură on-premise.",
      hero_cta_primary: "Contactează-mă",
      hero_cta_secondary: "Vezi 9 ani de experiență",
      hero_meta_1: "9+ ani în IT",
      hero_meta_2: "Dezvoltator Web & Mobile",
      hero_meta_3: "Design Grafic & Artă",
      hero_pill: "Disponibil pentru colaborări remote & on-site",
      hero_card_title: "Competențe tehnice",
      hero_li_1: "Web design, UX/UI, site-uri de prezentare",
      hero_li_2: "Dezvoltare Front-end, SQL & SEO",
      hero_li_3: "WordPress, Shopify, integrări personalizate",
      hero_li_4: "Dezvoltare și administrare ServiceNow",
      hero_li_5: "Manipulare date, analiză Excel, automatizare",
      hero_li_6: "Dezvoltare aplicații mobile",
      hero_li_7: "IT local, Service Desk și Customer Service",
      hero_li_8: "Active Directory, Exchange și alte produse Microsoft",
      hero_li_9: "Cloud Computing, AWS, Azure și alte servicii cloud",
      hero_li_10: "Design grafic și artă",
      about_title: "Despre",
      about_sub: "9 ani în web, infrastructură și IT enterprise.",
      about_body_1:
        "Salut, sunt Bogdan Cameniță și sunt profesionist IT cu peste 9 ani de experiență practică în dezvoltare software, operațiuni IT și transformare digitală. Lucrez confortabil între design, cod și infrastructură, cu experiență în Customer Service.",
      about_body_2:
        "Proiectele mele includ site-uri rapide și responsive, aplicații mobile, configurare ServiceNow, Active Directory, Exchange și aplicații de business. Mă concentrez pe livrare fiabilă, comunicare clară și soluții ușor de menținut.",
      skills_title: "Abilități principale",
      skills_sub: "Livrare IT cap-coadă, de la pixeli la producție.",
      skills_card1_title: "Web & Mobile",
      skills_card1_li1: "Web design & UX/UI",
      skills_card1_li2: "Dezvoltare front-end & back-end",
      skills_card1_li3: "Site-uri de prezentare responsive",
      skills_card1_li4: "Aplicații și API-uri mobile",
      skills_card1_li5: "Implementare SEO",
      skills_card2_title: "Platforme & Integrări",
      skills_card2_li1: "WordPress, Shopify, teme personalizate",
      skills_card2_li2: "Dezvoltare & administrare ServiceNow",
      skills_card2_li3: "Integrări REST & automatizări",
      skills_card2_li4: "Microsoft Exchange, AD, aplicații SaaS",
      skills_card3_title: "Business & Date",
      skills_card3_li1: "Configurare aplicații financiare (ex. SmartBill)",
      skills_card3_li2: "Implementări aplicații de business",
      skills_card3_li3: "Experiență avansată Excel, analiză de date",
      skills_card3_li4: "Manipulare și raportare date",
      skills_card4_title: "Operațiuni IT",
      skills_card4_li1: "Instalare și licențiere Windows",
      skills_card4_li2: "Managementul inventarului IT",
      skills_card4_li3: "Mediu on-prem & hibrid",
      skills_card4_li4: "Monitorizare, depanare",
      skills_card4_li5: "IT local, Service Desk și Customer Service",
      experience_title: "Experiență",
      exp1_period: "Ian 2025 – Prezent",
      exp1_role: "Senior Technical Engineer – Aurachain",
      exp1_desc:
        "Operarea platformei low-code Aurachain, rezolvarea incidentelor și implementarea aplicațiilor pe platformă.",
      exp2_period: "Feb 2022 – Mai 2024",
      exp2_role: "Senior Technical Engineer – Oracle România, București",
      exp2_desc:
        "Parte din echipa EMEA Fusion B2B Service, acoperind componentele Fusion Service Cloud și problemele de performanță pentru a asigura o experiență client impecabilă. Am lucrat cu HCM, SCM, Finance și alte aplicații Oracle Fusion Cloud.",
      exp3_period: "Iul 2021 – Aug 2023",
      exp3_role: "ServiceNow Developer – Infosys, București",
      exp3_desc:
        "Am dezvoltat și configurat module ServiceNow, am implementat elemente de catalog și reguli personalizate și am susținut integrări cu sistemele existente respectând bunele practici.",
      exp4_period: "Nov 2020 – Apr 2021",
      exp4_role: "ServiceNow Administrator – Stefanini, București",
      exp4_desc:
        "Am administrat și optimizat instanțele ServiceNow, am personalizat formulare și liste, am gestionat utilizatori și grupuri și am susținut procesele de incident, problem și change management.",
      exp5_period: "Dec 2018 – Nov 2020",
      exp5_role: "Service Desk Engineer L1/2 – Stefanini, București",
      exp5_desc:
        "Am oferit suport L1/L2 pentru utilizatori, am depanat probleme hardware/software/rețea, am documentat incidente și am colaborat cu echipele superioare pentru a restabili serviciile.",
      exp6_period: "Sep 2016 – Mar 2018",
      exp6_role: "Spirit Order Support Escalations – CGS România",
      exp6_desc:
        "Am gestionat escaladările complexe din Order Management, am investigat incidentele ce țin de facturare, logistică și livrare și am fost punct de contact între clienți și echipele tehnice interne.",
      contact_title: "Contact",
      contact_sub: "Spune-mi pe scurt ce ai nevoie și revin cu opțiuni concrete.",
      contact_name_label: "Nume",
      contact_name_placeholder: "Numele tău",
      contact_email_label: "Email",
      contact_email_placeholder: "tu@exemplu.com",
      contact_company_label: "Companie (opțional)",
      contact_company_placeholder: "Compania ta",
      contact_topic_label: "De ce ai nevoie?",
      contact_topic_opt1: "Site de prezentare",
      contact_topic_opt2: "Proiect full-stack",
      contact_topic_opt3: "ServiceNow / ITSM",
      contact_topic_opt4: "Date & Excel / raportare",
      contact_topic_opt5: "Infrastructură & setup IT",
      contact_topic_opt6: "Altceva / nu sunt sigur",
      contact_message_label: "Detalii proiect",
      contact_message_placeholder: "Descriere scurtă, obiective, termene...",
      contact_submit: "Trimite cererea",
      contact_status_sending: "Trimit…",
      contact_status_success: "Mulțumesc! Revin în curând.",
      contact_status_error: "A apărut o problemă. Încearcă din nou.",
      contact_status_rate_limited: "Te rog să aștepți 10 minute înainte de a trimite o nouă cerere.",
      contact_links_title: "Linkuri directe",
      contact_github_title: "GitHub",
      contact_github_desc: "Vezi proiecte actuale, experimente și idei în lucru.",
      contact_linkedin_title: "LinkedIn",
      contact_linkedin_desc: "Vezi recomandări, roluri și întregul parcurs IT.",
      contact_gmail_title: "Gmail",
      contact_gmail_desc: "Lasă un mesaj scurt și revin cu următorii pași.",
      footer_note: "Reko Tech - Bogdan Cameniță.",
    },
    ru: {
      theme_toggle: "Сменить тему",
      nav_home: "Главная",
      nav_about: "Обо мне",
      nav_skills: "Навыки",
      nav_experience: "Опыт",
      nav_contact: "Контакты",
      hero_tag: "IT-консультант · Front-End · ServiceNow · Cloud · AI Prompt Engineer · SEO · Цифровой Дизайн",
      hero_title: "IT-профессионал, превращающий сложные задачи в чистый цифровой опыт.",
      hero_sub: "Помогаю бизнесу проектировать, создавать и поддерживать современные веб, мобильные и корпоративные решения. От UX/UI до Front-end и SQL, а также локальной инфраструктуры.",
      hero_cta_primary: "Связаться со мной",
      hero_cta_secondary: "Посмотреть 9 лет опыта",
      hero_meta_1: "9+ лет в IT",
      hero_meta_2: "Веб-разработчик и Mobile",
      hero_meta_3: "Графический дизайн и Арт",
      hero_pill: "Доступен для удаленной работы и в офисе",
      hero_card_title: "Технический обзор",
      hero_li_1: "Веб-дизайн, UX/UI, сайты-визитки",
      hero_li_2: "Front-end, SQL разработка и SEO",
      hero_li_3: "WordPress, Shopify, кастомные интеграции",
      hero_li_4: "Разработка и администрирование ServiceNow",
      hero_li_5: "Работа с данными, анализ в Excel, автоматизация",
      hero_li_6: "Разработка мобильных приложений",
      hero_li_7: "Локальный IT, Service Desk и поддержка клиентов",
      hero_li_8: "Active Directory, Exchange и другие продукты Microsoft",
      hero_li_9: "Облачные вычисления, AWS, Azure и другие облачные сервисы",
      hero_li_10: "Графический дизайн и искусство",
      about_title: "Обо мне",
      about_sub: "9 лет в вебе, инфраструктуре и корпоративном IT.",
      about_body_1:
        "Привет, меня зовут Богдан Каменицэ, я IT-профессионал с более чем 9-летним опытом работы в разработке ПО, IT-операциях и цифровой трансформации. Я комфортно чувствую себя в дизайне, коде и инфраструктуре, имея бэкграунд в поддержке клиентов.",
      about_body_2:
        "Моя работа варьируется от создания быстрых, адаптивных сайтов-визиток и мобильных приложений до настройки ServiceNow, Active Directory, Exchange и бизнес-приложений. Я фокусируюсь на надежной доставке, четкой коммуникации и решениях, которые легко поддерживать в долгосрочной перспективе.",
      skills_title: "Ключевые навыки",
      skills_sub: "IT-деливери полного цикла, от пикселей до продакшена.",
      skills_card1_title: "Web & Mobile",
      skills_card1_li1: "Веб-дизайн и UX/UI",
      skills_card1_li2: "Front-end и Back-end разработка",
      skills_card1_li3: "Адаптивные сайты-визитки",
      skills_card1_li4: "Мобильные приложения и API",
      skills_card1_li5: "SEO реализация",
      skills_card2_title: "Платформы и Интеграции",
      skills_card2_li1: "WordPress, Shopify, кастомные темы",
      skills_card2_li2: "Разработка и администрирование ServiceNow",
      skills_card2_li3: "REST интеграции и автоматизация",
      skills_card2_li4: "Microsoft Exchange, AD, SaaS инструменты",
      skills_card3_title: "Бизнес и Данные",
      skills_card3_li1: "Настройка финансовых приложений (напр. SmartBill)",
      skills_card3_li2: "Внедрение бизнес-приложений",
      skills_card3_li3: "Продвинутый пользователь Excel, анализ данных",
      skills_card3_li4: "Обработка данных и отчетность",
      skills_card4_title: "IT-операции",
      skills_card4_li1: "Установка и лицензирование Windows",
      skills_card4_li2: "Управление активами и инвентаризация",
      skills_card4_li3: "On-prem и гибридные среды",
      skills_card4_li4: "Мониторинг, траблшутинг",
      skills_card4_li5: "Локальный IT, Service Desk и поддержка клиентов",
      experience_title: "Опыт",
      exp1_period: "Янв 2025 – Настоящее время",
      exp1_role: "Senior Technical Engineer – Aurachain",
      exp1_desc:
        "Работа с low-code платформой Aurachain, устранение производственных инцидентов и внедрение приложений на Aurachain.",
      exp2_period: "Фев 2022 – Май 2024",
      exp2_role: "Senior Technical Engineer – Oracle Romania, Бухарест",
      exp2_desc:
        "Часть команды EMEA Fusion B2B Service, отвечал за компоненты Fusion Service Cloud и вопросы производительности для обеспечения бесперебойного опыта клиентов. Работал с HCM, SCM, Finance и другими приложениями Oracle Fusion Cloud.",
      exp3_period: "Июл 2021 – Авг 2023",
      exp3_role: "ServiceNow Developer – Infosys, Бухарест",
      exp3_desc:
        "Разрабатывал и настраивал модули и рабочие процессы ServiceNow, внедрял элементы каталога и кастомные бизнес-правила, поддерживал интеграции с существующими IT-системами, следуя лучшим практикам.",
      exp4_period: "Ноя 2020 – Апр 2021",
      exp4_role: "ServiceNow Administrator – Stefanini, Бухарест",
      exp4_desc:
        "Администрировал и оптимизировал инстансы ServiceNow, настраивал формы и списки, управлял пользователями и группами, поддерживал процессы управления инцидентами, проблемами и изменениями для корпоративных клиентов.",
      exp5_period: "Дек 2018 – Ноя 2020",
      exp5_role: "Service Desk Engineer L1/2 – Stefanini, Бухарест",
      exp5_desc:
        "Оказывал L1/L2 поддержку пользователям, устранял проблемы с оборудованием, ПО и сетью, документировал инциденты и сотрудничал с командами более высокого уровня для восстановления сервисов.",
      exp6_period: "Сен 2016 – Мар 2018",
      exp6_role: "Spirit Order Support Escalations – CGS Romania",
      exp6_desc:
        "Обрабатывал сложные эскалации в управлении заказами, расследовал инциденты в биллинге, логистике и доставке, выступал контактным лицом между клиентами и внутренними техническими командами.",
      contact_title: "Контакты",
      contact_sub: "Кратко опишите, что вам нужно, и я вернусь с конкретными вариантами.",
      contact_name_label: "Имя",
      contact_name_placeholder: "Ваше имя",
      contact_email_label: "Email",
      contact_email_placeholder: "you@example.com",
      contact_company_label: "Компания (опционально)",
      contact_company_placeholder: "Ваша компания",
      contact_topic_label: "Что вам нужно?",
      contact_topic_opt1: "Сайт-визитка",
      contact_topic_opt2: "Full-stack проект",
      contact_topic_opt3: "ServiceNow / ITSM",
      contact_topic_opt4: "Данные и Excel / отчетность",
      contact_topic_opt5: "IT-инфраструктура и настройка",
      contact_topic_opt6: "Другое / не уверен",
      contact_message_label: "Детали проекта",
      contact_message_placeholder: "Краткое описание, цели, сроки...",
      contact_submit: "Отправить запрос",
      contact_status_sending: "Отправка…",
      contact_status_success: "Спасибо! Я скоро отвечу.",
      contact_status_error: "Что-то пошло не так. Пожалуйста, попробуйте снова.",
      contact_status_rate_limited: "Пожалуйста, подождите 10 минут перед отправкой нового запроса.",
      contact_links_title: "Прямые ссылки",
      contact_github_title: "GitHub",
      contact_github_desc: "Взгляните на текущие сборки, эксперименты и идеи в работе.",
      contact_linkedin_title: "LinkedIn",
      contact_linkedin_desc: "Рекомендации, роли и полный IT-путь.",
      contact_gmail_title: "Gmail",
      contact_gmail_desc: "Напишите напрямую и получите ответ с планом действий.",
      footer_note: "Reko Tech - Богдан Каменицэ.",
    },
  };

  const getTranslation = (key) => {
    const lang = root?.getAttribute("lang") || "en";
    const dict = translations[lang] || translations.en;
    return dict[key] || "";
  };

  const applyLanguage = (lang) => {
    const dict = translations[lang] || translations.en;
    root.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (key && dict[key]) {
        node.textContent = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      const key = node.getAttribute("data-i18n-placeholder");
      if (key && dict[key]) {
        node.setAttribute("placeholder", dict[key]);
      }
    });

    document.querySelectorAll("option[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (key && dict[key]) {
        node.textContent = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      const key = node.getAttribute("data-i18n-aria");
      if (key && dict[key]) {
        node.setAttribute("aria-label", dict[key]);
      }
    });

    langButtons.forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    try {
      window.localStorage.setItem(langStorageKey, lang);
    } catch (err) {
      // ignore storage errors
    }
  };

  const initLanguageToggle = () => {
    const storedLang = (() => {
      try {
        return window.localStorage.getItem(langStorageKey);
      } catch (err) {
        return null;
      }
    })();

    const getBrowserLang = () => {
      if (typeof navigator !== "undefined") {
        const browserLangs = navigator.languages || [navigator.language];
        for (const lang of browserLangs) {
          if (!lang) continue;
          const code = lang.split("-")[0].toLowerCase();
          if (translations[code]) return code;
        }
      }
      return "ro";
    };

    const initialLang = storedLang && translations[storedLang] ? storedLang : getBrowserLang();
    applyLanguage(initialLang);

    langButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetLang = btn.dataset.lang;
        if (!targetLang || !translations[targetLang]) return;
        applyLanguage(targetLang);
      });
    });
  };

  const setMenuState = (open) => {
    if (!menuToggle || !mobilePanel) return;
    menuToggle.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    mobilePanel.classList.toggle("active", open);
    mobilePanel.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("mobile-nav-open", open);
  };

  if (menuToggle && mobilePanel) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobilePanel.classList.contains("active");
      setMenuState(!isOpen);
    });
  }

  if (mobileClose) {
    mobileClose.addEventListener("click", () => setMenuState(false));
  }

  mobileLinks.forEach((link) =>
    link.addEventListener("click", () => {
      setMenuState(false);
    })
  );

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!mobilePanel || !menuToggle) return;
    if (!mobilePanel.classList.contains("active")) return;
    const target = event.target;
    const insidePanel = mobileContent && mobileContent.contains(target);
    const onToggle = menuToggle.contains(target);
    if (insidePanel || onToggle) return;
    setMenuState(false);
  });

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const initPointerGlow = () => {
    if (!root || typeof window === "undefined") return;

    const prefersFinePointer = window.matchMedia ? window.matchMedia("(pointer: fine)").matches : true;
    if (!prefersFinePointer) return;

    const state = {
      x: 0.5,
      y: 0.3,
      raf: null,
      dirty: false,
    };

    const commit = () => {
      state.raf = null;
      root.style.setProperty("--bg-pointer-x", `${state.x * 100}%`);
      root.style.setProperty("--bg-pointer-y", `${state.y * 100}%`);
    };

    const schedule = () => {
      if (state.raf) return;
      state.raf = requestAnimationFrame(commit);
    };

    const updateFromPoint = (clientX, clientY) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      state.x = clamp(clientX / width, 0, 1);
      state.y = clamp(clientY / height, 0, 1);
      schedule();
    };

    const handleMouseMove = (event) => {
      updateFromPoint(event.clientX, event.clientY);
    };

    const resetToCenter = () => {
      state.x = 0.5;
      state.y = 0.35;
      schedule();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", resetToCenter);
  };

  const initTiltMotion = () => {
    if (!root || typeof window === "undefined") return;
    const body = document.body;
    if (!body || !("DeviceOrientationEvent" in window)) return;

    const applyTilt = (event) => {
      const beta = event.beta ?? 0; // front-back tilt
      const gamma = event.gamma ?? 0; // left-right tilt
      const pitchRatio = clamp(beta, -45, 45) / 45;
      const rollRatio = clamp(gamma, -35, 35) / 35;

      root.style.setProperty("--tilt-rotate-pitch", `${pitchRatio * -8}deg`);
      root.style.setProperty("--tilt-rotate-roll", `${rollRatio * 8}deg`);
      root.style.setProperty("--tilt-shift-x", `${rollRatio * -18}px`);
      root.style.setProperty("--tilt-shift-y", `${pitchRatio * 18}px`);
      root.style.setProperty("--tilt-bg-shift-x", `${rollRatio * 35}px`);
      root.style.setProperty("--tilt-bg-shift-y", `${pitchRatio * 35}px`);
    };

    const activateTilt = () => {
      body.classList.add("tilt-enabled");
      window.addEventListener("deviceorientation", applyTilt, true);
    };

    const requestPermissionIfNeeded = () => {
      const DeviceOrientation = window.DeviceOrientationEvent;
      if (DeviceOrientation && typeof DeviceOrientation.requestPermission === "function") {
        DeviceOrientation.requestPermission()
          .then((state) => {
            if (state === "granted") {
              activateTilt();
            }
          })
          .catch(() => {
            // ignored - user rejected or not secure origin
          });
      } else {
        activateTilt();
      }
    };

    const handleFirstInteraction = () => {
      requestPermissionIfNeeded();
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
    };

    window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
    window.addEventListener("click", handleFirstInteraction, { passive: true });
  };

  const initFluidCard = (containerSelector) => {
    const container = document.querySelector(containerSelector);
    const canvas = container ? container.querySelector("canvas.hero-fluid") : null;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let particles = [];
    let mouse = { x: 0, y: 0, active: false };
    let animationFrameId;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const initParticles = () => {
      particles = [];
      const count = 60;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: 24 + Math.random() * 26,
          alpha: 0.06 + Math.random() * 0.12,
        });
      }
    };

    const update = () => {
      for (const p of particles) {
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const radius = 200;
          if (distSq < radius * radius && distSq > 9) {
            const force = -900 / distSq;
            const invDist = 1 / Math.sqrt(distSq);
            p.vx += (dx * invDist) * force;
            p.vy += (dy * invDist) * force;
          }
        }

        p.vx *= 0.93;
        p.vy *= 0.93;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const gradient = ctx.createRadialGradient(
        mouse.x || width / 2,
        mouse.y || height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      gradient.addColorStop(0, "rgba(129, 140, 248, 0.3)");
      gradient.addColorStop(0.4, "rgba(236, 72, 153, 0.25)");
      gradient.addColorStop(1, "rgba(15, 23, 42, 0.0)");

      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = p.alpha;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      update();
      render();
      animationFrameId = requestAnimationFrame(loop);
    };

    const handleMouse = (event) => {
      const rect = container.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const start = () => {
      if (animationFrameId) return;
      mouse.active = true;
      loop();
    };

    const stop = () => {
      mouse.active = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      // On stop, keep a faint static render instead of clearing completely
      render();
    };

    resize();
    initParticles();
    render(); // initial static glow even without hover

    window.addEventListener("resize", () => {
      resize();
      initParticles();
      render();
    });

    container.addEventListener("mouseenter", start);
    container.addEventListener("mouseleave", stop);
    container.addEventListener("mousemove", handleMouse);
  };

  initFluidCard(".hero-main");
  initFluidCard(".hero-card");
  initPointerGlow();
  initTiltMotion();
  initLanguageToggle();

  const contactLinks = document.querySelectorAll(".contact-link-card[data-email]");
  contactLinks.forEach((link) => {
    const encodedEmail = link.getAttribute("data-email");
    const scheme = link.getAttribute("data-email-scheme") || "mailto";
    if (!encodedEmail) return;

    try {
      const decodedEmail = atob(encodedEmail);
      link.setAttribute("href", `${scheme}:${decodedEmail}`);
    } catch (_) {
      // If decoding fails, fall back to no-op link
      link.removeAttribute("href");
    }

    link.addEventListener("click", () => {
      if (!link.href) return;
      // optional analytics hook or copy fallback could go here
    });
  });

  const contactForm = document.getElementById("contactForm");
  const contactStatus = document.getElementById("contactStatus");
  const CONTACT_RATE_LIMIT_MINUTES = 10;
  const contactRateLimitKey = "contact-last-submit";

  const updateStatus = (state, messageKey) => {
    if (!contactStatus) return;
    contactStatus.textContent = getTranslation(messageKey);
    contactStatus.dataset.state = state;
  };

  const getLastSubmissionTime = () => {
    try {
      const stored = window.localStorage.getItem(contactRateLimitKey);
      return stored ? Number(stored) : null;
    } catch (_) {
      return null;
    }
  };

  const setLastSubmissionTime = () => {
    try {
      window.localStorage.setItem(contactRateLimitKey, String(Date.now()));
    } catch (_) {
      // ignore storage errors
    }
  };

  if (contactForm) {
    const submitButton = contactForm.querySelector("button[type='submit']");

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const lastSubmission = getLastSubmissionTime();
      if (lastSubmission) {
        const elapsedMs = Date.now() - lastSubmission;
        const limitMs = CONTACT_RATE_LIMIT_MINUTES * 60 * 1000;
        if (elapsedMs < limitMs) {
          updateStatus("rate-limited", "contact_status_rate_limited");
          return;
        }
      }

      updateStatus("sending", "contact_status_sending");
      if (submitButton) {
        submitButton.disabled = true;
      }

      const formData = new FormData(contactForm);
      if (!formData.has("form-name")) {
        formData.append("form-name", contactForm.getAttribute("name") || "contact");
      }

      const encode = (data) =>
        Array.from(data.entries())
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join("&");

      try {
        const response = await fetch(contactForm.getAttribute("action") || window.location.pathname || "/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode(formData),
        });

        if (!response.ok) {
          throw new Error("Network error");
        }

        contactForm.reset();
        updateStatus("success", "contact_status_success");
        setLastSubmissionTime();
        if (typeof window.gtag_report_conversion === "function") {
          window.gtag_report_conversion();
        }
      } catch (error) {
        updateStatus("error", "contact_status_error");
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
        }
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const el = document.querySelector(targetId);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
