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
                    entry.target.classList.add('reveal-visible');
                    intersectObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const observeElements = () => {
            document.querySelectorAll('.reveal-on-scroll:not(.reveal-visible)').forEach(el => {
                intersectObserver.observe(el);
            });
        };

        // Use requestAnimationFrame for frame-perfect timing (no arbitrary delay)
        let rafId = requestAnimationFrame(observeElements);

        // Debounce MutationObserver with RAF to batch DOM changes into one pass per frame
        let mutationRafId: number | null = null;
        const mutationObserver = new MutationObserver((mutations) => {
            if (mutationRafId !== null) return; // Already scheduled this frame
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node instanceof HTMLElement) {
                        if (node.classList?.contains('reveal-on-scroll') || node.querySelector?.('.reveal-on-scroll')) {
                            mutationRafId = requestAnimationFrame(() => {
                                observeElements();
                                mutationRafId = null;
                            });
                            return;
                        }
                    }
                }
            }
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            cancelAnimationFrame(rafId);
            if (mutationRafId !== null) cancelAnimationFrame(mutationRafId);
            intersectObserver.disconnect();
            mutationObserver.disconnect();
        };
    }, [pathname]);

    return null;
};
