import { useParams } from "react-router-dom"
import { useTv } from "../hooks/useTv"
import CardSection from "../Components/Cards/CardSection"
import Loading from "../Components/Loading/Loading"
import Error from "../Components/Error/Error"
import Empty from "../Components/Empty/Empty"

const Tv = () => {
    const { id } = useParams()
    const { series, isLoading, isError } = useTv(Number(id))

    if (isLoading) return <Loading />
    if (isError) return <Error />
    if (!series) return <Empty />

    return (
        <div className="w-full h-auto flex flex-col gap-y-4">
            <div className="w-full h-[50dvh] md:h-[70dvh] relative">
                <img src={`https://image.tmdb.org/t/p/original/${series.backdrop_path}`} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-linear-to-t from-stone-800 via-stone-800/50 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col gap-y-8 -mt-16 z-10">
                <div className="flex items-end justify-between gap-6">
                    <div className="space-y-2 min-w-0">
                        <div className="flex items-center gap-x-2">
                            <p className="text-sm text-stone-500 font-light">{new Date(series.first_air_date).getFullYear()}</p>
                            <p className="text-amber-300 text-sm font-semibold">&#9733; {series.vote_average.toFixed(2)}</p>
                        </div>
                        <h1 className="font-black text-2xl md:text-4xl text-white tracking-tight uppercase">{series.name}</h1>
                        <div className="flex gap-2 items-center flex-wrap">
                            {series.production_countries.map(c => (
                                <p className="text-sm text-stone-500 font-light" key={`country-${c.iso_3166_1}${c.name}${series.id}`}>{c.name}</p>
                            ))}
                        </div>
                        <p className="text-sm font-semibold text-stone-500">Created by{" "}
                            {series.created_by.map((c, index, array) => (
                                <span key={c.id}>
                                    <span className="text-stone-50 font-black">{c.name}</span>
                                    {index < array.length - 1 && (
                                        <span className="text-stone-500">{index === array.length - 2 ? " & " : ", "}</span>
                                    )}
                                </span>
                            ))}
                        </p>
                        <div className="flex gap-x-2 items-center overflow-x-auto pb-1 scrollbar-thin">
                            {series.genres.map(g => (
                                <div key={`genre-${series.id}${g.id}${g.name}`} className="px-2 py-0.5 border border-white/30 rounded-lg shrink-0">
                                    <p className="text-stone-500 text-sm whitespace-nowrap">{g.name}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                            {series.in_production && <p className="text-sm text-amber-300 font-black">In Production</p>}
                            <p className="text-sm text-stone-500">Seasons: <span className="text-white font-black">{series.number_of_seasons}</span></p>
                            <p className="text-sm text-stone-500">Episodes: <span className="text-white font-black">{series.number_of_episodes}</span></p>
                        </div>
                    </div>
                    <img src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`} alt="" className="w-40 md:w-64 shrink-0 aspect-2/3 object-cover hidden sm:block rounded-lg border border-white/30" />
                </div>

                <section className="space-y-2">
                    <h3 className="text-stone-500 font-light uppercase tracking-wide text-sm">Overview</h3>
                    <p className="text-sm text-stone-300 leading-relaxed tracking-normal text-pretty">{series.overview}</p>
                </section>

                <section className="space-y-3">
                    <h3 className="text-stone-500 font-light uppercase tracking-wide text-sm">Cast</h3>
                    <div className="w-full overflow-x-auto flex items-start gap-x-4 scrollbar-thin pb-2">
                        {series.credits.cast
                            .filter(c => c.profile_path !== undefined && c.profile_path !== null && !c.character.includes("Rejected"))
                            .map(c => (
                                <div className="shrink-0 w-20 md:w-24 flex flex-col gap-y-1" key={`actor-${c.name}${c.character}${c.id}`}>
                                    <div className="w-20 h-20 md:w-24 md:h-24 shrink-0">
                                        <img src={`https://image.tmdb.org/t/p/w500/${c.profile_path}`} alt={`actor ${c.name}`} className="rounded-lg border border-white/30 object-cover w-full h-full" />
                                    </div>
                                    <p className="text-xs text-stone-500 tracking-tighter text-center">{c.name}</p>
                                    <p className="text-xs font-black text-white tracking-tighter text-center">{c.character}</p>
                                </div>
                            ))}
                    </div>
                </section>

                <section className="space-y-3">
                    <h3 className="text-stone-500 font-light uppercase tracking-wide text-sm">Trailers</h3>
                    <div className="w-full overflow-x-auto flex items-start gap-x-4 scrollbar-thin snap-x snap-mandatory pb-2">
                        {series.trailer?.results
                            .filter(v => v.type.toLowerCase() === "trailer" && v.site === "YouTube")
                            .map(c => (
                                <div key={`trailer-${series.id}${c.id}`} className="shrink-0 snap-center">
                                    <iframe
                                        className="w-[85vw] md:w-150 aspect-video rounded-lg shadow-md"
                                        src={`https://www.youtube.com/embed/${c.key}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    />
                                </div>
                            ))}
                    </div>
                </section>

                <section className="space-y-3">
                    <h3 className="text-stone-500 font-light uppercase tracking-wide text-sm">Recommendations</h3>
                    <div className="w-full overflow-x-auto flex items-start gap-x-4 scrollbar-thin pb-2">
                        {series.recommendations.map(c => (
                            <CardSection key={`tv-recommendations-${c.id}`} show={{ ...c, media_type: c.media_type, title: c.name, year: c.first_air_date }} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Tv