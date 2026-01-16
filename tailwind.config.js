const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './App.tsx',
    ],
    theme: {
        extend: {
            colors: {
                sbh: {
                    cream: '#F6F5F1',
                    sand: '#E8E6E1',
                    blue: '#89ACDE',
                    green: '#C3CBC4',
                    darkgreen: '#1A3C34',
                    dark: '#1a1a1a',
                    charcoal: '#2D2D2D',
                    stone: '#9ca3af',
                    terracotta: '#A05C4D'
                }
            },
            fontFamily: {
                serif: ['"Classico"', '"Playfair Display"', 'serif'],
                sans: ['"IvyOra Display"', 'sans-serif'],
                signature: ['"Advera Script"', 'cursive'],
            },
            animation: {
                'fade-in': 'fadeIn 1.2s ease-out forwards',
                'slide-up': 'slideUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
                'reveal': 'reveal 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
                'spin-slow': 'spin 20s linear infinite',
                'spin-slower': 'spin 60s linear infinite',
                'spin-reverse-slower': 'spin-reverse 60s linear infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(60px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                reveal: {
                    '0%': { clipPath: 'inset(100% 0 0 0)' },
                    '100%': { clipPath: 'inset(0 0 0 0)' },
                },
                'spin-reverse': {
                    '0%': { transform: 'rotate(360deg)' },
                    '100%': { transform: 'rotate(0deg)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        }
    },
    plugins: [],
}
