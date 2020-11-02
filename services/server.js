let express = require('express'),
    app=express(),
    port = process.env.PORT ||3000,
    mongoose = require('mongoose'),
    bodyParser=require('body-parser');

//mongoose connection
mongoose.connect('mongodb://localhost:27017/demos', {useNewUrlParser: true,useUnifiedTopology: true  });
mongoose.Promise=global.Promise;

//handling request and response
app.use(bodyParser.urlencoded({
    extends:true
}));
app.use(bodyParser.json())

//Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); 
    next();
});

const initApp = require('./app/app');
initApp(app);


app.listen(port);
console.log('Restful API server started on :' + port);