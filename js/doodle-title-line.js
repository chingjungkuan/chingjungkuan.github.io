gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.animate-trigger').forEach(trigger => {
        const path = trigger.querySelector('.doodle-svg path');
        if (!path) return;

        gsap.fromTo(path,
            { strokeDashoffset: 1000 },
            {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: trigger,
                    start: 'top 80%',
                }
            }
        );
    });
});
