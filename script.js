// Theme Toggle Functionality
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    // Set initial theme
    this.setTheme(this.currentTheme);
    
    // Add event listener for theme toggle
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateToggleIcon();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    
    // Add a subtle animation to the toggle button
    this.themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
      this.themeToggle.style.transform = 'scale(1)';
    }, 150);
  }

  updateToggleIcon() {
    const icon = this.themeToggle.querySelector('i');
    if (this.currentTheme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  }
}

// Smooth Scrolling for Navigation Links
class SmoothScroll {
  constructor() {
    this.navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    this.init();
  }

  init() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleClick(e));
    });
  }

  handleClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update active navigation link
      this.updateActiveLink(e.target);
    }
  }

  updateActiveLink(activeLink) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
    });
    activeLink.classList.add('active');
  }
}

// Minimal scroll effects for academic CV style
class ScrollAnimations {
  constructor() {
    // Reduced animations for professional academic look
    this.init();
  }

  init() {
    // Only basic scroll effects, no complex animations
    console.log('Scroll animations initialized with minimal effects');
  }
}

// Contact Form Handler
class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this.form);
    const data = {
      name: this.form.querySelector('input[type="text"]').value,
      email: this.form.querySelector('input[type="email"]').value,
      message: this.form.querySelector('textarea').value
    };

    // Simple validation
    if (!data.name || !data.email || !data.message) {
      this.showMessage('Please fill in all fields.', 'error');
      return;
    }

    if (!this.isValidEmail(data.email)) {
      this.showMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate form submission (replace with actual form handling)
    this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
    this.form.reset();
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;
    
    // Style the message
    messageEl.style.cssText = `
      padding: 1rem;
      margin-top: 1rem;
      border-radius: 8px;
      font-weight: 500;
      ${type === 'success' 
        ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
        : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
      }
    `;

    this.form.appendChild(messageEl);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.remove();
      }
    }, 5000);
  }
}

// Header Scroll Effect
class HeaderScroll {
  constructor() {
    this.header = document.querySelector('.header');
    this.lastScrollY = window.scrollY;
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      this.header.style.background = 'rgba(26, 26, 26, 0.95)';
      this.header.style.backdropFilter = 'blur(10px)';
    } else {
      this.header.style.background = 'var(--bg-primary)';
      this.header.style.backdropFilter = 'none';
    }
    
    this.lastScrollY = currentScrollY;
  }
}

// Static content - no typing animation needed for academic CV style

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new SmoothScroll();
  new ScrollAnimations();
  new ContactForm();
  new HeaderScroll();
});

// Add CSS for minimal styling
const style = document.createElement('style');
style.textContent = `
  .nav-links a.active {
    color: var(--accent-primary);
  }
  
  .nav-links a.active::after {
    width: 100% !important;
  }
`;
document.head.appendChild(style);
