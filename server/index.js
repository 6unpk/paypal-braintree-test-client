const fs = require('fs');
const path = require('path');
const Fastify = require('fastify');
const braintree = require('braintree');

const envPath = path.resolve(__dirname, '../.env');
const envFile = fs.readFileSync(envPath, 'utf-8');
const envVars = {};

envFile.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  envVars[key] = value;
});

Object.assign(process.env, envVars);


const MERCHANT_ID = process.env.MERCHANT_ID;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const fastify = Fastify({ logger: true })

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: MERCHANT_ID,
    publicKey: PUBLIC_KEY,
    privateKey: PRIVATE_KEY,
})

fastify.get('/token', function (req, reply) {
    gateway.clientToken.generate({}, (err, resposne) => {
        reply.send(resposne.clientToken);
    })
})

fastify.post('/checkout', (req, reply) => {
    const nonceFromTheClient = req.body.payment_mehtod_nonce;
    gateway.transaction.sale({
        amount: '10.00',
        paymentMethodNonce: 'fake-valid-nonce',
        options: {
            submitForSettlement: true
        },
    }, (error, result) => {
        if (result) {
            reply.send(result);
        } else {
            result.status(500).send(error);
        }
    })
});

fastify.listen({ port: 5555 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})