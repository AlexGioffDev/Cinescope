import { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

type SearchInputProps = {
    variant?: 'mobile' | 'desktop'
}

const SearchInput = ({ variant = 'mobile' }: SearchInputProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const previousPage = useRef(
        location.pathname !== '/search' ? location.pathname : '/'
    );
    const inputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const params = new URLSearchParams(location.search);
    const query = location.pathname === '/search' ? (params.get('q') ?? '') : '';

    useEffect(() => {
        if (location.pathname !== '/search') {
            previousPage.current = location.pathname;
        }
    }, [location.pathname]);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    const handleToggle = () => {
        if (isOpen) {
            navigate(previousPage.current);
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.trim()) {
            navigate(`/search?q=${value}`);
        } else {
            navigate(previousPage.current);
        }
    };

    // Desktop — sempre visibile, senza toggle
    if (variant === 'desktop') {
        return (
            <div className="flex items-center gap-2 bg-stone-800/60 border border-white/20 rounded-full px-4 py-1.5 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5} stroke="currentColor" className="size-4 shrink-0 text-stone-400">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search movies, series..."
                    className="bg-transparent outline-none text-sm text-stone-50 placeholder:text-stone-400 w-full min-w-0"
                />
                {query && (
                    <button onClick={() => navigate(previousPage.current)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5} stroke="currentColor" className="size-4 shrink-0 text-stone-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        );
    }

    // Mobile — con toggle
    return (
        <div className="flex items-center justify-end">
            <div className={`flex items-center gap-2 bg-stone-800 border border-white/20 rounded-full overflow-hidden transition-all duration-300 ease-in-out
                ${isOpen ? 'w-48 px-3 py-1 opacity-100' : 'w-0 opacity-0'}`}>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search..."
                    className="bg-transparent outline-none text-sm text-stone-50 placeholder:text-stone-400 w-full min-w-0"
                />
            </div>
            <button onClick={handleToggle} className="shrink-0 p-1">
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default SearchInput;