'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const ScrollReveal = () => {
    const pathname = usePathname();

    useEffect(() => {
        const observerOptions = { threshold: 0.05, rootMargin: "0px 0px -50px 0px" };

        const intersectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
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

        // Small delay to ensure DOM is ready after navigation
        const timer = setTimeout(observeElements, 100);

        const mutationObserver = new MutationObserver((mutations) => {
            let hasNewRevealElements = false;
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node instanceof HTMLElement) {
                        if (node.classList?.contains('reveal-on-scroll') || node.querySelector?.('.reveal-on-scroll')) {
                            hasNewRevealElements = true;
                            break;
                        }
                    }
                }
                if (hasNewRevealElements) break;
            }
            if (hasNewRevealElements) observeElements();
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
