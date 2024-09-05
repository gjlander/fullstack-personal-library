import BookCard from '../components/BookCard';

const Profile = () => {
    let user;

    if (!user) {
        return <h2>Sorry, you&apos;re not logged in</h2>;
    }
    return (
        <div className='p-6'>
            <h2 className='text-4xl m-4'>Account info</h2>
            <form className='flex flex-col gap-4 border-2 rounded-md p-4'>
                <label>
                    First Name:
                    <input
                        type='text'
                        placeholder='Type here'
                        className='input input-bordered w-full max-w-xs'
                        value={user.firstName}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type='text'
                        placeholder='Type here'
                        className='input input-bordered w-full max-w-xs'
                        value={user.lastName}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type='text'
                        placeholder='Type here'
                        className='input input-bordered w-full max-w-xs'
                        value={user.email}
                    />
                </label>
            </form>
            <h2 className='text-4xl m-4'>Reading List</h2>
            <div className='flex flex-wrap justify-center gap-4 w-full'>
                {user.readingList.length &&
                    user.readingList.map((book) => (
                        <BookCard
                            key={book._id}
                            {...book.bookRefId}
                            status={book.status}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Profile;
