document.addEventListener('DOMContentLoaded', function() {
    // =================================================================
    // 1. GLOBAL UTILITY FUNCTIONS (Smooth Scrolling & Navbar)
    // =================================================================
    
    // --- Navbar Scroll Effect ---
    // Make sure your navbar in HTML has id="mainNav" for this to work
    const mainNav = document.getElementById('mainNav');
    const scrollThreshold = 50; // How far down the user must scroll (in pixels) for 'scrolled' class

    if (mainNav) {
        // Function to handle navbar scroll state
        const handleNavbarScroll = () => {
            if (window.scrollY > scrollThreshold) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleNavbarScroll);
        // Initial check on load
        handleNavbarScroll();
    }

    // --- Smooth scrolling for navigation links & Mobile Navbar Auto-Close on Link Click ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Auto-close mobile navbar if open and a link is clicked
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- NEW: Mobile Navbar Auto-Close on Outside Click ---
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav'); // The collapsible div

    if (navbarToggler && navbarCollapse) {
        document.addEventListener('click', function (event) {
            // Check if the navbar is currently open (Bootstrap adds 'show' class to navbarCollapse)
            const isNavbarOpen = navbarCollapse.classList.contains('show');
            
            // If navbar is open AND the click target is NOT the toggler button AND NOT inside the navbarCollapse menu
            if (isNavbarOpen && !navbarToggler.contains(event.target) && !navbarCollapse.contains(event.target)) {
                // Close the navbar using Bootstrap's Collapse API
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    }


    // =================================================================
    // 2. BACK TO TOP BUTTON
    // =================================================================
    
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '&uarr;'; // Up arrow
    backToTopButton.classList.add('btn', 'btn-primary', 'back-to-top'); 
    backToTopButton.style.cssText = 'position: fixed; bottom: 20px; right: 20px; display: none;';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { 
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
        // NOTE: Navbar scroll handling is moved to its own function for clarity.
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
            
            testimonialItems.forEach(item => {
                item.classList.remove('active');
            });

            testimonialItems[testimonialIndex].classList.add('active');
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                showTestimonial(testimonialIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                showTestimonial(testimonialIndex + 1);
            });
        }
        
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
    
    // Ensure you have a modal with id="imageModal" and an <img> with id="modal-image-display" in your HTML
    const imageModal = document.getElementById('imageModal');
    const modalImageDisplay = document.getElementById('modal-image-display');

    if (imageModal) {
        // Bootstrap 5 modals have events like 'show.bs.modal'
        imageModal.addEventListener('show.bs.modal', function (event) {
            // Get the button that triggered the modal
            const item = event.relatedTarget;
            // Extract info from data attributes or child elements of the triggered item
            const imageUrl = item.getAttribute('data-img-url') || item.querySelector('img').src; // Fallback
            const imageAlt = item.querySelector('img').getAttribute('alt') || 'Gallery Image';

            modalImageDisplay.setAttribute('src', imageUrl);
            modalImageDisplay.setAttribute('alt', imageAlt);
        });
    }

    
    // =================================================================
    // 6. HERO SLIDESHOW LOGIC
    // =================================================================
    
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    const progressBar = document.getElementById('progressBarFill');
    let slideIndex = 0; 
    const delay = 5000; 

    if (slides.length > 0 && progressBar) {

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            
            slideIndex = (index + slides.length) % slides.length;
            
            slides[slideIndex].classList.add('active');

            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            
            void progressBar.offsetWidth; 
            
            progressBar.style.transition = `width ${delay / 1000}s linear`;
            progressBar.style.width = '100%';
        }

        showSlide(slideIndex);
        setInterval(() => {
            showSlide(slideIndex + 1);
        }, delay);
    }

}); // END of the single DOmContentLoaded listener