import expres from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import router from "../src/routes/proyecto.js"
import cors from "cors"

//App root
const app = expres();

//Connection database
mongoose.connect('mongodb://127.0.0.1:27017/proyecto')
    .then(()=>{
        console.log('Conectado a la base de datos')
    })

//Config
app.set('PORT', 3000)

//Middleware
app.use(morgan('dev'))
app.use(expres.json())
app.use(cors({origin: ['http://localhost:3001']}))

//Routes
app.use('/api/', router)

//On server
app.listen(app.get('PORT'), ()=>{
    console.log('Server port ' + app.get('PORT'))
})