import LiqPay from 'liq-sdk';
import config from 'config';
import shortid from 'shortid';
const { publicKey, privateKey } = config.liqpayConfig;

const liqpay = new LiqPay(publicKey, privateKey);

export const makeUserPayRequest = () => {
    liqpay.api(
        'request',
        {
            action: 'invoice_bot',
            version: '3',
            email: 'igolovac630@gmail.com',
            amount: '1',
            currency: 'UAH',
            order_id: shortid.generate(),
            phone: '380953189792',
            server_url: 'http://0.0.0.0:5759/user_pay_response',
        },
        (json) => {
            console.log(json);
        }
    );
};
