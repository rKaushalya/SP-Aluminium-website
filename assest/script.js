document.addEventListener('DOMContentLoaded', function() {
    
    // =================================================================
    // 1. GLOBAL UTILITY FUNCTIONS (Smooth Scrolling & Navbar)
    // =================================================================
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar Scroll Effect (Needs to be added here if you implemented it)
    const mainNav = document.getElementById('mainNav');
    const scrollPoint = 100; // How far down the user must scroll (in pixels)

    if (mainNav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > scrollPoint) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        });
        // Initial check
        if (window.scrollY > scrollPoint) {
            mainNav.classList.add('scrolled');
        }
    }


    // =================================================================
    // 2. BACK TO TOP BUTTON
    // =================================================================
    
    // Example for a "Back to Top" button 
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '&uarr;'; // Up arrow
    
    // Using modern class list methods (assuming you have the CSS for 'back-to-top')
    backToTopButton.classList.add('btn', 'btn-primary', 'back-to-top'); 
    
    // **Recommendation: Use CSS classes (like .js-hidden) instead of inline styles for display**
    backToTopButton.style.cssText = 'position: fixed; bottom: 20px; right: 20px; display: none;';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { 
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


    // =================================================================
    // 3. TESTIMONIAL CAROUSEL FUNCTIONALITY
    // =================================================================
    
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.testimonial-nav-btn.prev-btn');
    const nextBtn = document.querySelector('.testimonial-nav-btn.next-btn');
    let testimonialIndex = 0; 
    
    if (testimonialItems.length > 0) {
        
        function showTestimonial(index) {
            // Logic to cycle index (looping)
            if (index >= testimonialItems.length) {
                testimonialIndex = 0;
            } else if (index < 0) {
                testimonialIndex = testimonialItems.length - 1;
            } else {
                testimonialIndex = index;
            }
            
            // Remove 'active' class from all testimonials
            testimonialItems.forEach(item => {
                item.classList.remove('active');
            });

            // Add 'active' class to the current testimonial
            testimonialItems[testimonialIndex].classList.add('active');
        }

        // Event listener for the "Previous" button
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                showTestimonial(testimonialIndex - 1);
            });
        }

        // Event listener for the "Next" button
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                showTestimonial(testimonialIndex + 1);
            });
        }
        
        // Initialize: Show the first testimonial when the page loads
        showTestimonial(0); 
    }


    // =================================================================
    // 4. GALLERY FADE-IN ON SCROLL FUNCTIONALITY
    // =================================================================
    
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryItems.length > 0) {
        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        galleryItems.forEach(item => {
            observer.observe(item);
        });
    }


    // =================================================================
    // 5. LIGHTBOX INTEGRATION
    // =================================================================
    
    const imageModal = document.getElementById('imageModal');
    const modalImageDisplay = document.getElementById('modal-image-display');

    if (imageModal) {
        imageModal.addEventListener('show.bs.modal', function (event) {
            const item = event.relatedTarget;
            const imageUrl = item.getAttribute('data-img-url');
            const imageAlt = item.querySelector('img').getAttribute('alt');

            modalImageDisplay.setAttribute('src', imageUrl);
            modalImageDisplay.setAttribute('alt', imageAlt);
        });
    }

    
    // =================================================================
    // 6. HERO SLIDESHOW LOGIC
    // =================================================================
    
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    const progressBar = document.getElementById('progressBarFill');
    let slideIndex = 0; // Renamed to avoid conflict with testimonialIndex
    const delay = 5000; 

    if (slides.length > 0 && progressBar) {

        function showSlide(index) {
            
            slides.forEach(slide => slide.classList.remove('active'));
            
            // Loop calculation
            slideIndex = (index + slides.length) % slides.length;
            
            slides[slideIndex].classList.add('active');

            // Reset and animate progress bar
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            
            // Force reflow
            void progressBar.offsetWidth; 
            
            // Animate fill
            progressBar.style.transition = `width ${delay / 1000}s linear`;
            progressBar.style.width = '100%';
        }

        // Start the slideshow and set the interval
        showSlide(slideIndex);
        setInterval(() => {
            showSlide(slideIndex + 1);
        }, delay);
    }

}); // END of the single DOmContentLoaded listener