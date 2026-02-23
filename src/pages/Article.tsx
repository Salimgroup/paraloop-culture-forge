import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Article() {
    const { slug } = useParams();

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/feed" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Feed
            </Link>

            <article className="prose prose-invert lg:prose-xl max-w-none">
                <span className="text-secondary font-semibold tracking-widest text-sm uppercase">Streetwear</span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-4 mb-8">
                    Placeholder Article for: {slug}
                </h1>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-12 border-b border-white/10 pb-8">
                    <span>Curated by Paraloop AI</span>
                    <span>•</span>
                    <span>5 min read</span>
                </div>

                <p className="text-lg leading-relaxed text-gray-300">
                    This is a placeholder for the article view. The content here will be fetched from Supabase based on the URL parameter.
                    It will maintain the high-context, optimistic tone characteristic of the Paraloop brand.
                </p>
            </article>
        </div>
    );
}
