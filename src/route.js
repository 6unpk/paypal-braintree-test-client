import { BrowserRouter, Routes, Route } from "react-router-dom";
import BraintreeClient from "./BraintreeClient";


export default function MainRoute() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/braintree" element={<BraintreeClient />} />
            </Routes>            
        </BrowserRouter>
    )
}