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

router.get('/notas/user', async (req, res) => {
    const { ownerId } = req.query;
    const notas = await Nota.find({ owner: ownerId });
    res.send(notas);
  });
  


  router.post('/notas', async (req, res) => {
    const { title, content, ownerId } = req.body;

    if (!title || !content || !ownerId) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const nota = new Nota({
            title,
            content,
            ownerId,
        });

        await nota.save();
        res.status(201).json(nota);
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar la nota' });
    }
});


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
        }if(req.body.owner){
            nota.owner = req.body.owner
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
  
      res.json({ message: 'Inicio de sesión exitoso', role: user.role , name:user.id });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });

router.get('/users', async(req,res)=>{
    const user = await User.find();
    res.send(user)
})

router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ name: user.name });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el nombre del usuario' });
    }
});

export default router;