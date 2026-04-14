import { useState, useRef, useEffect } from "react"
import type { ShowCard } from "../../types/tmdb"
import { Link } from "react-router-dom"

type CardSectionProps = {
    show: ShowCard
}

const CardSection = ({ show }: CardSectionProps) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const path = show.media_type === "movie" ? `/movies/${show.id}` : `/series/${show.id}`;

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsActive(false);
            }
        }

        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        }
    }, []);

    return (
        <div ref={ref} onClick={() => setIsActive((pre) => !pre)} className='group shrink-0 border border-white/30 rounded-xl overflow-hidden relative' >
            <img className={`object-cover h-90 w-full group-hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer  ${isActive ? "scale-110" : ''}`} src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt="" />
            <div className={`absolute inset-0 flex flex-col p-4 gap-2 bg-stone-800/90 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:z-10  ${isActive ? "opacity-100 z-10" : "opacity-0 -z-10"}`}>
                <h1 className="text-white font-black text-xl uppercase tracking-tight">{show.title}</h1>
                <p className="text-sm text-stone-400 text-justify line-clamp-5">{show.overview}</p>
                <div className="flex items-center gap-2">
                    <p className="text-stone-400">{new Date(show.year).getFullYear()}</p>
                    <p className="text-amber-300">&#9733; {show.vote_average.toFixed(2)}</p>
                </div>
                <Link className="mt-auto self-end" to={path}>
                    <button className="bg-stone-800 text-white py-0.5 px-4 rounded-lg border border-white/30 ">
                        See More
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default CardSection