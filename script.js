    document.addEventListener("DOMContentLoaded", () => {
        // Accordion functionality
        const accordionTriggers = document.querySelectorAll(".accordion-trigger")
    
        accordionTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault()
            const accordionMenu = trigger.parentElement
    
            // Close other open accordions
            document.querySelectorAll(".accordion-menu").forEach((menu) => {
            if (menu !== accordionMenu) {
                menu.classList.remove("active")
            }
            })
    
            // Toggle current accordion
            accordionMenu.classList.toggle("active")
        })
        })
    
        // Close accordions when clicking outside
        document.addEventListener("click", (e) => {
        if (!e.target.closest(".accordion-menu")) {
            document.querySelectorAll(".accordion-menu").forEach((menu) => {
            menu.classList.remove("active")
            })
        }
        })
    
        // Dark mode functionality
        const themeToggleBtn = document.getElementById("theme-toggle-btn")
        const htmlElement = document.documentElement
    
        themeToggleBtn.addEventListener("click", () => {
        htmlElement.classList.toggle("dark")
        const isDark = htmlElement.classList.contains("dark")
        localStorage.setItem("darkMode", isDark)
        themeToggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'
        })
    
        // Load dark mode preference
        const savedDarkMode = localStorage.getItem("darkMode")
        if (savedDarkMode === "true") {
        htmlElement.classList.add("dark")
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>'
        }
    
        // Search form handling
        const searchForm = document.getElementById("search-form")
        searchForm.addEventListener("submit", function (e) {
        e.preventDefault()
        const searchTerm = this.querySelector('input[type="search"]').value
        const searchFormats = Array.from(this.querySelectorAll('input[type="checkbox"]:checked')).map((input) =>
            input.parentNode.textContent.trim(),
        )
    
        console.log("Búsqueda:", searchTerm)
        console.log("Formatos:", searchFormats)
        })
    
        // Topic cards popup
        const topicCards = document.querySelectorAll(".topic-card")
        const popup = document.createElement("div")
        popup.className = "topic-popup"
        document.body.appendChild(popup)
    
        const summaries = {
        "Genética y genómica": "Estudios sobre la estructura y función del genoma de C. elegans...",
        "Control del desarrollo": "Procesos que regulan el desarrollo y diferenciación celular...",
        "Transducción de señales": "Mecanismos de comunicación celular y vías de señalización...",
        "Biología molecular": "Análisis de procesos moleculares y expresión génica...",
        Neurobiología: "Estudio del sistema nervioso y comportamiento...",
        "Evolución y ecología": "Aspectos evolutivos y relaciones ecológicas...",
        }
    
        topicCards.forEach((card) => {
        card.addEventListener("mouseenter", function (e) {
            const rect = this.getBoundingClientRect()
            const title = this.querySelector("h3").textContent
            const summary = summaries[title] || "Resumen no disponible"
    
            popup.textContent = summary
            popup.style.top = `${rect.bottom + window.scrollY}px`
            popup.style.left = `${rect.left + window.scrollX}px`
            popup.style.display = "block"
        })
    
        card.addEventListener("mouseleave", () => {
            popup.style.display = "none"
        })
        })
    
        // Navigation active state
        const navLinks = document.querySelectorAll(".nav-links a")
        navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault()
            navLinks.forEach((l) => l.classList.remove("active"))
            this.classList.add("active")
        })
        })
    
        // Animated header effects
        const header = document.querySelector(".animated-header")
        window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY
        if (scrollPosition > 50) {
            header.style.transform = `translateY(${scrollPosition * 0.1}px)`
            header.style.opacity = 1 - scrollPosition * 0.003
        } else {
            header.style.transform = "translateY(0)"
            header.style.opacity = 1
        }
        })
    
        // Search input focus effects
        const searchInput = document.querySelector(".search-box input")
        searchInput.addEventListener("focus", function () {
        this.parentElement.style.transform = "scale(1.02)"
        })
    
        searchInput.addEventListener("blur", function () {
        this.parentElement.style.transform = "scale(1)"
        })
    
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
        const navLinksContainer = document.querySelector(".nav-links")
        mobileMenuBtn.addEventListener("click", () => {
        navLinksContainer.classList.toggle("active")
        })
    
        // Dynamic background
        function createDynamicBackground() {
        const background = document.getElementById("dynamic-background")
        const colors = ["#8e44ad", "#9b59b6", "#2980b9", "#3498db"]
    
        for (let i = 0; i < 20; i++) {
            const circle = document.createElement("div")
            circle.classList.add("floating-circle")
            circle.style.width = `${Math.random() * 100 + 50}px`
            circle.style.height = circle.style.width
            circle.style.left = `${Math.random() * 100}%`
            circle.style.top = `${Math.random() * 100}%`
            circle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
            circle.style.animationDuration = `${Math.random() * 10 + 10}s`
            circle.style.animationDelay = `${Math.random() * 5}s`
            background.appendChild(circle)
        }
        }
    
        // Parallax effect
        function addParallaxEffect() {
        const parallaxElement = document.querySelector(".parallax")
        document.addEventListener("mousemove", (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5
            const mouseY = e.clientY / window.innerHeight - 0.5
            parallaxElement.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`
        })
        }
    
        // Initialize dynamic background and parallax
        createDynamicBackground()
        addParallaxEffect()
    })
    
    