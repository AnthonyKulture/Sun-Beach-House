'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';
import type { PostListItem, Lang } from '../types';

type CategoryKey = 'vie-st-barth' | 'services' | 'villas' | 'saison' | 'immobilier' | 'destinations' | 'guides';

const isCategoryKey = (s: string): s is CategoryKey =>
    ['vie-st-barth', 'services', 'villas', 'saison', 'immobilier', 'destinations', 'guides'].includes(s);

const dateLocale: Record<Lang, string> = { fr: 'fr-FR', en: 'en-US', es: 'es-ES', pt: 'pt-PT' };

interface BlogCardProps {
    post: PostListItem;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    const { language, t } = useLanguage();
    const lang = language as Lang;

    const title = post.title[lang] || post.title.fr || '';
    const excerpt = post.excerpt[lang] || post.excerpt.fr || '';
    const slug = post.slug[lang] || post.slug.fr;

    if (!slug) return null;

    const categoryLabel = isCategoryKey(post.category) ? t.blog.categoryLabels[post.category] : post.category;
    const date = new Date(post.publishedAt).toLocaleDateString(dateLocale[lang], {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Link href={`/${language}/blog/${slug}`} className="group block">
            <article className="flex flex-col h-full">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-6 bg-sbh-cream">
                    {post.mainImage ? (
                        <Image
                            src={post.mainImage}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-sbh-charcoal/20 font-serif italic text-xl">
                            Sun Beach House
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-sbh-stone mb-3">
                    <span>{categoryLabel}</span>
                    <span className="w-1 h-1 rounded-full bg-sbh-stone/50" />
                    <time dateTime={post.publishedAt}>{date}</time>
                </div>

                <h3 className="font-serif text-xl md:text-2xl text-sbh-charcoal mb-3 leading-tight group-hover:text-sbh-blue transition-colors">
                    {title}
                </h3>

                {excerpt && (
                    <p className="font-sans font-light text-sbh-charcoal/70 leading-relaxed text-sm mb-4 line-clamp-3">
                        {excerpt}
                    </p>
                )}

                <span className="font-sans text-xs uppercase tracking-[0.2em] text-sbh-charcoal/60 border-b border-sbh-charcoal/30 group-hover:border-sbh-blue group-hover:text-sbh-blue pb-1 self-start mt-auto transition-colors">
                    {t.blog.readMore}
                </span>
            </article>
        </Link>
    );
};
