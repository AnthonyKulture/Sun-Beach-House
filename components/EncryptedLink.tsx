'use client';

import React, { useState, useEffect } from 'react';

interface EncryptedLinkProps {
    text: string;           // The visible text (e.g. "hello@sunbeachhouse.com")
    type: 'email' | 'phone'; // The type of link
    value: string;          // The actual value (e.g. "hello@sunbeachhouse.com" or "+590...")
    className?: string;
}

export const EncryptedLink: React.FC<EncryptedLinkProps> = ({ text, type, value, className }) => {
    const [href, setHref] = useState<string>('#');

    // On mount (client-side only), construct the href. 
    // This means bots scraping HTML without executing JS won't see the mailto/tel link.
    useEffect(() => {
        const prefix = type === 'email' ? 'mailto:' : 'tel:';
        setHref(`${prefix}${value}`);
    }, [type, value]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (href === '#') {
            e.preventDefault();
            // Fallback if JS was delayed or something
            const prefix = type === 'email' ? 'mailto:' : 'tel:';
            window.location.href = `${prefix}${value}`;
        }
    };

    return (
        <a href={href} onClick={handleClick} className={className} rel="nofollow">
            {/* 
         Optional: We could also obfuscate the text itself by using CSS reversing 
         or specific character entities if we want to be very aggressive against text scrapers.
         For now, we just protect the interactive link.
      */}
            {text}
        </a>
    );
};
