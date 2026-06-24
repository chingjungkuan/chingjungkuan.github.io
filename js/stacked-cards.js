gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const cards = gsap.utils.toArray('.skill-card');
    if (cards.length < 2) return;

    cards.forEach((card, index) => {
        const coveringCards = cards.slice(index + 1);
        if (!coveringCards.length) return;

        coveringCards.forEach((coveringCard, offset) => {
            gsap.fromTo(card,
                { scale: 1 - 0.04 * offset },
                {
                    scale: 1 - 0.04 * (offset + 1),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: coveringCard,
                        start: 'top 80%',
                        end: 'top top',
                        scrub: 0.5,
                    }
                }
            );
        });
    });
});
