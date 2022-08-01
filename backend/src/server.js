const express=require("express");
const dotenv=require('dotenv');
dotenv.config();
const cors=require("cors");
const db = require("./models");
const cookieSession = require("cookie-session");
const HttpException = require('./utils/HttpException.utils');
const passportSetup = require("./utils/passport");
const passport = require("passport");
const errorMiddleware = require('./middleware/error.middleware');
const userRouter = require('./routes/user.route');
const cartRouter = require('./routes/cart.route');
const catalogRouter = require('./routes/catalog.route');
const orderRouter = require('./routes/order.route');
const manageRouter = require('./routes/manage.route');
const googleAuthRoute = require('./routes/googleAuthRoute.route');
const bodyParser = require('body-parser');
const app=express();

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.options("*",cors());
app.use('/images', express.static('src/images'));

// db.mongoose
//   .connect(`mongodb://admin:123456@localhost:27017/admin`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     
//     initial();
//   })
//   .catch(err => {
//     console.error("Connection error", err);
//     process.exit();
//   });

db.mongoose
  .connect(`mongodb://localhost:27017`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });




const User=db.user;
const Catalog=db.catalog;
const port = Number(process.env.PORT || 3332);

app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/cart`, cartRouter);
app.use(`/api/v1/catalog`, catalogRouter);
app.use(`/api/v1/order`, orderRouter);
app.use(`/api/v1/manage`, manageRouter);
app.use(`/auth`, googleAuthRoute);
app.all("*",(req,res,next)=>{
    const err=new HttpException(404,'EndPoint Not Found')
    next(err);
});

app.use(errorMiddleware);

app.listen(port,()=>{
    console.log(`server running at ${port}`);
})



function initial() {
    User.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new User({
          id: 1,
          username: "admin@admin.com",
          password: "$2a$08$rNU4PDLHOvS6eoJIpJ3l5e/YBgDKswZoUB0.R40zw2dgljBjScPNm",
          role: "admin",
        }).save(err => {
          if (err) {
           
          }

        });
      }
    });
    Catalog.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        Catalog.insertMany([ 
          {
            "id": 1,
            "name": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            "desc": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "price": 10,
            "stock": 10,
            "image": "1.jpg"
          },{
            "id": 2,
            "name": "Mens Casual Premium Slim Fit T-Shirts",
            "desc": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
            "price": 11,
            "stock": 10,
            "image": "2.jpg"
          },{
            "id": 3,
            "name": "Mens Cotton Jacket",
            "desc": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
            "price": 12,
            "stock": 10,
            "image": "3.jpg"
          },{
            "id": 4,
            "name": "Mens Casual Slim Fit",
            "desc": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
            "price": 13,
            "stock": 10,
            "image": "4.jpg"
          },{
            "id": 5,
            "name": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
            "desc": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
            "price": 14,
            "stock": 10,
            "image": "5.jpg"
          },{
            "id": 6,
            "name": "Solid Gold Petite Micropave",
            "desc": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
            "price": 15,
            "stock": 10,
            "image": "6.jpg"
          },{
            "id": 7,
            "name": "White Gold Plated Princess",
            "desc": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
            "price": 16,
            "stock": 10,
            "image": "7.jpg"
          },{
            "id": 8,
            "name": "Pierced Owl Rose Gold Plated Stainless Steel Double",
            "desc": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
            "price": 17,
            "stock": 10,
            "image": "8.jpg"
          },{
            "id": 9,
            "name": "WD 2TB Elements Portable External Hard Drive - USB 3.0",
            "desc": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
            "price": 18,
            "stock": 10,
            "image": "9.jpg"
          },{
            "id": 10,
            "name": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
            "desc": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.",
            "price": 19,
            "stock": 10,
            "image": "10.jpg"
          },{
            "id": 11,
            "name": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
            "desc": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
            "price": 20,
            "stock": 10,
            "image": "11.jpg"
          },{
            "id": 12,
            "name": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
            "desc": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
            "price": 21,
            "stock": 10,
            "image": "12.jpg"
          },{
            "id": 13,
            "name": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
            "desc": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
            "price": 22,
            "stock": 10,
            "image": "13.jpg"
          },{
            "id": 14,
            "name": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED",
            "desc": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
            "price": 23,
            "stock": 10,
            "image": "14.jpg"
          },{
            "id": 15,
            "name": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
            "desc": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
            "price": 24,
            "stock": 10,
            "image": "15.jpg"
          },{
            "id": 16,
            "name": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
            "desc": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
            "price": 25,
            "stock": 10,
            "image": "16.jpg"
          },{
            "id": 17,
            "name": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
            "desc": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
            "price": 26,
            "stock": 10,
            "image": "17.jpg"
          },{
            "id": 18,
            "name": "MBJ Women's Solid Short Sleeve Boat Neck V",
            "desc": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
            "price": 27,
            "stock": 10,
            "image": "18.jpg"
          },{
            "id": 19,
            "name": "Opna Women's Short Sleeve Moisture",
            "desc": "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
            "price": 28,
            "stock": 10,
            "image": "19.jpg"
          },{
            "id": 20,
            "name": "DANVOUY Womens T Shirt Casual Cotton Short",
            "desc": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
            "price": 29,
            "stock": 10,
            "image": "20.jpg"
          }
      ]).then(function(){ 
          
      }).catch(function(error){ 
          
      });
      }
    });
}
module.exports=app;

