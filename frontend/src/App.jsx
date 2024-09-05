// import needed components and functions from react-router-dom
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

//import components
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='sign-in' element={<SignIn />} />
            <Route path='profile' element={<Profile />} />
        </Route>
    )
);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
