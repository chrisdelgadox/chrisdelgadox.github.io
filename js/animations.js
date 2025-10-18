// ===== ANIMACIONES Y EFECTOS =====
class PortfolioAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.animateName();
        this.animateMetrics();
        this.setupCardHover();
        this.setupScrollAnimations();
    }

    // Animación de escritura del nombre
    animateName() {
        const nameElement = document.querySelector('.name');
        if (!nameElement) return;

        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Animación de contadores en métricas
    animateMetrics() {
        const metrics = document.querySelectorAll('.metric-number');
        if (!metrics.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateMetricCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        metrics.forEach(metric => observer.observe(metric));
    }

    animateMetricCounter(metricElement) {
        const originalText = metricElement.textContent;
        const isPercentage = originalText.includes('%');
        const target = parseInt(originalText);
        
        let current = 0;
        const increment = target / 30; // Más suave
        const duration = 1500; // 1.5 segundos
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                metricElement.textContent = target + (isPercentage ? '%' : '+');
                clearInterval(timer);
                
                // Efecto de pulso al completar
                metricElement.classList.add('pulse');
                setTimeout(() => metricElement.classList.remove('pulse'), 600);
            } else {
                metricElement.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
            }
        }, duration / 30);
    }

    // Efectos hover en tarjetas
    setupCardHover() {
        const cards = document.querySelectorAll('.project-card, .tech-category, .metric-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 15px 40px rgba(0, 255, 136, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
    }

    // Animaciones al hacer scroll
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.project-card, .tech-category');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Configurar estado inicial
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Efecto de partículas para el fondo matrix (opcional)
    createMatrixParticles() {
        const matrixBg = document.querySelector('.matrix-bg');
        if (!matrixBg) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = '#00ff88';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
            
            matrixBg.appendChild(particle);
        }

        // Agregar keyframes para flotar
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(0) translateX(0); opacity: 0.1; }
                50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
                100% { transform: translateY(-40px) translateX(20px); opacity: 0.1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== INICIALIZACIÓN DE ANIMACIONES =====
document.addEventListener('DOMContentLoaded', function() {
    new PortfolioAnimations();
});