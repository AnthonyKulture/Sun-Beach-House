import type { Metadata } from 'next'
import { VillaDetails } from '@/components/VillaDetails';

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    // In a real app, you might fetch villa data here to generate dynamic metadata title/description
    return {
        title: 'Villa Details | Sun Beach House',
    }
}

export default function VillaPage({ params }: Props) {
    return <VillaDetails villaId={params.id} />;
}
