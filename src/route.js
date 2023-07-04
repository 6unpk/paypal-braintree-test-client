import { BrowserRouter, Routes, Route } from "react-router-dom";
import BraintreeClient from "./BraintreeClient";
import PaypleClient from "./PaypleClient";


export default function MainRoute() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/braintree" element={<BraintreeClient />} />
                <Route path="/payple" element={<PaypleClient />} />
            </Routes>            
        </BrowserRouter>
    )
}