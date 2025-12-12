import React from 'react';

interface DecorationProps {
  className?: string;
  color?: string;
}

// Soleil stylisé avec rayons fins
export const SunStamp: React.FC<DecorationProps> = ({ className = "", color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" className={`overflow-visible ${className}`} fill="none">
    {/* Cercle central */}
    <circle cx="100" cy="100" r="30" stroke={color} strokeWidth="0.5" />
    <circle cx="100" cy="100" r="25" stroke={color} strokeWidth="0.2" opacity="0.5" />
    
    {/* Rayons longs */}
    <g stroke={color} strokeWidth="0.5">
      {[...Array(12)].map((_, i) => (
        <line 
          key={`l-${i}`}
          x1="100" y1="40" 
          x2="100" y2="0" 
          transform={`rotate(${i * 30} 100 100)`} 
        />
      ))}
    </g>
    
    {/* Rayons courts */}
    <g stroke={color} strokeWidth="0.3" opacity="0.7">
      {[...Array(12)].map((_, i) => (
        <line 
          key={`s-${i}`}
          x1="100" y1="50" 
          x2="100" y2="35" 
          transform={`rotate(${i * 30 + 15} 100 100)`} 
        />
      ))}
    </g>
    
    {/* Texte circulaire optionnel - simplifié par un anneau pointillé */}
    <circle cx="100" cy="100" r="65" stroke={color} strokeWidth="0.5" strokeDasharray="1 4" opacity="0.6"/>
  </svg>
);

// Feuille de palmier abstraite en One-Line art
export const PalmLeaf: React.FC<DecorationProps> = ({ className = "", color = "currentColor" }) => (
  <svg viewBox="0 0 300 400" className={className} fill="none" stroke={color} strokeWidth="0.8" strokeLinecap="round">
    {/* Tige centrale courbe */}
    <path d="M150,380 Q160,200 120,20" strokeWidth="1" />
    
    {/* Feuilles gauche */}
    <path d="M150,350 Q120,300 80,310" />
    <path d="M152,310 Q100,250 50,270" />
    <path d="M153,270 Q90,200 40,210" />
    <path d="M148,230 Q100,160 60,150" />
    <path d="M140,190 Q110,130 80,110" />
    
    {/* Feuilles droite */}
    <path d="M150,350 Q180,300 220,310" />
    <path d="M152,310 Q200,250 250,270" />
    <path d="M153,270 Q210,200 260,210" />
    <path d="M148,230 Q200,160 240,150" />
    <path d="M140,190 Q170,130 200,110" />
  </svg>
);

// Forme organique fluide (type dune de sable ou vague)
export const OrganicLine: React.FC<DecorationProps> = ({ className = "", color = "currentColor" }) => (
  <svg viewBox="0 0 1440 320" className={className} fill="none" preserveAspectRatio="none">
    <path 
      d="M0,160 C320,300, 420,100, 740,180 C1060,260, 1140,80, 1440,120" 
      stroke={color} 
      strokeWidth="1"
      opacity="0.3"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

// Étoile du nord minimaliste
export const NorthStar: React.FC<DecorationProps> = ({ className = "", color = "currentColor" }) => (
  <svg viewBox="0 0 50 50" className={className} fill={color}>
    <path d="M25 0L26.5 23.5L50 25L26.5 26.5L25 50L23.5 26.5L0 25L23.5 23.5L25 0Z" />
  </svg>
);

// Motif de grille fine
export const GridPattern: React.FC<DecorationProps> = ({ className = "", color = "currentColor" }) => (
  <svg width="100%" height="100%" className={className}>
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);
