import * as express from 'express';
import * as cors from 'cors';

const app = express();

// Enable CORS for specific origin
app.use(cors({
  origin: 'https://scoutfortrout-flask.onrender.com/'
}));

// Your other app configurations and routes go here

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
