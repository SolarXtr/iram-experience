/**
 * ==========================================================
 * iRAM Experience
 * File : public/assets/js/app.js
 * Version : A007.1 MVP
 * ==========================================================
 */

"use strict";

const App = {

    init() {

        this.cache();

        this.bindEvents();

        this.backToTop();

        console.log("iRAM Experience initialized.");

    },

    cache() {

        this.menuToggle = document.getElementById("menuToggle");

        this.navbar = document.getElementById("navbar");

        this.backButton = document.getElementById("backToTop");

        this.navLinks = document.querySelectorAll(".nav-menu a");

    },

    bindEvents() {

        if (this.menuToggle) {

            this.menuToggle.addEventListener("click", () => {

                const isActive = this.navbar.classList.toggle("active");
                this.menuToggle.setAttribute("aria-expanded", isActive);

            });

        }

        this.navLinks.forEach(link => {

            link.addEventListener("click", () => {

                if (window.innerWidth <= 768) {

                    this.navbar.classList.remove("active");

                }

            });

        });

        let isScrolling = false;
        window.addEventListener("scroll", () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    this.backToTop();
                    this.highlightMenu();
                    isScrolling = false;
                });
                isScrolling = true;
            }
        }, { passive: true });

        if (this.backButton) {

            this.backButton.addEventListener("click", () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            });

        }

    },

    backToTop() {

        if (!this.backButton) return;

        if (window.scrollY > 300) {

            this.backButton.classList.add("show");

        } else {

            this.backButton.classList.remove("show");

        }

    },

    highlightMenu() {

        const sections = document.querySelectorAll("section");

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 100;

            const height = section.offsetHeight;

            if (window.scrollY >= top &&
                window.scrollY < top + height) {

                current = section.id;

            }

        });

        this.navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

};

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});