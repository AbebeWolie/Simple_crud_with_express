import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import connectionDb from './src/config/db.js';
import userroutes from './src/routes/user.routes.js'
import productroutes from './src/routes/product.routes.js'

dotenv.config();



connectionDb();
const PORT = process.env.PORT
const app = express();



app.use(express.json());
app.use(cors());

app.use('/api/user',userroutes);
app.use('/api/product',productroutes);



app.get('/',(req,res)=>{
    return res.send("Hello World");
})

app.listen(PORT,()=>{
    console.log(`Server is Up it is lisntening on port ${PORT}`)
})

