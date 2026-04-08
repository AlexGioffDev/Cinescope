import { useEffect, useRef, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { ScrollContext } from '../context/ScrollContext'
import { useScrolled } from '../hooks/useScrolled'
import Header from './Header/Header'

const Layout = () => {
    const [query, setQuery] = useState('')
    // const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const previousPage = useRef(location.pathname)

    const { scrolled } = useScrolled(10);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
        if (value.trim()) {
            navigate(`/search?q=${value}`)
        } else {
            navigate(previousPage.current)
            setQuery('')
        }
    }

    useEffect(() => {
        if (location.pathname !== '/search') {
            previousPage.current = location.pathname
        }
    }, [location.pathname])

    return (
        <ScrollContext.Provider value={scrolled}>
            <div className='w-full min-h-screen pb-20 overflow-x-hidden'>
                <Header />
                <main className="w-full ">
                    <Outlet />
                </main>
            </div>
        </ScrollContext.Provider>
    )
}

export default Layout
