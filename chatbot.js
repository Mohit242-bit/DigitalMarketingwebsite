/**
 * Brandformance AI Chat Bot
 * File: chatbot.js
 * Description: Real AI-powered chat bot with lead capture
 * Author: Brandformance Team
 */

class AIChatBot {
    constructor() {
        // ⚠️ IMPORTANT: Replace with your FREE Gemini API key
        this.API_KEY = 'AIzaSyBCYY9M_IAXDyVKNBC_32BakmCw81T3DNg';
        this.API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

        this.conversation = [];
        this.isOpen = false;
        this.isTyping = false;

        this.init();
    }

    init() {
        this.bindEvents();
        this.setupWelcomeMessage();
        this.addSystemContext();
    }

    // IMPROVED SYSTEM PROMPT - Replace in your chatbot.js

    addSystemContext() {
        this.systemPrompt = `You are Alex, an AI marketing assistant for Brandformance, a professional digital marketing agency. 

Your personality:
- Marketing expert who asks specific, qualifying questions
- Results-focused and data-driven
- Professional but conversational
- Always curious about the user's specific situation

IMPORTANT: When users ask about a specific service, dive deep into that service rather than listing all services.

Services & Specific Responses:

**SEO Optimization:**
- Ask about current rankings, traffic, competitors
- Mention technical audits, keyword research, content optimization
- Common problems: not ranking, dropped rankings, low traffic
- Timeframe: 3-6 months for significant results

**PPC Advertising:**
- Ask about current ad spend, goals, platforms
- Mention Google Ads, Facebook/Instagram ads, LinkedIn ads
- Focus on ROI, cost per lead, immediate results
- Typical results: 4-6x return on ad spend

**Social Media Marketing:**
- Ask which platforms they care about most
- Mention content strategy, community management, paid social
- Focus on engagement, brand awareness, lead generation
- Different strategies for B2B vs B2C

**Content Marketing:**
- Ask about current content efforts and challenges
- Mention blog strategy, video content, email campaigns
- Focus on lead generation and thought leadership
- Long-term strategy that compounds over time

**Analytics & Insights:**
- Ask what they're currently tracking (or not tracking)
- Mention dashboards, conversion tracking, performance analysis
- Help them understand what metrics matter most
- Focus on turning data into actionable insights

**Brand Strategy:**
- Ask about current brand positioning and challenges
- Mention market research, competitive analysis, brand guidelines
- Focus on differentiation and consistent messaging
- Foundation for all other marketing efforts

Key Stats to Use:
- 500+ clients served across all industries
- 300% average ROI increase
- 24/7 support and monthly reporting
- 150% average increase in organic traffic
- 85% average increase in social engagement

Conversation Flow:
1. Understand their specific challenge in detail
2. Ask qualifying questions about their business
3. Provide specific insights about their situation
4. Explain how Brandformance can help their exact problem
5. Guide toward a free consultation when appropriate

Always ask follow-up questions to understand:
- Their industry/business type
- Current situation (what's working/not working)
- Specific goals and timeline
- Budget range (when relevant)
- Previous marketing experience

If someone mentions booking, consultation, or wants to talk to someone, immediately offer to collect their details for a free consultation.

Keep responses conversational but informative. Use emojis occasionally but professionally. Always focus on their specific needs rather than generic service descriptions.`;
    }

    bindEvents() {
        // Chat toggle
        document.getElementById('chatToggle').addEventListener('click', () => {
            this.toggleChat();
        });

        // Minimize button
        document.getElementById('minimizeBtn').addEventListener('click', () => {
            this.closeChat();
        });

        // Send message
        document.getElementById('sendBtn').addEventListener('click', () => {
            this.handleSendMessage();
        });

        // Enter key to send
        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });

        // Quick action buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.getAttribute('data-message');
                this.sendMessage(message);
            });
        });

        // Lead capture modal
        document.getElementById('modalClose').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('leadCaptureForm').addEventListener('submit', (e) => {
            this.handleLeadSubmission(e);
        });

        // Close modal on overlay click
        document.getElementById('leadModalOverlay').addEventListener('click', (e) => {
            if (e.target.id === 'leadModalOverlay') {
                this.closeModal();
            }
        });
    }

    setupWelcomeMessage() {
        // Hide notification badge after first interaction
        setTimeout(() => {
            const badge = document.getElementById('notificationBadge');
            if (badge) badge.style.display = 'none';
        }, 5000);
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        const chatWindow = document.getElementById('chatWindow');
        const chatToggle = document.getElementById('chatToggle');
        const chatIcon = chatToggle.querySelector('.chat-bubble-icon');
        const closeIcon = chatToggle.querySelector('.close-icon');
        const badge = document.getElementById('notificationBadge');

        chatWindow.classList.add('active');
        chatToggle.classList.add('active');
        chatIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        badge.style.display = 'none';

        this.isOpen = true;

        // Focus input
        setTimeout(() => {
            document.getElementById('chatInput').focus();
        }, 300);

        // Track analytics
        this.trackEvent('chat_opened');
    }

    closeChat() {
        const chatWindow = document.getElementById('chatWindow');
        const chatToggle = document.getElementById('chatToggle');
        const chatIcon = chatToggle.querySelector('.chat-bubble-icon');
        const closeIcon = chatToggle.querySelector('.close-icon');

        chatWindow.classList.remove('active');
        chatToggle.classList.remove('active');
        chatIcon.style.display = 'block';
        closeIcon.style.display = 'none';

        this.isOpen = false;
    }

    async handleSendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();

        if (!message || this.isTyping) return;

        // Clear input
        input.value = '';

        // Add user message to chat
        this.addUserMessage(message);

        // Hide quick actions after first message
        this.hideQuickActions();

        // Check for special commands
        if (this.handleSpecialCommands(message)) {
            return;
        }

        // Send to AI
        await this.sendToAI(message);
    }

    sendMessage(message) {
        document.getElementById('chatInput').value = message;
        this.handleSendMessage();
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">👤</div>
            <div class="message-content">
                <div class="message-text">${this.escapeHtml(message)}</div>
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();

        // Track message
        this.trackEvent('user_message_sent', { message: message });
    }

    async addAIMessage(message) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="message-text">${this.formatAIResponse(message)}</div>
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();

        // Track AI response
        this.trackEvent('ai_message_sent', { message: message });
    }

    async sendToAI(userMessage) {
        this.showTyping();

        try {
            // Add user message to conversation history
            this.conversation.push({
                role: 'user',
                parts: [{ text: userMessage }]
            });

            // Prepare the full conversation with system context
            const fullConversation = [
                {
                    role: 'user',
                    parts: [{ text: this.systemPrompt }]
                },
                ...this.conversation
            ];

            const response = await fetch(`${this.API_URL}?key=${this.API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: fullConversation
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.candidates[0].content.parts[0].text;

            // Add AI response to conversation history
            this.conversation.push({
                role: 'model',
                parts: [{ text: aiResponse }]
            });

            this.hideTyping();
            await this.addAIMessage(aiResponse);

        } catch (error) {
            console.error('AI Error:', error);
            this.hideTyping();

            // Fallback response
            const fallbackResponse = this.getFallbackResponse(userMessage);
            await this.addAIMessage(fallbackResponse);
        }
    }

    getFallbackResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('consultation')) {
            return "I'd love to help you book a consultation! Let me collect a few details from you. 📅";
        } else if (lowerMessage.includes('service') || lowerMessage.includes('help')) {
            return "We offer SEO, PPC, Social Media Marketing, Content Marketing, Analytics, and Brand Strategy. Which area interests you most?";
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return "Our pricing depends on your specific needs. Let's discuss your goals in a free consultation to provide accurate pricing. Would you like to schedule one?";
        } else {
            return "I'm having a brief connection issue, but I'm here to help! Could you tell me more about your marketing goals or if you'd like to schedule a consultation?";
        }
    }

    // IMPROVED SEO-SPECIFIC RESPONSES
    // Add this to your chatbot.js file in the handleSpecialCommands function

    handleSpecialCommands(message) {
        const lowerMessage = message.toLowerCase();

        // SEO Help - Specific response
        if (lowerMessage.includes('i need help with seo') || lowerMessage.includes('seo help')) {
            setTimeout(() => {
                this.addAIMessage(`Perfect! I'd love to help you dominate search results. 🎯

Our SEO optimization includes:
• **Technical SEO audits** - Fix what's holding you back
• **Keyword research** - Target the right search terms  
• **Content optimization** - Make your pages rank higher
• **Link building** - Build authority and trust

Quick question: What's your biggest SEO challenge right now?
- Not ranking on Google at all?
- Rankings dropped recently?  
- Can't beat your competitors?
- Website traffic is too low?`);
            }, 500);
            return true;
        }

        // PPC Help - Specific response
        if (lowerMessage.includes('i want to book a consultation') || lowerMessage.includes('ppc') || lowerMessage.includes('google ads')) {
            setTimeout(() => {
                this.addAIMessage(`Excellent choice! PPC can deliver immediate results. 🚀

Our PPC management includes:
• **Google Ads campaigns** - Get found instantly
• **Social media advertising** - Facebook, Instagram, LinkedIn
• **Campaign optimization** - Maximize your ROI
• **Performance tracking** - See exactly what's working

What's driving your interest in PPC? Looking for:
- Immediate traffic boost?
- More qualified leads?
- Better ROI from current ads?
- Launch a new product/service?`);
            }, 500);
            return true;
        }

        // Social Media Help
        if (lowerMessage.includes('social media') || lowerMessage.includes('social')) {
            setTimeout(() => {
                this.addAIMessage(`Great! Social media is crucial for brand growth. 📱

Our social media marketing includes:
• **Content strategy** - Engaging posts that convert
• **Community management** - Build loyal followers
• **Paid social campaigns** - Targeted advertising
• **Analytics & reporting** - Track your growth

Which platforms are most important for your business?
- LinkedIn (B2B focus)?
- Instagram/Facebook (B2C)?
- TikTok (younger audience)?
- All of the above?`);
            }, 500);
            return true;
        }

        // Content Marketing Help
        if (lowerMessage.includes('content') || lowerMessage.includes('blog')) {
            setTimeout(() => {
                this.addAIMessage(`Smart thinking! Content is what drives long-term growth. ✍️

Our content marketing includes:
• **Blog strategy** - Articles that rank and convert
• **Video content** - Engaging visual storytelling
• **Email campaigns** - Nurture your audience
• **Brand storytelling** - Connect with your customers

What type of content challenges are you facing?
- Don't know what to write about?
- No time to create content?
- Content isn't generating leads?
- Need a complete content strategy?`);
            }, 500);
            return true;
        }

        // Analytics Help
        if (lowerMessage.includes('analytics') || lowerMessage.includes('tracking') || lowerMessage.includes('data')) {
            setTimeout(() => {
                this.addAIMessage(`Perfect! You can't improve what you don't measure. 📊

Our analytics & insights include:
• **Performance tracking** - See what's actually working
• **Custom dashboards** - All your data in one place
• **Conversion analysis** - Understand your customer journey
• **Strategic recommendations** - Data-driven growth plans

What analytics challenges are you facing?
- Don't know what to track?
- Have data but can't interpret it?
- Need better reporting tools?
- Want to improve conversions?`);
            }, 500);
            return true;
        }

        // Brand Strategy Help
        if (lowerMessage.includes('brand') || lowerMessage.includes('branding')) {
            setTimeout(() => {
                this.addAIMessage(`Excellent! Strong branding is the foundation of everything. 🎨

Our brand strategy includes:
• **Brand positioning** - Stand out from competitors
• **Market research** - Understand your audience
• **Visual identity** - Professional, memorable design
• **Brand guidelines** - Consistent messaging everywhere

What's your biggest branding challenge?
- Need to rebrand completely?
- Inconsistent brand messaging?
- Don't stand out from competitors?
- New business needing brand identity?`);
            }, 500);
            return true;
        }

        // Booking intent
        if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('consultation') || lowerMessage.includes('meeting')) {
            setTimeout(() => {
                this.addAIMessage("Perfect! I'd love to set up your free consultation. Let me get a few details from you. 📅");
                setTimeout(() => {
                    this.showLeadModal();
                }, 1000);
            }, 500);
            return true;
        }

        // ROI Calculator
        if (lowerMessage.includes('roi') || lowerMessage.includes('calculator') || lowerMessage.includes('calculate')) {
            setTimeout(() => {
                this.addAIMessage(`Great question! Let me help you estimate your potential ROI. 📈

Our clients typically see:
• **300% average ROI increase** across all services
• **150% boost in organic traffic** (SEO)
• **4-6x return** on PPC ad spend
• **85% increase** in social engagement

To give you a personalized estimate, what's your:
- Current monthly marketing spend?
- Main business goal (leads, sales, awareness)?
- Industry/business type?`);
            }, 500);
            return true;
        }

        return false;
    }

    showTyping() {
        this.isTyping = true;
        const typingIndicator = document.getElementById('typingIndicator');
        const sendBtn = document.getElementById('sendBtn');

        typingIndicator.style.display = 'flex';
        sendBtn.disabled = true;
        this.scrollToBottom();
    }

    hideTyping() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typingIndicator');
        const sendBtn = document.getElementById('sendBtn');

        typingIndicator.style.display = 'none';
        sendBtn.disabled = false;
    }

    hideQuickActions() {
        const quickActions = document.getElementById('quickActions');
        if (quickActions && this.conversation.length > 0) {
            quickActions.style.display = 'none';
        }
    }

    showLeadModal() {
        const modal = document.getElementById('leadModalOverlay');
        modal.style.display = 'flex';

        // Focus first input
        setTimeout(() => {
            modal.querySelector('input[name="name"]').focus();
        }, 100);

        this.trackEvent('lead_modal_opened');
    }

    closeModal() {
        const modal = document.getElementById('leadModalOverlay');
        modal.style.display = 'none';
    }

    async handleLeadSubmission(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const leadData = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company'),
            challenge: formData.get('challenge'),
            timestamp: new Date().toISOString(),
            source: 'ai_chatbot'
        };

        // Here you would normally send to your backend
        console.log('Lead captured:', leadData);

        // For now, we'll simulate success
        this.closeModal();

        // Add success message to chat
        setTimeout(() => {
            this.addAIMessage(`Thanks ${leadData.name}! 🎉 I've got your details. Our team will reach out within 24 hours to schedule your free consultation. In the meantime, feel free to ask me any questions about our services!`);
        }, 500);

        // Track conversion
        this.trackEvent('lead_submitted', leadData);

        // You can integrate with your CRM here
        // await this.sendToCRM(leadData);

        // Reset form
        e.target.reset();
    }

    // Utility Functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatAIResponse(text) {
        // Convert markdown-like formatting to HTML
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/`(.*?)`/g, '<code>$1</code>');
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatMessages');
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }

    trackEvent(eventName, data = {}) {
        // Analytics tracking - integrate with Google Analytics, etc.
        console.log('Chat Event:', eventName, data);

        // Example Google Analytics integration:
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', eventName, {
        //         event_category: 'chatbot',
        //         custom_parameters: data
        //     });
        // }

        // Example Facebook Pixel integration:
        // if (typeof fbq !== 'undefined') {
        //     fbq('track', 'CustomEvent', {
        //         event_name: eventName,
        //         ...data
        //     });
        // }
    }

    // Public methods for external integration
    addMessage(message, isUser = false) {
        if (isUser) {
            this.addUserMessage(message);
        } else {
            this.addAIMessage(message);
        }
    }

    clearConversation() {
        this.conversation = [];
        const messagesContainer = document.getElementById('chatMessages');
        // Keep only the welcome message
        const messages = messagesContainer.children;
        for (let i = messages.length - 1; i > 0; i--) {
            messages[i].remove();
        }

        // Show quick actions again
        document.getElementById('quickActions').style.display = 'flex';
    }

    // CRM Integration (example)
    async sendToCRM(leadData) {
        try {
            // Replace with your CRM endpoint
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(leadData)
            });

            if (response.ok) {
                console.log('Lead sent to CRM successfully');
                return true;
            } else {
                throw new Error('CRM API error');
            }
        } catch (error) {
            console.error('CRM integration error:', error);
            return false;
        }
    }

    // Email notification (example)
    async sendEmailNotification(leadData) {
        try {
            // Replace with your email service endpoint
            const response = await fetch('/api/send-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: 'hello@brandformance.com',
                    subject: `New Lead from Chat Bot: ${leadData.name}`,
                    lead: leadData
                })
            });

            if (response.ok) {
                console.log('Email notification sent');
            }
        } catch (error) {
            console.error('Email notification error:', error);
        }
    }
}

// Initialize the chat bot when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Check if chat bot HTML exists
    if (document.getElementById('aiChatWidget')) {
        window.chatBot = new AIChatBot();

        // Optional: Auto-open chat after delay for first-time visitors
        // setTimeout(() => {
        //     if (!localStorage.getItem('chatBotSeen')) {
        //         window.chatBot.openChat();
        //         localStorage.setItem('chatBotSeen', 'true');
        //     }
        // }, 5000);

        console.log('🤖 AI Chat Bot initialized successfully!');
        console.log('💡 Tip: Use window.chatBot.openChat() to open programmatically');
    } else {
        console.warn('⚠️ Chat bot HTML not found. Make sure to include the chat widget HTML.');
    }
});

// Expose chat bot for external use
window.BrandformanceChatBot = {
    open: () => window.chatBot?.openChat(),
    close: () => window.chatBot?.closeChat(),
    sendMessage: (message) => window.chatBot?.addMessage(message, false),
    sendUserMessage: (message) => window.chatBot?.addMessage(message, true),
    clearChat: () => window.chatBot?.clearConversation(),
    isOpen: () => window.chatBot?.isOpen || false
};

// Debug helpers (remove in production)
window.ChatBotDebug = {
    getConversation: () => window.chatBot?.conversation || [],
    getApiKey: () => window.chatBot?.API_KEY?.substring(0, 10) + '...',
    testFallback: (message) => window.chatBot?.getFallbackResponse(message),
    trackTest: (event, data) => window.chatBot?.trackEvent(event, data)
};