import { Router } from "express";
import Nota from "../models/proyecto.js"
import User from "../models/user.js";


//Routes
const router = Router();

//Solicitudes de tipo GET
router.get('/notas', async(req,res)=>{
    const notas = await Nota.find();
    res.send(notas)
})


router.post('/notas', async(req,res)=>{
    const nota = new Nota({
        title: req.body.title,
        content: req.body.content
    })
    await nota.save()
    res.send(nota)
})

router.get('/notas/:id', async(req,res)=>{
    const nota = await Nota.findOne({_id: req.params.id})
    res.send(nota)
})

router.patch('/notas/:id', async(req,res)=>{
    try {
        const nota = await Nota.findOne({_id: req.params.id})
        if(req.body.title){
            nota.title = req.body.title
        }
        if(req.body.content){
            nota.content = req.body.content
        }

        nota.save()
        res.send(nota)
    }catch{
        res.send('La nota no existe')
    }
    
})

router.delete('/notas/:id', async(req,res)=>{
    try {
        const nota = await Nota.deleteOne({_id: req.params.id})
        res.send(nota)
    }catch{
        res.send('La nota no existe')
    }
    
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Buscamos al usuario por su correo electrónico
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Credenciales inválidas (No user)' });
      }
  
      // Comparamos la contraseña ingresada con la almacenada en la base de datos
      if (password !== user.password) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
      }
  
      res.json({ message: 'Inicio de sesión exitoso', role: user.role });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });
  router.get('/login', async(req,res)=>{
    const user = await User.find();
    res.send(user)
})

export default router;