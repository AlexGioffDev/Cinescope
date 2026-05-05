import { Link } from "react-router-dom"

const NotFound = () => (
    <div className="w-full min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-4">
            <p className="text-amber-300 font-black text-8xl tracking-tighter">404</p>
            <h2 className="text-white font-black text-2xl uppercase tracking-tight">Page Not Found</h2>
            <p className="text-stone-500 text-sm max-w-xs">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/">
                <button className="mt-2 bg-stone-800 text-stone-300 border border-white/20 rounded-lg px-4 py-2 text-sm hover:text-white transition-colors">
                    Back to Home
                </button>
            </Link>
        </div>
    </div>
)

export default NotFound