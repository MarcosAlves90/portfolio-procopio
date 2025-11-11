import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/useTheme';
import Logo from '@/components/atom/Logo';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const { effective, toggle } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const firstMobileLinkRef = useRef<HTMLLIElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const prevBodyOverflowRef = useRef<string>('');

    useEffect(() => {
        // Close mobile menu if viewport becomes >= md (tailwind md ~= 768px)
        const onResize = () => {
            if (window.innerWidth >= 768) setMobileOpen(false);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    };

    const handleMobileToggle = (next?: boolean) => {
        setMobileOpen(prev => (typeof next === 'boolean' ? next : !prev));
    };

    const handleMobileKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMobileToggle();
        }
    };

    useEffect(() => {
        if (mobileOpen) {
            // focus the first link for better keyboard UX
            firstMobileLinkRef.current?.focus();
        }
    }, [mobileOpen]);

    // Close on Escape and trap Tab inside the mobile menu when open
    useEffect(() => {
        if (!mobileOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMobileOpen(false);
                return;
            }

            if (e.key === 'Tab') {
                const container = menuRef.current;
                if (!container) return;
                const focusable = container.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        (last as HTMLElement).focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        (first as HTMLElement).focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [mobileOpen]);

    // Prevent background scrolling when mobile menu is open
    useEffect(() => {
        if (typeof document === 'undefined') return;

        if (mobileOpen) {
            // store current overflow to restore later
            prevBodyOverflowRef.current = document.body.style.overflow || '';
            document.body.style.overflow = 'hidden';
        } else {
            // restore previous overflow
            document.body.style.overflow = prevBodyOverflowRef.current;
        }

        // cleanup on unmount
        return () => {
            document.body.style.overflow = prevBodyOverflowRef.current;
        };
    }, [mobileOpen]);

    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    return (
        <div className="fixed top-0 left-0 right-0 h-16 z-50 bg-accent" style={{ contain: 'layout style paint' }}>
            <div className="w-full px-8 h-full flex items-center justify-between text-primary">
                <div className="flex items-center gap-4">
                    <Link to="/" onClick={scrollToTop} className="w-15 focus:outline-none focus:ring-2 focus:ring-primary/10 rounded" aria-label="Voltar ao topo">
                        {/* Inline SVG logo uses currentColor so its color follows the surrounding text color */}
                        <Logo className="w-full text-primary" ariaLabel="Logo" />
                    </Link>
                </div>

                <nav>
                    {/* Desktop nav - visible from md and up */}
                    <ul className="hidden md:flex gap-30 font-title text-lg">
                        <li><Link to="/#sobre" className="hover:underline">Sobre</Link></li>
                        <li><Link to="/#projetos" className="hover:underline">Projetos</Link></li>
                        <li><Link to="/#contato" className="hover:underline">Contato</Link></li>
                    </ul>
                </nav>

                {/* Right side: hamburger on mobile, theme toggle on desktop */}
                <div className="flex items-center gap-2">
                    {/* Mobile hamburger - placed on the right side for mobile */}
                    <button
                        type="button"
                        className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/10"
                        onClick={() => handleMobileToggle()}
                        onKeyDown={handleMobileKeyDown}
                        aria-controls="mobile-menu"
                        aria-expanded={mobileOpen}
                        aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
                    >
                        {mobileOpen ? (
                            <X className="w-6 h-6" aria-hidden="true" />
                        ) : (
                            <Menu className="w-6 h-6" aria-hidden="true" />
                        )}
                    </button>

                    {/* Desktop theme toggle: hidden on small screens */}
                    <div className="w-15 hidden md:flex items-end justify-end">
                        <button
                            type="button"
                            onClick={toggle}
                            onKeyDown={handleKeyDown}
                            aria-label="Alternar tema"
                            title="Alternar tema"
                            aria-pressed={effective === 'dark'}
                            className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-primary/10 cursor-pointer"
                        >
                            {effective === 'dark' ? (
                                <Sun className="w-6 h-6" aria-hidden="true" />
                            ) : (
                                <Moon className="w-6 h-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu (dropdown) - shown only when open on small screens */}
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 top-16 bg-black/40 md:hidden z-30"
                            onClick={() => setMobileOpen(false)}
                            aria-hidden="true"
                        />

                        {/* Panel */}
                        <div className="fixed left-4 right-4 top-20 md:hidden z-40">
                            <div
                                id="mobile-menu"
                                ref={menuRef}
                                className="bg-accent/95 backdrop-blur-sm rounded-lg divide-y divide-primary/10 overflow-hidden transform transition duration-200 ease-out"
                                role="menu"
                                aria-label="Menu móvel"
                            >
                                <ul className="flex flex-col gap-0 p-2 font-title text-base">
                                    <li ref={firstMobileLinkRef}>
                                        <Link
                                            to="/#sobre"
                                            className="block w-full px-4 py-3 rounded hover:bg-primary/5 focus:bg-primary/5 focus:outline-none"
                                            onClick={() => handleMobileToggle(false)}
                                        >
                                            Sobre
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/#projetos"
                                            className="block w-full px-4 py-3 rounded hover:bg-primary/5 focus:bg-primary/5 focus:outline-none"
                                            onClick={() => handleMobileToggle(false)}
                                        >
                                            Projetos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/#contato"
                                            className="block w-full px-4 py-3 rounded hover:bg-primary/5 focus:bg-primary/5 focus:outline-none"
                                            onClick={() => handleMobileToggle(false)}
                                        >
                                            Contato
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            onClick={() => { handleMobileToggle(false); toggle(); }}
                                            onKeyDown={handleKeyDown}
                                            aria-label="Alternar tema"
                                            aria-pressed={effective === 'dark'}
                                            className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-primary/5 focus:bg-primary/5 focus:outline-none"
                                        >
                                            {effective === 'dark' ? (
                                                <Sun className="w-6 h-6" aria-hidden="true" />
                                            ) : (
                                                <Moon className="w-6 h-6" aria-hidden="true" />
                                            )}
                                            <span>Alternar tema</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
