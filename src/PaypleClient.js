import { useEffect, useState } from "react";

export default function PaypleClient() {
    const [token, setToken] = useState('');
    const [myWorkIdText, setMyWorkIdTedxt] = useState('');

    const fetchPaymentToken = async () => {
        const token = await fetch('https://api.dev.pixohq.com/LOGO_SHOP/payments/token', {
            headers: {
                'X-Api-Key': 'uvOzh1XYfqdNep8II11P6j5cxvvWZh5jrGhgYne0',
            }
        });
        const r = await token.json();
        return r;
    }

    useEffect(() => {
        fetchPaymentToken().then((r) => {
           setToken(r.token); 
        });
    }, []);

    const onOrderSubmit = () => {
        if (myWorkIdText === '') {
            return;
        }
        let obj = new Object();

        // from server generated
		obj.Authorization = token;
        // test id
		obj.service_id = "demo";
        // test service oid
        obj.comments = "Test Product";
        obj.totalAmount = "0.10";
        obj.currency = "USD";
        obj.firstName = "Junu";
        obj.lastName = "Park";
		obj.email = "junu.park@pixo.co";
        // redirect url
		obj.resultUrl = "https://api.dev.pixohq.com/LOGO_SHOP/payments/orders";
		obj.isDirect = "Y";
        // obj.serviceDefine = '12341';
        obj.serviceDefine = btoa(JSON.stringify(
        {
            myWorkId: myWorkIdText,
            userId: "7d81c708-7011-4ac8-8489-e378e64f9a5e",
            failedRedirectUrl: 'http://localhost:5174/payple'
        }));
        window.paypleGpayPaymentRequest(obj);
    }

    const onSubscriptionSubmit = () => {
        let obj = new Object();

        // from server generated
		obj.Authorization = token;
        // test id
		obj.service_id = "demo";
        // test service oid
        obj.comments = "Test Product";
        obj.totalAmount = "0.10";
        obj.currency = "USD";
        obj.firstName = "Junu";
        obj.lastName = "Park";
		obj.email = "junu.park@pixo.co";
        // redirect url
		obj.resultUrl = "https://api.dev.pixohq.com/LOGO_SHOP/payments/subscriptions";
		obj.isDirect = "Y";
        // obj.serviceDefine = '12341';
        obj.serviceDefine = btoa(JSON.stringify({
            planId: "b7xm", 
            userId: "7d81c708-7011-4ac8-8489-e378e64f9a5e",
            failedRedirectUrl: 'http://localhost:5174/payple'
        }));
        window.paypleGpayPaymentRequest(obj);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ display: 'flex', margin: '10px' }}>
                <input type="text"placeholder="MyWorkId" style={{ width: '300px', height: '44px', fontSize: '22px' }} value={myWorkIdText} onChange={(e) => setMyWorkIdTedxt(e.target.value)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <button onClick={onOrderSubmit} style={{ width: '100px', height: '100px', border: 'none' }}>단건 결제 진행</button>
                <button onClick={onSubscriptionSubmit} style={{ width: '100px', height: '100px', border: 'none' }}>구독 결제 진행</button>
            </div>
        </div>
    );
}