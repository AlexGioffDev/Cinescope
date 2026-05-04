import { Outlet } from 'react-router-dom'
import { ScrollContext } from '../context/ScrollContext'
import { useScrolled } from '../hooks/useScrolled'
import Header from './Header/Header'

const Layout = () => {
    const { scrolled } = useScrolled(10);

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
