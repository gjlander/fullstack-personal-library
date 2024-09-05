const BookCard = ({ title, author, status, _id }) => {
    const handleClick = async () => {
        try {
            console.log(_id);
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
