import express from 'express';
import dotenv from 'dotenv'
import cors from "cors" 
import { mailer } from './helpers/mailler.js';


dotenv.config()
const app = express();
const port = process.env.PORT || 3000 

// configure middlewares
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static("public"))
app.use(cors())
 

app.get('/', (req, res) => { 
  res.send('Hello World!');
});  

app.post('/send-email', async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    // console.log(email, subject, message )
    if (!email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // send email
    await mailer({ email, subject, message });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});