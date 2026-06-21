document.addEventListener('DOMContentLoaded', () => {
    // 1. FAQ Accordion Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // 2. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Form Submission Handling (Mock)
    const leadForm = document.getElementById('lead-form');
    if(leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            
            // Here you would normally send the data to a server or CRM
            console.log('Form Submitted:', { name, phone });
            
            // Show success message
            const btn = leadForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Đã gửi thành công!';
            btn.style.backgroundColor = '#4CAF50';
            btn.style.color = '#fff';
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
                leadForm.reset();
            }, 3000);
            
            // Trigger GA4 event if available
            if(typeof gtag === 'function') {
                gtag('event', 'form_submit_success', {
                    'event_category': 'Lead Generation',
                    'event_label': 'Landing Page Form'
                });
            }
        });
    }

    // 4. Scroll Depth Tracking (Mock implementation for GA4)
    let scrollDepths = { 25: false, 50: false, 75: false, 100: false };
    
    window.addEventListener('scroll', () => {
        let scrollPercent = ((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100;
        
        [25, 50, 75, 100].forEach(depth => {
            if (scrollPercent >= depth && !scrollDepths[depth]) {
                scrollDepths[depth] = true;
                console.log(`Scroll depth reached: ${depth}%`);
                // Trigger GA4 event
                if(typeof gtag === 'function') {
                    gtag('event', `scroll_depth_${depth}`, {
                        'event_category': 'Engagement'
                    });
                }
            }
        });
    });
});
