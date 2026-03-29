import { useEffect, useRef, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

const Layout = () => {
    // const [query, setQuery] = useState('')
    // const [menuOpen, setMenuOpen] = useState(false)
    const [isScrolling, setIsScrolling] = useState(false)
    // const navigate = useNavigate()
    const location = useLocation()
    const previousPage = useRef(location.pathname)

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value
    //     setQuery(value)
    //     if (value.trim()) {
    //         navigate(`/search?q=${value}`)
    //     } else {
    //         navigate(previousPage.current)
    //         setQuery('')
    //     }
    // }

    useEffect(() => {
        if (location.pathname !== '/search') {
            previousPage.current = location.pathname
        }
    }, [location.pathname])

    const mainRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = mainRef.current
        if (!el) return

        const handleScroll = () => {
            setIsScrolling(el.scrollTop > 200)
        }

        el.addEventListener('scroll', handleScroll)

        return () => el.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className='w-full h-full '>
            <header>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
