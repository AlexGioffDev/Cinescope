import { useEffect, useState } from "react";
import { useScrollContext } from "../../context/ScrollContext"
import { Link, NavLink } from "react-router-dom";
import SearchInput from "../SearchInput/SearchInput";

const Header = () => {
    const scrolled = useScrollContext();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    }, [menuOpen])

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/movies", label: "Movies" },
        { to: "/series", label: "Tv" },
        { to: "/watchlist", label: "Watchlist" },
    ];

    return (
        <>
            <header className={`fixed top-0 w-full z-50 transition-all duration-300 
                ${scrolled ? 'bg-stone-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'} text-stone-50`}>

                {/* Mobile */}
                <div className="md:hidden flex items-center justify-between px-4 py-2">
                    <button onClick={() => setMenuOpen(pre => !pre)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5} stroke="currentColor" className="size-8 shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                        </svg>
                    </button>
                    <SearchInput />
                </div>

                {/* Tablet & Desktop */}
                <div className="hidden md:flex items-center gap-6 px-8 py-3 max-w-7xl mx-auto w-full">
                    {/* Logo */}
                    <Link to="/" className="shrink-0">
                        <span className="font-black text-xl tracking-tight uppercase text-amber-300">Cinescope</span>
                    </Link>

                    <div className="flex-1 max-w-sm">
                        <SearchInput variant="desktop" />
                    </div>

                    {/* Nav links */}
                    <nav className="flex items-center gap-6 ml-auto">
                        {navLinks.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `text-sm font-semibold uppercase tracking-wide transition-colors duration-200
                                    ${isActive ? 'text-amber-300' : 'text-stone-300 hover:text-stone-50'}`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Menu Mobile */}
            <nav onClick={() => setMenuOpen(false)}
                className={`fixed left-0 right-0 z-40 h-dvh backdrop-blur-md flex flex-col gap-y-6 items-center justify-center bg-stone-900/90 transition-all duration-300 ease-in-out
                ${menuOpen ? 'top-0 opacity-100' : '-top-full opacity-0'}`}>
                {navLinks.map(({ to, label }) => (
                    <Link key={to} to={to} onClick={() => setMenuOpen(false)}>
                        <p className="font-serif font-medium text-2xl capitalize text-stone-50 hover:text-amber-300 transition-colors">{label}</p>
                    </Link>
                ))}
            </nav>
        </>
    )
}

export default Header;