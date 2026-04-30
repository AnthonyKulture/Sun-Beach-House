import { notFound } from "next/navigation";

export async function generateStaticParams() {
  // Providing a dummy 'notfound' array prevents Next.js from throwing a 500 Error
  // when generating or dynamically evaluating this catch-all route.
  return ['fr', 'en', 'es', 'pt'].map(lang => ({
    lang,
    notfound: ['catchall']
  }));
}

export default function CatchAllNotFound() {
  notFound();
}
