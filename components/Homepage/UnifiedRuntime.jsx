import Image from 'next/image';

export default function UnifiedRuntime() {
    return (
        <section className="py-24 bg-black overflow-hidden relative">
            {/* Background accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        From Fragmented AI to <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">One Governed Runtime</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Stop stitching together disconnected tools. DSW provides a single, unified operating system for your entire AI lifecycle.
                    </p>
                </div>

                <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] flex items-center justify-center">
                    {/* Using the generated isometric image */}
                    <div className="relative w-full h-full">
                        <Image
                            src="/isometric.png"
                            alt="Unified AI Runtime Architecture"
                            fill
                            className="object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
