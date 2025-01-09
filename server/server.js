const port = process.env.PORT || 8000
import express from 'express'
import db from './db.js'
const app = express()
// middleware
import cors from 'cors'
app.use(cors())
app.use(express.json())


// routes

// get all todoes

app.get("/todo",async (req, res)=>{
    const email = "sadeqmass@gmail.com";

    try {
        const response = await db.query("SELECT * FROM todos where user_email = $1", [email])
        
        
        res.json(response.rows)
        
    } catch (error) {
        console.log(error)
    }
})




app.listen(port, () => {
    console.log(`Server running on port ${port} at http://localhost:${port}`)

})