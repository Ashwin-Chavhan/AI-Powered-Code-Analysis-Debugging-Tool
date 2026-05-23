# CodeVault - AI-Powered Code Analysis & Debugging Tool

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Python](https://img.shields.io/badge/Python-3.9+-blue)
![React](https://img.shields.io/badge/React-18+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green)

## 🎯 Overview

**CodeVault** is a professional-grade code analysis and debugging tool that leverages AI to help developers understand, debug, and optimize their code instantly. Built with a focus on developer experience, it provides actionable insights with zero learning curve.

### Key Features
✨ **Instant Code Analysis** - Paste code and get detailed analysis in seconds
🐛 **Smart Bug Detection** - Identify potential issues with severity levels
🚀 **Performance Insights** - Get complexity analysis and optimization suggestions
🔒 **Security Analysis** - Detect vulnerabilities and security best practices
📊 **Quality Ratings** - Comprehensive scoring across multiple dimensions
💾 **Analysis History** - Track and reference previous analyses
🎨 **Beautiful UI** - Meticulously designed interface with dark theme

---

## 🏗️ Architecture

### Tech Stack

**Frontend**
- React 18+ with TypeScript
- Vite for fast development
- Custom CSS with CSS variables
- Responsive design (desktop-first)

**Backend**
- FastAPI with async support
- Python 3.9+
- Pydantic for data validation
- OpenAI API integration

**LLM**
- OpenAI GPT-4 Turbo (primary)
- Fallback to Ollama for local inference
- Claude API support for enterprise

### System Architecture

```
┌─────────────────────────────────────────┐
│        User Browser (React)             │
│  ┌──────────────────────────────────┐  │
│  │   CodeVault UI Component         │  │
│  │  - Code Editor                   │  │
│  │  - Analysis Results Display      │  │
│  │  - History Management            │  │
│  └──────────────────────────────────┘  │
└──────────────────┬──────────────────────┘
                   │ HTTP/REST
                   ▼
        ┌──────────────────────┐
        │   FastAPI Server     │
        │  (Port 8000)         │
        ├──────────────────────┤
        │ • Route Handlers     │
        │ • Validation         │
        │ • Caching Logic      │
        └──────┬───────────────┘
               │
        ┌──────┴─────────────┐
        ▼                    ▼
    ┌────────────┐    ┌──────────────┐
    │  OpenAI   │    │  LLM Service │
    │   API     │    │  (GPT/Claude)│
    └────────────┘    └──────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- npm/yarn
- OpenAI API key (or set `USE_MOCK_LLM=true` for testing)

### 1️⃣ Clone & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/codevault.git
cd codevault

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### 2️⃣ Configure Environment

**Backend (.env)**
```env
OPENAI_API_KEY=sk-your-key-here
USE_MOCK_LLM=true  # Set to false with real API key
LLM_MODEL=gpt-3.5-turbo
```

**Frontend (.env.local)**
```env
REACT_APP_API_URL=http://localhost:8000
```

### 3️⃣ Run Development Servers

```bash
# Terminal 1: Backend
cd backend
source venv/bin/activate
uvicorn main:app --reload

# Terminal 2: Frontend
cd frontend
npm run dev
```

Visit `http://localhost:5173` to see the app!

---

## 📖 Features in Detail

### Code Analysis
The tool analyzes code to provide:
- **Overview**: What the code does in plain language
- **Logic Breakdown**: Step-by-step explanation of execution flow
- **Key Operations**: Main functions and operations identified
- **Dependencies**: External libraries and dependencies detected

### Bug Detection
Identifies various issue types:
- **Logic Errors**: Infinite loops, off-by-one errors, type mismatches
- **Performance Issues**: Inefficient algorithms, memory leaks
- **Security Vulnerabilities**: Input validation gaps, hardcoded secrets
- **Best Practices**: Code style and maintainability concerns

### Quality Metrics
Provides ratings for:
- **Overall Code Quality** (1-10)
- **Efficiency** (1-10)
- **Security** (1-10)
- **Maintainability** (1-10)

### Improvements
Suggestions include:
- **Performance Optimizations**: Algorithm improvements with examples
- **Security Hardening**: Specific fixes for vulnerabilities
- **Code Refactoring**: Cleaner, more idiomatic approaches
- **Library Updates**: Modern alternatives to deprecated patterns

### Complexity Analysis
- Time Complexity (O-notation)
- Space Complexity (O-notation)
- Detailed explanation of calculations

---

## 📚 API Documentation

### POST /api/analyze
Analyze code and return detailed findings.

**Request:**
```json
{
  "code": "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)",
  "language": "python",
  "context": "Calculate fibonacci number recursively"
}
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2024-01-15T10:30:00Z",
  "language": "python",
  "summary": "Recursive fibonacci implementation",
  "explanation": {...},
  "bugs": [...],
  "improvements": [...],
  "complexity": {...},
  "security_issues": [...],
  "rating": {...},
  "processing_time": 2.5
}
```

### Supported Languages
Python, JavaScript, TypeScript, Java, C++, Go, Rust, C#, PHP, Ruby, Swift

Full API docs available at `/docs` (Swagger UI)

---

## 🎨 Design Philosophy

### Visual Identity
- **Dark Theme**: Reduces eye strain, professional appearance
- **Accent Colors**: Cyan for success, amber for warnings, red for errors
- **Typography**: Distinctive display font (Outfit) with monospace for code
- **Minimalism**: Focus on content, eliminate distractions

### User Experience
- **Progressive Disclosure**: Essential information first, details on demand
- **Instant Feedback**: Real-time loading states and progress
- **Keyboard Friendly**: Power users can work primarily with keyboard
- **Accessibility**: WCAG 2.1 AA compliant

---

## 🔧 Configuration

### Backend Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_API_KEY` | - | OpenAI API key |
| `LLM_MODEL` | gpt-3.5-turbo | Model to use |
| `USE_MOCK_LLM` | false | Use mock responses |
| `HOST` | 0.0.0.0 | Server host |
| `PORT` | 8000 | Server port |
| `ALLOWED_ORIGINS` | * | CORS allowed origins |

### Frontend Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | http://localhost:8000 | Backend API URL |
| `REACT_APP_ENV` | development | Environment |

---

## 📦 Project Size & Performance

- **Frontend Bundle**: ~200KB (minified + gzipped)
- **Backend**: ~50MB with dependencies
- **Average Analysis Time**: 2-5 seconds
- **Memory Usage**: ~150MB (backend), ~80MB (frontend)

---

## 🔒 Security Features

✅ Input validation and sanitization
✅ CORS protection
✅ Rate limiting (configurable)
✅ API key management
✅ No sensitive data logging
✅ HTTPS ready
✅ Security headers configured

---

## 🚀 Deployment

### Quick Deploy to Railway
```bash
# Connect GitHub repo to railway.app
# Set environment variables in Railway dashboard
# Auto-deploys on push to main
```

### Deploy to Vercel + Railway
```bash
# Frontend: vercel deploy
# Backend: Connect to Railway from GitHub
```

### Docker Compose
```bash
docker-compose up -d
# Services available at localhost
```

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed deployment instructions.

---

## 📊 Metrics & Monitoring

### What We Track
- Analysis processing time
- API response times
- Error rates
- Language distribution
- Common bug types

### Monitoring Tools
- Sentry for error tracking
- Custom logging to stdout
- Performance metrics in response headers

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution
- Additional language support
- Improved bug detection heuristics
- Enhanced UI components
- Documentation improvements
- Test coverage
- Performance optimizations

---

## 📝 Roadmap

- [ ] GitHub integration for repo analysis
- [ ] Custom rule configuration
- [ ] Team collaboration features
- [ ] Analysis export (PDF/Markdown)
- [ ] Browser extension
- [ ] VS Code extension
- [ ] API webhook support for CI/CD
- [ ] Batch analysis for multiple files
- [ ] Custom model training
- [ ] Multi-language support (UI)

---

## 🐛 Known Issues & Limitations

- Analysis accuracy depends on LLM quality
- Very large files (>50KB) may timeout
- Some language-specific features need more data
- Mock LLM doesn't reflect real API behavior
- No offline mode (requires API)

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- OpenAI for powerful language models
- FastAPI for excellent framework
- React community for amazing tools
- All contributors and supporters

---

## 📞 Support

- **Documentation**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Issues**: Open a GitHub issue
- **Questions**: Discussions section
- **Contact**: hello@codevault.dev

---

## 🎓 Learning Resources

This project demonstrates:
- Full-stack web development
- React hooks and component composition
- FastAPI and async Python
- LLM API integration
- Professional UI/UX design
- Docker containerization
- API design and documentation
- Error handling and validation
- Testing strategies
- Deployment best practices

Perfect for portfolio building and learning modern development practices!

---

**Built with ❤️ for developers, by developers.**

Last Updated: April 2026
Version: 1.0.0
