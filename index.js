const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const {getAll} = require('./controllers/blog');
const app = express();
const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true });


app.use(express.json());

// for anyone 
app.get('/', async (req, res, next) => {
  try {
    const blogs = await getAll();
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});

// for registered persons
app.use('/', routes);

app.use('*', (req, res, next) => {
  res.status(404).json({ err: 'NOT_FOUND' });
});

app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(422).json(err.errors);
  }
  if (err.code === 11000) {
    res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
  }
  if (err.message === 'UN_AUTHENTICATED') {
    res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
  }
  res.status(503).end();
});


const { PORT = 3000 } = process.env ;
app.listen(PORT, () => {
  console.log('App is up and ready on:', PORT);
});
