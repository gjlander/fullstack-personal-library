import { useOutletContext } from 'react-router-dom';
import { addToReadingList } from '../lib/libraryAPI';

const BookCard = ({ title, author, status, _id }) => {
    const { user, setUser } = useOutletContext();
    const handleClick = async () => {
        try {
            const updatedUser = await addToReadingList(user._id, _id);
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className='card bg-primary text-primary-content w-96'>
            <div className='card-body'>
                <h2 className='card-title'>{title}</h2>
                <p>{author}</p>
                <div className='card-actions justify-end'>
                    {status ? (
                        <button className='btn btn-outline text-black'>
                            {status}
                        </button>
                    ) : (
                        <button onClick={handleClick} className='btn'>
                            Add to reading list
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookCard;
