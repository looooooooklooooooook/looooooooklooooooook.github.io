import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import LinePay  from 'line-pay';

const PORT_ProxyServer = 8080;
const app = express();
import cors from 'cors';
// const line_pay  = require("line-pay");

async function initProxyServer() {
    const pay = new LinePay({
        channelId: process.env.LINE_PAY_CHANNEL_ID,
        channelSecret: process.env.LINE_PAY_CHANNEL_SECRET,
        isSandbox: true
    });
    app.use(cors());
    app.use(express.static('../public'))

    app.use(express.urlencoded({extended: true}));

    app.use("/pay", pay.middleware({
        productName: "LookLook.Today.VIP",
        amount: 199,
        currency: "TWD",
        orderId: uuidv4()
    }), (req, res, next) => {
        // Now payment should have been completed.
        res.send("[O]OK, Payment has been completed.");
    });
    app.get('/xxx', (req, res) => {
        res.send('hello world!')
    })
    app.get('/api/greeting', (req, res) => {
        const locale = req.query.locale || 'en-US';
        console.log(locale);
        let msg="";
        switch (locale){
            case "zh-TW":
                msg="你好嗎";
                break;
            default:
                msg="Hello";
                break;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send({greeting: msg });
    });
    app.listen(PORT_ProxyServer, () => {
        console.log(`server is listening to ${PORT_ProxyServer}...`);
    });

}

initProxyServer().then(r => console.log(`[O][DECADE-initProxyServer] `));
//https://jwt.io/