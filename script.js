// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.backgroundColor = 'white';
            navLinks.style.padding = '2rem';
            navLinks.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ===== Search Tabs Functionality =====
const tabBtns = document.querySelectorAll('.tab-btn');
const searchInput = document.querySelector('.search-input');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked tab
        btn.classList.add('active');
        
        // Update placeholder based on tab
        const tabType = btn.getAttribute('data-tab');
        if (tabType === 'buy') {
            searchInput.placeholder = 'Location, City, or ZIP';
        } else if (tabType === 'rent') {
            searchInput.placeholder = 'Location for rent';
        } else if (tabType === 'sell') {
            searchInput.placeholder = 'Enter your property address';
        }
    });
});

// ===== Property Filter Functionality =====
const filterBtns = document.querySelectorAll('.filter-btn');
const propertyCards = document.querySelectorAll('.property-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all filters
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked filter
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter properties
        propertyCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                if (card.getAttribute('data-type') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// ===== Heart/Favorite Toggle =====
const favoriteBtns = document.querySelectorAll('.btn-icon');

favoriteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const icon = btn.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        
        if (icon.classList.contains('fas')) {
            icon.style.color = '#ef4444';
        } else {
            icon.style.color = '';
        }
    });
});

// ===== Animated Counter for Stats =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + '+';
        }
    };
    
    updateCounter();
};

// Intersection Observer for stats animation
const statsSection = document.querySelector('.stats-section');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statNumbers.forEach(stat => animateCounter(stat));
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 968) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// ===== Navbar Scroll Effect =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===== Contact Form Submission =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', Object.fromEntries(formData));
    });
}

// ===== Newsletter Form Submission =====
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Show success message
        alert('Thank you for subscribing! You will receive our latest updates at: ' + email);
        
        // Reset form
        newsletterForm.reset();
        
        // In a real application, you would send this data to a server
        console.log('Newsletter subscription:', email);
    });
}

// ===== Search Functionality =====
const searchBtn = document.querySelector('.btn-search');

if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const location = searchInput.value;
        const propertyType = document.querySelector('.search-select:nth-child(2)').value;
        const priceRange = document.querySelector('.search-select:nth-child(3)').value;
        const searchType = document.querySelector('.tab-btn.active').getAttribute('data-tab');
        
        if (!location && !propertyType && !priceRange) {
            alert('Please enter at least one search criteria');
            return;
        }
        
        // Show search results message
        alert(`Searching for properties to ${searchType}...\n\nLocation: ${location || 'Any'}\nProperty Type: ${propertyType || 'Any'}\nPrice Range: ${priceRange || 'Any'}`);
        
        // In a real application, you would make an API call with these parameters
        console.log('Search criteria:', { searchType, location, propertyType, priceRange });
    });
}

// ===== Property Card Click =====
propertyCards.forEach(card => {
    card.addEventListener('click', () => {
        const propertyTitle = card.querySelector('.property-title').textContent;
        const propertyPrice = card.querySelector('.property-price').textContent;
        
        // Show property details modal or navigate to property page
        alert(`Viewing details for: ${propertyTitle}\nPrice: ${propertyPrice}\n\nIn a full website, this would open a detailed property page.`);
    });
});

// ===== View All Properties Button =====
const viewAllBtn = document.querySelector('.view-all .btn-primary');

if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
        alert('Loading all properties...\n\nThis would navigate to a full property listings page in a complete website.');
    });
}

// ===== Service Cards Interaction =====
const serviceLinks = document.querySelectorAll('.service-link');

serviceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceName = link.closest('.service-card').querySelector('h3').textContent;
        alert(`Learn more about: ${serviceName}\n\nThis would navigate to a detailed service page in a complete website.`);
    });
});

// ===== About Section Button =====
const aboutBtn = document.querySelector('.about-text .btn-primary');

if (aboutBtn) {
    aboutBtn.addEventListener('click', () => {
        alert('Learn more about Shine Native\n\nThis would navigate to an about us page with company history and team information.');
    });
}

// ===== Login/Signup Buttons =====
const loginBtn = document.querySelector('.nav-buttons .btn-secondary');
const signupBtn = document.querySelector('.nav-buttons .btn-primary');

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        alert('Login Page\n\nThis would open a login modal or navigate to a login page.');
    });
}

if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        alert('Sign Up Page\n\nThis would open a registration modal or navigate to a signup page.');
    });
}

// ===== Initialize animations =====
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to property cards on load
    propertyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ===== Add scroll-to-top functionality =====
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Press 'Esc' to close mobile menu
    if (e.key === 'Escape' && window.innerWidth <= 968) {
        navLinks.style.display = 'none';
    }
});

console.log('Shine Native Website Loaded Successfully! 🏠');
