import React from 'react';
import Image from 'next/image';

interface LogoProps {
    className?: string;
    variant?: 'blue' | 'beige';
}

export const Logo: React.FC<LogoProps> = ({ className = "", variant = 'blue' }) => {
    const logoSrc = variant === 'blue' ? '/images/logo-sbh-blue.png' : '/images/logo-sbh-beige.png';
    
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <Image
                src={logoSrc}
                alt="Sun Beach House"
                width={200}
                height={180}
                priority
                className="w-full h-auto object-contain"
            />
        </div>
    );
};