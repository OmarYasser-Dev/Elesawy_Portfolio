/**
 * OMAR YASSER — PORTFOLIO JAVASCRIPT
 * Python Automation & Web Scraping Developer
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Theme Toggle (Dark Mode Default + Light Mode + LocalStorage)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Check saved theme or use dark as default
  const savedTheme = localStorage.getItem('omar_portfolio_theme');
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else {
    // Default to dark theme
    htmlRoot.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('omar_portfolio_theme', newTheme);
    });
  }

  /* ==========================================================================
     2. Mobile Navigation Drawer Toggle
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking on any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    // Close on resize if window expands beyond mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ==========================================================================
     3. Active Navigation Link Highlighting on Scroll
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  const highlightCurrentNav = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightCurrentNav, { passive: true });

  /* ==========================================================================
     4. Scroll Reveal Animations (Intersection Observer)
     ========================================================================== */
  // Add animation class to cards and major components
  const animatableElements = document.querySelectorAll(
    '.project-card, .skill-category-card, .service-card, .timeline-item, .profile-card, .objective-card, .contact-info-panel, .contact-form-panel'
  );

  animatableElements.forEach(el => el.classList.add('reveal-on-scroll'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animatableElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    animatableElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* ==========================================================================
     5. Back To Top Button
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     6. Contact Form Validation & Real Email Submission (FormSubmit API)
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Email regex validation
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValid = true;

      // Clear previous error messages
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      nameInput.classList.remove('error');
      emailInput.classList.remove('error');
      messageInput.classList.remove('error');
      formAlert.className = 'form-alert';
      formAlert.textContent = '';

      // Validate Name
      const nameVal = nameInput.value.trim();
      if (!nameVal) {
        nameError.textContent = 'Please enter your name.';
        nameInput.classList.add('error');
        isValid = false;
      }

      // Validate Email
      const emailVal = emailInput.value.trim();
      if (!emailVal) {
        emailError.textContent = 'Please enter your email address.';
        emailInput.classList.add('error');
        isValid = false;
      } else if (!isValidEmail(emailVal)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailInput.classList.add('error');
        isValid = false;
      }

      // Validate Message
      const messageVal = messageInput.value.trim();
      if (!messageVal) {
        messageError.textContent = 'Please enter your message.';
        messageInput.classList.add('error');
        isValid = false;
      } else if (messageVal.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters long.';
        messageInput.classList.add('error');
        isValid = false;
      }

      if (!isValid) return;

      const subjectVal = subjectInput ? (subjectInput.value.trim() || 'New Portfolio Inquiry') : 'New Portfolio Inquiry';

      // Set sending state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span>Sending Message...</span>
        <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
      `;

      try {
        const response = await fetch('https://formsubmit.co/ajax/omaryasser.dev12@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: nameVal,
            email: emailVal,
            subject: subjectVal,
            message: messageVal,
            _subject: `Portfolio Message from ${nameVal}: ${subjectVal}`
          })
        });

        const data = await response.json().catch(() => null);

        if (response.ok && data && (data.success === 'true' || data.success === true)) {
          formAlert.className = 'form-alert success';
          formAlert.textContent = 'Thank you! Your message has been sent successfully.';
          contactForm.reset();

          setTimeout(() => {
            formAlert.className = 'form-alert';
            formAlert.textContent = '';
          }, 7000);
        } else if (data && data.message) {
          if (data.message.includes('Activation') || data.message.includes('activate') || data.message.includes('Activate')) {
            formAlert.className = 'form-alert success';
            formAlert.textContent = 'Form activation email has been sent to omaryasser.dev12@gmail.com. Please check your inbox/spam and click "Activate Form".';
          } else {
            formAlert.className = 'form-alert error';
            formAlert.textContent = data.message;
          }
        } else {
          throw new Error('Server returned an unexpected response');
        }
      } catch (err) {
        formAlert.className = 'form-alert error';
        if (window.location.protocol === 'file:') {
          formAlert.innerHTML = `Form submission requires a web server (e.g. Live Server or live website) and does not work via local <code>file:///</code> path. You can also contact directly at <a href="mailto:omaryasser.dev12@gmail.com" style="text-decoration:underline; font-weight:600; color:inherit;">omaryasser.dev12@gmail.com</a>.`;
        } else {
          formAlert.innerHTML = `Unable to send message right now. You can reach out directly via email at <a href="mailto:omaryasser.dev12@gmail.com" style="text-decoration:underline; font-weight:600; color:inherit;">omaryasser.dev12@gmail.com</a>.`;
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Send Message</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        `;
      }
    });
  }

  /* ==========================================================================
     7. Hero Terminal Live Micro-Interaction
     ========================================================================== */
  const terminalDisplay = document.getElementById('terminal-display');
  if (terminalDisplay) {
    // Add subtle hover or click interactivity to the terminal to make it feel alive
    terminalDisplay.addEventListener('mouseenter', () => {
      const cursor = terminalDisplay.querySelector('.t-cursor');
      if (cursor) cursor.style.color = '#10b981';
    });
    terminalDisplay.addEventListener('mouseleave', () => {
      const cursor = terminalDisplay.querySelector('.t-cursor');
      if (cursor) cursor.style.color = '';
    });
  }

  /* ==========================================================================
     8. Service Card CTA to Contact Form Pre-fill & Focus
     ========================================================================== */
  const serviceCtaLinks = document.querySelectorAll('.service-cta-link');
  if (serviceCtaLinks.length) {
    const subjectField = document.getElementById('subject');
    const nameField = document.getElementById('name');
    const contactSection = document.getElementById('contact');

    serviceCtaLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const serviceName = link.getAttribute('data-service');
        if (serviceName && subjectField) {
          subjectField.value = `Project Inquiry: ${serviceName}`;
          subjectField.classList.remove('field-highlight');
          void subjectField.offsetWidth; // Force CSS reflow to re-trigger animation
          subjectField.classList.add('field-highlight');
        }

        if (contactSection) {
          e.preventDefault();
          contactSection.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            if (nameField) {
              nameField.focus();
            }
          }, 600);
        }
      });
    });
  }

});
