const express =require('express')
const app =express()
require('dotenv').config()
const cors=require('cors');
const PORT =process.env.PORT||3000


const dbconnect = require('./Config/dbConfigrations')
dbconnect.dbconnect();

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST'],
  credentials: true
}))

const userRoutes=require('./Route/UserRoute')
app.use('/',userRoutes)
const adminRoute=require('./Route/AdminRoute')
app.use('/admin',adminRoute)



app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });

