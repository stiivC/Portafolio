// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos del DOM
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Menú hamburguesa para móviles
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navegación suave al hacer scroll
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para la navbar fija
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cambiar navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    

    
    // Observador de intersección para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                

            }
        });
    }, observerOptions);
    
    // Observar todas las secciones
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    

    

    
    // Efecto parallax suave para las imágenes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.profile-image-large img, .project-image img');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Calcular experiencia como desarrollador desde el 16 de junio de 2025
    function calculateDeveloperExperience() {
        const startDate = new Date('2025-06-16');
        const currentDate = new Date();
        
        // Calcular diferencia en milisegundos
        const timeDiff = currentDate.getTime() - startDate.getTime();
        
        // Convertir a días
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        
        // Convertir a meses (aproximado)
        const monthsDiff = Math.floor(daysDiff / 30.44);
        
        // Convertir a años (aproximado)
        const yearsDiff = (daysDiff / 365.25);
        
        let experienceText = '';
        
        if (yearsDiff >= 1) {
            const years = Math.floor(yearsDiff);
            const months = Math.floor((yearsDiff - years) * 12);
            if (months > 0) {
                experienceText = `${years} año${years > 1 ? 's' : ''} ${months} mes${months > 1 ? 'es' : ''}`;
            } else {
                experienceText = `${years} año${years > 1 ? 's' : ''}`;
            }
        } else if (monthsDiff >= 1) {
            experienceText = `${monthsDiff} mes${monthsDiff > 1 ? 'es' : ''}`;
        } else {
            experienceText = `${daysDiff} día${daysDiff > 1 ? 's' : ''}`;
        }
        
        return experienceText;
    }
    
    // Calcular número de proyectos destacados basándose en la experiencia
    function calculateProjectsCount() {
        const startDate = new Date('2025-06-16');
        const currentDate = new Date();
        
        // Calcular diferencia en días
        const timeDiff = currentDate.getTime() - startDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        
        // Calcular proyectos basándose en el tiempo transcurrido
        // Asumiendo que en promedio se completa 1 proyecto cada 2-3 meses
        let projectsCount = 0;
        
        if (daysDiff >= 90) { // 3 meses
            projectsCount = Math.floor(daysDiff / 90);
        } else if (daysDiff >= 60) { // 2 meses
            projectsCount = 1;
        } else if (daysDiff >= 30) { // 1 mes
            projectsCount = 1;
        }
        
        // Limitar a un máximo de 5 proyectos para mantener realismo
        return Math.min(projectsCount, 5);
    }
    
    // Contador animado para las estadísticas
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            let target;
            let suffix = '';
            
            if (counter.id === 'developer-experience') {
                // Para la experiencia como desarrollador, usar el texto calculado
                const experienceText = calculateDeveloperExperience();
                counter.textContent = experienceText;
                return; // No animar este contador
            } else if (counter.id === 'projects-count') {
                // Para los proyectos, usar el cálculo automático
                const projectsCount = calculateProjectsCount();
                counter.textContent = projectsCount + '+';
                return; // No animar este contador
            } else if (counter.textContent.includes('100%')) {
                target = 100;
                suffix = '%';
            }
            
            if (target) {
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };
                
                updateCounter();
            }
        });
    }
    
    // Iniciar contadores cuando la sección de perfil esté visible
    const profileSection = document.querySelector('#perfil');
    if (profileSection) {
        const profileObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateCounters, 500);
                    // Actualizar la experiencia como desarrollador y proyectos inmediatamente
                    updateDeveloperExperience();
                    updateProjectsCount();
                    profileObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        profileObserver.observe(profileSection);
    }
    
    // Función para actualizar la experiencia como desarrollador
    function updateDeveloperExperience() {
        const experienceElement = document.getElementById('developer-experience');
        if (experienceElement) {
            experienceElement.textContent = calculateDeveloperExperience();
        }
    }
    
    // Función para actualizar el contador de proyectos
    function updateProjectsCount() {
        const projectsElement = document.getElementById('projects-count');
        if (projectsElement) {
            const projectsCount = calculateProjectsCount();
            projectsElement.textContent = projectsCount + '+';
        }
    }
    
    // Actualizar la experiencia y proyectos cada día para mantenerlos al día
    setInterval(() => {
        updateDeveloperExperience();
        updateProjectsCount();
    }, 24 * 60 * 60 * 1000); // Cada 24 horas
    
    // Efecto de escritura para el título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Aplicar efecto de escritura al título del perfil
    const profileTitle = document.querySelector('.profile-text h3');
    if (profileTitle) {
        const originalText = profileTitle.textContent;
        typeWriter(profileTitle, originalText, 80);
    }
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Preloader (opcional)
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
    
    // Efecto de hover para las tarjetas de proyectos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto de hover para las tarjetas de educación
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Navegación activa según la sección visible
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Agregar estilos para el enlace activo
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: #4a90e2 !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
        

    `;
    document.head.appendChild(style);
    
    console.log('Portafolio cargado exitosamente! 🚀');
});
