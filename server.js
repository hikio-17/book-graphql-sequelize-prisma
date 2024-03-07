const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const morgan = require('morgan');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolver');
const auth = require('./middleware/auth');

const app = express();

app.use(auth);

app.use(morgan('dev'));
app.use("/graphql", graphqlHTTP({
   schema: graphqlSchema,
   rootValue: graphqlResolver,
   graphiql: true,
   customFormatErrorFn(err) {
      if (!err.originalError) {
         return err;
      }
      const data = err.originalError.data;
      const message = err.message || "An error occured.";
      const code = err.originalError.code || 500;
      return { message, status: code, data }
   }
}));

const PORT = 8080;
app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
});