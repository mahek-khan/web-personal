emailjs.init('YOUR_PUBLIC_KEY');

const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x');
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255,255,255,0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => { toast.className = 'toast'; }, 4000);
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const btn = document.getElementById('submitBtn');

    if (!name || !email || !message) {
        showToast('Please fill all fields!', 'error');
        return;
    }

    btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
    btn.disabled = true;

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: name,
        from_email: email,
        message: message,
        to_email: 'mahekkhan7222@gmail.com'
    }).then(() => {
        showToast('✓ Message sent! I will reply soon.', 'success');
        this.reset();
    }).catch(() => {
        showToast('Failed to send. Please try again!', 'error');
    }).finally(() => {
        btn.innerHTML = 'Send Message';
        btn.disabled = false;
    });
});
