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

// --- Testimonial Carousel Functionality ---
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.testimonial-nav-btn.prev-btn');
    const nextBtn = document.querySelector('.testimonial-nav-btn.next-btn');

    let currentIndex = 0; // Start with the first testimonial

    // Function to show a specific testimonial
    function showTestimonial(index) {
        // Remove 'active' class from all testimonials
        testimonialItems.forEach(item => {
            item.classList.remove('active');
        });

        // Add 'active' class to the current testimonial
        testimonialItems[index].classList.add('active');
    }

    // Event listener for the "Previous" button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = testimonialItems.length - 1; // Loop to the last testimonial
            }
            showTestimonial(currentIndex);
        });
    }

    // Event listener for the "Next" button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex++;
            if (currentIndex >= testimonialItems.length) {
                currentIndex = 0; // Loop back to the first testimonial
            }
            showTestimonial(currentIndex);
        });
    }

    // Initialize: Show the first testimonial when the page loads
    if (testimonialItems.length > 0) {
        showTestimonial(currentIndex);
    }
    // --- End Testimonial Carousel Functionality ---

    // --- GALLERY FADE-IN ON SCROLL FUNCTIONALITY ---
const galleryItems = document.querySelectorAll('.gallery-item');

if (galleryItems.length > 0) {
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When the item enters the viewport
                entry.target.classList.add('in-view');
                // Stop observing it once it's visible
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Start observing all gallery items
    galleryItems.forEach(item => {
        observer.observe(item);
    });
}
// --- END GALLERY FADE-IN ON SCROLL ---

// --- LIGHTBOX INTEGRATION ---
const imageModal = document.getElementById('imageModal');
const modalImageDisplay = document.getElementById('modal-image-display');

if (imageModal) {
    imageModal.addEventListener('show.bs.modal', function (event) {
        // Button that triggered the modal
        const item = event.relatedTarget;
        
        // Extract info from data-img-url attribute
        const imageUrl = item.getAttribute('data-img-url');
        const imageAlt = item.querySelector('img').getAttribute('alt');

        // Update the modal's content
        modalImageDisplay.setAttribute('src', imageUrl);
        modalImageDisplay.setAttribute('alt', imageAlt);
    });
}
// --- END LIGHTBOX INTEGRATION ---