const { Router } = require("express");
const router = Router();
const {unlink} = require('fs-extra');
const Book = require("../models/Book");
const path = require('path');

//CONSULTAR
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

//CREAR
router.post("/", async (req, res) => {
  const { title, author, isbn, price, status_life, status_book } = req.body;
  const imagePath = '/uploads/'+ req.file.filename;//recibe con multer
  console.log('aqui está la imagen'+ imagePath);
  const newBook = new Book({
    title,
    author,
    isbn,
    price,
    status_life,
    status_book,
    imagePath
  });
  await newBook.save();
  res.json({ message: "Book Saved" });
  console.error('se ha guardado el libro '+newBook+'con la imagen '+newBook.imagePath)
  
});

//ELIMINAR
router.delete('/:id',async(req,res)=>{
 const book = await Book.findByIdAndDelete(req.params.id);
 unlink(path.resolve('./backend/public/'+book.imagePath));//ocupamos de fs, no soporta promesas
 console.error('se ha eliminado un el libro '+book+' con la imagen '+ book.imagePath)
 res.json({message:'Book Deleted'});
})
 try {
   
 } catch (error) {
   
 } 
 
;

module.exports = router;
