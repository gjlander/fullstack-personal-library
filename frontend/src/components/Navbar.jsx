import { Link } from 'react-router-dom';

const Navbar = () => {
    let user;
    const handleSignOut = () => {
        console.log('You tried to sign out');
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
