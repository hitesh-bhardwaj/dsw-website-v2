import Image from 'next/image';
import Link from 'next/link';

export default function FooterNew() {
    const socialLinks = [
        { name: 'Facebook', icon: '/social-facebook.svg', url: '#' },
        { name: 'LinkedIn', icon: '/social-linkedin.svg', url: '#' },
        { name: 'X', icon: '/social-x.svg', url: '#' },
        { name: 'Instagram', icon: '/social-instagram.svg', url: '#' },
        { name: 'YouTube', icon: '/social-youtube.svg', url: '#' },
    ];

    const navigationLinks = [
        'Technology',
        'Solutions',
        'Pilot Program',
        'Case Studies',
        'Resources',
    ];

    const companyLinks = [
        'About Us',
        'Contact Us',
        'Privacy Policy',
        'Terms & Condition',
        'Join Community',
    ];

    return (
        <footer className="relative w-full bg-white pt-[8.96vw] pb-[4.58vw] px-[4.01vw] overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[104.11vw] h-[34.48vw] pointer-events-none">
                <Image
                    src="/footer-gradient.svg"
                    alt=""
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Top Section */}
                <div className="grid grid-cols-4 gap-[5.21vw] mb-[10.42vw]">
                    {/* Contact Us */}
                    <div>
                        <h3 className="text-[1.25vw] font-sans font-medium leading-[1.74vw] tracking-[0.025vw] text-[#111] mb-[1.56vw]">
                            Contact Us
                        </h3>
                        <div className="space-y-[1.56vw]">
                            <p className="text-[1.25vw] font-sans leading-normal text-[#111]">
                                Contact@datasciencewizards.ai
                            </p>
                            <p className="text-[1.25vw] font-sans leading-normal text-[#111]">
                                +91 96640 56847 | +353 894015233
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-[2.08vw] mt-[4.17vw]">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.url}
                                    className="w-[1.53vw] h-[1.53vw] relative hover:opacity-70 transition-opacity"
                                >
                                    <Image
                                        src={social.icon}
                                        alt={social.name}
                                        fill
                                        className="object-contain"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-[1.25vw] font-sans font-medium leading-[1.74vw] tracking-[0.025vw] text-[#111] mb-[1.56vw]">
                            Navigation
                        </h3>
                        <ul className="space-y-[1.56vw]">
                            {navigationLinks.map((link) => (
                                <li key={link}>
                                    <Link
                                        href="#"
                                        className="text-[1.15vw] font-sans tracking-[0.023vw] text-[#111] hover:text-[#ff5f00] transition-colors"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-[1.25vw] font-sans font-medium leading-[1.74vw] tracking-[0.025vw] text-[#111] mb-[1.56vw]">
                            Company
                        </h3>
                        <ul className="space-y-[1.56vw]">
                            {companyLinks.map((link) => (
                                <li key={link}>
                                    <Link
                                        href="#"
                                        className="text-[1.15vw] font-sans tracking-[0.023vw] text-[#111] hover:text-[#ff5f00] transition-colors"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <p className="text-[1.25vw] font-sans leading-[1.98vw] tracking-[0.025vw] text-[#111] mb-[3.65vw]">
                            Subscribe to our newsletter for the latest tech insights and updates.
                        </p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="w-full bg-transparent border-b border-[#666] pb-[0.52vw] text-[0.94vw] font-sans text-[#666] placeholder-[#666] focus:outline-none focus:border-[#ff5f00] transition-colors"
                            />
                            <button
                                className="mt-[2.08vw] px-[1.56vw] py-[0.78vw] rounded-full text-white text-[0.94vw] font-sans transition-all hover:opacity-90"
                                style={{
                                    backgroundImage: "linear-gradient(112.958deg, rgb(241, 107, 13) 7.1952%, rgb(230, 18, 22) 92.805%)"
                                }}
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex items-end justify-between pt-[5.21vw]">
                    {/* Logo */}
                    <div className="w-[20.16vw] h-[11.23vw] relative">
                        <Image
                            src="/logo-footer.svg"
                            alt="Data Science Wizards"
                            fill
                            className="object-contain object-left"
                        />
                    </div>

                    {/* Copyright */}
                    <p className="text-[1.04vw] font-sans leading-[1.74vw] text-[#111]">
                        © Copyright Data Science Wizards 2026
                    </p>
                </div>
            </div>
        </footer>
    );
}
