const express = require('express');
const req = require('express/lib/request');
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

//STATIC FILES -- MIDDLEWARES
app.use(express.static('public')) //middleware'i kullanmak için use fonk kullanılır
// app.use(myLogger); // myLogger middleware çağırdık
// app.use(myLogger2); // myLogger2 middleware çağırdık

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'temp/index.html'))
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
