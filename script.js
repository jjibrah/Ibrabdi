
        // Theme Toggle
        function toggleTheme() {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            const icon = document.querySelector('.theme-toggle i');
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        // Set initial theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        const icon = document.querySelector('.theme-toggle i');
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

        // Modal Functions
        function openModal() {
            const modal = document.getElementById('videoModal');
            const iframe = modal.querySelector('iframe');
            const placeholder = modal.querySelector('.video-placeholder');
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Always show placeholder since we don't have a video yet
            placeholder.style.display = 'flex';
            iframe.style.display = 'none';
        }

        function closeModal() {
            const modal = document.getElementById('videoModal');
            const placeholder = modal.querySelector('.video-placeholder');
            const iframe = modal.querySelector('iframe');
            
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            placeholder.style.display = 'flex';
            iframe.style.display = 'none';
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('videoModal');
            if (event.target === modal) {
                closeModal();
            }
        }

        // Smooth scrolling for navigation links
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

        // Project Filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Form submission with loading state
        document.getElementById('contactForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            
            // Show loading state
            const button = this.querySelector('.submit-btn');
            const btnText = button.querySelector('.btn-text');
            const spinner = button.querySelector('.loading-spinner');
            
            btnText.style.display = 'none';
            spinner.style.display = 'inline-block';
            button.disabled = true;

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show success message
                    alert('Thank you for your message! I will get back to you soon.');
                    this.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                alert('Oops! There was a problem sending your message. Please try again.');
                console.error('Error:', error);
            } finally {
                // Reset button state
                btnText.style.display = 'inline-block';
                spinner.style.display = 'none';
                button.disabled = false;
            }
        });

        // Mobile Menu Toggle
        function toggleMenu() {
            const navLinks = document.querySelector('.nav-links');
            const menuToggle = document.querySelector('.menu-toggle i');
            
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('fa-bars');
            menuToggle.classList.toggle('fa-times');
        }

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                const navLinks = document.querySelector('.nav-links');
                const menuToggle = document.querySelector('.menu-toggle i');
                
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('fa-times');
                    menuToggle.classList.add('fa-bars');
                }
            });
        });
        // Resume Download Function
        function downloadResume() {
            // Create a simple resume content (you can replace this with actual PDF generation)
            const resumeContent = `
                Abdifatah Ibrahim
                Full-Stack Developer & Tech Enthusiast
                
                Email: ibrabdi109@gmail.com
                Phone: +254798272697
                Location: Nairobi, Kenya
                
                TECHNICAL SKILLS:
                Frontend: HTML5, CSS3, JavaScript, React
                Backend: Python, Node.js, MongoDB, PostgreSQL
                Mobile: Android (Kotlin), Firebase, React Native
                AI/ML: TensorFlow, OpenCV, Pandas
                
                EXPERIENCE:
                - Developed comprehensive delivery management system
                - Built cross-platform mobile applications
                - Implemented AI/ML solutions for image recognition
                
                EDUCATION:
                - Software Development & Engineering
                
                PROJECTS:
                - Amanah Delivery: Full-stack delivery management platform
                - AirHome App: Cross-platform accommodation booking app
                - AI Image Recognition: Computer vision system with 95%+ accuracy
            `;
            
            const blob = new Blob([resumeContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Abdifatah_Ibrahim_Resume.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }


                // Loading Screen
        window.addEventListener('load', function() {
            const loadingScreen = document.getElementById('loading-screen');
            // Hide loading screen immediately when page is fully loaded
            loadingScreen.classList.add('hidden');
        });

        // Also hide loading screen after DOM is ready (fallback)
        document.addEventListener('DOMContentLoaded', function() {
            const loadingScreen = document.getElementById('loading-screen');
            // Hide after a short delay to ensure smooth transition
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        });

        // Scroll to Top Button
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Animate skill progress bars on scroll
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const level = bar.getAttribute('data-level');
                        setTimeout(() => {
                            bar.style.width = level + '%';
                        }, 200);
                    });
                }
            });
        }, observerOptions);

        // Observe skill categories
        document.addEventListener('DOMContentLoaded', function() {
            const skillCategories = document.querySelectorAll('.skill-category');
            skillCategories.forEach(category => {
                skillObserver.observe(category);
            });
        });

        // Timeline Animation Observer
        const timelineObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe timeline items
        document.addEventListener('DOMContentLoaded', function() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach(item => {
                timelineObserver.observe(item);
                // Fallback: ensure items are visible after a short delay
                setTimeout(() => {
                    item.classList.add('animate');
                }, 100);
            });
        });

        // Enhanced form validation
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('contactForm');
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    if (this.classList.contains('error')) {
                        validateField(this);
                    }
                });
            });
            
            function validateField(field) {
                const value = field.value.trim();
                const fieldName = field.name;
                let isValid = true;
                let errorMessage = '';
                
                // Remove existing error styling
                field.classList.remove('error');
                const existingError = field.parentNode.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                // Validation rules
                if (field.hasAttribute('required') && !value) {
                    isValid = false;
                    errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
                } else if (fieldName === 'email' && value && !isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                } else if (fieldName === 'name' && value && value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                } else if (fieldName === 'message' && value && value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                
                if (!isValid) {
                    field.classList.add('error');
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error-message';
                    errorDiv.textContent = errorMessage;
                    field.parentNode.appendChild(errorDiv);
                }
                
                return isValid;
            }
            
            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }
        });

        // Disable 3D effect on touch devices and optimize for mobile
        document.addEventListener('DOMContentLoaded', function() {
            const card = document.querySelector('.profile-card-3d');
            
            // Only add mouse events if not a touch device
            if (window.matchMedia('(hover: hover)').matches) {
                card.addEventListener('mousemove', handleMouseMove);
                card.addEventListener('mouseleave', handleMouseLeave);
            }
            
            function handleMouseMove(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / 10) * 0.5; // Reduced rotation for better control
                const rotateY = (-(x - centerX) / 10) * 0.5;
                
                requestAnimationFrame(() => {
                    card.style.transform = `
                        perspective(1000px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        scale3d(1.02, 1.02, 1.02)
                    `;
                });
            }
            
            function handleMouseLeave() {
                requestAnimationFrame(() => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                });
            }
        });

        // Smooth scroll with offset for fixed header
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });