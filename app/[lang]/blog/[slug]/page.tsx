import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { CmsService } from '@/services/cms';
import { BlogPost } from '@/components/BlogPost';
import { renderMarkdown } from '@/utils/renderMarkdown';
import { getAlternates, OG_LOCALES } from '@/utils/seo';
import type { Lang } from '@/types';

type Props = { params: { lang: string; slug: string } };

const SUPPORTED: Lang[] = ['fr', 'en', 'es', 'pt'];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = params;
    if (!SUPPORTED.includes(lang as Lang)) return {};

    const post = await CmsService.getPostBySlug(slug, lang as Lang);
    if (!post) {
        return { title: 'Article introuvable | Sun Beach House' };
    }

    const l = lang as Lang;
    const title = post.seoTitle?.[l] || post.title[l] || post.title.fr || '';
    const description = post.seoDescription?.[l] || post.excerpt[l] || post.excerpt.fr || '';

    // Build per-language alternates from this post's own slugs
    const baseUrl = 'https://www.sun-beach-house.com';
    const languages: Record<string, string> = {};
    if (post.slug.fr) languages['fr-FR'] = `${baseUrl}/fr/blog/${post.slug.fr}`;
    if (post.slug.en) languages['en-US'] = `${baseUrl}/en/blog/${post.slug.en}`;
    if (post.slug.es) languages['es-ES'] = `${baseUrl}/es/blog/${post.slug.es}`;
    if (post.slug.pt) languages['pt-PT'] = `${baseUrl}/pt/blog/${post.slug.pt}`;
    if (post.slug.fr) languages['x-default'] = `${baseUrl}/fr/blog/${post.slug.fr}`;

    const currentSlug = post.slug[l] || slug;
    const canonical = `${baseUrl}/${lang}/blog/${currentSlug}`;

    return {
        title,
        description,
        alternates: { canonical, languages },
        openGraph: {
            type: 'article',
            locale: OG_LOCALES[lang] || OG_LOCALES.fr,
            title,
            description,
            url: canonical,
            siteName: 'Sun Beach House',
            images: post.mainImage ? [{ url: post.mainImage, alt: title }] : [],
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
            authors: [post.author || 'Sun Beach House'],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: post.mainImage ? [post.mainImage] : [],
        },
    };
}

export async function generateStaticParams() {
    const all = await CmsService.getAllPostSlugs();
    const params: { lang: string; slug: string }[] = [];
    for (const p of all) {
        for (const lang of SUPPORTED) {
            const slug = p.slug[lang];
            if (slug) params.push({ lang, slug });
        }
    }
    return params;
}

export const revalidate = 300;

export default async function BlogPostPage({ params }: Props) {
    const { lang, slug } = params;
    if (!SUPPORTED.includes(lang as Lang)) notFound();

    const post = await CmsService.getPostBySlug(slug, lang as Lang);
    if (!post) notFound();

    // Slug enforcement: if user lands on the wrong-language slug, redirect to the
    // canonical slug for that language. Mirrors the villa page pattern.
    const canonicalSlug = post.slug[lang as Lang];
    if (canonicalSlug && canonicalSlug !== slug) {
        redirect(`/${lang}/blog/${canonicalSlug}`);
    }

    const l = lang as Lang;
    const bodyMarkdown = post.body[l] || post.body.fr || '';
    const bodyHtml = renderMarkdown(bodyMarkdown);

    const title = post.seoTitle?.[l] || post.title[l] || post.title.fr || '';
    const description = post.seoDescription?.[l] || post.excerpt[l] || post.excerpt.fr || '';
    const canonicalUrl = `https://www.sun-beach-house.com/${lang}/blog/${canonicalSlug || slug}`;

    // Article schema (JSON-LD)
    const articleLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image: post.mainImage ? [post.mainImage] : undefined,
        author: {
            '@type': 'Organization',
            name: post.author || 'Sun Beach House',
            '@id': 'https://www.sun-beach-house.com/#org',
        },
        publisher: { '@id': 'https://www.sun-beach-house.com/#org' },
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        mainEntityOfPage: canonicalUrl,
        inLanguage: lang,
        ...(post.sources && post.sources.length > 0
            ? {
                  citation: post.sources.map((s) => ({
                      '@type': 'CreativeWork',
                      name: s.title,
                      url: s.url,
                      publisher: s.publisher ? { '@type': 'Organization', name: s.publisher } : undefined,
                      datePublished: s.publishedDate,
                  })),
              }
            : {}),
    };

    const homeLabel: Record<string, string> = { fr: 'Accueil', en: 'Home', es: 'Inicio', pt: 'Início' };
    const magazineLabel: Record<string, string> = { fr: 'Magazine', en: 'Magazine', es: 'Magazine', pt: 'Magazine' };

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: homeLabel[lang], item: `https://www.sun-beach-house.com/${lang}` },
            { '@type': 'ListItem', position: 2, name: magazineLabel[lang], item: `https://www.sun-beach-house.com/${lang}/blog` },
            { '@type': 'ListItem', position: 3, name: title, item: canonicalUrl },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <BlogPost post={post} bodyHtml={bodyHtml} />
        </>
    );
}
