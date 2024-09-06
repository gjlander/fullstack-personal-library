import axios from 'axios';

const getAllBooks = async () => {
    try {
        const response = await axios.get('http://localhost:8080/books');
        // console.log(response.data.books);
        return response.data.books;
    } catch (error) {
        console.error(error);
    }
};

const signInUser = async (email) => {
    try {
        const response = await axios.post('http://localhost:8080/users/login', {
            email,
        });
        // console.log(response);
        if (response.status !== 200) {
            throw new Error(response.message);
        }
        return response.data[0];
    } catch (error) {
        console.error(error);
    }
};

const addToReadingList = async (userId, bookRefId) => {
    try {
        const response = await axios.post(
            `http://localhost:8080/users/auth/${userId}/books`,
            {
                bookRefId,
            }
        );
        return response.data.user;
    } catch (error) {
        console.error(error);
    }
};

export { getAllBooks, signInUser, addToReadingList };
