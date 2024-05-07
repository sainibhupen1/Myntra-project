

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import AppContext from "./utils/context";



import { Auth0Provider } from '@auth0/auth0-react';

function App() {
    return (
        <Auth0Provider
            domain="dev-3ozcg3pen146e3u0.us.auth0.com"
            clientId="SFrU681LwzcMu56bkUMSvlBzK4vA6KNu"
            authorizationParams={{
                redirect_uri: window.location.origin
            }}
        >
            <BrowserRouter>
                <AppContext>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/category/:id" element={<Category />} />
                        <Route path="/product/:id" element={<SingleProduct />} />
                    </Routes>
                    <Newsletter />
                    <Footer />
                </AppContext>
            </BrowserRouter>
        </Auth0Provider>
    );
}

export default App;
