const express = require('express');
const ejs = require('ejs'); //template engine ejs module
const path = require('path');
const app = express();

// // mylogger middleware
// const myLogger = (req, res, next) => {
//   console.log("Middleware log 1");
//   next() // bir sonraki middleware ilerlemesi için
// }
// //mylogger2 middleware
// const myLogger2 = (req, res, next) => {
//   console.log("Middleware log 2");
//   next() // bir sonraki middleware ilerlemesi için
// }

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

//STATIC FILES -- MIDDLEWARES
app.use(express.static('public')); // public adlı bir dizinde görüntüleri, CSS dosyalarını ve JavaScript dosyalarını sunmak için
//middleware'i kullanmak için use fonk kullanılır
// app.use(myLogger); // myLogger middleware çağırdık
// app.use(myLogger2); // myLogger2 middleware çağırdık
// https://expressjs.com/en/starter/static-files.html#serving-static-files-in-express

//ROUTES
app.get('/', (req, res) => {
  res.render('index'); // views klasörü içerisindeki index.ejs dosyasını render edecek
});
app.get('/about', (req, res) => {
  res.render('about'); // views klasörü içerisindeki about.ejs dosyasını render edecek
});
app.get('/add', (req, res) => {
  res.render('add'); // views klasörü içerisindeki add.ejs dosyasını render edecek
});
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
