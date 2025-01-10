import express from 'express'
import db from './db.js'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
const port = process.env.PORT || 8000

// middleware
const app = express()
app.use(cors())
app.use(express.json())


// routes

// get all todoes

app.get("/todo/:userEmail",async (req, res)=>{
    const {userEmail} = req.params
    console.log(userEmail)
    try {
        const response = await db.query("SELECT * FROM todos where user_email = $1", [userEmail])
          
         console.log(response.rows)
         res.json(response.rows)
        
    } catch (error) {
        console.log(error)
    }
})

app.post("/todo", async (req,res) => {
    const {user_email, title, progress, date} = req.body

    console.log(user_email, title, progress, date)

   try {
    const response = db.query("insert into todos VALUES ($1,$2,$3,$4)",[uuidv4(), user_email, title, progress, date])
    console.log(response)
    res.json(response)
    
   } catch (error) {
    console.error(error)
   }  
})






app.listen(port, () => {
    console.log(`Server running on port ${port} at http://localhost:${port}`)

})