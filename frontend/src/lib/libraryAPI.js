import axios from 'axios';
const backend = import.meta.env.DEV
    ? import.meta.env.VITE_BACKEND_DEV
    : import.meta.env.VITE_BACKEND_PROD;

const getAllBooks = async () => {
    try {
        const response = await axios.get(`${backend}/books`);
        // console.log(response.data.books);
        return response.data.books;
    } catch (error) {
        console.error(error);
    }
};

const signInUser = async (email) => {
    try {
        const response = await axios.post(`${backend}/users/login`, {
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
            `${backend}/users/auth/${userId}/books`,
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
