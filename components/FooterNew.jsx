import Image from 'next/image';
import Link from 'next/link';
import WaveGradientCanvas from './Homepage/HeroBg';
// import HeroBg from './Homepage/HeroBg';

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
        <footer className="relative w-full bg-white pt-[8.2vw] pb-[2vw] px-[4vw] overflow-hidden">
        {/* <footer className="relative w-full bg-white pt-[8.2vw] pb-[2vw] px-[4vw] overflow-hidden"> */}
            {/* Background Gradient */}
            <div className='w-screen h-full'>

           <WaveGradientCanvas/>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Top Section */}
                <div className="flex justify-between mb-[2vw]">

                    <div className='w-[25%]'>

                    
                    {/* Contact Us */}
                    <div className='space-y-[0.5vw]'>
                        <h3 className="text-24  ">
                            Contact Us
                        </h3>
                        <div className="space-y-[0.4vw]">
                            <p className="text-24 f">
                                Contact@datasciencewizards.ai
                            </p>
                            <p className="text-24 ">
                                +91 96640 56847 | +353 894015233
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-[2vw] mt-[4vw]">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.url}
                                    className="w-[1.5vw] h-[1.5vw] relative hover:opacity-70 transition-opacity"
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
                    </div>
                    {/* Navigation */}
                    <div className='flex justify-between  w-[60%]'>

                   
                    <div className='space-y-[1.2vw]'>
                        <h3 className="text-24  font-medium ">
                            Navigation
                        </h3>
                        <ul className="space-y-[1vw]">
                            {navigationLinks.map((link) => (
                                <li key={link}>
                                    <Link
                                        href="#"
                                        className="text-22  hover:text-[#ff5f00] transition-colors duration-300"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className='space-y-[1.2vw]'>
                         <h3 className="text-24  font-medium ">
                            Company
                        </h3>
                        <ul className="space-y-[1vw]">
                            {companyLinks.map((link) => (
                                <li key={link}>
                                    <Link
                                        href="#"
                                         className="text-22  hover:text-[#ff5f00] transition-colors duration-300"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className='w-[45%] relative'>
                        <div className='w-full h-[0.1px] bg-black absolute bottom-18' />
                        <p className="text-24 font-sans tracking-[0.025vw]  mb-[3vw]">
                            Subscribe to our newsletter for the latest tech insights and updates.
                        </p>
                        <div className="relative flex mt-[2vw]">
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="w-full bg-transparent  text-[1vw] font-sans text-[#666] placeholder-[#666] focus:outline-none focus:border-[#ff5f00] transition-colors"
                            />
                            <button
                                className=" px-[1.5vw] py-[0.5vw] rounded-full text-white text-[1vw] font-sans transition-all hover:opacity-90"
                                style={{
                                    backgroundImage: "linear-gradient(112.958deg, rgb(241, 107, 13) 7.1952%, rgb(230, 18, 22) 92.805%)"
                                }}
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                 </div>

                {/* Bottom Section */}
                <div className="flex items-end justify-between pt-[5.2vw]">
                    {/* Logo */}
                    <div className="w-[20vw] h-[11vw] relative">
                        <Image
                            src="/logo-footer.svg"
                            alt="Data Science Wizards"
                            fill
                            className="object-contain object-left"
                        />
                    </div>

                    {/* Copyright */}
                    <p className="text-[1.04vw] font-sans">
                        © Copyright Data Science Wizards 2026
                    </p>
                </div>
            </div>
        </footer>
    );
}
