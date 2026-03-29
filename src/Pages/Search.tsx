import { useSearchParams } from "react-router-dom"
import { useSearch } from "../hooks/useSearch";

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') ?? '';
    const { data, isLoading, isError } = useSearch(query);

    if (isLoading) return <p>Is Loading</p>
    if (isError) return <p>Is Error</p>
    if (!data) return <p>No Data</p>

    return (
        <>
            <div>
                <p>Result for {query}</p>
                {data.length}
            </div>
        </>
    )
}

export default Search