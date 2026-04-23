import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'es' }, { lang: 'pt' }];
}

export default function CatchAllNotFound() {
  notFound();
}
