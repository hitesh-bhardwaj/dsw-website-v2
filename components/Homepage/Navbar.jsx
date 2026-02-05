import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[70px] bg-white/22">
            <div className="relative flex items-center justify-between h-[5vw] px-[1.25vw]">
                {/* Logo */}
                <div className="absolute left-[3.91vw] flex items-center">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/dsw-logo-nav.png"
                            alt="DSW Logo"
                            width={155}
                            height={57}
                            className="w-[8.07vw] h-auto"
                            priority
                        />
                    </Link>
                </div>

                {/* Center Menu */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[1.25vw] backdrop-blur-[5px] rounded-full px-[0.1vw]">
                    <Link
                        href="#about"
                        className="flex items-center justify-center px-[1.04vw] py-[0.52vw] rounded-full text-[#111] text-[1.04vw] font-medium tracking-[0.02vw] leading-[1.98vw] font-heading hover:bg-white/20 transition-colors"
                    >
                        About Us
                    </Link>

                    <Link
                        href="#technology"
                        className="flex items-center justify-center gap-[0.42vw] px-[1.04vw] py-[0.52vw] rounded-full text-[#111] text-[1.04vw] font-medium tracking-[0.02vw] leading-[1.98vw] font-heading hover:bg-white/20 transition-colors"
                    >
                        Technology
                        <Image
                            src="/dropdown-arrow.svg"
                            alt=""
                            width={10}
                            height={6}
                            className="w-[0.52vw] h-[0.31vw]"
                        />
                    </Link>

                    <Link
                        href="#solutions"
                        className="flex items-center justify-center gap-[0.42vw] px-[1.04vw] py-[0.52vw] rounded-full text-[#111] text-[1.04vw] font-medium tracking-[0.02vw] leading-[1.98vw] font-heading hover:bg-white/20 transition-colors"
                    >
                        Solutions
                        <Image
                            src="/dropdown-arrow.svg"
                            alt=""
                            width={10}
                            height={6}
                            className="w-[0.52vw] h-[0.31vw]"
                        />
                    </Link>

                    <Link
                        href="#pilot"
                        className="flex items-center justify-center px-[1.04vw] py-[0.52vw] rounded-full text-[#111] text-[1.04vw] font-medium tracking-[0.02vw] leading-[1.98vw] font-heading hover:bg-white/20 transition-colors"
                    >
                        Pilot Program
                    </Link>

                    <Link
                        href="#resources"
                        className="flex items-center justify-center gap-[0.42vw] px-[1.04vw] py-[0.52vw] rounded-full text-[#111] text-[1.04vw] font-medium tracking-[0.02vw] leading-[1.98vw] font-heading hover:bg-white/20 transition-colors"
                    >
                        Resources
                        <Image
                            src="/dropdown-arrow.svg"
                            alt=""
                            width={10}
                            height={6}
                            className="w-[0.52vw] h-[0.31vw]"
                        />
                    </Link>
                </div>

                {/* Contact Button */}
                <div className="absolute right-[3.91vw]">
                    <Link
                        href="#contact"
                        className="flex items-center justify-center px-[1.56vw] py-[1.04vw] rounded-full text-[#e8e8e8] text-[1.15vw] font-medium tracking-[0.023vw] leading-normal font-heading transition-all hover:opacity-90"
                        style={{
                            backgroundImage: "linear-gradient(109.549deg, rgb(241, 107, 13) 7.1952%, rgb(230, 18, 22) 92.805%)"
                        }}
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </nav>
    );
}
