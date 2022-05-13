const Photo = require('../models/Photo');

exports.getAboutPage = (req, res) => {
  res.render('about'); // views klasörü içerisindeki about.ejs dosyasını render edecek
};

exports.getAddPage = (req, res) => {
  res.render('add'); // views klasörü içerisindeki add.ejs dosyasını render edecek
};

exports.getEditPage = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
};
