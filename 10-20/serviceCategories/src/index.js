const express = require('express');
const app = express();
const categoriesRoutes = require('./app/routes/categoryRoutes');

//settings
app.set('port', process.env.PORT || 3005);

//middlewares

app.use(express.json());


// routes
app.use('/api/v1', categoriesRoutes);

app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
});