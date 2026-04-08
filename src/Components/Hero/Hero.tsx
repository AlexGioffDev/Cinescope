import { Link } from "react-router-dom"
import { movieGenres, tvGenres } from "../../lib/genres"
import type { HeroItem } from "../../types/tmdb"

type HeroProps = {
    show: HeroItem | null
}

const Hero = ({ show }: HeroProps) => {
    const path = show?.media_type === "tv" ? `/series/${show.id}` : `/movies/${show?.id}`;

    return (
        <div
            className="w-full h-[80dvh] relative"
        >
            <picture>
                <source media="(max-width: 768px)" srcSet={`https://image.tmdb.org/t/p/w500${show?.poster_path}`} />
                <source media="(min-width: 769px)" srcSet={`https://image.tmdb.org/t/p/original${show?.backdrop_path}`} />
                <img className="w-full h-full object-cover object-center" src={`https://image.tmdb.org/t/p/original/${show?.backdrop_path}`} alt="" />
            </picture>

            <div className="absolute inset-0 bg-linear-to-t from-stone-800 via-stone-800/30 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-stone-800/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-linear-to-b from-stone-800/20 via-40% via-transparent to-transparent" />

            {/* Info */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 gap-y-1">
                <div className="flex items-center gap-1">
                    {show?.media_type === "movie" && show.genres.slice(0, 4).map(g => (
                        <p key={`hero-show-${show.title}-${g}`} className="text-stone-300 font-light text-xs tracking-tight">{movieGenres[g]}</p>
                    ))}
                    {show?.media_type === "tv" && show.genres.slice(0, 4).map(g => (
                        <p key={`hero-show-${show.title}-${g}`} className="text-stone-300 font-light text-xs tracking-tight">{tvGenres[g]}</p>
                    ))}
                </div>
                <p className="text-stone-50 uppercase font-bold text-3xl tracking-tight leading-tight">{show?.title}</p>
                <Link to={path}>
                    <button className="bg-stone-800 text-white py-0.5 px-4 rounded-lg border border-white/30">
                        See more
                    </button>
                </Link>

            </div>

        </div>
    )
}

export default Hero