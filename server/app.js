const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema/schema");

const cors = require("cors"); //needed for graphql client queries
const app = express();

app.use(cors()); // need to be cors(), not cors
app.use(
  "/graphql", // graph service endpoint
  graphqlHTTP({
    schema, // needed
    graphiql: true, // enable GraphiQL tool when developing
  })
);

// http://localhost:4000/graphql
app.listen(4000, () => console.log("Stared graphql server on port 4000"));
