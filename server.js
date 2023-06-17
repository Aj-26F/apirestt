const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });
const app = express();
const port = process.env.port || 3000;

// middleware pour parser le corps des requettes en Json

app.use(express.json());

// connection a la base donnees 



mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  
.then(() => {
  console.log('Connected to the database');

  
  // Lancer le serveur une fois connecté à la base de données
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})
.catch((err) => {
  console.error('Failed to connect to the database', err);
});

// get utilisé pourrecuperer tous les utilisateurs
app.get('/users', (req, res) => { User.find() 
    then((users) => { res.json(users); }) .catch((err) => { res.status(500).json({ error: 'Internal server error' }); }); });

// post pour ajouter un nouvel utulisateur

app.post('/users', (req, res) => { const { name, email, password } = req.body;
const newUser = new User({ name, email, password }); newUser.save() .then((user) => { res.json(user); }).
catch((err) => { res.status(400).json({ error: 'Bad request' }); }); }); 

// put pour modifier un utilisateur a partir de son ID

app.put('/users/:id', (req, res) => { const { id } = req.params; const { name, email, password } = req.body;
User.findByIdAndUpdate(id, { name, email, password }, { new: true })
.then((user) => { res.json(user); }) .catch((err) => { res.status(400).json({ error: 'Bad request' }); }); });

// delete utilisé pour modifier un utulisareur a partir deson ID

app.delete('/users/:id', (req, res) => { const { id } = req.params; User.findByIdAndDelete(id) .then(() => { res.json({ message: 'User deleted successfully' }); })
.catch((err) => { res.status(400).json({ error: 'Bad request' }); }); });