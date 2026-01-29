import express from 'express'
import { body,validationResult } from 'express-validator';
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {User} from './DB/user.js'
import cors from 'cors'

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors({
  origin: 'http://localhost:5173'
}))


mongoose.connect(process.env.atlas_url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err.message));

app.get('/test',(req,res)=>{
    res.send('test')
})

app.post('/signup',[
    body('username')
    .notEmpty().withMessage('username is required')
    .isLength({min: 3}).withMessage('username must be atleast 3 characters'),


    body('email')
    .notEmpty().withMessage('enter a valid email address')
    .normalizeEmail(),

    body('password')
    .notEmpty().withMessage('password is required')
    .isLength({min: 6}).withMessage('password must be atleast 6 characters')
], async(req,res)=>{
    const {username,email,password,} = req.body;

    try{
        const exist = await User.findOne({$or: [{username},{email}]});
        if(exist){
            return res.status(409).json({error: 'username or email already exist'})
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({username,email,password: hashedPassword})
        await newUser.save();

        res.status(201).json({message: 'user created sucessfully'})
    }
    catch(err){
        console.error(err)
        res.status(500).json({error: 'Unable to create. Try again later'})
    }

})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const exist = await User.findOne({ email }); 
    if (!exist) {
      return res.status(401).json({ error: 'User not found, please create an account' });
    }

    const match = await bcrypt.compare(password, exist.password);
    if (!match) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    console.log('logged in')
    res.json({
      message: `Welcome ${exist.username}`,
      user: { id: exist._id, username: exist.username, email: exist.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to login. Try again later.' });
  }
});

app.listen(3000,()=>{
    console.log('running on port 3000')
})