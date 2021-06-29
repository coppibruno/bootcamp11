import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
// import Routes from './routes';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
    return (
        <>
        <SignIn/>
        <GlobalStyle/>
        </>
    );
};

export default App;

