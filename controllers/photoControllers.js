const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  //pagination
  const page = req.query.page || 1; // query'de herhangi bir değer yoksa 1 alacak
  const photosPerPage = 2;

  const totalPhotos = await Photo.find().countDocuments(); // vd'nındaki toplam kayıt sayısı

  // sayfada gostermek istenilen foto bilgileri
  const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page - 1) * photosPerPage) // her sayfada 2 foto gosteriyorsak bir ve ikiyi pas geç
    .limit(photosPerPage); // her sayfada 2 foto goster

  res.render('index', {
    photos: photos,
    current: page, // current o andaki sayfaya denk geliyor
    pages: Math.ceil(totalPhotos / photosPerPage), // toplam sayfa sayısını gonderiyor.
  });

  // console.log(req.query); //http://localhost:3000/?user=test&pass=1234 --> { user: 'test', pass: '1234' }
  // const photos = await Photo.find({}).sort('-dateCreated'); // template enginin içinde dinamik olarak fotoğrafların da gorunsun. sort ile son yuklenen en başa gelmesi için basına -
  // res.render('index', {
  //   // views klasörü içerisindeki index.ejs dosyasını render edecek
  //   photos,
  //});
};

exports.getPhoto = async (req, res) => {
  // index.ejs'de foto linkine tanımlanan /photos/<%= photos[i]._id %> href'in id kısmını parametre olarak verdik
  // console.log(req.params.id) // req.params ile yukarıda tanımlanan id parametresini yakaldık
  //res.render('about'); // views klasörü içerisindeki about.ejs dosyasını render edecek
  const photo = await Photo.findById(req.params.id); // hangi fotoya aait olan bilgileri istiyorsak onu cek ve photo.ejs template'ine gönder
  res.render('photo', {
    // buradaki photo idisini buldugumuz photo
    photo,
  });
};

exports.createPhoto = async (req, res) => {
  // console.log(req.files.image) // form alanındaki name attr image olduıgu için aynı isimle ulaşıyoruz

  // async fonk; model yardımıyla vt'da olusurulan document olana kadar await olacak/bekleyecek
  // add.ejs form alanındaki action name /photos
  // console.log(req.body); // form'a girilen verileri yazıdr
  // await Photo.create(req.body); // photo modeli vt'na gonderecek
  // res.redirect('/'); // ardından anasayfaya yonlendir ve donguyu bitir yoksa surekli doner

  //görselleri uploads isimli bir klasöre yükleyeceğiz, öncelikle bu klasörün olup olmadığını kontrol et
  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) {
    // yoksa
    fs.mkdirSync(uploadDir); //olustur // burada sync yanı senkron fonk kullanılmasının nedeni; once bu klasorlerın olup olmadıgının kontrol edilmesini sağladıktan sonra aşagıdaki işlemlere geçmesi için
  }

  let uploadedImage = req.files.image; // yuklenen gorsel bilgileri tutuldu
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name; // görselin yükleneceği yol. public içinde upload klasörü oluşturur

  // bu bilgileri görsele ait diğer bilgiler ile birlikte veritabanına yazdır
  uploadedImage.mv(uploadPath, async () => {
    // yuklenen resmi belirlenen path'e move edecek
    await Photo.create({
      // veritabanına görselin yolu ile birlikte kaydet
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/'); // anasayfaya yonlendir
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.desc = req.body.desc;
  await photo.save(); // await - fotoğraflar save olmadan sayfa redirect olmasın

  res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
