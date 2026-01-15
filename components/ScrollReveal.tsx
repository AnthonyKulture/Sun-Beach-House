'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const ScrollReveal = () => {
    const pathname = usePathname();

    useEffect(() => {
        // Reset scroll on route change (optional but Next.js does it)
        // Re-run observer setup on route change

        const observerOptions = { threshold: 0.05, rootMargin: "0px 0px -50px 0px" };

        const intersectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a small staggered delay based on index if available, or random
                    setTimeout(() => {
                        entry.target.classList.add('reveal-visible');
                    }, 100);
                    intersectObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const observeElements = () => {
            document.querySelectorAll('.reveal-on-scroll:not(.reveal-visible)').forEach(el => {
                intersectObserver.observe(el);
            });
        };

        // Initial observation
        // Small delay to ensure DOM is ready
        const timer = setTimeout(observeElements, 100);

        // Mutation Observer to handle dynamically added content
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length) {
                    observeElements();
                }
            });
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            clearTimeout(timer);
            intersectObserver.disconnect();
            mutationObserver.disconnect();
        };
    }, [pathname]);

    return null;
};
