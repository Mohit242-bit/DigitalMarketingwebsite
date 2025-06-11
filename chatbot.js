/**
 * Brandformance AI Chat Bot - SECURE DEMO VERSION
 * File: chatbot.js
 * Description: Portfolio demo with realistic responses (no API key exposure)
 */

class AIChatBot {
    constructor() {
        // 🔒 SECURE: No real API key in demo version
        this.isDemoMode = true;
        this.conversation = [];
        this.isOpen = false;
        this.isTyping = false;
        
        // Demo responses that simulate real AI
        this.demoResponses = {
            seo: `Perfect! I'd love to help you dominate search results. 🎯

Our SEO optimization includes:
• **Technical SEO audits** - Fix what's holding you back
• **Keyword research** - Target the right search terms  
• **Content optimization** - Make your pages rank higher
• **Link building** - Build authority and trust

Quick question: What's your biggest SEO challenge right now?
- Not ranking on Google at all?
- Rankings dropped recently?  
- Can't beat your competitors?
- Website traffic is too low?`,

            ppc: `Excellent choice! PPC can deliver immediate results. 🚀

Our PPC management includes:
• **Google Ads campaigns** - Get found instantly
• **Social media advertising** - Facebook, Instagram, LinkedIn
• **Campaign optimization** - Maximize your ROI
• **Performance tracking** - See exactly what's working

What's driving your interest in PPC? Looking for:
- Immediate traffic boost?
- More qualified leads?
- Better ROI from current ads?
- Launch a new product/service?`,

            social: `Great! Social media is crucial for brand growth. 📱

Our social media marketing includes:
• **Content strategy** - Engaging posts that convert
• **Community management** - Build loyal followers
• **Paid social campaigns** - Targeted advertising
• **Analytics & reporting** - Track your growth

Which platforms are most important for your business?
- LinkedIn (B2B focus)?
- Instagram/Facebook (B2C)?
- TikTok (younger audience)?
- All of the above?`,

            content: `Smart thinking! Content is what drives long-term growth. ✍️

Our content marketing includes:
• **Blog strategy** - Articles that rank and convert
• **Video content** - Engaging visual storytelling
• **Email campaigns** - Nurture your audience
• **Brand storytelling** - Connect with your customers

What type of content challenges are you facing?
- Don't know what to write about?
- No time to create content?
- Content isn't generating leads?
- Need a complete content strategy?`,

            analytics: `Perfect! You can't improve what you don't measure. 📊

Our analytics & insights include:
• **Performance tracking** - See what's actually working
• **Custom dashboards** - All your data in one place
• **Conversion analysis** - Understand your customer journey
• **Strategic recommendations** - Data-driven growth plans

What analytics challenges are you facing?
- Don't know what to track?
- Have data but can't interpret it?
- Need better reporting tools?
- Want to improve conversions?`,

            brand: `Excellent! Strong branding is the foundation of everything. 🎨

Our brand strategy includes:
• **Brand positioning** - Stand out from competitors
• **Market research** - Understand your audience
• **Visual identity** - Professional, memorable design
• **Brand guidelines** - Consistent messaging everywhere

What's your biggest branding challenge?
- Need to rebrand completely?
- Inconsistent brand messaging?
- Don't stand out from competitors?
- New business needing brand identity?`,

            booking: `Perfect! I'd love to set up your free consultation. Let me get a few details from you. 📅`,

            roi: `Great question! Let me help you estimate your potential ROI. 📈

Our clients typically see:
• **300% average ROI increase** across all services
• **150% boost in organic traffic** (SEO)
• **4-6x return** on PPC ad spend
• **85% increase** in social engagement

To give you a personalized estimate, what's your:
- Current monthly marketing spend?
- Main business goal (leads, sales, awareness)?
- Industry/business type?`,

            hello: `Hello! 👋 Welcome to Brandformance! I'm Alex, your AI marketing assistant.

I can help you with:
• Finding the right marketing strategy
• Understanding our services  
• Booking a free consultation
• Calculating potential ROI

What brings you here today?`,

            default: `Thanks for your question! 😊 

I'm here to help you with digital marketing strategies. I can provide specific guidance on:

🎯 **SEO** - Get found on Google
🚀 **PPC** - Immediate traffic boost  
📱 **Social Media** - Build your brand
✍️ **Content** - Engage your audience
📊 **Analytics** - Track your success
🎨 **Branding** - Stand out from competitors

What marketing challenge can I help you solve?`
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupWelcomeMessage();
        this.addDemoNotice();
    }

    addDemoNotice() {
        // Add subtle demo indicator
        setTimeout(() => {
            const chatHeader = document.querySelector('.ai-info');
            if (chatHeader) {
                const status = chatHeader.querySelector('.status');
                status.textContent = 'Demo Mode • Experience the interface';
                status.style.color = '#ffa500';
            }
        }, 1000);
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

        // Check for special commands first
        if (this.handleSpecialCommands(message)) {
            return;
        }

        // Send to demo AI
        await this.sendToDemoAI(message);
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
        this.trackEvent('user_message_sent', { message: message, mode: 'demo' });
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
        this.trackEvent('ai_message_sent', { message: message, mode: 'demo' });
    }

    async sendToDemoAI(userMessage) {
        this.showTyping();
        
        // Simulate realistic AI response time
        const delay = Math.random() * 2000 + 1000; // 1-3 seconds
        
        await new Promise(resolve => setTimeout(resolve, delay));
        
        const response = this.getSmartDemoResponse(userMessage);
        
        this.hideTyping();
        await this.addAIMessage(response);
    }

    getSmartDemoResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for specific keywords and return appropriate responses
        if (lowerMessage.includes('seo') || lowerMessage.includes('search') || lowerMessage.includes('ranking')) {
            return this.demoResponses.seo;
        }
        
        if (lowerMessage.includes('ppc') || lowerMessage.includes('ads') || lowerMessage.includes('google ads') || lowerMessage.includes('advertising')) {
            return this.demoResponses.ppc;
        }
        
        if (lowerMessage.includes('social media') || lowerMessage.includes('facebook') || lowerMessage.includes('instagram') || lowerMessage.includes('linkedin')) {
            return this.demoResponses.social;
        }
        
        if (lowerMessage.includes('content') || lowerMessage.includes('blog') || lowerMessage.includes('writing')) {
            return this.demoResponses.content;
        }
        
        if (lowerMessage.includes('analytics') || lowerMessage.includes('data') || lowerMessage.includes('tracking') || lowerMessage.includes('metrics')) {
            return this.demoResponses.analytics;
        }
        
        if (lowerMessage.includes('brand') || lowerMessage.includes('branding') || lowerMessage.includes('identity')) {
            return this.demoResponses.brand;
        }
        
        if (lowerMessage.includes('roi') || lowerMessage.includes('return') || lowerMessage.includes('calculate') || lowerMessage.includes('cost')) {
            return this.demoResponses.roi;
        }
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return this.demoResponses.hello;
        }
        
        // Default response with helpful suggestions
        return this.demoResponses.default;
    }

    handleSpecialCommands(message) {
        const lowerMessage = message.toLowerCase();
        
        // Booking intent
        if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('consultation') || lowerMessage.includes('meeting')) {
            setTimeout(() => {
                this.addAIMessage(this.demoResponses.booking);
                setTimeout(() => {
                    this.showLeadModal();
                }, 1000);
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

        this.trackEvent('lead_modal_opened', { mode: 'demo' });
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
            source: 'ai_chatbot_demo'
        };

        // In demo mode, just log and show success
        console.log('Demo Lead Captured:', leadData);
        
        this.closeModal();
        
        // Add success message to chat
        setTimeout(() => {
            this.addAIMessage(`Thanks ${leadData.name}! 🎉 

**Demo Mode Notice:** In the live version, our team would reach out within 24 hours to schedule your free consultation. 

This demo shows how the AI captures and qualifies leads automatically. Pretty cool, right?

Want to see the real AI in action? Contact us for a live demonstration!`);
        }, 500);

        // Track conversion
        this.trackEvent('demo_lead_submitted', leadData);

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
        // Analytics tracking for demo
        console.log('Demo Chat Event:', eventName, data);
        
        // In production, you'd integrate with analytics here
        // Example: Google Analytics, Facebook Pixel, etc.
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
}

// Initialize the chat bot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if chat bot HTML exists
    if (document.getElementById('aiChatWidget')) {
        window.chatBot = new AIChatBot();
        
        console.log('🤖 AI Chat Bot (Demo Mode) initialized successfully!');
        console.log('💡 This is a secure demo version for portfolio showcase');
        console.log('🔒 No API keys exposed - production version available on request');
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
    isOpen: () => window.chatBot?.isOpen || false,
    isDemoMode: () => true
};
