const express = require('express');
const path = require('path');
const hbs = require('hbs');


const app = express();
const port = process.env.PORT | 3000;
const staticPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, '../templates/partials');
const viewsPath = path.join(__dirname, '../templates/views')



// set view engine to the hbs template engine
app.set('view engine', 'hbs');

// change the views name config the server
app.set('views', viewsPath)

// deploy static site
app.use(express.static(staticPath));

// register the partials in hbs
hbs.registerPartials(partialsPath);

//#end points start
app.get('/', (req, res)=>{
    res.status(200).render('index',{title: 'Weather app'});
})
app.get('/about', (req, res)=>{
    res.status(200).render('about', {title: 'About - Me'})
})
app.get('/weather', (req, res)=>{
    res.render('weather',{title: "Weather - page"})
})
app.get('*', (req, res)=>{
    res.render('404', {title:"Error - page",errorMsg: 'Opps! Page Not Found'});
})


app.listen(port, (err)=>{
    if(err) throw err
    console.log(`server  running on port ${port}`)
})