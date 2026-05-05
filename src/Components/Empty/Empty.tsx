import { useNavigate } from "react-router-dom"

const Empty = () => {
    const navigate = useNavigate()

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-center px-4">
                <p className="text-stone-600 font-black text-6xl">∅</p>
                <h2 className="text-white font-black text-2xl uppercase tracking-tight">No Data</h2>
                <p className="text-stone-500 text-sm">There's nothing here to show.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-2 bg-stone-800 text-stone-300 border border-white/20 rounded-lg px-4 py-2 text-sm hover:text-white transition-colors"
                >
                    Go Back
                </button>
            </div>
        </div>
    )
}

export default Empty