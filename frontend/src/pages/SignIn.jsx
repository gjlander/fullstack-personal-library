import { useState } from 'react';
import { signInUser } from '../lib/libraryAPI';
import { useOutletContext, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [value, setValue] = useState('');
    const { setUser } = useOutletContext();
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const currUser = await signInUser(value);
            // console.log(value);
            console.log(currUser);
            setUser(currUser);
            localStorage.setItem('user', JSON.stringify(currUser));
        } catch (error) {
            console.error(error);
        }
        setValue('');
        setTimeout(() => {
            navigate('/profile');
        }, 500);
    };
    return (
        <div className='flex flex-col items-center p-4 gap-6'>
            <h2 className='text-6xl text-center'>Sign In</h2>
            <form
                onSubmit={handleSignIn}
                className='flex flex-col gap-4 border-2 border-primary p-4 rounded-md w-full max-w-[600px]'
            >
                <label className='form-control'>
                    <div className='label'>
                        <span className='label-text'>Email:</span>
                    </div>
                    <input
                        type='email'
                        placeholder='john@doe.com'
                        className='input input-bordered w-full'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </label>
                <button type='submit' className='btn btn-primary'>
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignIn;
