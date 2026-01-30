// ===== MOBILE NAVIGATION =====
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
    });
});

// ===== SMOOTH SCROLLING =====
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

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== GALLERY SEE MORE BUTTON =====
const seeMoreBtn = document.getElementById('seeMoreBtn');
const hiddenGalleryItems = document.querySelectorAll('.hidden-gallery');
let galleryExpanded = false;

if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', () => {
        if (!galleryExpanded) {
            // Show all images
            hiddenGalleryItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('show');
                    }, 50);
                }, index * 100);
            });
            seeMoreBtn.innerHTML = '<span>Show Less</span><i class="fas fa-chevron-up"></i>';
            galleryExpanded = true;
        } else {
            // Hide images
            hiddenGalleryItems.forEach(item => {
                item.classList.remove('show');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            });
            seeMoreBtn.innerHTML = '<span>Load More</span><i class="fas fa-chevron-down"></i>';
            galleryExpanded = false;
            
            // Scroll back to gallery section
            document.getElementById('gallery').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ===== LEARN MORE MODAL =====
const modal = document.getElementById('programModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalFeatures = document.getElementById('modalFeatures');
const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
const modalCloseBtn = document.querySelector('.modal-close');
const modalCloseButton = document.querySelector('.modal-close-btn');
const modalRegisterBtn = document.querySelector('.modal-register');
const modalOverlay = document.querySelector('.modal-overlay');

// Program details
const programDetails = {
    'Leadership Development': {
        description: 'Master the art of influence through intensive workshops and real-world leadership challenges. Our Leadership Development program is designed to transform emerging leaders into visionary changemakers.',
        features: ['Expert mentorship from industry leaders', 'Intensive workshops & training sessions', 'Real-world case studies', 'Leadership certification', 'Networking with 500+ leaders'],
        price: 'Free'
    },
    'Mentorship Network': {
        description: 'Connect with industry leaders who provide guidance on your journey to excellence. Our mentorship network connects you with experienced professionals across diverse fields.',
        features: ['One-on-one mentoring sessions', 'Career guidance & planning', 'Access to industry insights', 'Professional network expansion', 'Monthly mastermind groups'],
        price: 'Free'
    },
    'Community Impact': {
        description: 'Drive meaningful change through collaborative service projects and social innovation. Make a real difference in your community while developing valuable skills.',
        features: ['Community service projects', 'Social innovation workshops', 'Leadership in action', 'Impact measurement & reporting', 'Community partnerships'],
        price: 'Free'
    },
    'Tech Skills Lab': {
        description: 'Future-proof your career with cutting-edge training in tech, entrepreneurship, and innovation. Learn in-demand skills from experienced tech professionals.',
        features: ['Hands-on coding & tech training', 'Entrepreneurship workshops', 'Innovation challenges', 'Real project experience', 'Tech mentorship & guidance'],
        price: 'Free'
    },
    'Forex Trading Mastery': {
        description: 'Learn professional currency trading strategies and technical analysis from expert traders. Master the foreign exchange market with proven techniques and risk management protocols.',
        features: ['Live trading sessions with experts', 'Currency pairs analysis & signals', 'Risk management strategies', 'Technical analysis masterclass', 'One-on-one trader consultation', 'Trading journal templates & tools', '24/5 market access training'],
        price: '$15/month'
    },
    'Digital Marketing Pro': {
        description: 'Master modern digital marketing including SEO, social media marketing, content strategy, and paid advertising campaigns to build your online presence and generate leads.',
        features: ['SEO optimization masterclass', 'Social media strategy & automation', 'Content marketing frameworks', 'Paid ads (Google & Facebook)', 'Email marketing automation', 'Analytics & conversion tracking', 'Case studies & real projects'],
        price: '$12/month'
    },
    'Cryptocurrency Mastery': {
        description: 'Understand blockchain technology, cryptocurrency trading strategies, DeFi protocols, and how to invest wisely in digital assets for maximum returns.',
        features: ['Blockchain fundamentals explained', 'Cryptocurrency trading strategies', 'DeFi and smart contracts', 'Wallet security & management', 'Portfolio diversification', 'Market analysis tools', 'Altcoin research methods'],
        price: '$18/month'
    },
    'E-Commerce Bootcamp': {
        description: 'Build and scale your online store with proven strategies for product sourcing, marketing, and sales optimization on platforms like Shopify and Amazon.',
        features: ['Shopify & WooCommerce setup', 'Product research & sourcing', 'Conversion rate optimization', 'Email & SMS marketing', 'Paid ads management', 'Inventory & fulfillment strategies', 'Scaling to 6-figures course'],
        price: '$14/month'
    }
};

// Open modal
learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const programName = btn.getAttribute('data-program');
        const details = programDetails[programName];
        
        modalTitle.textContent = programName;
        document.getElementById('modalPrice').textContent = details.price;
        modalDescription.textContent = details.description;
        
        modalFeatures.innerHTML = '';
        details.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalFeatures.appendChild(li);
        });
        
        // Show payment section only for paid programs
        const paymentSection = document.getElementById('modalPayment');
        if (details.price !== 'Free') {
            paymentSection.style.display = 'block';
        } else {
            paymentSection.style.display = 'none';
        }
        
        modal.classList.add('active');
    });
});

// Copy crypto address function
function copyAddress() {
    const addressText = document.getElementById('paymentAddress').textContent;
    navigator.clipboard.writeText(addressText).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.color = '#10b981';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.color = '';
        }, 2000);
    }).catch(() => {
        alert('Failed to copy address. Please copy manually: ' + addressText);
    });
}

// Close modal functions
const closeModal = () => {
    modal.classList.remove('active');
};

modalCloseBtn.addEventListener('click', closeModal);
modalCloseButton.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Register button in modal
modalRegisterBtn.addEventListener('click', () => {
    const originalText = modalRegisterBtn.textContent;
    modalRegisterBtn.textContent = 'Registration Submitted! ✓';
    modalRegisterBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    setTimeout(() => {
        modalRegisterBtn.textContent = originalText;
        modalRegisterBtn.style.background = '';
        closeModal();
    }, 2000);
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message (you can customize this)
        const button = contactForm.querySelector('button');
        const originalContent = button.innerHTML;
        
        button.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
        button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// ===== NEWSLETTER FORM =====
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const input = newsletterForm.querySelector('input');
        const button = newsletterForm.querySelector('button');
        const originalButtonContent = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        setTimeout(() => {
            button.innerHTML = originalButtonContent;
            button.style.background = '';
            input.value = '';
        }, 2000);
    });
}

// ===== CURSOR EFFECT (OPTIONAL - ADVANCED) =====
// Uncomment if you want a custom cursor effect
/*
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add this CSS for custom cursor:
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    }
    body {
        cursor: none;
    }
`;
document.head.appendChild(style);
*/