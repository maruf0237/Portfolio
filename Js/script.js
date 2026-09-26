document.addEventListener("DOMContentLoaded", () => {
    // Theme Toggle
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.documentElement.classList.add("light");

        if (themeIcon) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            document.documentElement.classList.toggle("light");

            const isLight =
                document.documentElement.classList.contains("light");

            localStorage.setItem(
                "theme",
                isLight ? "light" : "dark"
            );

            if (themeIcon) {
                if (isLight) {
                    themeIcon.classList.remove("fa-moon");
                    themeIcon.classList.add("fa-sun");
                } else {
                    themeIcon.classList.remove("fa-sun");
                    themeIcon.classList.add("fa-moon");
                }
            }
        });
    }
    // Smooth Scrolling

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
    // Active Navigation Link

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    // Scroll Reveal Animation

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // Typing Effect

    const typedText = document.getElementById("typed-text");

    if (typedText) {

        const texts = [
            "Computer Science Student",
            "Software Developer",
            "Problem Solver",
            "Machine Learning Enthusiast"
        ];

        let textIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentText = texts[textIndex];

            if (!deleting) {

                typedText.textContent =
                    currentText.substring(0, charIndex + 1);

                charIndex++;

                if (charIndex === currentText.length) {

                    deleting = true;

                    setTimeout(typeEffect, 1500);

                    return;
                }

            } else {

                typedText.textContent =
                    currentText.substring(0, charIndex - 1);

                charIndex--;

                if (charIndex === 0) {

                    deleting = false;

                    textIndex =
                        (textIndex + 1) % texts.length;

                    setTimeout(typeEffect, 300);

                    return;
                }
            }

            setTimeout(
                typeEffect,
                deleting ? 50 : 100
            );
        }

        typeEffect();
    }
    // Back To Top Button

    const backTop = document.getElementById("backTop");

    if (backTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                backTop.classList.add("visible");
            } else {
                backTop.classList.remove("visible");
            }
        });
    }
    // Contact Form

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const name =
                contactForm.querySelector('[name="name"]');

            const email =
                contactForm.querySelector('[name="email"]');

            const subject =
                contactForm.querySelector('[name="subject"]');

            const message =
                contactForm.querySelector('[name="message"]');


            // Basic validation

            if (!name || !email || !subject || !message) {
                return;
            }

            if (
                name.value.trim() === "" ||
                email.value.trim() === "" ||
                subject.value.trim() === "" ||
                message.value.trim() === ""
            ) {

                alert("Please fill in all fields.");

                return;
            }

            // Email validation

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email.value.trim())) {

                alert("Please enter a valid email address.");

                return;
            }


            // Success message

            alert(
                "Thank you! Your message has been submitted successfully."
            );

            contactForm.reset();
        });
    }
    // Particle Background
    
    const canvas =
        document.getElementById("particle-canvas");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        let particles = [];


        function resizeCanvas() {

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();

        window.addEventListener(
            "resize",
            resizeCanvas
        );
        // Create particles

        function createParticles() {

            particles = [];

            const particleCount =
                Math.min(
                    100,
                    Math.floor(
                        window.innerWidth / 15
                    )
                );

            for (let i = 0; i < particleCount; i++) {

                particles.push({

                    x: Math.random() * canvas.width,

                    y: Math.random() * canvas.height,

                    size:
                        Math.random() * 2 + 0.5,

                    speedX:
                        (Math.random() - 0.5) * 0.5,

                    speedY:
                        (Math.random() - 0.5) * 0.5,

                    opacity:
                        Math.random() * 0.5 + 0.2
                });
            }
        }

        createParticles();
        // Animate particles

        function animateParticles() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            particles.forEach(particle => {

                particle.x += particle.speedX;
                particle.y += particle.speedY;


                // Wrap around screen

                if (particle.x < 0) {
                    particle.x = canvas.width;
                }

                if (particle.x > canvas.width) {
                    particle.x = 0;
                }

                if (particle.y < 0) {
                    particle.y = canvas.height;
                }

                if (particle.y > canvas.height) {
                    particle.y = 0;
                }

                // Draw particle

                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(0, 255, 136, ${particle.opacity})`;

                ctx.fill();
            });
            // Draw connections

            for (let i = 0; i < particles.length; i++) {

                for (
                    let j = i + 1;
                    j < particles.length;
                    j++
                ) {

                    const dx =
                        particles[i].x -
                        particles[j].x;

                    const dy =
                        particles[i].y -
                        particles[j].y;

                    const distance =
                        Math.sqrt(
                            dx * dx + dy * dy
                        );


                    if (distance < 120) {

                        const opacity =
                            0.12 *
                            (1 - distance / 120);

                        ctx.beginPath();

                        ctx.moveTo(
                            particles[i].x,
                            particles[i].y
                        );

                        ctx.lineTo(
                            particles[j].x,
                            particles[j].y
                        );

                        ctx.strokeStyle =
                            `rgba(0, 255, 136, ${opacity})`;

                        ctx.lineWidth = 0.5;

                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(
                animateParticles
            );
        }

        animateParticles();
    }

    // Current Year
    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();
    }

});