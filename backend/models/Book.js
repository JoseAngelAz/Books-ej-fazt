const {Schema, model} = require('mongoose');

const BookSechema = new Schema({
    title: {type: String, required:true},
    author: {type:String, required:true},
    isbn: {type:String, required:true},
    imagePath: {type:String,required:true},//lo tenía comentado
    created_at: {type:Date, default: Date.now},
    price: {type:String, required:true},
    status_life:{type:String, required:true},
    status_book:{type:String, required:true}
})

module.exports = model('Book',BookSechema);