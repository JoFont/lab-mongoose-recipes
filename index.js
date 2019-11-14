const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost/recipeApp';





// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to Mongo!');
    
    try {
      await Recipe.insertMany(data);
      await Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100});
      await Recipe.deleteOne({title: "Carrot Cake"});
    }
    catch (error) {
        console.log("error: " + error);
    }
    finally {
      console.log("Succesfully updated a recipe");
      console.log("Deleted Succesfully");
      mongoose.connection.close()
    }
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });
