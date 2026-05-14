'use client';

import React, { useMemo, useState } from 'react';
import { BlogCard } from './BlogCard';
import { useLanguage } from '../contexts/LanguageContext';
import type { PostListItem } from '../types';

type CategoryKey = 'vie-st-barth' | 'services' | 'villas' | 'saison' | 'immobilier' | 'destinations' | 'guides';
const ALL: CategoryKey[] = ['vie-st-barth', 'services', 'villas', 'saison', 'immobilier', 'destinations', 'guides'];
const isCategoryKey = (s: string): s is CategoryKey => (ALL as readonly string[]).includes(s);

interface BlogIndexProps {
    posts: PostListItem[];
}

export const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<CategoryKey | 'all'>('all');

    const availableCategories = useMemo(() => {
        const set = new Set<CategoryKey>();
        posts.forEach((p) => {
            if (isCategoryKey(p.category)) set.add(p.category);
        });
        return Array.from(set);
    }, [posts]);

    const filteredPosts = useMemo(() => {
        if (activeCategory === 'all') return posts;
        return posts.filter((p) => p.category === activeCategory);
    }, [posts, activeCategory]);

    return (
        <div className="bg-sbh-cream min-h-screen pb-24">
            {/* Hero */}
            <section className="px-6 md:px-12 pt-32 md:pt-40 pb-16 md:pb-24 text-center">
                <div className="max-w-[900px] mx-auto">
                    <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-sbh-stone mb-6">
                        {t.blog.sectionLabel}
                    </p>
                    <h1 className="font-serif text-4xl md:text-6xl italic text-sbh-charcoal leading-tight mb-8">
                        {t.blog.indexTitle}
                    </h1>
                    <p className="font-sans font-light text-base md:text-lg text-sbh-charcoal/70 leading-relaxed max-w-2xl mx-auto">
                        {t.blog.indexSubtitle}
                    </p>
                </div>
            </section>

            {/* Category filter */}
            {availableCategories.length > 1 && (
                <section className="px-6 md:px-12 mb-12 md:mb-16">
                    <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center gap-3 md:gap-4">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full border transition-colors ${
                                activeCategory === 'all'
                                    ? 'bg-sbh-charcoal text-white border-sbh-charcoal'
                                    : 'bg-transparent text-sbh-charcoal/70 border-sbh-charcoal/20 hover:border-sbh-charcoal'
                            }`}
                        >
                            {/* "All" label reuses collections.all */}
                            {t.collections.all}
                        </button>
                        {availableCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full border transition-colors ${
                                    activeCategory === cat
                                        ? 'bg-sbh-charcoal text-white border-sbh-charcoal'
                                        : 'bg-transparent text-sbh-charcoal/70 border-sbh-charcoal/20 hover:border-sbh-charcoal'
                                }`}
                            >
                                {t.blog.categoryLabels[cat]}
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* Posts grid */}
            <section className="px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto">
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 md:gap-y-24">
                            {filteredPosts.map((post) => (
                                <BlogCard key={post._id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <p className="font-serif italic text-center text-sbh-charcoal/60 py-24">
                            {t.blog.indexEmpty}
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
};
