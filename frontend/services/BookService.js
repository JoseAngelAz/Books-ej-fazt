class BookService{
    constructor(){
        this.URI = 'http://localhost:3600/api/books';
    }
    //consultar books
    async getBooks(){
       const response = await fetch(this.URI);
       const books = await response.json();
       return books;
       
    }
    //Crear Registro de Libro
   async postBook(book){
       const res = await fetch(this.URI,{
            method:'POST',
            body:book
        });
        const data = await res.json();
        console.log(data);
    }
    //borrar book
   async deleteBook(bookId){
     const res =  await fetch(`${this.URI}/${bookId}`,{
            headers:{
                'Content-Type':'application/json'
            },
            method:'Delete'
        });
            const data = await res.json();
            console.log(data);                      
    }

}

export default BookService;