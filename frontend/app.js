  import './styles/app.css';
//import BookService from './services/BookService';
import { format } from 'morgan';
import UI from './UI';

  document.addEventListener('DOMContentLoaded',()=>{
    const ui = new UI();
    ui.renderBooks();
  });
  document.getElementById('book-form')
  .addEventListener('submit', e =>{
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const price = document.getElementById('price').value;
    const status_life = document.getElementById('status_life').value;
    const status_book = document.getElementById('status_book').value;
    const image = document.getElementById('image').files;
        console.log(image);
    const formData = new FormData();//formulario virtual de js
    formData.append('image',image[0]);//nombre y su valor
    formData.append('title',title);
    formData.append('author',author);
    formData.append('isbn',isbn);
    formData.append('price',price);
    formData.append('status_life',status_life);
    formData.append('status_book',status_book);

    const ui = new UI();
    //ui.addANewBook(formData);

    //mensaje en pantalla del ui
    
    /* const bookService = new BookService();
    bookService.postBook(formData); */

    if (title === '' || author === '' || isbn === ''||price === ''||status_life === ''||status_book === ''||image === null) {
      ui.renderMessage('Por favor llene todos los campos del libro', 'warning', 3000);
    }
    /* if (image = 0|| image === '') {
      ui.renderMessage('Por favor coloque la portada del libro', 'warning', 3000);
    } */
    
    else {
      // Pass the new book to the UI
      ui.renderMessage('Libro Agregado','success',5000);
      ui.addANewBook(formData);
    }

    e.preventDefault();
  });

  //eliminar un registro
  document.getElementById('books-cards')
  .addEventListener('click', e =>{
    if (e.target.classList.contains('delete')) {
      const ui = new UI();
      ui.deleteBook(e.target.getAttribute('_id'));
      //mensaje del ui
      ui.renderMessage('Libro borrado', 'danger', 5000);
    }
    e.preventDefault();
  });