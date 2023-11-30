import express from 'express';
import { PORT, uri } from './config.js';
import mongoose from 'mongoose';
import { Book } from './Model/bookModel.js';


const app = express();

app.use(express.json());


mongoose
  .connect(uri)
  .then(() => {
    console.log('App connected  Bro');
  })
  .catch((error) => {
    console.log(`Bro You Got an error on ${error}`);
  });

  

  
  app.post('/books', async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.genre || !req.body.publishYear || !req.body.ISBN) {
        return res.status(400).send({
          message: 'Send all required fields: title, author,genre, publishYear,ISBN',
        });
      }
  
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publishYear: req.body.publishYear,
        ISBN: req.body.ISBN,
      };
  
      const book = await Book.create(newBook);
  
      return res.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  
  

  app.get('/books', async (req, res) => {
    try {
      const books = await Book.find({});
  
      return res.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  

 
app.get('/books/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const book = await Book.findById(id);
  
      return res.status(200).json(book);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
 
  app.put('/books/:id', async (req, res) => {
    try {
      if (
        !req.body.title ||
        !req.body.author ||
         !req.body.genre ||
          !req.body.publishYear || 
          !req.body.ISBN
        
      ) {
        return res.status(400).send({
          message: 'Send all required fields: title, author,genre, publishYear,ISBN',
        });
      }
  
      const { id } = req.params;
  
      const result = await Book.findByIdAndUpdate(id, req.body);
  
      if (!result) {
        return res.status(404).json({ message: ' 404 Not Found' });
      }
  
      return res.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });


  app.delete('/books/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await Book.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ message: ' 404 Not Found' });
      }
  
      return res.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });



app.listen(PORT, () => {
  console.log(`Lets Go, we are listening on ${PORT}`);
});
