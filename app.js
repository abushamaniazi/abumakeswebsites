document.addEventListener('DOMContentLoaded', () => {
    const invertedCursor = document.getElementById('invertedCursor');
    const cursorToggleBtns = document.querySelectorAll('.cursorToggleBtn');
    const iframeWrapper = document.getElementById('iframeWrapper');
    let isCursorEnabled = true;

    if (cursorToggleBtns.length > 0) {
        cursorToggleBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                isCursorEnabled = !isCursorEnabled;
                document.querySelectorAll('.cursorBtnText').forEach((label) => {
                    label.textContent = isCursorEnabled ? 'Cursor FX: ON' : 'Cursor FX: OFF';
                });

                if (invertedCursor) {
                    if (isCursorEnabled) {
                        invertedCursor.classList.remove('isHidden');
                    } else {
                        invertedCursor.classList.add('isHidden');
                        invertedCursor.style.opacity = '0';
                    }
                }
            });
        });
    }
    
    function updateCursorPosition(x, y) {
        if (!isCursorEnabled || !invertedCursor) return;
        invertedCursor.style.left = `${x}px`;
        invertedCursor.style.top = `${y}px`;
    }

    window.addEventListener('mousemove', (e) => {
        const isAtEdge = e.clientX <= 0 || e.clientY <= 0 || 
                         e.clientX >= window.innerWidth || e.clientY >= window.innerHeight;

        if (isAtEdge) {
            if (invertedCursor) invertedCursor.style.opacity = '0';
            return;
        }

        if (isCursorEnabled && invertedCursor) {
            invertedCursor.style.opacity = '1';
        }
        updateCursorPosition(e.clientX, e.clientY);
    });

    document.documentElement.addEventListener('mouseleave', () => {
        if (invertedCursor) {
            invertedCursor.style.opacity = '0';
        }
    });

    document.documentElement.addEventListener('mouseenter', (e) => {
        if (isCursorEnabled && invertedCursor) {
            invertedCursor.style.opacity = '1';
            updateCursorPosition(e.clientX, e.clientY);
        }
    });

    let touchFadeTimeout = null;
    let isDragging = false;

    function showAndMoveCursor(x, y) {
        if (!isCursorEnabled || !invertedCursor) return;
        invertedCursor.style.opacity = '1';
        invertedCursor.style.left = `${x}px`;
        invertedCursor.style.top = `${y}px`;
    }

    function hideCursor() {
        if (invertedCursor) {
            invertedCursor.style.opacity = '0';
        }
    }

    window.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0 && isCursorEnabled) {
            if (touchFadeTimeout) clearTimeout(touchFadeTimeout);
            isDragging = false;

            const touch = e.touches[0];
            showAndMoveCursor(touch.clientX, touch.clientY);

            touchFadeTimeout = setTimeout(() => {
                if (!isDragging) {
                    hideCursor();
                }
            }, 500);
        }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0 && isCursorEnabled) {
            isDragging = true;
            if (touchFadeTimeout) clearTimeout(touchFadeTimeout);

            const touch = e.touches[0];
            showAndMoveCursor(touch.clientX, touch.clientY);
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        isDragging = false;
        if (touchFadeTimeout) clearTimeout(touchFadeTimeout);
        
        touchFadeTimeout = setTimeout(() => {
            hideCursor();
        }, 400);
    });

    window.addEventListener('touchcancel', () => {
        isDragging = false;
        if (touchFadeTimeout) clearTimeout(touchFadeTimeout);
        hideCursor();
    });

    if (iframeWrapper && invertedCursor) {
        iframeWrapper.addEventListener('mouseenter', () => {
            invertedCursor.style.opacity = '0';
        });
        iframeWrapper.addEventListener('mouseleave', () => {
            if (isCursorEnabled) invertedCursor.style.opacity = '1';
        });
    }

    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('.themeIcon') : null;
    
    if (themeToggleBtn && themeIcon) {
        const savedTheme = localStorage.getItem('themePreference') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeIcon.textContent = savedTheme === 'dark' ? '☀' : '☾';

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('themePreference', newTheme);
            themeIcon.textContent = newTheme === 'dark' ? '☀' : '☾';
        });
    }

    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeNavBtn = document.getElementById('closeNavBtn');
    const heroNav = document.getElementById('heroNav');

    function closeMobileMenu() {
        if (hamburgerBtn) hamburgerBtn.classList.remove('isOpen');
        if (heroNav) heroNav.classList.remove('isOpen');
    }

    if (hamburgerBtn && heroNav) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('isOpen');
            heroNav.classList.toggle('isOpen');
        });

        if (closeNavBtn) {
            closeNavBtn.addEventListener('click', closeMobileMenu);
        }

        heroNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    const customSelects = document.querySelectorAll('.customSelect');
    
    customSelects.forEach(select => {
        const trigger = select.querySelector('.customSelectTrigger');
        const options = select.querySelectorAll('.customOption');
        const hiddenInput = select.nextElementSibling;
        const triggerText = trigger ? (trigger.querySelector('.placeholder') || trigger.querySelector('span')) : null;

        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                customSelects.forEach(s => {
                    if (s !== select) s.classList.remove('open');
                });
                select.classList.toggle('open');
            });
        }

        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const value = option.getAttribute('data-value');
                const text = option.textContent;

                if (triggerText) {
                    triggerText.textContent = text;
                    triggerText.classList.remove('placeholder');
                }
                if (hiddenInput) hiddenInput.value = value;

                select.classList.remove('open');
            });
        });
    });

    window.addEventListener('click', () => {
        customSelects.forEach(select => select.classList.remove('open'));
    });

    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#%&";

    function triggerSlotMachine(element) {
        const originalText = element.dataset.originalText;
        if (!originalText) return;

        if (element.dataset.activeInterval) {
            clearInterval(parseInt(element.dataset.activeInterval));
        }
        
        const textLength = originalText.length;
        let currentArray = originalText.split('');

        for (let i = 0; i < textLength; i++) {
            if (originalText[i] !== ' ') {
                currentArray[i] = charSet.charAt(Math.floor(Math.random() * charSet.length));
            }
        }
        element.textContent = currentArray.join('');

        const startTime = Date.now();
        const durationPerChar = 180;

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            let allResolved = true;

            for (let i = 0; i < textLength; i++) {
                if (originalText[i] === ' ') continue;

                if (elapsed > (i + 1) * durationPerChar) {
                    currentArray[i] = originalText[i];
                } else {
                    currentArray[i] = charSet.charAt(Math.floor(Math.random() * charSet.length));
                    allResolved = false;
                }
            }

            element.textContent = currentArray.join('');

            if (allResolved) {
                clearInterval(interval);
                element.textContent = originalText;
                delete element.dataset.activeInterval;
            }
        }, 60);

        element.dataset.activeInterval = interval.toString();
    }

    const hoverOdometerElements = document.querySelectorAll('[data-odometer]');
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    hoverOdometerElements.forEach((element) => {
        element.dataset.originalText = element.textContent.trim();
        
        if (!isTouchDevice) {
            element.addEventListener('mouseenter', () => triggerSlotMachine(element));
            element.addEventListener('mouseleave', () => triggerSlotMachine(element));
        }
    });

    const repeatingElements = document.querySelectorAll('[data-odometer-repeat]');
    repeatingElements.forEach((element) => {
        element.dataset.originalText = element.textContent.trim();
    });

    function runRepeatingOdometers() {
        repeatingElements.forEach((element) => {
            triggerSlotMachine(element);
        });
    }

    runRepeatingOdometers();
    setInterval(runRepeatingOdometers, 15000);

    const canvas = document.getElementById('particleCanvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        
        const mouse = {
            x: null,
            y: null,
            radius: 180
        };

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        class MagneticParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.minDistance = 25;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x > canvas.width || this.x < 0) this.vx = -this.vx;
                if (this.y > canvas.height || this.y < 0) this.vy = -this.vy;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius && distance > this.minDistance) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        const pullX = (dx / distance) * force * 0.6;
                        const pullY = (dy / distance) * force * 0.6;

                        this.x += pullX;
                        this.y += pullY;
                    }
                }
            }

            draw() {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            const screenArea = canvas.width * canvas.height;
            const dynamicParticleCount = Math.floor(screenArea / 14400);

            for (let i = 0; i < dynamicParticleCount; i++) {
                particlesArray.push(new MagneticParticle());
            }
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const lineColor = isDark ? '255, 255, 255' : '0, 0, 0';

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();

                for (let j = i + 1; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100 && distance > 15) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${lineColor}, ${(1 - distance / 100) * 0.225})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    const tabBtns = document.querySelectorAll('.templateTabBtn');
    const templateFrame = document.getElementById('templateFrame');
    const previewUrlBar = document.getElementById('previewUrlBar');
    const externalDemoBtn = document.getElementById('externalDemoBtn');
    const customBanner = document.getElementById('customBanner');

    function loadTemplate(externalUrl, isCustom = false) {
        const mobileNotice = document.getElementById('mobileLaunchNotice');
        const mobileExternalBtn = document.getElementById('mobileExternalBtn');
        const activeTab = document.querySelector('.templateTabBtn.isActive');

        if (isCustom) {
            if (templateFrame) templateFrame.style.display = 'none';
            if (mobileNotice) mobileNotice.style.display = 'none';
            if (externalDemoBtn) externalDemoBtn.style.display = 'none';
            if (customBanner) customBanner.classList.remove('isCardHidden');
            if (previewUrlBar) previewUrlBar.textContent = 'https://abu.dev/templates/custom-request';
        } else {
            if (customBanner) customBanner.classList.add('isCardHidden');
            if (previewUrlBar) previewUrlBar.textContent = externalUrl;
            if (externalDemoBtn) externalDemoBtn.href = externalUrl;

            if (window.innerWidth <= 1024) {
                if (templateFrame) templateFrame.style.display = 'none';
                if (externalDemoBtn) externalDemoBtn.style.display = 'none';
                if (mobileNotice) mobileNotice.style.display = 'flex';
                if (mobileExternalBtn) {
                    mobileExternalBtn.href = externalUrl;
                    const tabTitle = activeTab ? (activeTab.dataset.originalText || activeTab.textContent.trim()) : 'Demo';
                    mobileExternalBtn.textContent = `Open ${tabTitle} ↗`;
                }
            } else {
                if (mobileNotice) mobileNotice.style.display = 'none';
                if (templateFrame) {
                    templateFrame.style.display = 'block';
                    templateFrame.src = externalUrl;
                }
                if (externalDemoBtn) externalDemoBtn.style.display = 'inline-block';
            }
        }
    }

    const defaultBtn = document.querySelector('.templateTabBtn.isActive');
    if (defaultBtn) {
        loadTemplate(defaultBtn.getAttribute('data-url'), defaultBtn.classList.contains('customOption'));
    }

    tabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('isActive'));
            btn.classList.add('isActive');
            
            const isCustom = btn.classList.contains('customOption');
            const targetUrl = btn.getAttribute('data-url');
            
            loadTemplate(targetUrl, isCustom);
        });
    });

    const secureContactForm = document.getElementById('secureContactForm');
    let lastSubmitTime = 0;
    let countdownInterval = null;
    const rateLimitMs = 15000;

    function sanitizeInput(inputString) {
        const tempDiv = document.createElement('div');
        tempDiv.textContent = inputString;
        return tempDiv.innerHTML;
    }

    if (secureContactForm) {
        secureContactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const currentTime = Date.now();
            const timePassed = currentTime - lastSubmitTime;

            if (timePassed < rateLimitMs) {
                if (countdownInterval) clearInterval(countdownInterval);

                const updateCountdown = () => {
                    const remainingSeconds = Math.ceil((rateLimitMs - (Date.now() - lastSubmitTime)) / 1000);

                    if (remainingSeconds > 0) {
                        showAlert(`Please wait <span class="odometerNum" key="${remainingSeconds}">${remainingSeconds}</span>s before submitting again.`, 'error');
                    } else {
                        clearInterval(countdownInterval);
                        countdownInterval = null;
                        showAlert('You can now submit your request again.', 'info');
                    }
                };

                updateCountdown();
                countdownInterval = setInterval(updateCountdown, 1000);
                return;
            }

            const checkedServices = Array.from(document.querySelectorAll('input[name="serviceType"]:checked'))
                .map(cb => sanitizeInput(cb.value));

            const rawBudget = document.getElementById('projectBudget').value;
            const rawTimeline = document.getElementById('projectTimeline').value;
            const rawName = document.getElementById('userName').value;
            const rawEmail = document.getElementById('userEmail').value;
            const rawMessage = document.getElementById('userMessage').value;

            const cleanName = sanitizeInput(rawName.trim());
            const cleanEmail = sanitizeInput(rawEmail.trim());
            const cleanMessage = sanitizeInput(rawMessage.trim());

            if (!cleanName || !cleanEmail || !cleanMessage || !rawBudget || !rawTimeline) {
                showAlert('Please complete all required fields and dropdown selections.', 'error');
                return;
            }

            lastSubmitTime = Date.now();

            const payloadData = {
                name: cleanName,
                _replyto: cleanEmail,
                message: cleanMessage,
                services: checkedServices.length > 0 ? checkedServices.join(', ') : 'None specified',
                budget: sanitizeInput(rawBudget),
                timeline: sanitizeInput(rawTimeline),
                _subject: `New Project Inquiry from ${cleanName}`,
                _captcha: "false"
            };

            const submitBtn = secureContactForm.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;

            try {
                const response = await fetch("https://formsubmit.co/ajax/ac43f785fc6a4c020a737090ca10cbe3", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(payloadData)
                });

                if (response.ok) {
                    showAlert('Thank you! Your project inquiry has been sent securely.', 'success');
                    secureContactForm.reset();
                    document.querySelectorAll('.customSelectTrigger span').forEach((span, idx) => {
                        span.textContent = idx === 0 ? 'Select Budget Range' : 'Select Timeline';
                        span.classList.add('placeholder');
                    });
                    document.getElementById('projectBudget').value = '';
                    document.getElementById('projectTimeline').value = '';
                } else {
                    showAlert('Failed to dispatch enquiry. Please try again.', 'error');
                }
            } catch (error) {
                showAlert('Network error occurred. Please try again later.', 'error');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    function showAlert(message, type) {
        const alertBox = document.getElementById('formAlertBox');
        if (!alertBox) return;

        alertBox.className = `alertMsg alert-${type}`;
        alertBox.innerHTML = message;
        alertBox.classList.remove('isCardHidden');
    }
});