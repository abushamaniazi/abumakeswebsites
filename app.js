(() => {
    'use strict';

    const PRICING_DATA = {
        tiers: [
            {
                id: 'Pre-made Template',
                name: 'PRE-MADE TEMPLATE',
                badgeClass: 'badgeOrange',
                bannerClass: 'bannerOrange',
                checkClass: 'checkOrange',
                sub: 'Fast & affordable pre-built turnkey launch',
                priceLabel: 'STARTING AT',
                prices: { inr: '₹3,999', eur: '€50', usd: '$55' }
            },
            {
                id: 'Hybrid Build',
                name: 'HYBRID BUILD',
                badgeClass: 'badgePink',
                bannerClass: 'bannerPink',
                checkClass: 'checkPink',
                sub: 'The ideal sweet spot for growing brands',
                popular: true,
                priceLabel: 'STARTING AT',
                prices: { inr: '₹7,999', eur: '€120', usd: '$125' }
            },
            {
                id: 'Full Custom Site',
                name: 'FULL CUSTOM SITE',
                badgeClass: 'badgePurple',
                bannerClass: 'bannerPurple',
                checkClass: 'checkPurple',
                sub: '100% bespoke engineering built from zero',
                priceLabel: 'STARTING AT',
                prices: { inr: '₹14,999', eur: '€250', usd: '$275' }
            },
            {
                id: 'E-Commerce',
                name: 'E-COMMERCE',
                badgeClass: 'badgeBlue',
                bannerClass: 'bannerBlue',
                checkClass: 'checkBlue',
                sub: 'Full-featured digital storefront & payment flow',
                priceLabel: 'PRICING',
                prices: { inr: 'Tailored', eur: 'Tailored', usd: 'Tailored' }
            },
            {
                id: 'Website Audit',
                name: 'WEBSITE AUDIT',
                badgeClass: 'badgeGreen',
                bannerClass: 'bannerGreen',
                checkClass: 'checkGreen',
                sub: 'Comprehensive diagnostic, speed & security audit',
                priceLabel: 'FLAT FEE',
                prices: { inr: '₹2,499', eur: '€25', usd: '$25' }
            }
        ],
        features: [
            {
                title: 'Pre-built Template Selection',
                desc: 'Choose from our curated library of responsive pre-engineered templates.',
                included: [true, true, false, false, false]
            },
            {
                title: 'Custom Text & Assets Integration',
                desc: 'Integration of your custom copy, images, branding colors, and logo.',
                included: [true, true, true, true, true]
            },
            {
                title: 'Responsive Mobile, PC & TV Layout',
                desc: 'Optimized display across smartphones, tablets, laptops, desktop PCs, and smart TVs.',
                included: [true, true, true, true, true]
            },
            {
                title: 'Custom Module Addons & Color Branding',
                desc: 'Tailored color themes and bespoke layout modifications over a template base.',
                included: [false, true, true, true, false]
            },
            {
                title: 'SEO Optimization & Search Indexing',
                desc: 'Meta tags, Open Graph setup, XML sitemap generation, and search engine indexing.',
                included: [false, true, true, true, true]
            },
            {
                title: 'Performance & Security Hardening',
                desc: 'Asset optimization, speed tuning, security header policies, and rate limiting.',
                included: [false, true, true, true, true]
            },
            {
                title: '100% Bespoke Architecture & UI/UX',
                desc: 'Fully custom website design and frontend codebase tailored specifically to your brand.',
                included: [false, false, true, true, false]
            },
            {
                title: 'Backend API & Headless CMS Integration',
                desc: 'Connect dynamic databases, custom APIs, contact dispatches, and headless CMS platforms.',
                included: [false, false, true, true, false]
            },
            {
                title: 'Advanced E-Commerce & Payment Gateway',
                desc: 'Shopping cart, secure online checkout integration, inventory management, and store UX.',
                included: [false, false, false, true, false]
            },
            {
                title: 'Comprehensive Site Audit & Bug Fixes',
                desc: 'In-depth vulnerability review, code cleanup, performance debugging, and site updates.',
                included: [false, false, false, false, true]
            }
        ]
    };

    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    const on = (target, type, handler, options) => {
        if (target) target.addEventListener(type, handler, options);
    };

    const store = {
        get(key) {
            try { return window.localStorage.getItem(key); } catch (error) { return null; }
        },
        set(key, value) {
            try { window.localStorage.setItem(key, value); } catch (error) { /* storage blocked */ }
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        const root = document.documentElement;
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const scrollBehavior = () => (motionQuery.matches ? 'auto' : 'smooth');

        const pointer = { x: null, y: null };

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const revealOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, observerOptions);

        const elementsToReveal = document.querySelectorAll('.scrollReveal');
        elementsToReveal.forEach((element) => revealOnScroll.observe(element));

        const renderPricingSystem = () => {
            const mobileCardsContainer = $('.mobileTierCards');
            const matrixTableContainer = $('.pricingMatrixTable');
            if (!mobileCardsContainer || !matrixTableContainer) return;

            mobileCardsContainer.innerHTML = PRICING_DATA.tiers.map((tier, idx) => `
                <div class="mobileTierCard ${idx === 1 ? 'active' : ''}" data-mobile-card="${idx}">
                    <div class="mobileCardHeader">
                        ${tier.popular ? '<div class="popularBadge">POPULAR</div>' : ''}
                        <div class="tierPillHeader ${tier.badgeClass}">${tier.name}</div>
                        <span class="mobileCardSub">${tier.sub}</span>
                    </div>
                    <ul class="mobileFeaturesList">
                        ${PRICING_DATA.features.map(f => {
                            const isInc = f.included[idx];
                            return `<li class="${isInc ? 'included' : 'excluded'}">
                                <span class="${isInc ? 'checkIcon ' + tier.checkClass : 'crossIcon'}">${isInc ? '✓' : '✕'}</span> ${f.title}
                            </li>`;
                        }).join('')}
                    </ul>
                    <div class="receiptSlot mobileReceiptSlot">
                        <div class="receiptPaper ${tier.bannerClass}">
                            <div class="receiptTearLine"></div>
                            <div class="receiptMeta"><span class="priceSub">${tier.priceLabel}</span></div>
                            <div class="priceValue" data-inr="${tier.prices.inr}" data-eur="${tier.prices.eur}" data-usd="${tier.prices.usd}">${tier.prices.inr}</div>
                            <button type="button" class="btnPill selectPlanBtn" data-service="${tier.id}">Select</button>
                        </div>
                    </div>
                </div>
            `).join('');

            let matrixHTML = `
                <div class="matrixRow matrixHeaderRow">
                    <div class="matrixCol featureInfoCol">
                        <h3 class="matrixMainHeading">PRICING PLANS</h3>
                        <p class="matrixSubHeading">Select a tier that matches your scope and scale.</p>
                    </div>
                    ${PRICING_DATA.tiers.map(tier => `
                        <div class="matrixCol tierCol ${tier.popular ? 'featuredTier' : ''}" data-tier-id="${tier.id}">
                            ${tier.popular ? '<div class="popularBadge">POPULAR</div>' : ''}
                            <div class="tierPillHeader ${tier.badgeClass}">${tier.name}</div>
                        </div>
                    `).join('')}
                </div>
            `;

            PRICING_DATA.features.forEach(feature => {
                matrixHTML += `
                    <div class="matrixRow">
                        <div class="matrixCol featureInfoCol">
                            <span class="featureTitle">${feature.title}</span>
                            <span class="featureDesc">${feature.desc}</span>
                        </div>
                        ${feature.included.map((inc, i) => `
                            <div class="matrixCol tierCol">
                                <span class="${inc ? 'checkIcon ' + PRICING_DATA.tiers[i].checkClass : 'crossIcon'}">${inc ? '✓' : '✕'}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
            });

            matrixHTML += `
                <div class="matrixRow matrixFooterRow">
                    <div class="matrixCol featureInfoCol receiptInfoCol">
                        <div class="receiptPrinterLabel">
                            <span class="printerLed"></span>
                            <span class="printerSlotHeading">INVESTMENT SUMMARY</span>
                        </div>
                        <span class="printerSlotSub">Transparent Pricing • No Hidden Cost</span>
                    </div>
                    ${PRICING_DATA.tiers.map(tier => `
                        <div class="matrixCol tierCol">
                            <div class="receiptSlot">
                                <div class="receiptPaper ${tier.bannerClass}">
                                    <div class="receiptSpacing">
                                        <div class="receiptTearLine"></div>
                                        <div class="receiptMeta"><span class="priceSub">${tier.priceLabel}</span></div>
                                        <div class="priceValue" data-inr="${tier.prices.inr}" data-eur="${tier.prices.eur}" data-usd="${tier.prices.usd}">${tier.prices.inr}</div>
                                        <button type="button" class="btnPill selectPlanBtn" data-service="${tier.id}">Select</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            matrixTableContainer.innerHTML = matrixHTML;
        };

        renderPricingSystem();


        const alertBox = document.getElementById('formAlertBox');

        const showAlert = (message, type = 'info') => {
            if (!alertBox) return;
            alertBox.className = `alertMsg alert-${type}`;
            if (message instanceof Node) {
                alertBox.replaceChildren(message);
            } else {
                alertBox.textContent = message;
            }
            alertBox.classList.remove('isCardHidden');
        };

        document.querySelectorAll('.heroBtn').forEach(btn => {
            const updateOrigin = (e) => {
                const rect = btn.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const isLeftSide = mouseX < rect.width / 2;
                btn.style.setProperty('--transform-origin', isLeftSide ? 'left' : 'right');
            };
            btn.addEventListener('mouseenter', updateOrigin);
            btn.addEventListener('mouseleave', updateOrigin);
        });


        const cursor = document.getElementById('invertedCursor');
        const cursorLabels = $$('.cursorBtnText');
        let cursorEnabled = Boolean(cursor);
        let cursorFrame = null;

        const setCursorVisible = (visible) => {
            if (!cursor) return;
            const opacity = (visible && cursorEnabled) ? '1' : '0';
            if (cursor.style.opacity !== opacity) cursor.style.opacity = opacity;
        };

        const paintCursor = () => {
            cursorFrame = null;
            cursor.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
        };

        const moveCursor = (x, y) => {
            pointer.x = x;
            pointer.y = y;
            if (cursor && cursorFrame === null) cursorFrame = window.requestAnimationFrame(paintCursor);
        };

        const toggleCursor = () => {
            cursorEnabled = !cursorEnabled;
            cursorLabels.forEach((label) => {
                label.textContent = cursorEnabled ? 'Cursor FX: ON' : 'Cursor FX: OFF';
            });
            if (cursor) cursor.classList.toggle('isHidden', !cursorEnabled);
            setCursorVisible(cursorEnabled);
        };

        $$('.cursorToggleBtn').forEach((btn) => on(btn, 'click', toggleCursor));

        on(window, 'mousemove', (event) => {
            pointer.x = event.clientX;
            pointer.y = event.clientY;
            if (!cursor) return;

            const atEdge = event.clientX <= 0 || event.clientY <= 0
                || event.clientX >= window.innerWidth || event.clientY >= window.innerHeight;
            setCursorVisible(!atEdge);
            if (!atEdge && cursorEnabled && cursorFrame === null) {
                cursorFrame = window.requestAnimationFrame(paintCursor);
            }
        }, { passive: true });

        on(root, 'mouseleave', () => {
            pointer.x = null;
            pointer.y = null;
            setCursorVisible(false);
        });

        on(root, 'mouseenter', () => setCursorVisible(true));

        let touchFadeTimer = null;
        const showTouchCursor = (event) => {
            const touch = event.touches[0];
            if (!touch) return;
            window.clearTimeout(touchFadeTimer);
            moveCursor(touch.clientX, touch.clientY);
            setCursorVisible(true);
        };

        on(window, 'touchstart', (event) => {
            if (!cursorEnabled) return;
            showTouchCursor(event);
            touchFadeTimer = window.setTimeout(() => setCursorVisible(false), 500);
        }, { passive: true });

        on(window, 'touchmove', (event) => {
            if (cursorEnabled) showTouchCursor(event);
        }, { passive: true });

        on(window, 'touchend', () => {
            window.clearTimeout(touchFadeTimer);
            touchFadeTimer = window.setTimeout(() => setCursorVisible(false), 400);
        }, { passive: true });

        on(window, 'touchcancel', () => {
            window.clearTimeout(touchFadeTimer);
            setCursorVisible(false);
        });

        on(document.getElementById('iframeWrapper'), 'mouseenter', () => setCursorVisible(false));
        on(document.getElementById('iframeWrapper'), 'mouseleave', () => setCursorVisible(true));


        on(document.getElementById('backToTopBtn'), 'click', () => {
            window.scrollTo({ top: 0, behavior: scrollBehavior() });
        });


        const themeToggleBtn = document.getElementById('themeToggleBtn');
        const themeIcon = themeToggleBtn ? $('.themeIcon', themeToggleBtn) : null;
        let currentTheme = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

        const isDark = () => currentTheme === 'dark';

        const applyTheme = (nextTheme) => {
            currentTheme = nextTheme === 'light' ? 'light' : 'dark';
            root.setAttribute('data-theme', currentTheme);
            if (themeIcon) themeIcon.textContent = isDark() ? '☀' : '☾';
        };

        if (themeToggleBtn && themeIcon) {
            const preferred = store.get('themePreference')
                || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            applyTheme(preferred);

            on(themeToggleBtn, 'click', () => {
                const next = isDark() ? 'light' : 'dark';
                store.set('themePreference', next);
                applyTheme(next);
            });
        }


        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const heroNav = document.getElementById('heroNav');

        const closeMobileMenu = () => {
            if (hamburgerBtn) hamburgerBtn.classList.remove('isOpen');
            if (heroNav) heroNav.classList.remove('isOpen');
        };

        on(hamburgerBtn, 'click', () => {
            if (!heroNav) return;
            hamburgerBtn.classList.toggle('isOpen');
            heroNav.classList.toggle('isOpen');
        });

        on(document.getElementById('closeNavBtn'), 'click', closeMobileMenu);
        if (heroNav) $$('a', heroNav).forEach((link) => on(link, 'click', closeMobileMenu));
        on(document, 'keydown', (event) => {
            if (event.key === 'Escape') closeMobileMenu();
        });


        const currencySelect = document.getElementById('currencySelect');
        const budgetSelect = document.getElementById('budgetSelect');
        const budgetOptions = budgetSelect ? $('.customOptions', budgetSelect) : null;
        const budgetInput = document.getElementById('projectBudget');

        const CURRENCY_SYMBOLS = { INR: '₹', EUR: '€', USD: '$' };
        const BUDGET_RANGES = {
            INR: ['₹3,000 - ₹9,000', '₹10,000 - ₹19,000', '₹20,000+'],
            EUR: ['€25 - €50', '€100 - €200', '€250+'],
            USD: ['$25 - $150', '$175 - $250', '$275+']
        };

        const resetCustomSelect = (selectEl, placeholderText, hiddenInput) => {
            if (selectEl) {
                const label = $('.customSelectTrigger span', selectEl);
                if (label) {
                    label.textContent = placeholderText;
                    label.classList.add('placeholder');
                }
            }
            if (hiddenInput) hiddenInput.value = '';
        };

        const buildOption = (value) => {
            const option = document.createElement('span');
            option.className = 'customOption';
            option.dataset.value = value;
            option.textContent = value;
            return option;
        };

        const setCurrency = (currency) => {
            const code = CURRENCY_SYMBOLS[currency] ? currency : 'INR';
            store.set('selectedCurrency', code);

            const label = currencySelect ? $('.currencyLabel', currencySelect) : null;
            if (label) label.textContent = `${CURRENCY_SYMBOLS[code]} ${code}`;

            const dataKey = code.toLowerCase();
            $$('.priceValue').forEach((node) => {
                const value = node.dataset[dataKey];
                if (value) node.textContent = value;
            });

            if (budgetOptions && BUDGET_RANGES[code]) {
                budgetOptions.replaceChildren(...BUDGET_RANGES[code].map(buildOption));
                resetCustomSelect(budgetSelect, 'Select Budget Range', budgetInput);
            }
        };

        setCurrency(store.get('selectedCurrency'));

        const selectNodes = $$('.customSelect');
        const closeAllSelects = (except) => {
            selectNodes.forEach((select) => {
                if (select !== except) select.classList.remove('open');
            });
        };

        on(document, 'click', (event) => {
            const target = event.target;
            const planBtn = target.closest('.selectPlanBtn');
            if (planBtn) {
                const service = planBtn.dataset.service;
                $$('input[name="serviceType"]').forEach((checkbox) => {

                    checkbox.checked = checkbox.value === service;
                });
                closeAllSelects();
                const contactSection = document.getElementById('contactSection');
                if (contactSection) contactSection.scrollIntoView({ behavior: scrollBehavior() });
                return;
            }

            const trigger = target.closest('.customSelectTrigger');
            if (trigger) {
                const select = trigger.closest('.customSelect');
                closeAllSelects(select);
                if (select) select.classList.toggle('open');
                return;
            }

            const option = target.closest('.customOption');
            if (option) {
                const select = option.closest('.customSelect');
                if (select) {
                    if (select === currencySelect) {
                        setCurrency(option.dataset.value);
                    } else {
                        const label = $('.customSelectTrigger span', select);
                        if (label) {
                            label.textContent = option.textContent.trim();
                            label.classList.remove('placeholder');
                        }
                        const hiddenInput = select.nextElementSibling;
                        if (hiddenInput && hiddenInput.tagName === 'INPUT') {
                            hiddenInput.value = option.dataset.value;
                        }
                    }
                    select.classList.remove('open');
                }
                return;
            }

            const tierTab = target.closest('.mobileTierTab');
            if (tierTab) {
                closeAllSelects();
                const index = tierTab.dataset.mobileTier;
                $$('.mobileTierTab').forEach((tab) => tab.classList.toggle('active', tab === tierTab));$$
('.mobileTierCard').forEach((card) => card.classList.toggle('active', card.dataset.mobileCard === index));
                return;
            }

            closeAllSelects();
        });

        const CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#%&';
        const PER_CHAR_MS = 180;
        const activeIntervals = new WeakMap();

        const runSlotMachine = (element) => {
            const original = element.dataset.originalText;
            if (!original || motionQuery.matches) return;

            window.clearInterval(activeIntervals.get(element));

            const chars = original.split('');
            const randomChar = () => CHAR_SET.charAt(Math.floor(Math.random() * CHAR_SET.length));

            element.textContent = chars.map((char) => (char === ' ' ? char : randomChar())).join('');
            const startedAt = Date.now();

            const intervalId = window.setInterval(() => {
                const elapsed = Date.now() - startedAt;
                let settled = true;

                for (let index = 0; index < chars.length; index++) {
                    if (original[index] === ' ') continue;
                    if (elapsed > (index + 1) * PER_CHAR_MS) {
                        chars[index] = original[index];
                    } else {
                        chars[index] = randomChar();
                        settled = false;
                    }
                }

                if (!settled) {
                    element.textContent = chars.join('');
                    return;
                }

                window.clearInterval(intervalId);
                activeIntervals.delete(element);
                element.textContent = original;
            }, 60);

            activeIntervals.set(element, intervalId);
        };

        const repeatingOdometer = $$('[data-odometer-repeat]');         const hoverOdometer = $$('[data-odometer]');

        [...repeatingOdometer, ...hoverOdometer].forEach((element) => {
            element.dataset.originalText = element.textContent.trim();
        });

        if (!motionQuery.matches) {
            const rollRepeating = () => {
                if (!document.hidden) repeatingOdometer.forEach(runSlotMachine);
            };

            rollRepeating();
            window.setInterval(rollRepeating, 15000);

            hoverOdometer.forEach((element) => {
                on(element, 'mouseenter', () => runSlotMachine(element));
                on(element, 'focus', () => runSlotMachine(element));
            });
        }

        const canvas = document.getElementById('particleCanvas');

        if (canvas) {
            const ctx = canvas.getContext('2d');
            const POINTER_RADIUS = 180;
            const POINTER_RADIUS_SQ = POINTER_RADIUS * POINTER_RADIUS;
            const MIN_PULL_SQ = 25 * 25;
            const LINK_DISTANCE = 100;
            const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE;
            const MIN_SEPARATION_SQ = 15 * 15;
            const MAX_PARTICLES = 45;
            const AREA_PER_PARTICLE = 28000;

            let width = 0;
            let height = 0;
            let particles = [];
            let frameId = null;
            let onScreen = true;
            let running = false;

            const createParticle = () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8
            });

            const initParticles = () => {
                const count = Math.min(Math.floor((width * height) / AREA_PER_PARTICLE), MAX_PARTICLES);
                particles = Array.from({ length: count }, createParticle);
            };

            const resizeCanvas = () => {
                const ratio = Math.min(window.devicePixelRatio || 1, 2);
                width = window.innerWidth;
                height = window.innerHeight;

                const pixelWidth = Math.floor(width * ratio);
                const pixelHeight = Math.floor(height * ratio);
                if (canvas.width === pixelWidth && canvas.height === pixelHeight && particles.length) return;

                canvas.width = pixelWidth;
                canvas.height = pixelHeight;
                ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
                initParticles();
            };

            const stepParticle = (particle) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x > width || particle.x < 0) particle.vx = -particle.vx;
                if (particle.y > height || particle.y < 0) particle.vy = -particle.vy;

                if (pointer.x === null || pointer.y === null) return;

                const dx = pointer.x - particle.x;
                const dy = pointer.y - particle.y;
                const distanceSq = dx * dx + dy * dy;
                if (distanceSq >= POINTER_RADIUS_SQ || distanceSq <= MIN_PULL_SQ) return;

                const distance = Math.sqrt(distanceSq);
                const force = ((POINTER_RADIUS - distance) / POINTER_RADIUS) * 0.6;
                particle.x += (dx / distance) * force;
                particle.y += (dy / distance) * force;
            };

            const drawScene = () => {
                ctx.clearRect(0, 0, width, height);

                const dark = isDark();
                const rgb = dark ? '255, 255, 255' : '0, 0, 0';
                ctx.fillStyle = dark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';
                ctx.lineWidth = 0.5;

                for (let i = 0; i < particles.length; i++) {
                    const particle = particles[i];
                    stepParticle(particle);

                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();

                    for (let j = i + 1; j < particles.length; j++) {
                        const other = particles[j];
                        const dx = particle.x - other.x;
                        const dy = particle.y - other.y;
                        const distanceSq = dx * dx + dy * dy;
                        if (distanceSq >= LINK_DISTANCE_SQ || distanceSq <= MIN_SEPARATION_SQ) continue;

                        ctx.strokeStyle = `rgba(${rgb}, ${(1 - Math.sqrt(distanceSq) / LINK_DISTANCE) * 0.225})`;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                }
            };

            const animate = () => {
                drawScene();
                frameId = window.requestAnimationFrame(animate);
            };

            const syncAnimation = () => {
                if (running) {
                    if (onScreen && !document.hidden && !motionQuery.matches) return;
                    window.cancelAnimationFrame(frameId);
                    frameId = null;
                    running = false;
                    return;
                }

                if (onScreen && !document.hidden && !motionQuery.matches) {
                    running = true;
                    frameId = window.requestAnimationFrame(animate);
                }
            };

            resizeCanvas();

            let resizeFrame = null;
            on(window, 'resize', () => {
                if (resizeFrame !== null) return;
                resizeFrame = window.requestAnimationFrame(() => {
                    resizeFrame = null;
                    resizeCanvas();
                });
            });

            if ('IntersectionObserver' in window) {
                new IntersectionObserver((entries) => {
                    entries.forEach((entry) => { onScreen = entry.isIntersecting; });
                    syncAnimation();
                }).observe(canvas);
            }

            on(document, 'visibilitychange', syncAnimation);

            if (motionQuery.matches) {
                drawScene();
            } else {
                syncAnimation();
            }
        }

        const matrixToggleBtn = document.getElementById('mobileMatrixToggleBtn');
        const matrixWrapper = $('.matrixScrollWrapper');
        if (matrixToggleBtn) {
            on(matrixToggleBtn, 'click', (event) => {
                event.preventDefault();
                if (!matrixWrapper) return;

                const isOpen = matrixWrapper.classList.toggle('showMobileMatrix');
                matrixToggleBtn.innerHTML = isOpen ? '<span class="toggleIcon">✕</span> Hide Comparison Matrix' : '<span class="toggleIcon">⊞</span> View Full Comparison Matrix';
                if (isOpen) matrixWrapper.scrollIntoView({ behavior: scrollBehavior() });
            });
        }                   
        const templateFrame = document.getElementById('templateFrame');
        const previewUrlBar = document.getElementById('previewUrlBar');
        const externalDemoBtn = document.getElementById('externalDemoBtn');
        const customBanner = document.getElementById('customBanner');
        const mobileNotice = document.getElementById('mobileLaunchNotice');
        const mobileExternalBtn = document.getElementById('mobileExternalBtn');
        const tabButtons = $$('.templateTabBtn');
        const MOBILE_MAX_WIDTH = 1024;
        const CUSTOM_REQUEST_URL = 'https://abu.dev/templates/custom-request';

        const setDisplay = (element, visible, display = 'block') => {
            if (element) element.style.display = visible ? display : 'none';
        };

        const loadTemplate = (url, isCustom = false) => {
            if (isCustom) {
                setDisplay(templateFrame, false);
                setDisplay(mobileNotice, false);
                setDisplay(externalDemoBtn, false);
                if (customBanner) customBanner.classList.remove('isCardHidden');
                if (previewUrlBar) previewUrlBar.textContent = CUSTOM_REQUEST_URL;
                return;
            }

            if (customBanner) customBanner.classList.add('isCardHidden');
            if (previewUrlBar) previewUrlBar.textContent = url;
            if (externalDemoBtn) externalDemoBtn.href = url;

            if (window.innerWidth > MOBILE_MAX_WIDTH) {
                setDisplay(mobileNotice, false);
                setDisplay(externalDemoBtn, true, 'inline-block');
                setDisplay(templateFrame, true);
                if (templateFrame) templateFrame.src = url;
                return;
            }

            setDisplay(templateFrame, false);
            setDisplay(externalDemoBtn, false);
            setDisplay(mobileNotice, true, 'flex');

            if (mobileExternalBtn) {
                const currentTab = $('.templateTabBtn.isActive');
                const title = currentTab
                    ? (currentTab.dataset.originalText || currentTab.textContent.trim())
                    : 'Demo';
                mobileExternalBtn.href = url;
                mobileExternalBtn.textContent = `Open ${title} ↗`;
            }
        };

        tabButtons.forEach((btn) => on(btn, 'click', () => {
            tabButtons.forEach((other) => other.classList.toggle('isActive', other === btn));
            loadTemplate(btn.dataset.url, btn.classList.contains('customOption'));
        }));

        const initialTab = $('.templateTabBtn.isActive');
        if (initialTab) loadTemplate(initialTab.dataset.url, initialTab.classList.contains('customOption'));

        const secureContactForm = document.getElementById('secureContactForm');
        let lastSubmitTime = 0;
        let countdownInterval = null;
        const rateLimitMs = 15000;

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
                            const node = document.createElement('span');
                            node.append('Please wait ', remainingSeconds, 's before submitting again.');
                            showAlert(node, 'error');
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
                    .map(cb => cb.value.trim());

                const rawBudget = document.getElementById('projectBudget').value.trim();
                const rawTimeline = document.getElementById('projectTimeline').value.trim();
                const rawName = document.getElementById('userName').value.trim();
                const rawEmail = document.getElementById('userEmail').value.trim();
                const rawMessage = document.getElementById('userMessage').value.trim();

                if (!rawName || !rawEmail || !rawMessage || !rawBudget || !rawTimeline) {
                    showAlert('Please complete all required fields and dropdown selections.', 'error');
                    return;
                }

                lastSubmitTime = Date.now();

                const payloadData = {
                    name: rawName,
                    _replyto: rawEmail,
                    message: rawMessage,
                    services: checkedServices.length > 0 ? checkedServices.join(', ') : 'None specified',
                    budget: rawBudget,
                    timeline: rawTimeline,
                    _subject: `New Project Inquiry from ${rawName}`,
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
    });
})();