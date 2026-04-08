import { useEffect, useState } from "react";
import { useScrollContext } from "../../context/ScrollContext"
import { Link } from "react-router-dom";

const Header = () => {
    const scrolled = useScrollContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        if (menuOpen) {
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = '';
        }
    }, [menuOpen])

    return (
        <>
            <header className={`fixed top-0 w-full z-50 transition-all duration-300   
                    ${scrolled ? 'bg-amber-300 shadow-lg' : 'bg-transparent text-stone-50'}`
            }>
                {/* Mobile */}
                <div className="md:hidden flex items-center justify-between mx-auto  px-4 py-2 ">
                    <button onClick={() => setMenuOpen(pre => !pre)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                        </svg>
                    </button>
                    <button onClick={() => setSearchOpen(pre => !pre)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>

            </header>

            {/* Menu Mobile  */}
            <nav onClick={() => setMenuOpen(false)} className={`fixed left-0 right-0 z-40 h-dvh backdrop-blur-md flex flex-col gap-y-4 items-center justify-center bg-white/10 border border-white/20 transition-all duration-300 ease-in ${menuOpen ? 'top-0 opacity-100' : '-top-full opacity-0'}`}>
                <Link to="/">
                    <p className="font-serif font-medium text-2xl capitalize text-stone-50">Home</p>
                </Link>
                <Link to="/movies">
                    <p className="font-serif font-medium text-2xl capitalize text-stone-50">Movies</p>
                </Link>
                <Link to="/series">
                    <p className="font-serif font-medium text-2xl capitalize text-stone-50">Tv</p>
                </Link>
                <Link to="/watchlist">
                    <p className="font-serif font-medium text-2xl capitalize text-stone-50">Watchlist</p>
                </Link>
            </nav>

            {/* Search Mobile */}
            <div className={`absolute top-14 z-40 left-0 w-full bg-red-800 transition-all duration-300 overflow-hidden
    ${searchOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-4">
                    <h1>Search Here TODO</h1>
                </div>
            </div>
        </>
    )
}

export default Header