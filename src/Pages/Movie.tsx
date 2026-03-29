import { useParams } from "react-router-dom"
import { useMovie } from "../hooks/useMovie";

const Movie = () => {
    const { id } = useParams();
    const { movie, isLoading, isError } = useMovie(Number(id));

    if (isLoading) return <p>IsLoading</p>
    if (isError) return <p>IsError</p>
    if (!movie) return <p>No Data!!!</p>

    return (
        <div className="w-full h-auto">
            {movie.title}
        </div>

    )
}

export default Movie