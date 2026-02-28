# SparkNexaJX - Igniting Youth Potential

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://html5.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://www.javascript.com/)

> A modern, interactive platform dedicated to empowering youth through innovative programs, mentorship, and skill development. Built with cutting-edge web technologies and designed for seamless user experience.

![SparkNexaJX Banner](https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=300&fit=crop)

## 🌟 Why SparkNexaJX?

SparkNexaJX is a comprehensive platform designed to:
- **Empower Youth** - Provide opportunities for personal and professional growth
- **Skill Development** - Offer courses from leadership to cryptocurrency trading
- **Community Building** - Connect young professionals with mentors and peers
- **Financial Flexibility** - Choose from free and affordable paid programs

## ✨ Features

### 📚 8 Comprehensive Programs

**Free Programs:**
- 🎯 **Leadership Development** - Master the art of influence
- 👥 **Mentorship Network** - Connect with industry leaders
- 🤝 **Community Impact** - Drive meaningful change
- 💻 **Tech Skills Lab** - Future-proof your career

**Premium Programs (Cryptocurrency Payments):**
- 💹 **Forex Trading Mastery** - $15/month - Currency trading strategies
- 📱 **Digital Marketing Pro** - $12/month - SEO, social media & paid ads
- ₿ **Cryptocurrency Mastery** - $18/month - Blockchain & trading strategies
- 🛍️ **E-Commerce Bootcamp** - $14/month - Build & scale your online store

### 🎨 User Experience
- **Interactive Modals** - Click "Learn More" to see program details
- **Smooth Animations** - Engaging scroll reveal effects
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Payment Integration** - Cryptocurrency payments via Bybit
- **Newsletter Signup** - Stay updated with latest news
- **Contact Form** - Direct communication with the team

### 🛠️ Technical Highlights
- Pure HTML5, CSS3, and Vanilla JavaScript (no frameworks)
- Fast loading and high performance
- SEO-friendly structure
- Accessibility features
- Modern UI with gradient effects and glassmorphism

## 🚀 Quick Start

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/SparkNexaJX.git
cd SparkNexaJX
```

2. **Open in browser:**
```bash
# Option 1: Direct file open
open index.html

# Option 2: Python 3
python -m http.server 8000

# Option 3: Python 2
python -m SimpleHTTPServer 8000

# Option 4: Node.js
npx http-server
```

3. **Visit** `http://localhost:8000`

## 📁 Project Structure

```
SparkNexaJX/
├── index.html              # Main HTML file with all sections
├── style.css               # Complete styling & animations
├── script.js               # Interactive functionality
├── image/                  # Image assets folder
├── .gitignore              # Git ignore rules
├── LICENSE                 # MIT License
└── README.md               # This file
```

## 💳 Payment Method

We accept **cryptocurrency payments** via Bybit Exchange for premium programs.

**Bybit Wallet Address:**
```
THpcurVPhNnfKnBmTEYEVgmNBRYYX6q4m1
```

Simply copy the address during checkout or click the copy button in the payment modal.

## 🎨 Customization Guide

### Change Colors
Edit CSS variables in `style.css` (lines 11-19):
```css
:root {
    --primary: #00d4ff;        /* Cyan - Main brand color */
    --secondary: #7c3aed;      /* Purple - Accent */
    --accent: #f59e0b;         /* Orange - Highlights */
    --dark-bg: #0a0a0a;        /* Dark background */
    --card-bg: #111111;        /* Card background */
    --text-primary: #ffffff;   /* Primary text */
    --text-secondary: #a1a1aa; /* Secondary text */
}
```

### Add/Edit Programs
Modify the `programDetails` object in `script.js`:
```javascript
'Your Program Name': {
    description: 'Program description here',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    price: '$X/month' // or 'Free'
}
```

### Update Crypto Address
Change the Bybit address in:
1. `index.html` - Line 455: `<code id="paymentAddress">YOUR_ADDRESS</code>`
2. Share address display in payment modal

## 🌐 Deployment

### Deploy to Netlify (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Click Deploy
5. Your site is live! 🎉

### Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Click Deploy
4. Get a custom domain

### Deploy to GitHub Pages
1. Go to repository Settings
2. Scroll to "GitHub Pages"
3. Select `main` branch
4. Your site will be at `yourusername.github.io/SparkNexaJX`

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Icons:** Font Awesome 6.5.1
- **Images:** Unsplash API
- **Design Pattern:** Responsive, Mobile-first
- **Performance:** Optimized for fast loading

## 📊 Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Latest |
| Firefox | ✅ Latest |
| Safari  | ✅ Latest |
| Edge    | ✅ Latest |
| Mobile Browsers | ✅ All modern |

## 🔗 Social Media

Connect with SparkNexaJX on social platforms:
- 📘 [Facebook](https://www.facebook.com/share/1HBPESgABc/)
- 🎵 [TikTok](https://tiktok.com/@flowdpark)
- 📸 [Instagram](https://instagram.com/sparknexajx/)
- 📺 [YouTube](https://youtube.com/@sparknexajx)

## 📧 Contact

- **Email:** info@sparknexajx.org
- **Website:** [sparknexajx.org](https://sparknexajx.org)
- **Support:** Contact form available on website

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repository**
```bash
git clone https://github.com/your-username/SparkNexaJX.git
```

2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**
```bash
git add .
git commit -m "Add amazing feature"
```

4. **Push to the branch**
```bash
git push origin feature/amazing-feature
```

5. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style
- Test your changes thoroughly
- Update README if needed
- Write clear commit messages
- Respect the MIT License

## 📝 Features In Detail

### Modal System
- **Dynamic Content Loading** - Program details load based on selection
- **Smooth Animations** - Fade-in and slide-up effects
- **Close Options** - Click X, close button, or overlay to close
- **Keyboard Support** - Press ESC to close modal
- **Payment Integration** - Payment section for premium programs

### Responsive Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Animations
- Scroll reveal animations on page load
- Smooth card hover effects
- Button hover transitions
- Modal entrance animations
- Navbar scroll effects

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

The MIT License is a permissive license that allows:
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ⚠️ Must include license and copyright notice

## 🙏 Acknowledgments

- **Font Awesome** - Beautiful icon library
- **Unsplash** - Free stock photography
- **Community** - All contributors and supporters

## 🚀 Future Roadmap

- [ ] User authentication system
- [ ] Payment gateway integration
- [ ] Student dashboard
- [ ] Progress tracking
- [ ] Certificate generation
- [ ] Mobile app (iOS/Android)
- [ ] AI-powered recommendations
- [ ] Live class integration

## 💡 Tips for Success

1. **Start with free programs** - Build your foundation
2. **Explore paid courses** - Invest in specialized skills
3. **Connect with mentors** - Learn from experienced professionals
4. **Join the community** - Network with like-minded youth
5. **Share your progress** - Inspire others on social media

---

<div align="center">

**🔥 SparkNexaJX© 2026**

*Igniting Youth Potential, One Spark at a Time*

[⭐ Star us on GitHub](https://github.com/yourusername/SparkNexaJX) • [🐛 Report an Issue](https://github.com/yourusername/SparkNexaJX/issues) • [💬 Discussions](https://github.com/yourusername/SparkNexaJX/discussions)

</div>
