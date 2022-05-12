const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs'); //template engine ejs module
const path = require('path');
const Photo = require('./models/Photo');


// CONNECT DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


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
/*
 EJS modülü template dosyaları görebilmek için varsayılan olarak views klasörünün içerisindeki .ejs uzantılı dosyalara bakar.
 Bu ne denle temp dosyamızın ismini views olarak değiştiriyoruz. Videws klasörü içerisindeki tüm .html uzantılarını .ejs olarak değiştiriyoruz. 
 Uygulamamızdaki .get metodunu düzenlersek, bu şekilde '/' isteğine karşılık index.ejs dosyasını render ederiz.
*/
app.set('view engine', 'ejs');

//STATIC FILES -- MIDDLEWARES
//middleware'i kullanmak için use fonk kullanılır
// app.use(myLogger); // myLogger middleware çağırdık
// app.use(myLogger2); // myLogger2 middleware çağırdık
// https://expressjs.com/en/starter/static-files.html#serving-static-files-in-express
app.use(express.static('public')); // public adlı bir dizinde görüntüleri, CSS dosyalarını ve JavaScript dosyalarını sunmak için
app.use(express.urlencoded({ extended: true })); // url'deki datayı oku
app.use(express.json()); // datayı json formatına dondur

//ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({})// template enginin içinde dinamik olarak fotoğraflarında gorunsun
  res.render('index', { // views klasörü içerisindeki index.ejs dosyasını render edecek
    photos 
  }); 
});
app.get('/about', (req, res) => {
  res.render('about'); // views klasörü içerisindeki about.ejs dosyasını render edecek
});
app.get('/add', (req, res) => {
  res.render('add'); // views klasörü içerisindeki add.ejs dosyasını render edecek
});

app.post('/photos', async (req, res) => { // async fonk model yuaurdımıyla vt olusurulan document olana kadar await olacak bekleyecek
  // add.ejs form alanındaki action name /photos
  // console.log(req.body); // form'a girilen verileri yazıdr
  await Photo.create(req.body) // photo modeli vt'na gonderecek
  res.redirect('/'); // ardından anasayfaya yonlendir ve donguyu bitir yoksa surekli doner
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
