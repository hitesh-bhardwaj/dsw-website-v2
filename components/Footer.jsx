import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black py-16 border-t border-white/10 text-sm">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-xl font-bold text-white mb-4">DSW</h3>
                        <p className="text-gray-500 mb-4">
                            The Enterprise AI Operating System.<br />
                            Governed. Scalable. Ready.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-gray-500">
                            <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Solutions</Link></li>
                            <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Pilot Program</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-500">
                            <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Resources</h4>
                        <ul className="space-y-2 text-gray-500">
                            <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Whitepapers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-500">
                            <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
                    <p className="text-gray-600">
                        © {new Date().getFullYear()} DSW Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={20} /></Link>
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter size={20} /></Link>
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors"><Github size={20} /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
