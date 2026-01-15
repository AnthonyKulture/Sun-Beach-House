import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Villas } from '@/components/Villas';
import { Services } from '@/components/Services';
import { Experience } from '@/components/Experience';

export default function HomePage() {
    return (
        <>
            <Hero />
            <About />
            <Villas />
            <Services />
            <Experience />
        </>
    );
}
