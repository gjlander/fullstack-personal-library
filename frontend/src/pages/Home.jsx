import { useEffect, useState } from 'react';
import { getAllBooks } from '../lib/libraryAPI';
import BookCard from '../components/BookCard';

const Home = () => {
    const [allBooks, setAllBooks] = useState([]);
    useEffect(() => {
        getAllBooks()
            .then((books) => setAllBooks(books))
            .catch((err) => console.error(err));
    }, []);
    return (
        <div>
            <h1 className='text-8xl text-center mb-6'>
                Welcome to the Library!
            </h1>
            <div className='flex flex-wrap justify-center gap-4 w-full'>
                {allBooks.length &&
                    allBooks.map((book) => (
                        <BookCard key={book._id} {...book} />
                    ))}
            </div>
        </div>
    );
};

export default Home;
