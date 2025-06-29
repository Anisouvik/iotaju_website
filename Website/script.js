// Global modal functions - available immediately
function openProjectModal(projectTitle, projectContent) {
    console.log('openProjectModal called with:', projectTitle);
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('projectModalContent');
    
    console.log('Modal elements found:', { modal, modalContent });
    
    if (modal && modalContent) {
        modalContent.innerHTML = `<h2>${projectTitle}</h2><div class="modal-body">${projectContent}</div>`;
        modal.style.display = 'block';
        console.log('Modal should be visible now');
        console.log('Modal display style:', modal.style.display);
    } else {
        console.error('Modal elements not found!');
        console.error('Modal:', modal);
        console.error('ModalContent:', modalContent);
    }
}

function openEventModal(eventType) {
    console.log('Opening event modal for:', eventType);
    const modal = document.getElementById('eventModal');
    const modalContent = document.getElementById('modalContent');
    
    console.log('Modal element:', modal);
    console.log('Modal content element:', modalContent);
    console.log('Available event types:', Object.keys(eventModalContent));
    
    if (eventModalContent[eventType]) {
        console.log('Event content found, setting modal content');
        modalContent.innerHTML = eventModalContent[eventType];
        modal.style.display = 'block';
        console.log('Modal should now be visible');
    } else {
        console.error('Event type not found:', eventType);
        console.log('Available event types:', Object.keys(eventModalContent));
    }
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20; // Extra 20px for breathing room
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animation for Event Cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Gallery Slider Functionality
let currentSlideIndex = 0;
let slideInterval;
const slideDuration = 3000; // 3 seconds per slide

function initGallerySlider() {
    const sliderTrack = document.querySelector('.slider-track');
    if (!sliderTrack) return;
    
    // Start automatic sliding
    startAutoSlide();
    
    // Pause auto-slide on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', pauseAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
}

function slideGallery(direction) {
    const sliderTrack = document.querySelector('.slider-track');
    const items = document.querySelectorAll('.slider-item');
    
    if (!sliderTrack || items.length === 0) return;
    
    const itemWidth = 370; // 350px width + 20px gap
    const totalSlides = items.length;
    
    if (direction === 'next') {
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    } else if (direction === 'prev') {
        currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    }
    
    const translateX = -currentSlideIndex * itemWidth;
    sliderTrack.style.transform = `translateX(${translateX}px)`;
    
    // Reset auto-slide timer
    resetAutoSlide();
}

function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    
    slideInterval = setInterval(() => {
        slideGallery('next');
    }, slideDuration);
}

function pauseAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

function resetAutoSlide() {
    pauseAutoSlide();
    startAutoSlide();
}

// Initialize gallery slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initGallerySlider();
    
    // Modal close functionality
    const eventModal = document.getElementById('eventModal');
    const projectModal = document.getElementById('projectModal');

    // Close modals function
    function closeModals() {
        if (eventModal) eventModal.style.display = 'none';
        if (projectModal) projectModal.style.display = 'none';
    }

    // Close modals when clicking on close buttons
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('close')) {
            closeModals();
        }
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === eventModal) {
            eventModal.style.display = 'none';
        }
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModals();
        }
    });
    
    // Event cards animation
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        observer.observe(card);
    });

    // Project cards animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Team sections animation
    const teamSections = document.querySelectorAll('.team-section');
    teamSections.forEach(section => {
        observer.observe(section);
    });

    // About sections animation (for about.html page)
    const aboutSections = document.querySelectorAll('.about-section');
    aboutSections.forEach(section => {
        observer.observe(section);
    });

    // Fix About Us section positioning
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const navbarHeight = navbar.offsetHeight;
            const requiredPadding = navbarHeight + 50; // Extra 50px for breathing room
            aboutSection.style.paddingTop = `${requiredPadding}px`;
            aboutSection.style.marginTop = '0';
            aboutSection.style.position = 'relative';
            aboutSection.style.zIndex = '1';
        }
    }

    // Animate About Us and Contact Us sections on scroll
    const animatedSections = document.querySelectorAll('.section-animate');
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Force reflow for animation
                    void entry.target.offsetWidth;
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedSections.forEach(section => {
            sectionObserver.observe(section);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        animatedSections.forEach(section => {
            section.classList.add('visible');
        });
    }
});

// Event modal content
const eventModalContent = {
    'innovatia': `
        <h2>INNOVATIA</h2>
        <div class="modal-details">
            <p><strong>Date:</strong> 3rd July 2025</p>
            <p><strong>Time:</strong> 9:00 AM - 6:00 PM</p>
            <p><strong>Location:</strong> Main Campus Auditorium</p>
            <p><strong>Entry:</strong> Free for all students</p>
            <h3>Event Overview:</h3>
            <p>Join us for a Journey through innovation, creativity and technology. Dive into competitions, exhibitions and more!!</p>
            <h3>What to Expect:</h3>
            <ul>
                <li>Innovation competitions</li>
                <li>Technology exhibitions</li>
                <li>Creative workshops</li>
                <li>Networking opportunities</li>
                <li>Prizes and recognition</li>
            </ul>
            <h3>Event Schedule:</h3>
            <ul>
                <li>9:00 AM - Opening Ceremony</li>
                <li>10:00 AM - Innovation Competitions</li>
                <li>2:00 PM - Technology Exhibitions</li>
                <li>4:00 PM - Workshops</li>
                <li>6:00 PM - Closing & Awards</li>
            </ul>
            <div class="modal-buttons">
                <a href="documents/innovatia-brochure.pdf" target="_blank" class="pdf-button">
                    📄 Download Event Brochure (PDF)
                </a>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSd6vH8mBZux1-B0AGpB6pecnSZ_MCU_K6ak4XLL59uBsxKnOg/viewform" target="_blank" class="cta-button">
                    Apply Now
                </a>
            </div>
        </div>
    `,
    'iot-workshop': `
        <h2>IoT Workshop</h2>
        <div class="modal-details">
            <p><strong>Date:</strong> March 15-16, 2024</p>
            <p><strong>Time:</strong> 9:00 AM - 5:00 PM</p>
            <p><strong>Location:</strong> Computer Science Lab, Block A</p>
            <p><strong>Registration Fee:</strong> ₹500</p>
            <h3>What You'll Learn:</h3>
            <ul>
                <li>Arduino programming basics</li>
                <li>Sensor integration and data collection</li>
                <li>IoT communication protocols</li>
                <li>Cloud platform integration</li>
                <li>Real-world project development</li>
            </ul>
            <h3>Prerequisites:</h3>
            <p>Basic programming knowledge (C/C++ or Python). No prior IoT experience required.</p>
            <h3>What's Included:</h3>
            <ul>
                <li>Arduino starter kit</li>
                <li>Workshop materials</li>
                <li>Certificate of completion</li>
                <li>Lunch and refreshments</li>
            </ul>
            <button class="cta-button" onclick="registerEvent('iot-workshop')">Register Now</button>
        </div>
    `,
    'iot-hackathon': `
        <h2>IoT Hackathon</h2>
        <div class="modal-details">
            <p><strong>Date:</strong> April 20-22, 2024</p>
            <p><strong>Time:</strong> 48 hours continuous</p>
            <p><strong>Location:</strong> Innovation Center</p>
            <p><strong>Registration Fee:</strong> ₹1000 per team</p>
            <h3>Theme:</h3>
            <p>"Smart Cities: Building Tomorrow's Connected Infrastructure"</p>
            <h3>Prizes:</h3>
            <ul>
                <li>1st Prize: ₹50,000 + Internship opportunities</li>
                <li>2nd Prize: ₹30,000 + Tech gadgets</li>
                <li>3rd Prize: ₹20,000 + Certificates</li>
                <li>Special Category Prizes: ₹10,000 each</li>
            </ul>
            <h3>Judging Criteria:</h3>
            <ul>
                <li>Innovation and creativity (30%)</li>
                <li>Technical implementation (25%)</li>
                <li>Market potential (20%)</li>
                <li>Presentation and demo (15%)</li>
                <li>Code quality (10%)</li>
            </ul>
            <h3>Provided Resources:</h3>
            <ul>
                <li>IoT development kits</li>
                <li>Cloud platform access</li>
                <li>Mentorship from industry experts</li>
                <li>24/7 technical support</li>
                <li>Food and refreshments</li>
            </ul>
            <button class="cta-button" onclick="registerEvent('iot-hackathon')">Register Team</button>
        </div>
    `,
    'tech-talk': `
        <h2>Tech Talk Series</h2>
        <div class="modal-details">
            <p><strong>Next Session:</strong> March 25, 2024</p>
            <p><strong>Time:</strong> 6:00 PM - 8:00 PM</p>
            <p><strong>Location:</strong> Auditorium, Main Building</p>
            <p><strong>Entry:</strong> Free for IOTA members</p>
            <h3>Featured Speaker:</h3>
            <p><strong>Dr. Sarah Johnson</strong><br>
            Senior IoT Architect, TechCorp Industries</p>
            <h3>Topic:</h3>
            <p>"Edge Computing in IoT: The Future of Distributed Intelligence"</p>
            <h3>What to Expect:</h3>
            <ul>
                <li>Industry insights and trends</li>
                <li>Real-world case studies</li>
                <li>Career guidance and opportunities</li>
                <li>Networking with professionals</li>
                <li>Q&A session</li>
            </ul>
            <h3>Upcoming Talks:</h3>
            <ul>
                <li>April 15: "5G and IoT Convergence"</li>
                <li>May 10: "AI-Powered IoT Solutions"</li>
                <li>June 5: "IoT Security Best Practices"</li>
            </ul>
            <button class="cta-button" onclick="registerEvent('tech-talk')">RSVP Now</button>
        </div>
    `,
    'lord-of-the-rings': `
        <h2>LORD OF THE RINGS</h2>
        <div class="modal-details">
            <p><strong>Date:</strong> 23 March 2025</p>
            <p><strong>Time:</strong> 10:00 AM - 8:00 PM</p>
            <p><strong>Location:</strong> IoT Lab, Block B</p>
            <p><strong>Entry:</strong> Free for all students</p>
            <h3>Event Overview:</h3>
            <p>A thrilling event journeying through the challenges of IoT systems. Collaborate, compete, and conquer!!</p>
            <h3>What to Expect:</h3>
            <ul>
                <li>IoT system challenges</li>
                <li>Team collaboration</li>
                <li>Competitive programming</li>
                <li>Problem-solving workshops</li>
                <li>Prizes and recognition</li>
            </ul>
            <h3>Event Schedule:</h3>
            <ul>
                <li>10:00 AM - Registration & Team Formation</li>
                <li>11:00 AM - Challenge Introduction</li>
                <li>12:00 PM - Development Phase</li>
                <li>4:00 PM - Testing & Debugging</li>
                <li>6:00 PM - Presentations</li>
                <li>8:00 PM - Awards & Closing</li>
            </ul>
            <h3>Challenge Categories:</h3>
            <ul>
                <li>Sensor Integration</li>
                <li>Data Processing</li>
                <li>Communication Protocols</li>
                <li>User Interface Design</li>
            </ul>
            <button class="cta-button" onclick="registerEvent('lord-of-the-rings')">Register Now</button>
        </div>
    `,
    'connexion': `
        <h2>CONNEXION</h2>
        <div class="modal-details">
            <p><strong>Date:</strong> To be declared soon</p>
            <p><strong>Duration:</strong> 24 hours</p>
            <p><strong>Location:</strong> Innovation Center</p>
            <p><strong>Target:</strong> Freshmen students</p>
            <h3>Event Overview:</h3>
            <p>The IoT Applications Club launched its first-ever IoT Hackathon, "Connexion", inviting enthusiastic freshmen to explore the vast world of Internet of Things through innovation and teamwork.</p>
            <h3>What to Expect:</h3>
            <ul>
                <li>Introduction to IoT concepts</li>
                <li>Hands-on project development</li>
                <li>Mentorship from seniors</li>
                <li>Team collaboration</li>
                <li>Innovation showcase</li>
            </ul>
            <h3>Event Highlights:</h3>
            <ul>
                <li>Beginner-friendly workshops</li>
                <li>IoT kit provided</li>
                <li>Expert guidance</li>
                <li>Networking opportunities</li>
                <li>Certificate of participation</li>
            </ul>
            <h3>Learning Outcomes:</h3>
            <ul>
                <li>Basic IoT architecture</li>
                <li>Sensor integration</li>
                <li>Data collection and processing</li>
                <li>Project presentation skills</li>
            </ul>
            <button class="cta-button" onclick="registerEvent('connexion')">Stay Updated</button>
        </div>
    `
};

// Project modal content
const projectModalContent = {
    'smart-home': `
        <h2>Smart Home System</h2>
        <div class="modal-details">
            <h3>Project Overview</h3>
            <p>A comprehensive IoT solution that transforms any home into a smart, connected environment. The system integrates lighting, security, climate control, and entertainment systems through a unified mobile application.</p>
            
            <h3>Key Features</h3>
            <ul>
                <li><strong>Smart Lighting:</strong> Automated lighting control with motion sensors and scheduling</li>
                <li><strong>Security System:</strong> Door/window sensors, motion detection, and camera integration</li>
                <li><strong>Climate Control:</strong> Smart thermostat with temperature and humidity monitoring</li>
                <li><strong>Voice Control:</strong> Integration with Alexa and Google Assistant</li>
                <li><strong>Energy Management:</strong> Real-time power consumption monitoring and optimization</li>
            </ul>
            
            <h3>Technology Stack</h3>
            <ul>
                <li><strong>Hardware:</strong> Raspberry Pi 4, Arduino Uno, Various sensors</li>
                <li><strong>Backend:</strong> Node.js, Express.js, MongoDB</li>
                <li><strong>Frontend:</strong> React Native (Mobile App)</li>
                <li><strong>Cloud:</strong> AWS IoT Core, AWS Lambda</li>
                <li><strong>Communication:</strong> MQTT, WebSocket</li>
            </ul>
            
            <h3>Team Members</h3>
            <ul>
                <li>Alex Johnson - Project Lead & Backend Development</li>
                <li>Sarah Chen - Mobile App Development</li>
                <li>Mike Davis - Hardware Integration</li>
                <li>Emma Wilson - UI/UX Design</li>
            </ul>
            
            <h3>Development Timeline</h3>
            <ul>
                <li><strong>Phase 1:</strong> Hardware setup and basic sensor integration (2 weeks)</li>
                <li><strong>Phase 2:</strong> Backend API development (3 weeks)</li>
                <li><strong>Phase 3:</strong> Mobile app development (4 weeks)</li>
                <li><strong>Phase 4:</strong> Testing and optimization (2 weeks)</li>
            </ul>
            
            <button class="cta-button" onclick="viewProjectDemo('smart-home')">View Demo</button>
        </div>
    `,
    'env-monitor': `
        <h2>Environmental Monitor</h2>
        <div class="modal-details">
            <h3>Project Overview</h3>
            <p>A real-time environmental monitoring system designed to track air quality, temperature, humidity, and pollution levels. The system provides data-driven insights for environmental awareness and decision-making.</p>
            
            <h3>Key Features</h3>
            <ul>
                <li><strong>Air Quality Monitoring:</strong> PM2.5, PM10, CO2, VOC levels</li>
                <li><strong>Weather Data:</strong> Temperature, humidity, pressure, wind speed</li>
                <li><strong>Real-time Dashboard:</strong> Web-based monitoring interface</li>
                <li><strong>Data Analytics:</strong> Historical trends and pattern analysis</li>
                <li><strong>Alert System:</strong> Notifications for hazardous conditions</li>
                <li><strong>Mobile App:</strong> On-the-go monitoring capabilities</li>
            </ul>
            
            <h3>Technology Stack</h3>
            <ul>
                <li><strong>Hardware:</strong> ESP32, Air quality sensors, Weather sensors</li>
                <li><strong>Backend:</strong> Python Flask, PostgreSQL</li>
                <li><strong>Frontend:</strong> React.js, Chart.js</li>
                <li><strong>Cloud:</strong> Google Cloud Platform</li>
                <li><strong>Data Processing:</strong> Pandas, NumPy</li>
            </ul>
            
            <h3>Team Members</h3>
            <ul>
                <li>David Lee - Hardware & Sensor Integration</li>
                <li>Lisa Brown - Data Analytics & Visualization</li>
                <li>Tom Garcia - Backend Development</li>
                <li>Anna Kim - Frontend Development</li>
            </ul>
            
            <h3>Impact & Applications</h3>
            <ul>
                <li>Urban air quality assessment</li>
                <li>Indoor environment monitoring</li>
                <li>Industrial safety compliance</li>
                <li>Research and academic studies</li>
                <li>Public health awareness</li>
            </ul>
            
            <button class="cta-button" onclick="viewProjectDemo('env-monitor')">View Demo</button>
        </div>
    `,
    'smart-agri': `
        <h2>Smart Agriculture</h2>
        <div class="modal-details">
            <h3>Project Overview</h3>
            <p>An IoT-based precision agriculture solution that monitors soil conditions, weather patterns, and crop health to optimize farming practices and increase agricultural yield while reducing resource consumption.</p>
            
            <h3>Key Features</h3>
            <ul>
                <li><strong>Soil Monitoring:</strong> Moisture, pH, temperature, nutrient levels</li>
                <li><strong>Weather Integration:</strong> Local weather data and forecasting</li>
                <li><strong>Automated Irrigation:</strong> Smart watering system based on soil conditions</li>
                <li><strong>Crop Health Monitoring:</strong> Disease detection using image processing</li>
                <li><strong>Predictive Analytics:</strong> Yield prediction and optimal planting times</li>
                <li><strong>Mobile Management:</strong> Farm monitoring and control via smartphone</li>
            </ul>
            
            <h3>Technology Stack</h3>
            <ul>
                <li><strong>Hardware:</strong> Arduino Mega, Soil sensors, Water pumps</li>
                <li><strong>Backend:</strong> Django, PostgreSQL</li>
                <li><strong>Frontend:</strong> Vue.js, Bootstrap</li>
                <li><strong>AI/ML:</strong> TensorFlow, OpenCV</li>
                <li><strong>Cloud:</strong> Azure IoT Hub</li>
            </ul>
            
            <h3>Team Members</h3>
            <ul>
                <li>Chris Taylor - AI/ML Development</li>
                <li>Maria Rodriguez - Hardware & Automation</li>
                <li>Ryan Miller - Backend Development</li>
                <li>Sophie Clark - Frontend & Mobile App</li>
            </ul>
            
            <h3>Benefits for Farmers</h3>
            <ul>
                <li>Reduced water consumption by 30-40%</li>
                <li>Increased crop yield by 20-25%</li>
                <li>Early disease detection and prevention</li>
                <li>Optimized fertilizer usage</li>
                <li>Reduced manual labor requirements</li>
                <li>Data-driven decision making</li>
            </ul>
            
            <button class="cta-button" onclick="viewProjectDemo('smart-agri')">View Demo</button>
        </div>
    `
};

// Registration functions
function registerEvent(eventType) {
    alert(`Registration for ${eventType} will be available soon!`);
}

function viewProjectDemo(projectType) {
    alert(`Demo for ${projectType} will be available soon!`);
}

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Scroll-based navbar styling - Immediate execution
(function() {
    console.log('Setting up scroll-based navbar...');
    
    let lastScrollTop = 0;
    let scrollDirection = 'down';
    
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) {
            console.log('Navbar not found!');
            return;
        }
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDelta = scrollTop - lastScrollTop;
        
        // Determine scroll direction with smaller threshold for smoother detection
        if (Math.abs(scrollDelta) > 2) { // Reduced threshold for smoother detection
            scrollDirection = scrollDelta > 0 ? 'down' : 'up';
        }
        
        // Remove all classes first
        navbar.classList.remove('scrolled', 'transparent', 'fade-away', 'fade-partial', 'fade-slight', 'fade-medium');
        
        // More gradual fade progression starting from the very beginning
        if (scrollTop <= 20) {
            // At the very top - normal navbar
            console.log('At top - normal navbar');
        } else if (scrollTop <= 80) {
            // Slight fade starts immediately
            navbar.classList.add('fade-slight');
            console.log('Slight fade');
        } else if (scrollTop <= 150) {
            // Medium fade
            navbar.classList.add('fade-medium');
            console.log('Medium fade');
        } else if (scrollTop <= 250) {
            // More transparent
            navbar.classList.add('transparent');
            console.log('Transparent');
        } else if (scrollDirection === 'down' && scrollTop > 250) {
            // Scrolling down - fade away
            if (scrollTop > 400) {
                navbar.classList.add('fade-away');
                console.log('Fade away completely');
            } else {
                navbar.classList.add('fade-partial');
                console.log('Fade partial');
            }
        } else if (scrollDirection === 'up') {
            // Scrolling up - show navbar based on position
            if (scrollTop > 200) {
                navbar.classList.add('scrolled');
                console.log('Scrolling up - show navbar');
            } else if (scrollTop > 100) {
                navbar.classList.add('fade-medium');
                console.log('Scrolling up - medium fade');
            } else if (scrollTop > 50) {
                navbar.classList.add('fade-slight');
                console.log('Scrolling up - slight fade');
            } else {
                console.log('Scrolling up - normal');
            }
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Add scroll event listener with throttling for smoother performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleNavbarScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Initialize on page load
    handleNavbarScroll();
    
    // Also try to run after a short delay to ensure DOM is ready
    setTimeout(handleNavbarScroll, 100);
    
    console.log('Scroll-based navbar setup complete');
})();

// Simple Explore button functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up Explore button...');
    
    // Try multiple selectors to find the button
    let exploreButton = document.querySelector('.hero .cta-button');
    if (!exploreButton) {
        exploreButton = document.querySelector('.cta-button');
    }
    if (!exploreButton) {
        exploreButton = document.querySelector('button');
    }
    
    console.log('Explore button found:', exploreButton);
    
    if (exploreButton) {
        exploreButton.onclick = function() {
            console.log('Explore button clicked!');
            const recentEventsSection = document.getElementById('recent-events');
            console.log('Recent events section found:', recentEventsSection);
            
            if (recentEventsSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = recentEventsSection.offsetTop - navbarHeight - 20;
                console.log('Scrolling to position:', targetPosition);
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.log('Recent events section not found!');
            }
        };
        console.log('Explore button click handler added');
    } else {
        console.log('No explore button found!');
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    // Fade in hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transition = 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            hero.style.opacity = '1';
        }, 100);
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in effect to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    // Trigger animations after page load
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Fix About Us section positioning
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const navbarHeight = navbar.offsetHeight;
            const requiredPadding = navbarHeight + 50; // Extra 50px for breathing room
            aboutSection.style.paddingTop = `${requiredPadding}px`;
            aboutSection.style.marginTop = '0';
            aboutSection.style.position = 'relative';
            aboutSection.style.zIndex = '1';
        }
    }
}); 