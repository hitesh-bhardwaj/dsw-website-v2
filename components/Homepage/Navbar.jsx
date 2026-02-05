import Link from 'next/link';
import Image from 'next/image';
import PrimaryButton from '../Buttons/PrimaryButton';
// import PrimaryButton from './PrimaryButton';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-6">
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/dsw-logo.svg"
                        alt="DSW Logo"
                        width={150}
                        height={50}
                        className="h-14 w-auto"
                        priority
                    />
                </Link>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <Link href="#" className="hover:text-white transition-colors">Technology</Link>
                <Link href="#" className="hover:text-white transition-colors">Solutions</Link>
                <Link href="#" className="hover:text-white transition-colors">Pilot Program</Link>
                <Link href="#" className="hover:text-white transition-colors">Resources</Link>
                <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
            </div>

            <div className="flex items-center gap-6">
                <PrimaryButton text="Contact Us" href="#" />
            </div>
        </nav>
    );
}
