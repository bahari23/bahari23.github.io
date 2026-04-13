// ===== NAVBAR SCROLL SHADOW =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== MOBILE NAV TOGGLE =====
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK (highlight current page) =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 90);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// ===== CONTACT FORM SUBMISSION =====
function submitForm() {
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  // Validation
  if (!fname || !lname || !email || !phone || !service || !message) {
    alert('Please fill in all fields!');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address!');
    return;
  }

  // Disable button to prevent multiple submissions
  const submitBtn = document.querySelector('.form-submit');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Send email using Formspree
  const formData = new FormData();
  formData.append('fname', fname);
  formData.append('lname', lname);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('service', service);
  formData.append('message', message);

  fetch('https://formspree.io/f/xvzdovkl', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      // Show success message
      document.getElementById('successMsg').style.display = 'flex';
      
      // Clear form
      document.getElementById('fname').value = '';
      document.getElementById('lname').value = '';
      document.getElementById('email').value = '';
      document.getElementById('phone').value = '';
      document.getElementById('service').value = '';
      document.getElementById('message').value = '';

      // Hide success message after 5 seconds
      setTimeout(() => {
        document.getElementById('successMsg').style.display = 'none';
      }, 5000);
    } else {
      throw new Error('Form submission failed');
    }
  })
  .catch(error => {
    alert('Error sending message. Please try again or contact me via email/WhatsApp.');
    console.error('Form error:', error);
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message →';
  });
}

// ===== FAQ TOGGLE =====
function toggleFaq(element) {
  const faqItem = element.closest('.faq-item');
  faqItem.classList.toggle('open');
}
