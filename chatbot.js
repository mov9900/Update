// EDUSHELF AI Chatbot - Comprehensive Knowledge Base
class EDUSHELFChatbot {
    constructor() {
        this.isOpen = false;
        this.isMinimized = false;
        this.sessionId = this.generateSessionId();
        this.currentUser = null;
        this.messageHistory = [];
        
        // Complete EDUSHELF Books Database with actual details
        this.booksDatabase = [
            {
                id: 1,
                title: "Technical English",
                author: "Dr S Sumant",
                subject: "English Communication",
                category: "Language",
                keywords: ["english", "communication", "technical writing", "presentation", "professional"],
                description: "Essential English communication skills for technical professionals. Covers technical writing, presentation skills, and professional communication.",
                link: "https://drive.google.com/file/d/1-VC2kHwNOCoX224qAkvG5jQFoebzJsdU/view?usp=drivesdk",
                status: "available",
                imageUrl: "English.jpg"
            },
            {
                id: 2,
                title: "Mathematics I",
                author: "Ravish R. Singh, Mukul Bhatt",
                subject: "Engineering Mathematics",
                category: "Mathematics",
                keywords: ["mathematics", "calculus", "differential equations", "algebra", "engineering math", "maths"],
                description: "Fundamental mathematics concepts including calculus, differential equations, and linear algebra for engineering students.",
                link: "https://drive.google.com/file/d/1-ddZYYfsvmIm3E7MiKmiAslYi-iUBlsC/view?usp=drivesdk",
                status: "available",
                imageUrl: "Mathematics -I.jpg"
            },
            {
                id: 3,
                title: "Mathematics II",
                author: "C B Gupta, S R Singh, Mukesh Kumar",
                subject: "Advanced Mathematics",
                category: "Mathematics",
                keywords: ["advanced math", "complex analysis", "fourier", "numerical methods", "mathematics", "maths"],
                description: "Advanced mathematical concepts including complex analysis, Fourier transforms, and numerical methods.",
                link: "https://drive.google.com/file/d/10xKqIIkyZ-hjucrGkeL5_FczrP2O13QV/view?usp=drivesdk",
                status: "available",
                imageUrl: "Mathematics -II.jpg"
            },
            {
                id: 4,
                title: "Programming For Problem Solving",
                author: "E Balagurusamy",
                subject: "Computer Programming",
                category: "Programming",
                keywords: ["programming", "c language", "algorithms", "problem solving", "coding", "computer science"],
                description: "Introduction to programming concepts using C language. Covers problem-solving techniques and algorithm development.",
                link: "https://drive.google.com/file/d/1-OEz-6EN71Dr0OnHw97kvC6klVWOS6RO/view?usp=drivesdk",
                status: "available",
                imageUrl: "PPs.jpg"
            },
            {
                id: 5,
                title: "Environmental Science",
                author: "Dr R. P. Rethaliya",
                subject: "Environmental Studies",
                category: "Science",
                keywords: ["environment", "pollution", "sustainability", "ecology", "green technology", "environmental"],
                description: "Study of environmental systems, pollution control, and sustainable development practices.",
                link: "https://drive.google.com/file/d/10zaVQ5WxwC7-pvlSTIGe8T8FIlbC-_Er/view?usp=drivesdk",
                status: "available",
                imageUrl: "Es.jpg"
            },
            {
                id: 6,
                title: "Basic Civil Engineering",
                author: "S S Bhavikatti",
                subject: "Civil Engineering",
                category: "Engineering",
                keywords: ["civil engineering", "construction", "materials", "surveying", "structures", "civil"],
                description: "Fundamentals of civil engineering including construction materials, surveying, and structural basics.",
                link: "https://drive.google.com/file/d/10vc7PvMw8ibpWuHi_rGY2KxA8nRLSo84/view?usp=drivesdk",
                status: "available",
                imageUrl: "Civil.jpg"
            },
            {
                id: 7,
                title: "Elements of Electromagnetics",
                author: "Matthew N. O. Sadiku",
                subject: "Electrical Engineering",
                category: "Engineering",
                keywords: ["electromagnetics", "electrical", "fields", "waves", "maxwell equations", "electromagnetic"],
                description: "Comprehensive study of electromagnetic fields, waves, and their applications in engineering.",
                link: "https://drive.google.com/file/d/1aC_-YUM2JkrMJaiHsWQByMcy6nIshWC4/view?usp=drive_link",
                status: "available",
                imageUrl: "EMT.jpeg"
            },
            {
                id: 8,
                title: "Signal & System",
                author: "A.Anand Kumar",
                subject: "Electronics Engineering",
                category: "Engineering",
                keywords: ["signals", "systems", "frequency domain", "electronics", "fourier analysis", "signal processing"],
                description: "Analysis of signals and systems in time and frequency domain. Essential for electronics engineers.",
                link: "https://drive.google.com/file/d/1xpXb24DhlSBpW1rfiLJ4xpPpMJ-EEZCU/view?usp=drive_link",
                status: "available",
                imageUrl: "SAS.jpg"
            },
            {
                id: 9,
                title: "Op-Amp and Linear Integrated Circuit",
                author: "Ramakant A.Gayakwad",
                subject: "Electronics",
                category: "Engineering",
                keywords: ["op-amp", "operational amplifier", "integrated circuits", "linear circuits", "electronics", "opamp"],
                description: "Operational amplifiers and linear integrated circuits design and applications.",
                link: "https://drive.google.com/file/d/1Ie2dHuDzbssVMStMYb1YOgkTi_sTFau7/view?usp=drive_link",
                status: "available",
                imageUrl: "OP-Amp.jpg"
            },
            {
                id: 10,
                title: "Professional Ethics",
                author: "Various Authors",
                subject: "Ethics",
                category: "Ethics",
                keywords: ["ethics", "professional", "moral", "responsibility", "engineering ethics", "conduct"],
                description: "Professional ethics and moral responsibilities in engineering practice.",
                link: "https://drive.google.com/file/d/1MnJHEH8oIpjSuE5rJbohnw7u-wPL1ZdN/view?usp=drive_link",
                status: "available",
                imageUrl: "PE.webp"
            },
            {
                id: 11,
                title: "AVR Microcontroller and Embedded Systems",
                author: "Mazidi, Muhammad Ali Naimi, Sarmad Naimi, Sepehr",
                subject: "Embedded Systems",
                category: "Engineering",
                keywords: ["microcontroller", "avr", "embedded systems", "programming", "interfacing", "embedded"],
                description: "Programming and interfacing of AVR microcontrollers for embedded system applications.",
                link: "https://drive.google.com/file/d/11nimO2EyNkxPiZikFR92Vd5xB6e1Ivb0/view?usp=drive_link",
                status: "available",
                imageUrl: "MPMC.jpeg"
            }
        ];

        // Initialize chatbot when DOM is loaded
        this.init();
    }

    generateSessionId() {
        return 'chat_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    init() {
        this.setupEventListeners();
        this.checkAuthState();
    }

    setupEventListeners() {
        // Toggle chatbot
        document.getElementById('chatbot-toggle').addEventListener('click', () => {
            this.toggleChatbot();
        });

        // Start chat button
        document.getElementById('start-chat-btn').addEventListener('click', () => {
            this.startChat();
        });

        // Close and minimize buttons
        document.getElementById('close-btn').addEventListener('click', () => {
            this.closeChatbot();
        });

        document.getElementById('minimize-btn').addEventListener('click', () => {
            this.minimizeChatbot();
        });

        // Send message functionality
        document.getElementById('send-btn').addEventListener('click', () => {
            this.sendMessage();
        });

        document.getElementById('message-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Character count
        document.getElementById('message-input').addEventListener('input', (e) => {
            const charCount = e.target.value.length;
            document.querySelector('.char-count').textContent = `${charCount}/500`;
        });

        // Quick action buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const message = e.target.getAttribute('data-message');
                this.sendQuickMessage(message);
            });
        });
    }

    checkAuthState() {
        // Check if user is logged in to personalize experience
        firebase.auth().onAuthStateChanged((user) => {
            this.currentUser = user;
            if (user) {
                this.loadUserChatHistory();
            }
        });
    }

    toggleChatbot() {
        const container = document.getElementById('chatbot-container');
        const notificationDot = document.getElementById('notification-dot');
        
        if (this.isOpen) {
            this.closeChatbot();
        } else {
            this.openChatbot();
            notificationDot.classList.remove('show');
        }
    }

    openChatbot() {
        const container = document.getElementById('chatbot-container');
        container.classList.add('open');
        this.isOpen = true;
        
        // Show welcome message if first time
        if (this.messageHistory.length === 0) {
            setTimeout(() => {
                this.showWelcomeMessage();
            }, 500);
        }
    }

    closeChatbot() {
        const container = document.getElementById('chatbot-container');
        container.classList.remove('open');
        this.isOpen = false;
        this.isMinimized = false;
    }

    minimizeChatbot() {
        const container = document.getElementById('chatbot-container');
        container.classList.toggle('minimized');
        this.isMinimized = !this.isMinimized;
    }

    startChat() {
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('chat-interface').style.display = 'flex';
        
        // Add initial bot message
        this.addBotMessage("Hello! 👋 I'm your EDUSHELF AI Assistant. I have complete knowledge of all our books and can help you with:\n\n📚 Finding specific books\n🔍 Subject-based recommendations\n📖 Detailed book information\n🎓 Study guidance\n🧭 Library navigation\n\nWhat would you like to know today?");
    }

    showWelcomeMessage() {
        const notificationDot = document.getElementById('notification-dot');
        notificationDot.classList.add('show');
    }

    sendMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message to chat
        this.addUserMessage(message);
        input.value = '';
        document.querySelector('.char-count').textContent = '0/500';

        // Show typing indicator
        this.showTypingIndicator();

        // Process message and generate response
        setTimeout(() => {
            this.processMessage(message);
        }, Math.random() * 1000 + 500); // Random delay between 0.5-1.5s
    }

    sendQuickMessage(message) {
        this.addUserMessage(message);
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.processMessage(message);
        }, Math.random() * 1000 + 500);
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('messages-container');
        const messageElement = document.createElement('div');
        messageElement.className = 'message user';
        
        messageElement.innerHTML = `
            <div class="message-avatar">👤</div>
            <div class="message-content">
                ${this.formatMessage(message)}
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
        
        // Store in history
        this.messageHistory.push({
            type: 'user',
            message: message,
            timestamp: new Date()
        });
    }

    addBotMessage(message, isHtml = false) {
        this.hideTypingIndicator();
        
        const messagesContainer = document.getElementById('messages-container');
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot';
        
        messageElement.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                ${isHtml ? message : this.formatMessage(message)}
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
        
        // Store in history and Firebase
        this.messageHistory.push({
            type: 'bot',
            message: message,
            timestamp: new Date()
        });
        
        this.saveChatToFirebase(message, 'bot');
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('messages-container');
        const typingElement = document.createElement('div');
        typingElement.className = 'typing-indicator';
        typingElement.id = 'typing-indicator';
        
        typingElement.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="typing-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        `;
        
        messagesContainer.appendChild(typingElement);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    processMessage(userMessage) {
        const response = this.generateIntelligentResponse(userMessage);
        this.addBotMessage(response, response.includes('<div class="book-card">'));
        this.saveChatToFirebase(userMessage, 'user');
    }

    generateIntelligentResponse(message) {
        const messageLower = message.toLowerCase();
        
        // Greeting responses
        if (this.isGreeting(messageLower)) {
            return this.getGreetingResponse();
        }
        
        // Book search and recommendations
        if (this.isBookQuery(messageLower)) {
            return this.handleBookQuery(messageLower);
        }
        
        // Subject-specific queries
        if (this.isSubjectQuery(messageLower)) {
            return this.handleSubjectQuery(messageLower);
        }
        
        // Study tips and guidance
        if (this.isStudyQuery(messageLower)) {
            return this.getStudyTips(messageLower);
        }
        
        // Help and navigation
        if (this.isHelpQuery(messageLower)) {
            return this.getHelpResponse();
        }
        
        // Website information
        if (this.isWebsiteQuery(messageLower)) {
            return this.getWebsiteInfo(messageLower);
        }
        
        // Default intelligent response
        return this.getDefaultResponse(messageLower);
    }

    isGreeting(message) {
        const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'start', 'begin'];
        return greetings.some(greeting => message.includes(greeting));
    }

    getGreetingResponse() {
        const responses = [
            "Hello! 👋 Welcome to EDUSHELF! I'm your AI assistant with complete knowledge of our library. I can help you find any of our 11 engineering books, provide study recommendations, and guide you through our system. What would you like to explore today?",
            "Hi there! 🌟 I'm excited to help you navigate our EDUSHELF library! With 11 comprehensive engineering books covering everything from Mathematics to Microcontrollers, I'm here to find exactly what you need. What subject interests you most?",
            "Greetings! 📚 I'm your EDUSHELF AI companion, and I have detailed knowledge of every book in our collection. Whether you need help with programming, mathematics, electronics, or any other engineering subject, just ask!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    isBookQuery(message) {
        const bookKeywords = ['book', 'books', 'find', 'search', 'recommend', 'suggest', 'show me', 'looking for', 'need', 'want'];
        return bookKeywords.some(keyword => message.includes(keyword));
    }

    handleBookQuery(message) {
        // Check for specific book titles first
        const foundBooks = this.searchSpecificBooks(message);
        if (foundBooks.length > 0) {
            return this.formatBookResults(foundBooks, "Here's what I found:");
        }
        
        // Search by keywords
        const keywordBooks = this.searchBooksByKeywords(message);
        if (keywordBooks.length > 0) {
            return this.formatBookResults(keywordBooks, "Based on your query, I recommend these books:");
        }
        
        // Show all books if general query
        if (message.includes('all') || message.includes('available') || message.includes('list')) {
            return this.getAllBooksResponse();
        }
        
        return this.getNoResultsResponse(message);
    }

    searchSpecificBooks(message) {
        return this.booksDatabase.filter(book => {
            return book.title.toLowerCase().includes(message) ||
                   book.author.toLowerCase().includes(message);
        });
    }

    searchBooksByKeywords(message) {
        return this.booksDatabase.filter(book => {
            return book.keywords.some(keyword => message.includes(keyword));
        }).slice(0, 3); // Limit to top 3 results
    }

    isSubjectQuery(message) {
        const subjects = ['mathematics', 'math', 'maths', 'programming', 'english', 'electronics', 'electrical', 'civil', 'environment', 'environmental', 'microcontroller', 'embedded', 'ethics', 'signals', 'electromagnetics'];
        return subjects.some(subject => message.includes(subject));
    }

    handleSubjectQuery(message) {
        let relevantBooks = [];
        
        if (message.includes('math') || message.includes('mathematics')) {
            relevantBooks = this.booksDatabase.filter(book => book.category === 'Mathematics');
            return this.formatBookResults(relevantBooks, "📊 Here are our Mathematics books:");
        }
        
        if (message.includes('programming') || message.includes('coding') || message.includes('computer')) {
            relevantBooks = this.booksDatabase.filter(book => book.category === 'Programming');
            return this.formatBookResults(relevantBooks, "💻 Here's our Programming book:");
        }
        
        if (message.includes('english') || message.includes('communication')) {
            relevantBooks = this.booksDatabase.filter(book => book.category === 'Language');
            return this.formatBookResults(relevantBooks, "📝 Here's our Technical English book:");
        }
        
        if (message.includes('electronics') || message.includes('electrical')) {
            relevantBooks = this.booksDatabase.filter(book => 
                book.subject.includes('Electronics') || book.subject.includes('Electrical')
            );
            return this.formatBookResults(relevantBooks, "⚡ Here are our Electronics/Electrical books:");
        }
        
        if (message.includes('civil')) {
            relevantBooks = this.booksDatabase.filter(book => book.subject.includes('Civil'));
            return this.formatBookResults(relevantBooks, "🏗️ Here's our Civil Engineering book:");
        }
        
        if (message.includes('environment')) {
            relevantBooks = this.booksDatabase.filter(book => book.subject.includes('Environmental'));
            return this.formatBookResults(relevantBooks, "🌱 Here's our Environmental Science book:");
        }
        
        if (message.includes('microcontroller') || message.includes('embedded')) {
            relevantBooks = this.booksDatabase.filter(book => book.subject.includes('Embedded'));
            return this.formatBookResults(relevantBooks, "🔧 Here's our Embedded Systems book:");
        }
        
        if (message.includes('ethics')) {
            relevantBooks = this.booksDatabase.filter(book => book.category === 'Ethics');
            return this.formatBookResults(relevantBooks, "⚖️ Here's our Professional Ethics book:");
        }
        
        return "I can help you with books in these subjects: Mathematics, Programming, Technical English, Electronics, Electrical Engineering, Civil Engineering, Environmental Science, Embedded Systems, and Professional Ethics. Which subject interests you?";
    }

    isStudyQuery(message) {
        const studyKeywords = ['study', 'learn', 'tip', 'tips', 'advice', 'guide', 'how to', 'preparation', 'exam', 'help me study'];
        return studyKeywords.some(keyword => message.includes(keyword));
    }

    getStudyTips(message) {
        if (message.includes('math')) {
            return "📊 **Mathematics Study Tips:**\n\n✅ **Effective Strategies:**\n• Practice daily - consistency is key in mathematics\n• Start with Mathematics I basics before advancing to Mathematics II\n• Work through examples step-by-step\n• Focus on understanding concepts, not just memorizing formulas\n\n📚 **Recommended Study Order:**\n1. **Mathematics I** by Ravish R. Singh - Build strong foundations\n2. **Mathematics II** by C B Gupta - Advanced concepts\n\n💡 **Pro Tips:**\n• Solve previous year questions\n• Create formula sheets for quick revision\n• Join study groups for complex problems";
        }
        
        if (message.includes('programming')) {
            return "💻 **Programming Study Tips:**\n\n✅ **Master the Basics:**\n• Start with our **Programming For Problem Solving** by E Balagurusamy\n• Practice coding daily - even 30 minutes helps\n• Understand logic before syntax\n• Start with simple programs and gradually increase complexity\n\n🔧 **Practical Approach:**\n• Write, compile, and run code regularly\n• Debug your own programs\n• Try to solve real-world problems\n• Advance to **AVR Microcontroller** for embedded programming\n\n📈 **Study Progression:**\nC Basics → Data Structures → Algorithms → Embedded Systems";
        }
        
        return "🎓 **General Study Tips for Engineering:**\n\n✅ **Effective Study Methods:**\n• **Active Reading**: Don't just read, take notes and summarize\n• **Spaced Repetition**: Review topics at increasing intervals\n• **Practice Problems**: Apply theoretical knowledge practically\n• **Group Study**: Discuss complex concepts with peers\n\n📚 **Subject-Specific Guidance:**\n• **Mathematics**: Daily practice, focus on problem-solving\n• **Programming**: Code regularly, understand logic first\n• **Electronics**: Understand circuits through practical examples\n• **Technical English**: Practice writing and presentations\n\n💡 **Time Management:**\n• Study in focused 25-minute sessions (Pomodoro Technique)\n• Take regular breaks to maintain concentration\n• Review previous day's learning each morning\n\nWhich specific subject would you like detailed study tips for?";
    }

    isHelpQuery(message) {
        const helpKeywords = ['help', 'how', 'guide', 'navigate', 'use', 'access', 'download', 'borrow'];
        return helpKeywords.some(keyword => message.includes(keyword));
    }

    getHelpResponse() {
        return "🎯 **How to Use EDUSHELF Library:**\n\n📚 **Accessing Books:**\n1. **Browse**: I can show you all available books by category\n2. **Search**: Ask me for specific books or subjects\n3. **Access**: Each book has a direct Google Drive link for easy access\n4. **Download**: Click the 'Borrow' link to access the book\n\n🔍 **What I Can Help With:**\n• Finding books by title, author, or subject\n• Recommending books for your course\n• Providing detailed book information\n• Study tips and learning strategies\n• Navigating the library system\n\n💡 **Quick Commands:**\n• \"Show me all books\" - Complete library catalog\n• \"Mathematics books\" - Subject-specific results\n• \"Programming help\" - Programming resources\n• \"Study tips\" - Learning guidance\n\n❓ **Need Specific Help?**\nJust ask me anything about our books or library system!";
    }

    isWebsiteQuery(message) {
        const websiteKeywords = ['website', 'edushelf', 'about', 'library', 'system', 'platform', 'contact', 'info'];
        return websiteKeywords.some(keyword => message.includes(keyword));
    }

    getWebsiteInfo(message) {
        if (message.includes('contact') || message.includes('info')) {
            return "📧 **Contact Information:**\n\n**EDUSHELF Support:**\n• Email: info@edushelf.com\n• We're here to assist with any issues or questions\n\n🤖 **AI Assistant (That's me!):**\n• Available 24/7 for book recommendations\n• Complete knowledge of all library resources\n• Instant responses to your queries\n\nHow else can I help you today?";
        }
        
        return "🏛️ **About EDUSHELF Library System:**\n\n📚 **Our Mission:**\nWelcome to EDUSHELF, your comprehensive digital library for engineering education. We make quality technical books accessible to every student.\n\n📖 **Our Collection:**\n• **11 Essential Engineering Books**\n• Subjects: Mathematics, Programming, Electronics, Civil, Environmental\n• All books available for free access via Google Drive\n• Curated specifically for engineering students\n\n🎯 **What We Offer:**\n• Instant access to technical books\n• 24/7 AI assistant support (that's me!)\n• Study recommendations and guidance\n• Easy-to-use library system\n\n🌟 **Why Choose EDUSHELF?**\n• Quality educational resources\n• User-friendly interface\n• Comprehensive book collection\n• Intelligent search and recommendations\n\nReady to explore our library? Just ask me about any subject!";
    }

    getAllBooksResponse() {
        let response = "📚 **Complete EDUSHELF Library Collection:**\n\nHere are all 11 books in our library:\n\n";
        
        this.booksDatabase.forEach((book, index) => {
            response += `${index + 1}. **${book.title}**\n   by ${book.author}\n   📖 ${book.subject}\n\n`;
        });
        
        response += "🔍 **Want more details?** Ask me about any specific book or subject!\n\n💡 **Pro tip:** Try asking \"Tell me about [book name]\" for detailed information and direct access links!";
        
        return response;
    }

    formatBookResults(books, title) {
        if (books.length === 0) {
            return "Sorry, I couldn't find any books matching your query. Try asking about mathematics, programming, electronics, or other engineering subjects!";
        }
        
        let response = `${title}\n\n`;
        
        books.forEach(book => {
            response += `<div class="book-card">
                <div class="book-title">${book.title}</div>
                <div class="book-author">by ${book.author}</div>
                <div class="book-description">${book.description}</div>
                <a href="${book.link}" target="_blank" class="book-link">
                    📚 Access Book
                </a>
            </div>`;
        });
        
        if (books.length === 1) {
            response += `\n💡 This book covers: ${books[0].keywords.join(', ')}\n\n🎓 **Study Tip:** This is perfect for students looking to master ${books[0].subject.toLowerCase()}.`;
        }
        
        return response;
    }

    getNoResultsResponse(message) {
        return `🔍 I couldn't find specific books matching "${message}", but I can help you in other ways!\n\n📚 **Try asking about:**\n• Mathematics (2 books available)\n• Programming and Computer Science\n• Electronics and Electrical Engineering\n• Civil Engineering\n• Environmental Science\n• Professional Ethics\n• Embedded Systems\n\n💡 **Or try these queries:**\n• "Show me all books"\n• "I need help with programming"\n• "Mathematics study tips"\n• "Tell me about EDUSHELF"\n\nWhat specific subject interests you?`;
    }

    getDefaultResponse(message) {
        const responses = [
            `🤔 I understand you're asking about "${message}". While I specialize in EDUSHELF books and study guidance, I'm here to help!\n\n📚 **I excel at:**\n• Finding books from our 11-book collection\n• Subject-specific recommendations\n• Study tips and learning strategies\n• Library navigation help\n\n💡 **Try asking:**\n• "What books do you have for [subject]?"\n• "Study tips for [subject]"\n• "Tell me about [book title]"\n• "Show me all available books"\n\nWhat would you like to know about our library?`,
            
            "🎯 I'm your EDUSHELF specialist! While I may not have information about everything, I'm an expert on:\n\n📖 **Our Complete Book Collection** (11 books)\n🔍 **Smart Book Recommendations**\n📚 **Subject-Specific Guidance**\n🎓 **Study Tips & Strategies**\n🧭 **Library Navigation**\n\nLet me help you find the perfect study resources! What subject are you interested in?",
            
            "🌟 Thanks for your question! I'm designed specifically to help with EDUSHELF library resources.\n\n🚀 **What I'm great at:**\n• Instant book searches across all 11 titles\n• Personalized study recommendations\n• Detailed book information with direct access links\n• Subject-wise guidance for engineering students\n\n📚 **Popular requests:**\n• \"Mathematics books\" - 2 comprehensive books\n• \"Programming help\" - C language fundamentals\n• \"Electronics subjects\" - Multiple specialized books\n• \"Study tips\" - Subject-specific guidance\n\nHow can I assist with your studies today?"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    formatMessage(message) {
        // Convert markdown-style formatting to HTML
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    scrollToBottom() {
        const container = document.getElementById('messages-container');
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
    }

    saveChatToFirebase(message, sender) {
        if (!this.currentUser) return;
        
        const chatData = {
            sessionId: this.sessionId,
            userId: this.currentUser.uid,
            message: message,
            sender: sender,
            timestamp: new Date(),
            userEmail: this.currentUser.email
        };
        
        db.collection('chatHistory').add(chatData)
            .then(() => {
                console.log('Chat saved to Firebase');
            })
            .catch((error) => {
                console.error('Error saving chat:', error);
            });
    }

    loadUserChatHistory() {
        if (!this.currentUser) return;
        
        db.collection('chatHistory')
            .where('userId', '==', this.currentUser.uid)
            .orderBy('timestamp', 'desc')
            .limit(50)
            .get()
            .then((querySnapshot) => {
                const history = [];
                querySnapshot.forEach((doc) => {
                    history.push(doc.data());
                });
                console.log('Loaded chat history:', history.length, 'messages');
            })
            .catch((error) => {
                console.error('Error loading chat history:', error);
            });
    }

    // Method to get analytics
    getChatAnalytics() {
        if (!this.currentUser) return;
        
        db.collection('chatHistory')
            .where('userId', '==', this.currentUser.uid)
            .get()
            .then((querySnapshot) => {
                const totalChats = querySnapshot.size;
                const bookQueries = querySnapshot.docs.filter(doc => 
                    doc.data().message.toLowerCase().includes('book')
                ).length;
                
                console.log('Chat Analytics:', {
                    totalMessages: totalChats,
                    bookQueries: bookQueries,
                    sessionId: this.sessionId
                });
            });
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.edushelfChatbot = new EDUSHELFChatbot();
    
    // Show notification after 5 seconds if chatbot hasn't been opened
    setTimeout(() => {
        if (!window.edushelfChatbot.isOpen) {
            document.getElementById('notification-dot').classList.add('show');
        }
    }, 5000);
});