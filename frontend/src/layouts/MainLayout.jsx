import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

const Layout = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar user={user} setUser={setUser} />
            <div className='grow'>
                <Outlet context={{ user, setUser }} />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
