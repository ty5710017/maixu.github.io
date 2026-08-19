// 平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // 导航栏滚动效果
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 30px rgba(0,240,255,0.1)';
                navbar.style.borderBottomColor = 'rgba(0,240,255,0.2)';
            } else {
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
                navbar.style.borderBottomColor = 'rgba(0,240,255,0.1)';
            }
        });

        // 移动端菜单切换
        document.querySelector('.mobile-toggle').addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'rgba(10,14,39,0.98)';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
                navLinks.style.borderBottom = '1px solid rgba(0,240,255,0.1)';
            }
        });

        // 滚动动画 - 增强版
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // 添加延迟让动画更有趣
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.about-card, .feature-card, .why-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px) scale(0.95)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            observer.observe(el);
        });

        // 数字滚动动画
        function animateValue(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                // easeOutExpo 缓动
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const current = Math.floor(easeProgress * (end - start) + start);
                element.textContent = current.toLocaleString() + (element.dataset.suffix || '');
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // 数字动画触发
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent;
                    const suffix = text.replace(/[0-9,]/g, '');
                    const num = parseInt(text.replace(/[^0-9]/g, ''));
                    el.dataset.suffix = suffix;
                    animateValue(el, 0, num, 2000);
                    statsObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number').forEach(el => {
            statsObserver.observe(el);
        });

        // 鼠标跟随光效
        document.addEventListener('mousemove', (e) => {
            const card = e.target.closest('.feature-card, .about-card');
            if (card) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,240,255,0.08), rgba(15,25,35,0.8) 60%)`;
            }
        });

        // 鼠标离开卡片恢复背景
        document.addEventListener('mouseleave', (e) => {
            const card = e.target.closest('.feature-card, .about-card');
            if (card) {
                card.style.background = 'rgba(15,25,35,0.8)';
            }
        });