import { client, hostedFields } from 'braintree-web';
import { useEffect, useState } from 'react';


/**
 * Test Card
 * Card number: 4111 1111 1111 1111
 * Expiry: 09/22
 * CVV: 400
 * Postal Code: 40000
 */

const baseURL = 'http://localhost:5174'

export default function BraintreeClient() {
    const [clientToken, setClientToken] = useState(null);
    const [paymentEnabled, setPaymentEnabled] = useState(true);
    const [paymentResult, setPaymentResult] = useState(null);
    const [braintreeInstance, setInstance] = useState(null);

    const getClientToken = async () => {
        const res = await fetch(`${baseURL}/token`) 
        return await res.text();
    }

    useEffect(() => {
        if (clientToken !== null) {
            client.create({
                authorization: clientToken,
            }, (clientErr, clientInstance) => {
                if (clientErr) {
                    console.error(clientErr);
                    return;
                }
    
                hostedFields.create({
                    client: clientInstance,
                    styles: { // custom style
                        'input': {
                            'font-size': '14px'
                        },
                        'input.invalid': {
                            color: 'red'
                        },
                        'input.valid': {
                            color: 'green'
                        }
                    },
                    fields: { // field attribute
                        number: {
                            container: '#card-number',
                            placeholder: '4111 1111 1111 1111'
                        },
                        cvv: {
                            container: '#cvv',
                            placeholder: '123',
                        },
                        expirationDate: {
                            container: '#expiration-date',
                            placeholder: '10/2022'
                        }
                    },
                }, (hostedFieldErr, instance) => {
                    if (hostedFieldErr) {
                        console.error(hostedFieldErr);
                        return;
                    }
                    setInstance(instance);
                })
            })
        } else {
            getClientToken().then((token) => setClientToken(token))
        }
    }, [clientToken]);

    const checkout = async (nonce) => {
        const response = await fetch('/checkout', {
            method: 'POST',
            body: JSON.stringify({ paymentMethodNonce: nonce })
        })
    }

    const onPaymentSumbit = async (e) => {
        e.preventDefault();
        braintreeInstance.tokenize((tokenizeErr, payload) => {
            if (tokenizeErr) {
                console.error(tokenizeErr);
                return;
            }

            console.log(`payment_nonce: ${payload.nonce}`);
            checkout(payload.nonce).then((r) => {
                braintreeInstance.teardown((teardownErr) => {
                    if (teardownErr) {
                        console.error(`error: ${teardownErr}`);
                    } else {
                        console.info('success');
                    }
                });
            }).catch(() => {

            });
        })
    }

    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
            <h3>BrainTree</h3>
            <form>
                <label htmlFor="card-number">Card Number</label>
                <div id="card-number"></div>

                <label htmlFor="cvv">CVV</label>
                <div id="cvv"></div>

                <label htmlFor="expiration-date">Expiration Date</label>
                <div id="expiration-date"></div>
                <div id="checkout-message"></div>

                <input id="payment-button" type="submit" value="Pay" onClick={onPaymentSumbit} />
            </form>

            <h3>Result Here</h3>
            <div>{paymentResult ? paymentResult : ''}</div>
        </div>
    )
}