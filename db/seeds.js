const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Cuisine = require('../models/cuisine');
const Ingredient = require('../models/ingredient');
const Recipe = require('../models/recipe');
const User = require('../models/user');
const config  = require('../config/env');

mongoose.connect(config.db['development']);

Cuisine.collection.drop();
Recipe.collection.drop();
Ingredient.collection.drop();
User.collection.drop();

// const cuisines =  [
//   {
//     'name': 'Indian',
//     'images': {
//       'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
//     }
//   },
//   {
//     'name': 'Mexican',
//     'images': {
//       'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
//     }
//   }
// ];

// const recipes = [
//
//   {
//     'name': 'lamb',
//     'instructions': [{
//       'index': '1' ,
//       'content': 'blah'
//     }],
//     'ingredients': [{
//       'measurement': '1'
//     }],
//     'images': {
//       'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
//     }
//   }
// ];

// users first
const uSunny = new User({
  'username': 'Sunny',
  'email': 'sunny@sunny.com',
  'password': 'password',
  'passwordConfirmation': 'password',
  'recipes': []
});
const uLouis = new User({
  'username': 'Louis',
  'email': 'louis@louis.com',
  'password': 'password',
  'passwordConfirmation': 'password',
  'recipes': []
});
const uDanai = new User({
  'username': 'Danai',
  'email': 'danai@danai.com',
  'password': 'password',
  'passwordConfirmation': 'password',
  'recipes': []
});
const uDavid = new User({
  'username': 'David',
  'email': 'david@david.com',
  'password': 'password',
  'passwordConfirmation': 'password',
  'recipes': []
});

// ingredients second
const iPepper = new Ingredient({
  'name': 'Pepper',
  'images': {
    'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
  }
});
const iTomato = new Ingredient({
  'name': 'Tomato',
  'images': {
    'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
  }
});
const iOnion = new Ingredient({
  'name': 'Onion',
  'images': {
    'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
  }
});
const iCarrot = new Ingredient({
  'name': 'Carrot',
  'images': {
    'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
  }
});
const iSeitan = new Ingredient({
  'name': 'Seitan',
  'images': {
    'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
  }
});
const iTofu = new Ingredient({
  'name': 'Tofu',
  'images': {
    'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
  }
});


// recipes third
const rLamb = new Recipe(
  {
    'name': 'Lamb',
    'chef': uSunny._id,
    'instructions': [{
      'index': '1' ,
      'content': 'blah'
    }],
    'ingredients': [
      {
        'measurement': '1',
        'ingredient': iPepper._id
      },{
        'measurement': '1',
        'ingredient': iOnion._id
      },{
        'measurement': '1',
        'ingredient': iTomato._id
      },{
        'measurement': '1',
        'ingredient': iSeitan._id
      },{
        'measurement': '1',
        'ingredient': iCarrot._id
      },{
        'measurement': '1',
        'ingredient': iTofu._id
      }
    ],
    'images': {
      'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
    }
  }
);
uSunny.recipes.push(rLamb._id);
const rTapas = new Recipe(
  {
    'name': 'Tapas',
    'chef': uLouis._id,
    'instructions': [{
      'index': '1' ,
      'content': 'instruction 1'
    }],
    'ingredients': [
      {
        'measurement': '1',
        'ingredient': iPepper._id
      },{
        'measurement': '1',
        'ingredient': iOnion._id
      },{
        'measurement': '1',
        'ingredient': iTomato._id
      },{
        'measurement': '1',
        'ingredient': iSeitan._id
      },{
        'measurement': '1',
        'ingredient': iCarrot._id
      },{
        'measurement': '1',
        'ingredient': iTofu._id
      }
    ],
    'images': {
      'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
    }
  }
);
uLouis.recipes.push(rTapas);
// const users = [
//   {
//     'username': 'Sunny',
//     'email': 'sunny@sunny.com',
//     'password': 'password',
//     'passwordConfirmation': 'password'
//   }
// ];



//
// cuisines.forEach(cuisine => {
//   Cuisine
//     .create(cuisine, (err, cuisine) => {
//       console.log(`${cuisine.name} was saved`);
//     });
// });
//
// recipes.forEach(recipe => {
//   Recipe
//     .create(recipe, (err, recipe) => {
//       console.log(`${recipe.name} was saved`);
//     });
// });
//
// ingredients.forEach(ingredient => {
//   Ingredient
//     .create(ingredient, (err, ingredient) => {
//       console.log(`${ingredient.name} was saved`);
//     });
// });

// users.forEach(user => {
//   User
//     .create(user, (err, user) => {
//       console.log(`${user.username} was saved`);
//     });
// });

User
  .create([
    uSunny,
    uLouis,
    uDanai,
    uDavid
  ])
  .then(users => {
    console.log(`${users.length} users created`);

    return Cuisine
      .create([
        {
          'name': 'Indian',
          'recipes': [rLamb._id],
          'images': {
            'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
          }
        },{
          'name': 'Mexican',
          'recipes': [rTapas._id],
          'images': {
            'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
          }
        },{
          'name': 'Thai',
          'recipes': [rTapas._id],
          'images': {
            'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
          }
        },{
          'name': 'Chinese',
          'recipes': [rTapas._id, rLamb._id],
          'images': {
            'small': 'http://www.kilnford.co.uk/wp-content/uploads/2017/03/Kilnford-indian-lamb-curry-5.jpg'
          }
        }
      ]);
  })
  .then(cuisines => {
    console.log(`${cuisines.length} cuisines created`);

    return Ingredient
      .create([
        iPepper,
        iOnion,
        iTomato,
        iCarrot,
        iSeitan,
        iTofu
      ]);
  })
  .then(ingredients => {
    console.log(`${ingredients.length} ingredients created`);

    return Recipe
      .create([
        rLamb,
        rTapas
      ]);
  })
  .then(recipes => {
    console.log(`${recipes.length} recipes created`);
  })
  .finally(() => {
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });
