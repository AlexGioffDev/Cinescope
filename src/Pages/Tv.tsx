import { useParams } from "react-router-dom"
import { useTv } from "../hooks/useTv"

const Tv = () => {
    const { id } = useParams()
    const { series, isLoading, isError } = useTv(Number(id))

    if (isLoading) return <p>Is Loading</p>
    if (isError) return <p>Is Error</p>
    if (!series) return <p>No Data</p>

    return (
        <div className="w-full h-auto">
            {series.name}
        </div>
    )
}

export default Tv