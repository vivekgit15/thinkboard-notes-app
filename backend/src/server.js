import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
import cors from 'cors'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();


const app = express()
const PORT = process.env.PORT || 3000



//middleware
app.use(cors({
    origin:"http://localhost:5173"
}
));
app.use(express.json());  // this middleware will parse json bodies: req.bodies

app.use(rateLimiter);


// Our simple custom middleware
app.use((req,res,next) =>{
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
    next();
})


// What is Endpoint ? 
// An endpoint is a combination of URL + HTTP method that lets the client interact with a specific resource

app.use('/api/notes' , notesRoutes);

connectDB().then(()=>{
    app.listen(PORT , () =>{
    console.log("Server is running on PORT:",PORT);
    
});
});


