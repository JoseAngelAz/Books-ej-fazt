import BookService from "./services/BookService";
const bookService = new BookService();
 import {format} from 'timeago.js';

class UI {
  async renderBooks() {
    const books = await bookService.getBooks();
    console.log(books);
    const bookCardContainer = document.getElementById("books-cards");
    bookCardContainer.innerHTML = "";
    books.forEach((book) => {
      const div = document.createElement("div");
      div.className = "";
      div.innerHTML = `
                
                <div class= "card m-2 border border-dark rounded">
                <div class= "row">                
                    <div class= "col-md-4">
                    <img class="img-fuid card-image-top cover" src="http://localhost:3600${book.imagePath}" alt="image">
                    </div>
                    <div class= "col-md-8">
                    <div class= "card-block px-2 border border-white rounded">
                        <h4 class="card-title" >${book.title}</4>
                        <p class="card-text">${book.author}</p>
                        <p class="card-text">${book.isbn}</p>
                        <p class="card-text">${book.price}</p>
                        <p class="card-text">${book.status_life}</p>
                        <p class="card-text">${book.status_book}</p>

                        <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
                    </div>    
                    </div>
                </div>
                <div class="card footer border border-white rounded ">
                ${format(book.crated_at)}
                </div>
                </div>
            `;
            bookCardContainer.appendChild(div);
    });
  }
 //Agregar un registro
  async addANewBook(book) {
    await bookService.postBook(book);
    this.clearBookForm();
    this.renderBooks();
  }

  clearBookForm() {
    document.getElementById("book-form").reset();
  }

  renderMessage(message, colorMessage, secondsToRemove) {
      const div = document.createElement('div');
      div.className = `alert alert-${colorMessage} message`;
      div.appendChild(document.createTextNode(message));


      const container = document.querySelector('.col-md-4');
      const bookForm = document.querySelector('#book-form');
      container.insertBefore(div,bookForm);
      setTimeout(()=>{
        document.querySelector('.message').remove();
      },secondsToRemove)
  }

  async deleteBook(bookId) {
     await bookService.deleteBook(bookId);
     this.renderBooks();
  }
}

export default UI;
