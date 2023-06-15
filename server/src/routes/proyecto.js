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

router.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (req.body.name) {
            user.name = req.body.name;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.password) {
            user.password = req.body.password;
        }
        if (req.body.role) {
            user.role = req.body.role;
        }

        user.save();
        res.send(user);
    } catch {
        res.send('El usuario no existe');
    }
});


router.delete('/notas/:id', async(req,res)=>{
    try {
        const nota = await Nota.deleteOne({_id: req.params.id})
        res.send(nota)
    }catch{
        res.send('La nota no existe')
    }
    
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.deleteOne({ _id: req.params.id });
        res.send(user);
    } catch (error) {
        res.send('El usuario no existe');
    }
});


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
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el nombre del usuario' });
    }
});

router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      // Verificar si el usuario ya está registrado
      const usuarioExistente = await User.findOne({ email });
      if (usuarioExistente) {
        return res.status(400).json({ message: "El usuario ya está registrado" });
      }
  
      // Crear un nuevo usuario
      const nuevoUsuario = new User({
        name,
        email,
        password,
        role,
      });
  
      // Guardar el usuario en la base de datos
      await nuevoUsuario.save();
  
      res.status(201).json({ message: "Registro exitoso" });
    } catch (error) {
      res.status(500).json({ message: "Error al registrar al usuario" });
    }
  });

export default router;