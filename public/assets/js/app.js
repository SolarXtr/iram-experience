"use strict";

/* ==========================================================================
   Project      : iRAM
   File         : app.js
   Version      : 1.0.0
   Phase        : Experience
   Artifact     : A007.3

   Description  :
   Core JavaScript Foundation

   Author       : iRAM Project
   Last Updated : 2026-07-10
========================================================================== */

/* ==========================================================================
   01. CONFIGURATION
========================================================================== */

const CONFIG = {

    animationDuration: 600,

    navbarHeight: 80,

    revealOffset: 120,

    scrollTopOffset: 500,

    themeStorageKey: "iram-theme"

};

/* ==========================================================================
   02. DOM CACHE
========================================================================== */

const DOM = {

    navbar: document.getElementById("navbar"),

    menuLinks: document.querySelectorAll(".menu a"),

    sections: document.querySelectorAll("section"),

    revealItems: document.querySelectorAll(".reveal"),

    backToTop: document.getElementById("backToTop"),

    themeToggle: document.getElementById("themeToggle"),

    body: document.body

};

/* ==========================================================================
   03. UTILITIES
========================================================================== */

/**
 * Select single element
 */

const $ = (selector) => document.querySelector(selector);

/**
 * Select multiple elements
 */

const $$ = (selector) => document.querySelectorAll(selector);

/**
 * Clamp value
 */

const clamp = (value, min, max) =>
    Math.min(Math.max(value, min), max);

/**
 * Debounce
 */

function debounce(fn, delay = 200) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            fn(...args);

        }, delay);

    };

}

/**
 * Throttle
 */

function throttle(fn, limit = 100) {

    let waiting = false;

    return (...args) => {

        if (waiting) return;

        waiting = true;

        fn(...args);

        setTimeout(() => {

            waiting = false;

        }, limit);

    };

}

/**
 * Smooth scroll
 */

function scrollToElement(target) {

    if (!target) return;

    const position =
        target.offsetTop - CONFIG.navbarHeight;

    window.scrollTo({

        top: position,

        behavior: "smooth"

    });

}

/* ==========================================================================
   04. APPLICATION
========================================================================== */

const App = {

    /**
     * Initialize application
     */

    init() {

        console.info("🚀 iRAM Experience Loaded");

        this.bindEvents();

        this.initializeModules();

    },

    /**
     * Register events
     */

    bindEvents() {

        window.addEventListener(

            "resize",

            debounce(() => {

                console.debug("Resize");

            })

        );

    },

    /**
     * Initialize modules
     */

    initializeModules() {

        Navigation.init();

        Scroll.init();

    }

};

/* ==========================================================================
   05. NAVIGATION MODULE
========================================================================== */

const Navigation = {

    init() {

        this.bindMenuLinks();

    },

    bindMenuLinks() {

        DOM.menuLinks.forEach(link => {

            link.addEventListener("click", event => {

                const href =

                    link.getAttribute("href");

                if (!href.startsWith("#")) return;

                event.preventDefault();

                scrollToElement(

                    document.querySelector(href)

                );

            });

        });

    }

};

/* ==========================================================================
   06. SCROLL MODULE (Foundation)
========================================================================== */

const Scroll = {

    init() {

        window.addEventListener(

            "scroll",

            throttle(() => {

                this.onScroll();

            }, 50)

        );

    },

    onScroll() {

        const y = window.scrollY;

        if (DOM.navbar) {

            if (y > 20) {

                DOM.navbar.classList.add("scrolled");

            } else {

                DOM.navbar.classList.remove("scrolled");

            }

        }

    }

};

/* ==========================================================================
   07. DOCUMENT READY
========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        App.init();

    }

);

/* ==========================================================================
   END OF PART 1
========================================================================== */
/* ==========================================================================
   08. ACTIVE NAVIGATION
========================================================================== */

const ActiveNavigation = {

    init() {

        this.update();

        window.addEventListener(
            "scroll",
            throttle(() => {

                this.update();

            }, 100)
        );

    },

    update() {

        const scrollPosition =
            window.scrollY + CONFIG.navbarHeight + 40;

        DOM.sections.forEach(section => {

            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute("id");

            if (
                scrollPosition >= top &&
                scrollPosition < bottom
            ) {

                DOM.menuLinks.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") === "#" + id
                    ) {

                        link.classList.add("active");

                    }

                });

            }

        });

    }

};

/* ==========================================================================
   09. STICKY NAVBAR
========================================================================== */

const StickyNavbar = {

    init() {

        this.update();

        window.addEventListener(
            "scroll",
            throttle(() => {

                this.update();

            }, 50)
        );

    },

    update() {

        if (!DOM.navbar) return;

        if (window.scrollY > 40) {

            DOM.navbar.classList.add("scrolled");

        } else {

            DOM.navbar.classList.remove("scrolled");

        }

    }

};

/* ==========================================================================
   10. SMOOTH SCROLL
========================================================================== */

const SmoothScroll = {

    init() {

        DOM.menuLinks.forEach(link => {

            link.addEventListener("click", event => {

                const href =
                    link.getAttribute("href");

                if (!href.startsWith("#")) return;

                const target =
                    document.querySelector(href);

                if (!target) return;

                event.preventDefault();

                scrollToElement(target);

            });

        });

    }

};

/* ==========================================================================
   11. HEADER SHADOW EFFECT
========================================================================== */

const HeaderEffects = {

    init() {

        this.onScroll();

        window.addEventListener(
            "scroll",
            throttle(() => {

                this.onScroll();

            }, 60)
        );

    },

    onScroll() {

        if (!DOM.navbar) return;

        if (window.scrollY > 10) {

            DOM.navbar.style.boxShadow =
                "0 8px 24px rgba(0,0,0,.08)";

        } else {

            DOM.navbar.style.boxShadow =
                "none";

        }

    }

};

/* ==========================================================================
   12. UPDATE APPLICATION INITIALIZER
========================================================================== */

App.initializeModules = function () {

    Navigation.init();

    Scroll.init();

    ActiveNavigation.init();

    StickyNavbar.init();

    SmoothScroll.init();

    HeaderEffects.init();

};

/* ==========================================================================
   END OF PART 2
========================================================================== */
/* ==========================================================================
   13. SCROLL REVEAL
========================================================================== */

const ScrollReveal = {

    observer: null,

    init() {

        if (!("IntersectionObserver" in window)) {

            DOM.revealItems.forEach(item => {
                item.classList.add("visible");
            });

            return;
        }

        this.observer = new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        this.observer.unobserve(entry.target);

                    }

                });

            },

            {
                root: null,
                rootMargin: "0px",
                threshold: 0.15
            }

        );

        DOM.revealItems.forEach(item => {

            this.observer.observe(item);

        });

    }

};

/* ==========================================================================
   14. BACK TO TOP
========================================================================== */

const BackToTop = {

    init() {

        if (!DOM.backToTop) return;

        this.update();

        window.addEventListener(

            "scroll",

            throttle(() => {

                this.update();

            }, 100)

        );

        DOM.backToTop.addEventListener(

            "click",

            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }

        );

    },

    update() {

        if (window.scrollY > CONFIG.scrollTopOffset) {

            DOM.backToTop.classList.add("show");

        } else {

            DOM.backToTop.classList.remove("show");

        }

    }

};

/* ==========================================================================
   15. THEME FOUNDATION
========================================================================== */

const Theme = {

    current: "light",

    init() {

        const savedTheme =

            localStorage.getItem(

                CONFIG.themeStorageKey

            );

        if (savedTheme) {

            this.current = savedTheme;

        }

        this.apply();

        if (!DOM.themeToggle) return;

        DOM.themeToggle.addEventListener(

            "click",

            () => {

                this.toggle();

            }

        );

    },

    toggle() {

        this.current =

            this.current === "light"

            ? "dark"

            : "light";

        localStorage.setItem(

            CONFIG.themeStorageKey,

            this.current

        );

        this.apply();

    },

    apply() {

        document.documentElement.setAttribute(

            "data-theme",

            this.current

        );

    }

};

/* ==========================================================================
   16. SECTION OBSERVER
========================================================================== */

const SectionObserver = {

    init() {

        DOM.sections.forEach(section => {

            section.setAttribute(

                "data-observed",

                "true"

            );

        });

    }

};

/* ==========================================================================
   17. PERFORMANCE
========================================================================== */

const PerformanceMonitor = {

    init() {

        window.addEventListener(

            "load",

            () => {

                const timing =

                    performance.now();

                console.info(

                    `⚡ iRAM loaded in ${timing.toFixed(0)} ms`

                );

            }

        );

    }

};

/* ==========================================================================
   18. UPDATE APPLICATION INITIALIZER
========================================================================== */

App.initializeModules = function () {

    Navigation.init();

    Scroll.init();

    ActiveNavigation.init();

    StickyNavbar.init();

    SmoothScroll.init();

    HeaderEffects.init();

    ScrollReveal.init();

    BackToTop.init();

    Theme.init();

    SectionObserver.init();

    PerformanceMonitor.init();

};

/* ==========================================================================
   END OF PART 3
========================================================================== */

/* ==========================================================================
   19. MOBILE NAVIGATION FOUNDATION
========================================================================== */

const MobileNavigation = {

    init() {

        const toggle =
            document.getElementById("menuToggle");

        if (!toggle || !DOM.navbar) return;

        toggle.addEventListener("click", () => {

            DOM.navbar.classList.toggle("menu-open");

        });

    }

};

/* ==========================================================================
   20. APPLICATION UTILITIES
========================================================================== */

const Utilities = {

    scrollToTop() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    },

    getCurrentSection() {

        const position =
            window.scrollY + CONFIG.navbarHeight;

        let current = null;

        DOM.sections.forEach(section => {

            if (

                position >= section.offsetTop &&
                position < section.offsetTop + section.offsetHeight

            ) {

                current = section.id;

            }

        });

        return current;

    }

};

/* ==========================================================================
   21. ERROR HANDLER
========================================================================== */

window.addEventListener(

    "error",

    event => {

        console.error(

            "[iRAM]",

            event.message

        );

    }

);

/* ==========================================================================
   22. VERSION INFORMATION
========================================================================== */

const VERSION = {

    project: "iRAM",

    artifact: "A007.3",

    version: "1.0.0",

    build: "2026.07"

};

console.table(VERSION);

/* ==========================================================================
   23. REFACTOR INITIALIZER
========================================================================== */

App.initializeModules = function () {

    StickyNavbar.init();

    ActiveNavigation.init();

    ScrollReveal.init();

    BackToTop.init();

    Theme.init();

    MobileNavigation.init();

    SectionObserver.init();

    PerformanceMonitor.init();

};

/* ==========================================================================
   24. FREEZE CONFIGURATION
========================================================================== */

Object.freeze(CONFIG);

Object.freeze(VERSION);

/* ==========================================================================
   25. APPLICATION READY
========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        console.group("🚀 iRAM");

        console.info(

            "Initializing Application..."

        );

        App.init();

        console.info(

            "Application Ready"

        );

        console.groupEnd();

    }

);

/* ==========================================================================
   END OF FILE

   Project : iRAM

   File : public/assets/js/app.js

   Version : 1.0.0

   Status : Production Foundation

========================================================================== */
