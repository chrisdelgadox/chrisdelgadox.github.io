// ===== DATOS DEL PORTFOLIO =====
const portfolioData = {
    header: {
        name: "CHRISTOPHER RODRÍGUEZ",
        title: "LIDER TÉCNICO",
        description: "<span class='leadership-highlight'>+10 años</span> liderando equipos técnicos y entregando soluciones digitales de alto impacto para clientes internacionales",
        metrics: [
            { number: "40%", label: "Mejora en eficiencia" },
            { number: "25%", label: "Reducción en costos" },
            { number: "100%", label: "Proyectos entregados" },
            { number: "15+", label: "Desarrolladores liderados" }
        ]
    },

    projects: [
        {
            icon: "🚀",
            title: "DIRECCIÓN DE DESARROLLO",
            description: "Lideré la transformación tecnológica en Taranis Galicia S.L., implementando estándares de desarrollo y arquitecturas cloud que mejoraron la eficiencia del equipo en 40%.",
            techStack: ["Gestión de Equipos", "AWS", "Metodologías Ágiles", "CI/CD"],
            result: "⚡ Resultado: 25% reducción en costos de infraestructura",
            links: []
        },
        {
            icon: "🛒",
            title: "ECOMMERCE ENTERPRISE",
            description: "Dirección de plataformas eCommerce B2B/B2C con equipos multidisciplinarios, optimizando performance y conversión para procesar +$2M en transacciones.",
            techStack: ["WooCommerce", "Gestión de Equipos", "High-Availability", "Optimización"],
            result: "",
            links: [
                { text: "Cogollo CBD", url: "https://cogollocbd.es" },
                { text: "Pivi Promos", url: "https://pivipromos.com/" }
            ]
        },
        {
            icon: "🏥",
            title: "PLATAFORMAS HEALTHCARE",
            description: "Dirección de proyectos médicos internacionales con gestión de equipos especializados y cumplimiento de regulaciones HIPAA/GDPR.",
            techStack: ["WordPress", "Sistemas de Citas", "Compliance", "Telemedicina"],
            result: "",
            links: [
                { text: "Medilab RD", url: "https://medilab.com.do/" },
                { text: "CISAM", url: "https://cisam.net/" }
            ]
        },
        {
            icon: "⚡",
            title: "GESTIÓN DE EQUIPOS",
            description: "Liderazgo de +15 desarrolladores en proyectos diversos, implementando metodologías ágiles y mejorando procesos de desarrollo.",
            techStack: ["Agile/Scrum", "Team Building", "Mentoring", "Process Improvement"],
            result: "✅ 5+ equipos multidisciplinarios gestionados",
            links: []
        }
    ],

    technologies: [
        {
            title: "💼 LIDERAZGO & GESTIÓN",
            items: [
                "Gestión de Proyectos", "Liderazgo de Equipos", "Agile & Scrum", 
                "Planificación Estratégica", "Comunicación Ejecutiva", "Team Building"
            ]
        },
        {
            title: "🛠️ DESARROLLO & ARQUITECTURA",
            items: [
                "WordPress Enterprise", "PHP", "JavaScript", "MySQL", 
                "APIs REST/GraphQL", "Arquitectura Escalable"
            ]
        },
        {
            title: "🛒 ECOMMERCE & BUSINESS",
            items: [
                "WooCommerce", "PrestaShop", "Sistemas B2B", "Pasarelas de Pago", 
                "Analytics", "Optimización"
            ]
        },
        {
            title: "☁️ INFRAESTRUCTURA & DEVOPS",
            items: [
                "AWS", "CI/CD", "Docker", "Monitoring", "Security", "Load Balancing"
            ]
        }
    ],

    contact: {
        title: "¿LISTOS PARA TRANSFORMAR SU TECNOLOGÍA?",
        methods: [
            {
                icon: "📧",
                text: "christdelgadox@gmail.com",
                url: "mailto:christdelgadox@gmail.com"
            },
            {
                icon: "💬",
                text: "+58 412-602-15-15",
                url: "https://wa.me/584126021515"
            },
            {
                icon: "💼",
                text: "LinkedIn Ejecutivo",
                url: "https://linkedin.com/in/christopher-rodriguez-delgado-desarrollador"
            },
            {
                icon: "🚀",
                text: "Upwork Profile",
                url: "https://www.upwork.com/freelancers/~017d2053fd6aeb21f6"
            }
        ]
    }
};

// ===== RENDERIZADO DEL CONTENIDO =====
class PortfolioRenderer {
    constructor() {
        this.data = portfolioData;
    }

    renderHeader() {
        const headerHTML = `
            <div class="logo-container">
                <img src="/LOGO.png" alt="Christopher Rodríguez Logo" class="logo">
            </div>
            
            <h1 class="name glow">${this.data.header.name}</h1>
            <p class="title">${this.data.header.title}</p>
            <p style="color: #80ffdb; max-width: 600px; margin: 20px auto;">
                ${this.data.header.description}
            </p>

            <div class="leadership-metrics">
                ${this.data.header.metrics.map(metric => `
                    <div class="metric-card">
                        <div class="metric-number">${metric.number}</div>
                        <div class="metric-label">${metric.label}</div>
                    </div>
                `).join('')}
            </div>
        `;

        document.getElementById('header').innerHTML = headerHTML;
    }

    renderProjects() {
        const projectsHTML = `
            <h2 class="section-title glow">PROYECTOS DE LIDERAZGO</h2>
            <div class="projects-grid">
                ${this.data.projects.map(project => `
                    <div class="project-card">
                        <div class="project-icon">${project.icon}</div>
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-desc">${project.description}</p>
                        <div class="tech-stack">
                            ${project.techStack.map(tech => `
                                <span class="tech-tag">${tech}</span>
                            `).join('')}
                        </div>
                        ${project.links.map(link => `
                            <a href="${link.url}" class="project-link" target="_blank">${link.text}</a>
                        `).join('')}
                        ${project.result ? `<p style="color: #00ff88; font-size: 0.9rem; margin-top: 10px;">${project.result}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        `;

        document.getElementById('projects').innerHTML = projectsHTML;
    }

    renderTechnologies() {
        const technologiesHTML = `
            <h2 class="section-title glow">EXPERTISE TÉCNICO & GESTIÓN</h2>
            <div class="tech-categories">
                ${this.data.technologies.map(category => `
                    <div class="tech-category">
                        <h3>${category.title}</h3>
                        <div class="tech-items">
                            ${category.items.map(item => `
                                <span class="tech-item">${item}</span>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="more-info">
                <p>💼 <strong>¿Buscas liderazgo técnico?</strong> Visita mi <a href="https://linkedin.com/in/christopher-rodriguez-delgado-desarrollador" target="_blank">LinkedIn</a> para detalles completos de experiencia en gestión y dirección de desarrollo.</p>
            </div>
        `;

        document.getElementById('technologies').innerHTML = technologiesHTML;
    }

    renderContact() {
        const contactHTML = `
            <div class="info-message">
                <p>🎯 <strong>¿Necesitas liderazgo técnico para tu organización?</strong> 
                <br>Hablemos sobre <strong>dirección de desarrollo, gestión de equipos o transformación digital</strong>.</p>
            </div>
          
            <h2 class="contact-title glow">${this.data.contact.title}</h2>
            <div class="contact-methods">
                ${this.data.contact.methods.map(method => `
                    <a href="${method.url}" class="contact-method" target="_blank">
                        <span class="contact-icon">${method.icon}</span>
                        <span>${method.text}</span>
                    </a>
                `).join('')}
            </div>
        `;

        document.getElementById('contact').innerHTML = contactHTML;
    }

    init() {
        this.renderHeader();
        this.renderProjects();
        this.renderTechnologies();
        this.renderContact();
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    const portfolio = new PortfolioRenderer();
    portfolio.init();
});
