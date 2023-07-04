
export default function PaypleClient() {

    const onSubmit = () => {
        let obj = new Object();

        // from server generated
		obj.Authorization = "eyJhbGciOiJzaGEyNTYiLCJ0eXBlIjoiSldUIiwia2V5IjoiYm1WQ1IwSjViMnhLYml0RmQxaDFSM2hLY0dVMlZFMVZTR2gxWlRKV1pGRm1RVVF3VlRKSE56RlZTM2cxUXpsdVlVTXpUa2NyWTJsS2QwRkdiSEowWVEifS57Imdyb3VwX2lkIjoiZGVtb2dyb3VwIiwic2VydmljZV9pZCI6ImRlbW8iLCJzZXJ2aWNlX2tleSI6ImFiY2QxMjM0NTY3ODkwIiwiY29uRGF0ZSI6MTY4ODQ1MjM3Nn0uMzVkMjFmZDA1ZGZkYzc3MTI2NGM1MGY1ZWZiNTFlNTYwYWRkYmFlNmI5MjY0ZDliYmU3Y2RmMDU5MTkyNTg4Yw";
        // test id
		obj.service_id = "demo";
        // test service oid
        obj.service_oid = "test120220608512351";
        obj.comments = "Test Product";
        obj.totalAmount = "0.10";
        obj.currency = "USD";
        obj.firstName = "Junu";
        obj.lastName = "Park";
		obj.email = "junu.park@pixo.co";
        // redirect url
		obj.resultUrl = "http://test.shop.com";
		obj.isDirect = "";
        window.paypleGpayPaymentRequest(obj);
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <button onClick={onSubmit} style={{ width: '100px', height: '100px', border: 'none' }}>결제 진행</button>
            </div>
        </div>
    );
}