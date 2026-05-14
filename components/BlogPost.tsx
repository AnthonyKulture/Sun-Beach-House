'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Post, Lang } from '../types';

type CategoryKey = 'vie-st-barth' | 'services' | 'villas' | 'saison' | 'immobilier' | 'destinations' | 'guides';
const isCategoryKey = (s: string): s is CategoryKey =>
    ['vie-st-barth', 'services', 'villas', 'saison', 'immobilier', 'destinations', 'guides'].includes(s);

const dateLocale: Record<Lang, string> = { fr: 'fr-FR', en: 'en-US', es: 'es-ES', pt: 'pt-PT' };

interface BlogPostProps {
    post: Post;
    bodyHtml: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({ post, bodyHtml }) => {
    const { language, t } = useLanguage();
    const lang = language as Lang;

    const title = post.title[lang] || post.title.fr || '';
    const excerpt = post.excerpt[lang] || post.excerpt.fr;
    const categoryLabel = isCategoryKey(post.category) ? t.blog.categoryLabels[post.category] : post.category;
    const altText = post.mainImageAlt?.[lang] || post.mainImageAlt?.fr || title;

    const pubDate = new Date(post.publishedAt).toLocaleDateString(dateLocale[lang], {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const updateDate = post.updatedAt
        ? new Date(post.updatedAt).toLocaleDateString(dateLocale[lang], {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : null;

    return (
        <article className="bg-sbh-cream min-h-screen pb-24 text-sbh-charcoal">
            {/* Back link */}
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-24 md:pt-32">
                <Link
                    href={`/${language}/blog`}
                    className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-sbh-charcoal/70 hover:text-sbh-blue transition-colors"
                >
                    <ArrowLeft size={14} />
                    {t.blog.backToIndex}
                </Link>
            </div>

            {/* Header */}
            <header className="max-w-[900px] mx-auto px-6 md:px-12 pt-8 md:pt-12 pb-12 text-center">
                <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] text-sbh-stone mb-6">
                    <span>{categoryLabel}</span>
                    <span className="w-1 h-1 rounded-full bg-sbh-stone/50" />
                    <time dateTime={post.publishedAt}>{pubDate}</time>
                    {updateDate && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-sbh-stone/50" />
                            <time dateTime={post.updatedAt}>
                                {t.blog.updatedOn} {updateDate}
                            </time>
                        </>
                    )}
                </div>

                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl italic leading-tight text-sbh-charcoal mb-8">
                    {title}
                </h1>

                {excerpt && (
                    <p className="font-sans font-light text-lg md:text-xl text-sbh-charcoal/70 leading-relaxed max-w-2xl mx-auto">
                        {excerpt}
                    </p>
                )}

                <p className="font-sans text-xs uppercase tracking-[0.25em] text-sbh-stone mt-8">
                    {t.blog.author} {post.author || 'Sun Beach House'}
                </p>
            </header>

            {/* Hero image */}
            {post.mainImage && (
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-12 md:mb-16">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-sm shadow-xl">
                        <Image
                            src={post.mainImage}
                            alt={altText}
                            fill
                            priority
                            sizes="(max-width: 1200px) 100vw, 1200px"
                            className="object-cover"
                        />
                    </div>
                </div>
            )}

            {/* Body */}
            <div className="max-w-[760px] mx-auto px-6 md:px-12">
                <div
                    className="font-sans font-light text-base md:text-lg leading-relaxed text-sbh-charcoal/85
                        [&_h2]:font-serif [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:italic [&_h2]:text-sbh-charcoal [&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:leading-tight
                        [&_h3]:font-serif [&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:text-sbh-charcoal [&_h3]:mt-12 [&_h3]:mb-4
                        [&_p]:mb-6 [&_p]:leading-[1.75]
                        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul_li]:mb-2
                        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol_li]:mb-2
                        [&_a]:text-sbh-blue [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-sbh-charcoal
                        [&_strong]:font-medium [&_strong]:text-sbh-charcoal
                        [&_em]:italic
                        [&_blockquote]:border-l-2 [&_blockquote]:border-sbh-blue [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-sbh-charcoal/80 [&_blockquote]:my-8
                        [&_table]:w-full [&_table]:border-collapse [&_table]:my-8 [&_table]:text-sm
                        [&_thead]:border-b [&_thead]:border-sbh-charcoal/20
                        [&_th]:py-3 [&_th]:pr-4 [&_th]:text-left [&_th]:font-sans [&_th]:text-[10px] [&_th]:uppercase [&_th]:tracking-[0.2em] [&_th]:text-sbh-charcoal/60 [&_th]:font-medium
                        [&_td]:py-3 [&_td]:pr-4 [&_td]:align-top [&_td]:border-b [&_td]:border-gray-100
                        [&_sup.footnote-ref]:text-sbh-blue [&_sup.footnote-ref_a]:no-underline
                        [&_.footnotes]:mt-20 [&_.footnotes]:pt-8 [&_.footnotes]:border-t [&_.footnotes]:border-sbh-charcoal/15 [&_.footnotes]:text-sm
                        [&_.footnotes_hr]:hidden
                        [&_.footnotes_ol]:list-decimal [&_.footnotes_ol]:pl-6 [&_.footnotes_li]:mb-3 [&_.footnotes_li]:text-sbh-charcoal/70
                        [&_.footnotes_a]:break-all [&_.footnote-backref]:no-underline [&_.footnote-backref]:ml-1 [&_.footnote-backref]:text-sbh-blue
                        [&_img]:rounded-sm [&_img]:my-8"
                    dangerouslySetInnerHTML={{ __html: bodyHtml }}
                />
            </div>

            {/* Related villas */}
            {post.relatedVillas && post.relatedVillas.length > 0 && (
                <section className="max-w-[1200px] mx-auto px-6 md:px-12 mt-24 md:mt-32">
                    <h2 className="font-serif text-2xl md:text-3xl italic text-sbh-charcoal mb-12 text-center">
                        {t.blog.relatedVillasTitle}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {post.relatedVillas.map((v) => (
                            <Link
                                key={v._id}
                                href={`/${language}/villas/${v.slug || v._id}`}
                                className="group block"
                            >
                                <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4 relative bg-sbh-cream">
                                    {v.mainImage && (
                                        <Image
                                            src={v.mainImage}
                                            alt={v.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}
                                </div>
                                <h3 className="font-serif italic text-xl text-sbh-charcoal group-hover:text-sbh-blue transition-colors">
                                    {v.name}
                                </h3>
                                {v.location?.name && (
                                    <p className="font-sans text-xs uppercase tracking-widest text-sbh-stone mt-1">
                                        {v.location.name}
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </article>
    );
};
