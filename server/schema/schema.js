const graphql = require("graphql");
const _ = require("lodash");

const { Book, Author } = require("../models/mangoDb");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull, // useful for mutation
  GraphQLSchema,
} = graphql;

// define types
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    // authorId: { type: GraphQLID },

    // connection to another type should come with a resolve function
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        // return _.findby(authors, { id: parent.authorId });
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});

// const books = [
//   { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
//   { name: "The White House", genre: "Dramma", id: "2", authorId: "2" },
//   { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
//   { name: "TThe Hero of Ages", genre: "Fantasy", id: "4", authorId: "2" },
//   { name: "The Colour of Magic", genre: "Dramma", id: "5", authorId: "3" },
//   { name: "The Light Fantastic", genre: "Sci-Fi", id: "6", authorId: "3" },
// ];

// const authors = [
//   { name: "Hillary Clinton", age: 68, id: "1" },
//   { name: "Michael Jackson", age: 62, id: "2" },
//   { name: "Kaifu Lee", age: 58, id: "3" },
// ];

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    AddBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
    AddAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({ name: args.name, age: args.age });
        return author.save();
      },
    },
  },
});

// define relationships between types

// define root queries resolver
// this is used for the client query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db or other sources
        // console.log(typeof args.id);
        // return _.find(books, { id: args.id });
        return Book.findById(args.id);
      },
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db or other sources
        // console.log(typeof args.id);
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      },
    },

    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // console.log("Get a query for books");
        //code to get data from db or other sources
        // return books;
        let books = Book.find({});
        console.log("books", books);
        return books;
      },
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //code to get data from db or other sources
        // return authors;
        return Author.find({});
      },
    },
  },
});

// query string, the passed string must be double quoted if the id is GraphQLString type
// {
//   book(id: "1") {
//     name
//     genre
//   }
// }

// create schema to export
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
