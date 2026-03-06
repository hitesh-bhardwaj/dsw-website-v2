// import Layout from "@/components/Layout/Layout";
// import HeroNewOptimized from "@/components/HeroNewOptimized";

export default function Page() {
    return (
        <>
            {/* <Layout> */}
                <main className="min-h-screen">
                    {/* <HeroNewOptimized heroContent={heroContent} variant="default" /> */}
                    <section className="h-screen w-full bg-gray-100 flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-56 font-bold mb-4">Testing Optimized Hero Component</h2>
                            <p className="text-24 text-gray-600">Scroll to see performance improvements</p>
                        </div>
                    </section>
                </main>
            {/* </Layout> */}
        </>
    )
}

const heroContent = {
  tagline: "Build, integrate, deploy, govern, and operate AI at scale, in your own environment.",
  heading: "The Enterprise AI Operating System",
  primaryButton: {
    present: true,
    book: true,
    link: "#",
    text: "Book a Demo"
  },
  secondaryButton: {
    present: true,
    link: "/contact-us",
    text: "Talk to our Team"
  },
}