module.exports = {
  db: {
    production: process.env.MONGODB_URI,
    development: 'mongodb://localhost/vegan-chef-development',
    test: 'mongodb://localhost/vegan-chef'
  },
  port: process.env.PORT || 4000,
  secret: process.env.SECRET || 'omg so so secret'
};
