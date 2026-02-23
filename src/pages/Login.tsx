import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        if (isSignUp) {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) {
                setError(error.message);
            } else {
                setSuccessMessage("Check your email for the confirmation link to join Paraloop.");
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                setError(error.message);
            } else {
                navigate("/");
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="glass-panel max-w-md w-full p-8 rounded-3xl text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
                    <span className="text-white font-bold text-xl">P</span>
                </div>
                <h1 className="text-2xl font-bold mb-2 tracking-tight">
                    {isSignUp ? "Join Paraloop" : "Access Mission Control"}
                </h1>
                <p className="text-sm text-muted-foreground mb-8">
                    {isSignUp
                        ? "Create an account to become a member of the Culture Engine."
                        : "Enter your credentials to access the Paraloop director dashboard."}
                </p>

                <form onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-2 text-left">
                        <label className="text-sm font-medium text-white/80" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="director@paraloop.com"
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    <div className="space-y-2 text-left">
                        <label className="text-sm font-medium text-white/80" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-destructive mt-2 text-left bg-destructive/10 p-3 rounded-lg border border-destructive/20">{error}</div>
                    )}

                    {successMessage && (
                        <div className="text-sm text-green-400 mt-2 text-left bg-green-400/10 p-3 rounded-lg border border-green-400/20">{successMessage}</div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 py-3 bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-50 transition-opacity text-white font-semibold rounded-lg shadow-lg"
                    >
                        {loading ? "Processing..." : (isSignUp ? "Create Account" : "Authenticate")}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError(null);
                            setSuccessMessage(null);
                        }}
                        className="text-sm text-muted-foreground hover:text-white transition-colors mt-4 w-full"
                    >
                        {isSignUp ? "Already a member? Sign In" : "Not a member? Join Paraloop"}
                    </button>
                </form>
            </div>
        </div>
    );
}
