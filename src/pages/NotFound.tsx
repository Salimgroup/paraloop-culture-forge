import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-8xl font-black text-white/10 mb-4">404</h1>
            <h2 className="text-2xl font-bold mb-6">Frequency Not Found</h2>
            <p className="text-muted-foreground max-w-md mb-8">
                The cultural signal you're looking for we either missed, or it has moved to a different frequency.
            </p>
            <Link
                to="/feed"
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
            >
                Return to Feed
            </Link>
        </div>
    );
}
