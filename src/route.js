import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import BraintreeClient from "./BraintreeClient";


export default function MainRoute() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/paypal" element={<App />} />
                <Route path="/braintree" element={<BraintreeClient />} />
            </Routes>            
        </BrowserRouter>
    )
}