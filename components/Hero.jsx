import { Play } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen pt-20 pb-10 text-center overflow-hidden">
            {/* Background Glows */}

            <div className="container px-4 mx-auto flex flex-col items-center gap-8 z-10">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-5xl mx-auto leading-[1.1]">
                    The Enterprise AI <br className="hidden md:block" /> Operating System
                </h1>

                <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light">
                    Governed. Explainable. Production-Ready AI at Scale.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
                    <button className="px-8 py-4 text-lg font-semibold rounded-full hover:opacity-90 transition-all shadow-[0_0_30px_rgba(235,87,87,0.4)] hover:shadow-[0_0_40px_rgba(235,87,87,0.6)]">
                        Get Started
                    </button>

                    <button className="flex items-center gap-3 px-8 py-4 text-lg font-medium border border-white/10 rounded-full hover:bg-white/5 transition-all group backdrop-blur-sm">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/30 group-hover:border-white transition-colors bg-white/5">
                            <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                        </span>
                        Watch Video
                    </button>
                </div>
            </div>
        </section>
    );
}
