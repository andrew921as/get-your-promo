import express from 'express';
import corse from 'cors';

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(corse());

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});