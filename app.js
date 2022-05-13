const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload'); //Görseli göndermek için
const methodOverride = require('method-override'); // güncelleme yaparken put işlemini post ile simule etmnek için
const app = express();
const ejs = require('ejs'); //template engine ejs module
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageControllers');

// CONNECT DB
// 'mongodb://localhost/pcat-test-db' -->localde
mongoose
  .connect(
    'mongodb+srv://fatih:08TYMIzG277mkMnj@cluster0.yaxxk.mongodb.net/pcat-db?retryWrites=true&w=majority'
  ) // mongoose connect bir promise döner
  .then(() => {
    console.log('DB CONNECTED!');
  })
  .catch((err) => {
    console.log(err);
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

// MIDDLEWARES
//middleware'i kullanmak için use fonk kullanılır
// app.use(myLogger); // myLogger middleware çağırdık
// app.use(myLogger2); // myLogger2 middleware çağırdık
// https://expressjs.com/en/starter/static-files.html#serving-static-files-in-express
app.use(express.static('public')); // public adlı bir dizinde görüntüleri, CSS dosyalarını ve JavaScript dosyalarını sunmak için--static files
app.use(express.urlencoded({ extended: true })); // url'deki datayı oku
app.use(express.json()); // datayı json formatına dondur
app.use(fileUpload()); //express-fileupload modülünü kullanmak için
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'], // gerektiğinde hangi metotların override edileceği expilicit-ayrıca belirtildi--delete işlemi bir get işlemi
  })
);

//ROUTES
//tum fotoları indexs template'ine yolla
app.get('/', photoController.getAllPhotos);

app.get('/photos/:id', photoController.getPhoto);

//yeni foto olusturma
app.post('/photos', photoController.createPhoto);

// foto guncelleme
app.put('/photos/:id', photoController.updatePhoto);

//foto silme
app.delete('/photos/:id', photoController.deletePhoto);

// get about page
app.get('/about', pageController.getAboutPage);

// get add page
app.get('/add', pageController.getAddPage);

// get edit page
app.get('/photos/edit/:id', pageController.getEditPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
