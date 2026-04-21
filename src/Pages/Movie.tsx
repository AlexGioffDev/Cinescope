import { useParams } from "react-router-dom"
import { useMovie } from "../hooks/useMovie";
import { formatCurrency } from "../lib/util";
import CardSection from "../Components/Cards/CardSection";

const Movie = () => {
    const { id } = useParams();
    const { movie, isLoading, isError } = useMovie(Number(id));

    if (isLoading) return <p>IsLoading</p>
    if (isError) return <p>IsError</p>
    if (!movie) return <p>No Data!!!</p>

    return (
        <div className="w-full h-auto flex flex-col gap-y-4">
            <div className="w-full h-120 md:h-200 relative">
                <img src={`https:image.tmdb.org/t/p/original/${movie.backdrop_path}`} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-linear-to-t from-stone-800 via-stone-800/50 to-transparent" />
            </div>
            <div className="p-4 flex items-center justify-between max-w-7xl mx-auto w-full -mt-10 z-10">
                <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-x-2">
                        <p className="text-sm text-stone-500 font-light">{new Date(movie.release_date).getFullYear()}</p>
                        <p className="text-amber-300 text-sm font-semibold">&#9733; {movie.vote_average.toFixed(2)}</p>

                    </div>
                    <h1 className="font-black text-xl text-white tracking-tight uppercase">{movie.title}</h1>
                    <div className="flex gap-2 items-center">
                        {movie.production_countries.map(c => (
                            <p className="text-sm text-stone-500 font-light" key={`country-${c.iso_3166_1}${c.name}${movie.id}`}>{c.name}</p>
                        ))}
                    </div>
                    <p className="text-sm font-semibold text-stone-500">Directed by{" "}
                        {movie.credits.crew
                            .filter(c => c.job === "Director")
                            .map((c, index, array) => (
                                <span key={c.id}>
                                    <span className="text-stone-50 font-black">{c.name}</span>
                                    {index < array.length - 1 && (
                                        <span className="text-stone-500">
                                            {index === array.length - 2 ? " & " : ", "}
                                        </span>
                                    )}
                                </span>
                            ))}
                    </p>
                    <div className="flex gap-x-2 items-center overflow-x-auto pb-2 scrollbar-thin ">
                        {movie.genres.map(g => (
                            <div key={`genre-${movie.id}${g.id}${g.name}`} className="px-2 py-0.5 border border-white/30 rounded-lg shrink-0">
                                <p className="text-stone-500 text-sm whitespace-nowrap">{g.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <p className="text-sm text-stone-500">Budget: <span className="text-white font-black">{movie.budget > 0 ? formatCurrency(movie.budget) : "No Data"}</span></p>
                        <p className="text-sm text-stone-500">Revenue: <span className="text-white font-black">{movie.revenue > 0 ? formatCurrency(movie.revenue) : "No Data"}</span></p>
                    </div>
                    <p className="text-sm text-stone-500">Duration <span className="text-white font-black">{Math.floor(movie.runtime / 60)}H {movie.runtime % 60 > 0 && (movie.runtime % 60 + " m")}</span></p>

                </div>
                <img src={`https:image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" className="w-80 h-120 object-cover hidden md:block rounded-lg border border-white/30" />
            </div>
            <div className="space-y-2 max-w-7xl mx-auto w-full p-4">
                <section className="space-y-2">
                    <h3 className="text-stone-500 font-light">Overview</h3>
                    <p className="text-sm text-stone-300 leading-relaxed tracking-normal text-pretty">{movie.overview}</p>
                </section>
                <section className="space-y-2">
                    <h3 className="text-stone-500 font-light">Cast</h3>
                    <div className="w-full overflow-x-auto flex items-start gap-x-4 scrollbar-thin">
                        {movie.credits.cast
                            .filter(c => c.profile_path !== undefined && c.profile_path !== null && !c.character.includes("Rejected"))
                            .map(c => (
                                <div className="shrink-0 w-24 flex flex-col gap-y-1" key={`actor-${c.name}${c.character}${c.id}`}>
                                    <div className="w-24 h-24 shrink-0">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${c.profile_path}`}
                                            alt={`actor ${c.name}`}
                                            className="rounded-lg border border-white/30 object-cover w-full h-full"
                                        />
                                    </div>
                                    <p className="text-xs text-stone-500 tracking-tighter text-center">{c.name}</p>
                                    <p className="text-xs font-black text-white tracking-tighter text-center">{c.character}</p>
                                </div>
                            ))}
                    </div>
                </section>
                <section className="space-y-2">
                    <h3 className="text-stone-500 font-light">Trailers</h3>
                    {/* Added snap-x for a better mobile swiping feel */}
                    <div className="w-full overflow-x-auto flex items-start gap-x-4 scrollbar-thin snap-x snap-mandatory">
                        {movie.trailer?.results
                            .filter(v => v.type.toLowerCase() === "trailer" && v.site === "YouTube")
                            .map(c => (
                                <div key={`trailer-${movie.id}${c.id}`} className="shrink-0 snap-center">
                                    <iframe
                                        className="w-[85vw] md:w-150 aspect-video rounded-lg shadow-md"
                                        src={`https://www.youtube.com/embed/${c.key}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen>
                                    </iframe>
                                </div>
                            ))}
                    </div>
                </section>
                <section className="space-y-2">
                    <h3 className="text-stone-500 font-light">Recommendations</h3>
                    <div className="w-full overflow-x-auto flex items-start gap-x-4 scrollbar-thin">
                        {movie.recommendations
                            .map(c => (
                                <CardSection key={`movie-recommendations-${c.id}`} show={{ ...c, media_type: c.media_type, title: c.title, year: c.release_date }} />
                            ))}
                    </div>
                </section>
            </div>
        </div >
    )
}

export default Movie