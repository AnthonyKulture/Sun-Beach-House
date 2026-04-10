import React from 'react';
import Image from 'next/image';

interface LogoProps {
    className?: string;
    style?: React.CSSProperties;
    variant?: 'blue' | 'beige' | 'darkgreen';
}

export const Logo: React.FC<LogoProps> = ({ className = "", style, variant = 'blue' }) => {
    let logoSrc = '/images/logo-sbh-blue.png';
    let filter = '';

    if (variant === 'beige') {
        logoSrc = '/images/logo-sbh-beige.png';
    } else if (variant === 'darkgreen') {
        // Filter to transform the light blue logo (#89ACDE) into dark green (#1A3C34)
        // Approximate values to get close to the brand green
        filter = 'brightness(0.3) saturate(1.2) sepia(0.8) hue-rotate(100deg)';
    }
    
    return (
        <div className={`relative aspect-[600/525] ${className}`} style={filter ? { filter, ...style } : style}>
            <Image
                src={logoSrc}
                alt="Sun Beach House"
                fill
                priority
                className="object-contain"
            />
        </div>
    );
};