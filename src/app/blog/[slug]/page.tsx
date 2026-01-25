"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft, FaSpinner } from "react-icons/fa";
import { NewsService, NewsArticle } from "@/services/news.service";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

export default function BlogPostPage() {
    const params = useParams();
    const router = useRouter();
    const { slug } = params;
    // Assuming slug IS the ID for now as per plan. 
    // In a real SEO optimized app, we would query by slug field.

    const [post, setPost] = useState<NewsArticle | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return;
            try {
                const data = await NewsService.getById(slug as string);
                if (!data) {
                    router.push("/blog"); // Redirect if not found
                    return;
                }
                setPost(data);
            } catch (error) {
                console.error("Failed to load blog post", error);
                router.push("/blog");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#250000] text-white flex items-center justify-center">
                <FaSpinner className="animate-spin text-4xl text-orange-500" />
            </div>
        );
    }

    if (!post) return null;

    return (
        <div className="min-h-screen bg-[#250000] text-white selection:bg-orange-500 selection:text-white">
            <Header />

            <article className="pt-24 pb-16 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-bold mb-8 transition-colors"
                >
                    <FaArrowLeft /> Back to Blog
                </Link>

                <header className="mb-12 text-center">
                    <div className="flex items-center justify-center gap-4 text-sm text-orange-400 mb-6">
                        <span className="flex items-center gap-1"><FaCalendarAlt /> {format(post.publishedAt, "MMM d, yyyy")}</span>
                        <span className="flex items-center gap-1"><FaTag /> {post.category || "General"}</span>
                        <span className="text-neutral-500">•</span>
                        <span className="text-neutral-400">{NewsService.calculateReadTime(post.content)}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-3 mb-10">
                        <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 overflow-hidden">
                            {post.author.photoURL ? (
                                <img src={post.author.photoURL} alt={post.author.name} className="w-full h-full object-cover" />
                            ) : (
                                <FaUser />
                            )}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-white">{post.author.name || "Admin"}</p>
                            <p className="text-xs text-neutral-400">Author</p>
                        </div>
                    </div>

                    {post.imageUrl && (
                        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-orange-500/20 shadow-2xl">
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}
                </header>

                <div className="prose prose-invert prose-lg max-w-none prose-headings:text-orange-500 prose-a:text-orange-500 hover:prose-a:text-orange-400 prose-strong:text-white prose-blockquote:border-l-orange-500 prose-blockquote:bg-orange-500/10 prose-blockquote:py-2 prose-blockquote:pr-4 prose-img:rounded-2xl">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>

            </article>

            <Footer />
        </div>
    );
}
