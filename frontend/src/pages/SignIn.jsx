import { useState } from 'react';

const SignIn = () => {
    const [value, setValue] = useState('');
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            console.log(value);
        } catch (error) {
            console.error(error);
        }
        setValue('');
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
                        type='text'
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
