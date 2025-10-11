document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simple form validation example for the contact form
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission for now

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // In a real static site, you'd typically use a third-party service
            // like Formspree.io or Netlify Forms for handling submissions.
            // For now, let's just log it.
            console.log('Form Submitted:', { name, email, message });
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Example for a "Back to Top" button (requires HTML for the button)
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '&uarr;'; // Up arrow
    backToTopButton.classList.add('btn', 'btn-primary', 'back-to-top');
    backToTopButton.style.cssText = 'position: fixed; bottom: 20px; right: 20px; display: none;';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});