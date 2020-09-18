const mongoose = require("mongoose");

async function connectDb() {
  const uri =
    "mongodb+srv://dbUsre:dbTest@cluster0.rdomb.mongodb.net/<dbname>?retryWrites=true&w=majority";

  try {
    let collection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to mongodb...");
  } catch (error) {
    console.log("Connect to database failed!");
  }
}

connectDb();

// mongoose.connect((err) => {
//   const collection = mongoose.db("test").collection("devices");
//   // perform actions on the collection object
//   mongoose.close();
// });

// create schema and models
const bookSchema = new mongoose.Schema({
  name: String,
  genre: String,
  authorId: String,
});
const authorSchema = new mongoose.Schema({ name: String, age: Number });

const Book = mongoose.model("Book", bookSchema);
const Author = mongoose.model("Author", authorSchema);

module.exports = { Book, Author };
