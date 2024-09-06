import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();
    const handleSignOut = () => {
        setUser(null);
        localStorage.removeItem('user');
        setTimeout(() => navigate('/'), 500);
    };
    return (
        <div className='navbar bg-primary'>
            <div className='navbar-start'>
                <Link to='/' className='btn btn-ghost text-xl'>
                    daisyUI
                </Link>
            </div>

            <div className='navbar-center'>
                {user && (
                    <Link className='btn btn-outline' to='profile'>
                        Go to profile
                    </Link>
                )}
            </div>

            <div className='navbar-end gap-10'>
                {user ? (
                    <>
                        <p>Hello, {user.firstName}</p>
                        <button onClick={handleSignOut} className='btn'>
                            Sign Out
                        </button>
                    </>
                ) : (
                    <Link to='sign-in' className='btn'>
                        Sign In
                    </Link>
                )}
            </div>
        </div>
    );
};
export default Navbar;
