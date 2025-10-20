// ===== CHATBOT FUNCTIONALITY =====
class ProfessionalChatbot {
    constructor() {
        this.N8N_WEBHOOK_URL = 'https://n8n-chris-pnbq.onrender.com/webhook/ad45c7ad-e83d-4d21-85ce-8992736d589b';
        this.conversationHistory = [];
        this.isChatbotOpen = false;
        this.init();
    }

    init() {
        this.renderChatbot();
        this.setupEventListeners();
    }

    renderChatbot() {
        const chatbotHTML = `
            <div class="chatbot-wrapper">
                <div class="chatbot-container" id="chatbotContainer">
                    <div class="chatbot-header">
                        <span>🤖 ASISTENTE PROFESIONAL</span>
                        <button class="close-chatbot" id="closeChatbot">×</button>
                    </div>
                    <div class="chatbot-messages" id="chatbotMessages">
                        <div class="message bot-message">
                            <strong>Hola, soy el asistente de Christopher Rodríguez</strong><br><br>
                            Puedo ayudarte con información sobre:
                            • Dirección de desarrollo técnico
                            • Gestión de proyectos WordPress Enterprise  
                            • Presupuestos y cotizaciones
                            • Liderazgo de equipos técnicos
                            <br><br>
                            <em>¿En qué proyecto necesitas asistencia profesional?</em>
                        </div>
                    </div>
                    <div class="chatbot-input-container">
                        <input type="text" class="chatbot-input" id="chatbotInput" 
                               placeholder="Escribe tu consulta profesional...">
                        <button class="chatbot-send-btn" id="chatbotSendBtn">Enviar</button>
                        <div class="chatbot-warning">
                            💡 Solo consultas profesionales sobre proyectos y servicios
                        </div>
                    </div>
                </div>
                
                <div class="chatbot-trigger" id="chatbotTrigger">
                    <span>💬 ¿Tienes un proyecto?</span>
                </div>
            </div>
        `;

        document.getElementById('chatbot-container').innerHTML = chatbotHTML;
    }

    setupEventListeners() {
        // Botón de toggle
        document.getElementById('chatbotTrigger').addEventListener('click', () => this.toggle());
        
        // Botón de cerrar
        document.getElementById('closeChatbot').addEventListener('click', () => this.toggle());
        
        // Botón enviar
        document.getElementById('chatbotSendBtn').addEventListener('click', () => this.sendMessage());
        
        // Enter para enviar
        document.getElementById('chatbotInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Cerrar chatbot haciendo clic fuera
        document.addEventListener('click', (event) => {
            const chatbotWrapper = document.querySelector('.chatbot-wrapper');
            const chatbotTrigger = document.querySelector('.chatbot-trigger');
            
            if (this.isChatbotOpen && 
                !chatbotWrapper.contains(event.target) && 
                !chatbotTrigger.contains(event.target)) {
                this.toggle();
            }
        });
    }

    toggle() {
        const container = document.getElementById('chatbotContainer');
        this.isChatbotOpen = !this.isChatbotOpen;
        container.style.display = this.isChatbotOpen ? 'flex' : 'none';
        
        if (this.isChatbotOpen) {
            setTimeout(() => {
                document.getElementById('chatbotInput').focus();
            }, 300);
        } else {
            this.clearConversationAfterDelay();
        }
    }

    async sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        
        if (!message) return;

        // Validar si es consulta profesional
        if (!this.isProfessionalQuery(message)) {
            this.addMessage(message, 'user');
            input.value = '';
            this.addMessage('Solo puedo ayudarte con consultas profesionales sobre dirección técnica, gestión de proyectos y desarrollo enterprise. Si tienes un proyecto específico, contáctame por WhatsApp: +58 412-602-15-15', 'bot');
            return;
        }

        this.addMessage(message, 'user');
        input.value = '';

        const typingId = this.showTypingIndicator();
        this.disableInput(true);

        try {
            console.log('🔄 Enviando mensaje a n8n...', message);
            
            const response = await fetch(this.N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    history: this.conversationHistory,
                    timestamp: new Date().toISOString(),
                    source: 'website_chatbot'
                })
            });

            console.log('📨 Respuesta HTTP:', response.status);

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log('✅ Respuesta recibida:', data);
            
            this.removeTypingIndicator(typingId);
            this.disableInput(false);

            if (data.response) {
                this.addMessage(data.response, 'bot');
                this.conversationHistory.push(
                    { role: 'user', content: message },
                    { role: 'assistant', content: data.response }
                );
            } else {
                throw new Error('Respuesta vacía del servidor');
            }

        } catch (error) {
            console.error('❌ Error:', error);
            this.removeTypingIndicator(typingId);
            this.disableInput(false);
            this.addMessage('⚠️ Error de conexión. Para consultas urgentes, contáctame directamente por WhatsApp: +58 412-602-15-15', 'bot');
        }
    }

    isProfessionalQuery(message) {
        const professionalKeywords = [
            'proyecto', 'presupuesto', 'servicio', 'contratar', 'trabajo',
            'colaborar', 'cotización', 'precio', 'costo', 'experiencia',
            'cv', 'portafolio', 'tecnología', 'desarrollo', 'diseño',
            'consultoría', 'habilidades', 'tecnologías', 'tarifas',
            'disponibilidad', 'tiempo', 'entregables', 'wordpress',
            'php', 'aws', 'ecommerce', 'woocommerce', 'gestión',
            'equipo', 'liderazgo', 'director', 'cto', 'manager',
            'web', 'aplicación', 'app', 'software', 'sistema'
        ];

        const messageLower = message.toLowerCase();
        return professionalKeywords.some(keyword => 
            messageLower.includes(keyword)
        );
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'message bot-message';
        typingDiv.innerHTML = '💭 <em>Escribiendo...</em>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return 'typing-indicator';
    }

    removeTypingIndicator(id) {
        const typingElement = document.getElementById(id);
        if (typingElement) {
            typingElement.remove();
        }
    }

    disableInput(disabled) {
        const input = document.getElementById('chatbotInput');
        const button = document.getElementById('chatbotSendBtn');
        
        input.disabled = disabled;
        button.disabled = disabled;
        button.textContent = disabled ? 'Enviando...' : 'Enviar';
    }

    clearConversationAfterDelay() {
        // Limpiar conversación después de 10 minutos de inactividad
        setTimeout(() => {
            if (!this.isChatbotOpen && this.conversationHistory.length > 0) {
                console.log('🔄 Limpiando historial de conversación...');
                this.conversationHistory = [];
                
                const messagesContainer = document.getElementById('chatbotMessages');
                if (messagesContainer) {
                    messagesContainer.innerHTML = `
                        <div class="message bot-message">
                            <strong>Hola, soy el asistente de Christopher Rodríguez</strong><br><br>
                            Puedo ayudarte con información sobre:
                            • Dirección de desarrollo técnico
                            • Gestión de proyectos WordPress Enterprise  
                            • Presupuestos y cotizaciones
                            • Liderazgo de equipos técnicos
                            <br><br>
                            <em>¿En qué proyecto necesitas asistencia profesional?</em>
                        </div>
                    `;
                }
            }
        }, 600000); // 10 minutos
    }
}

// ===== INICIALIZACIÓN GLOBAL DEL CHATBOT =====
let chatbot;

document.addEventListener('DOMContentLoaded', function() {
    chatbot = new ProfessionalChatbot();
});
