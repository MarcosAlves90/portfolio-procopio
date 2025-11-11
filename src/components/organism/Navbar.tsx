import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/useTheme';
import Logo from '@/components/atom/Logo';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
    { id: 'sobre', label: 'Sobre', href: '/#sobre' },
    { id: 'projetos', label: 'Projetos', href: '/#projetos' },
    { id: 'contato', label: 'Contato', href: '/#contato' },
] as const;

const SELECTOR_FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function ThemeToggle({ isThemeKeyDown }: { isThemeKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void }) {
    const { effective, toggle } = useTheme();

    return (
        <button
            type="button"
            onClick={toggle}
            onKeyDown={isThemeKeyDown}
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
    );
}

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    effectiveTheme: string;
}

function MobileMenu({ isOpen, onClose, effectiveTheme }: MobileMenuProps) {
    const firstLinkRef = useRef<HTMLLIElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const { toggle: toggleTheme } = useTheme();

    useEffect(() => {
        if (isOpen) firstLinkRef.current?.focus();
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }

            if (e.key === 'Tab') {
                const container = menuRef.current;
                if (!container) return;
                const focusable = container.querySelectorAll<HTMLElement>(SELECTOR_FOCUSABLE);
                if (focusable.length === 0) return;

                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                const isShifted = e.shiftKey;

                if ((isShifted && document.activeElement === first) || (!isShifted && document.activeElement === last)) {
                    e.preventDefault();
                    (isShifted ? last : first).focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 top-16 bg-black/40 md:hidden z-30"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="fixed left-4 right-4 top-20 md:hidden z-40">
                <div
                    id="mobile-menu"
                    ref={menuRef}
                    className="bg-accent/95 backdrop-blur-sm rounded-lg divide-y divide-primary/10 overflow-hidden transform transition duration-200 ease-out"
                    role="menu"
                    aria-label="Menu móvel"
                >
                    <ul className="flex flex-col gap-0 p-2 font-title text-base text-primary">
                        {NAV_LINKS.map((link, index) => (
                            <li key={link.id} ref={index === 0 ? firstLinkRef : null}>
                                <Link
                                    to={link.href}
                                    className="block w-full px-4 py-3 rounded hover:bg-primary/5 focus:bg-primary/5 focus:outline-none"
                                    onClick={onClose}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button
                                type="button"
                                onClick={() => {
                                    onClose();
                                    toggleTheme();
                                }}
                                aria-label="Alternar tema"
                                aria-pressed={effectiveTheme === 'dark'}
                                className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-primary/5 focus:bg-primary/5 focus:outline-none"
                            >
                                {effectiveTheme === 'dark' ? (
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
    );
}

export default function Navbar() {
    const { effective, toggle } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const prevBodyOverflowRef = useRef<string>('');

    const scrollToTop = useCallback(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleMobileToggle = useCallback((next?: boolean) => {
        setMobileOpen(prev => (typeof next === 'boolean' ? next : !prev));
    }, []);

    const handleThemeKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    }, [toggle]);

    const handleMobileMenuKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMobileToggle();
        }
    }, [handleMobileToggle]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileOpen(false);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (typeof document === 'undefined') return;

        if (mobileOpen) {
            prevBodyOverflowRef.current = document.body.style.overflow || '';
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = prevBodyOverflowRef.current;
        }

        return () => {
            document.body.style.overflow = prevBodyOverflowRef.current;
        };
    }, [mobileOpen])

    return (
        <>
            <div className="fixed top-0 left-0 right-0 h-16 z-50 bg-accent">
                <div className="w-full px-8 h-full flex items-center justify-between text-primary">
                    <Link
                        to="/"
                        onClick={scrollToTop}
                        className="w-15 focus:outline-none focus:ring-2 focus:ring-primary/10 rounded"
                        aria-label="Voltar ao topo"
                    >
                        <Logo className="w-full text-primary" ariaLabel="Logo" />
                    </Link>

                    <nav className="hidden md:block">
                        <ul className="flex gap-30 font-title text-lg">
                            {NAV_LINKS.map(link => (
                                <li key={link.id}>
                                    <Link to={link.href} className="hover:underline">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/10"
                            onClick={() => handleMobileToggle()}
                            onKeyDown={handleMobileMenuKeyDown}
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

                        <div className="w-15 hidden md:flex items-end justify-end">
                            <ThemeToggle isThemeKeyDown={handleThemeKeyDown} />
                        </div>
                    </div>
                </div>
            </div>

            <MobileMenu isOpen={mobileOpen} onClose={() => handleMobileToggle(false)} effectiveTheme={effective} />
        </>
    );
}
