import express from 'express';
import cors from 'cors';
import path from 'path';
import registerRouter from './router/registerRouter.js';
import uploadRouter from './router/uploadRouter.js';
import mainRouter from './router/mainRouter.js';
import memberRouter from './router/memberRouter.js';
import cartRouter from './router/cartRouter.js';
import orderRouter from './router/orderRouter.js';
import paymentsRouter from './router/paymentsRouter.js';
import reviewRouter from './router/reviewRouter.js';
import inquireRouter from './router/inquireRouter.js';

const server = express();
const port = 9000;
//common
server.use(express.json());
server.use(express.urlencoded());
server.use(cors());
server.use('/upload_files', express.static(path.join("upload_files")));

// middle ware

server.get('/test', (req, res) => {
    res.send('<h1>화면에 잘 보이는지 테스트 해보세요.</h1>')
});

// 상품등록
server.use('/product', registerRouter);
server.use('/upload', uploadRouter);


//멤버
server.use('/member', memberRouter);

// 메인페이지 -> 카테고리 상품리스트
server.use('/main', mainRouter);

// 카트 
server.use('/cart', cartRouter);

// 결제
server.use('/sandbox-dev/api/v1/payments', paymentsRouter);

// 주문확인
server.use('/order', orderRouter);

// 리뷰
server.use('/review', reviewRouter);

// 상품문의
server.use('/inquire', inquireRouter)

server.listen(port, () => {
    console.log('start ----->>', port);
});  