import { app } from "./controller/app";
import { cardRouter } from "./routes/cardRouter";
import { paymentRouter } from "./routes/paymentRouter";
import { userRouter } from "./routes/userRouter";

app.use('/user', userRouter)
app.use('/card', cardRouter)
app.use('/payment', paymentRouter)