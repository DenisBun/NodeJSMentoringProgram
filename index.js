import app from './app';
import productRouter from './routes/products';
import userRouter from './routes/users';
import authRouter from './routes/auth';
import citiesRouter from './routes/cities';


const port = 5050;

app.use('/', productRouter);
app.use('/', userRouter);
app.use('/', authRouter);
app.use('/', citiesRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));