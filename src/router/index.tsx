import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Layout from "../Components/Layout";
import Movies from "../Pages/Movies";
import Series from "../Pages/Series";
import Movie from "../Pages/Movie";
import Tv from "../Pages/Tv";
import Search from "../Pages/Search";
import Watchlist from "../Pages/Watchlist";
import NotFound from "../Components/NotFound/NotFound";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: "/movies",
                element: <Movies />
            },
            {
                path: "/series",
                element: <Series />
            },
            {
                path: '/search',
                element: <Search />
            },
            {
                path: '/watchlist',
                element: <Watchlist />
            },
            {
                path: "/movies/:id",
                element: <Movie />
            },
            {
                path: "/series/:id",
                element: <Tv />
            },
            { path: "*", element: <NotFound /> },

        ]
    }
])