import app from './app';

import productRouter from './routes/products';
import userRouter from './routes/users';
import authRouter from './routes/auth';

const port = process.env.PORT || 8080;

app.use('/', productRouter);
app.use('/', userRouter);
app.use('/', authRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));