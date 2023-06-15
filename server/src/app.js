import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import router from "../src/routes/proyecto.js";
import cors from "cors";

// App root
const app = express();

// Connection database
mongoose
  .connect('mongodb+srv://josebecerra:josebecerra@cluster0.yw4vvt1.mongodb.net/Proyecto')
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch((error) => {
    console.log('Error al conectar a la base de datos:', error);
  });

// Config
app.set('PORT', 5000);

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/', router);

// On server
app.listen(app.get('PORT'), () => {
  console.log('Server port ' + app.get('PORT'));
});
