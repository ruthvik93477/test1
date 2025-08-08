const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const ejs = require('ejs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');


require('dotenv').config();
const app = express();
const port = process.env.PORT;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('src',path.join(__dirname,'src'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(session({
    secret: '13', 
    resave: false,
    saveUninitialized: true,
  }));
  const conn = process.env.MONGO_URL;
  mongoose.connect(conn);
  const userName = process.env.user_name;
  const pass = process.env.PASSWORD;
  const passStaff = process.env.PASSWORD_STAFF;
  const us1 = process.env.usr1;
  const pw1 = process.env.pwd1;
  const us2 = process.env.usr2;
  const pw2 = process.env.pwd2;
  const us3 = process.env.usr3;
  const pw3 = process.env.pwd3;
  const us4 = process.env.usr4;
  const pw4 = process.env.pwd4;
  const us5 = process.env.usr5;
  const pw5 = process.env.pwd5;
  const us6 = process.env.usr6;
  const pw6 = process.env.pwd6;
  const us7 = process.env.usr7;
  const pw7 = process.env.pwd7;
  const us8 = process.env.usr8;
  const pw8 = process.env.pwd8;
  // Authentication middleware

  const authenticate = (req, res, next) => {
    const { username, password } = req.session;
    const isAuthenticated = username === userName && password === pass;
    if (isAuthenticated) {
      next();
    } else {
      //res.status(401).send('Unauthorized. Please log in.');
      //res.status(401).sendFile(__dirname+'/public/unauth.html')
      let g = fs.readFileSync("public/unauth.html");
      res.status(404).send(g.toString());
    }
  };

  const authenticateStaff = (req, res, next) => {
    const { username, password } = req.session;
    const { usernameStaff, passwordStaff } = req.session;
    const isAuthenticated = username === userName && password === pass;
    const isAuthenticatedStaff = (usernameStaff === userName && passwordStaff === passStaff)||(usernameStaff===us1&&passwordStaff===pw1)
                                  ||(usernameStaff===us2&&passwordStaff===pw2)||(usernameStaff===us3&&passwordStaff===pw3)
                                  ||(usernameStaff===us4&&passwordStaff===pw4)||(usernameStaff===us5&&passwordStaff===pw5)
                                  ||(usernameStaff===us6&&passwordStaff===pw6)||(usernameStaff===us7&&passwordStaff===pw7)
                                  ||(usernameStaff===us8&&passwordStaff===pw8);
    if (isAuthenticated|| isAuthenticatedStaff) {
      next();
    } else {
      //res.status(401).send('Unauthorized. Please log in.');
      //res.status(401).sendFile(__dirname+'/public/unauth.html')
      let g = fs.readFileSync("public/unauth.html");
      res.status(404).send(g.toString());
    }
  };

//MONGO CONNECTION

const inputSchema = new mongoose.Schema({
    invoiceNumberf: String,
    pn: String,
    companyName: String,
    status: String,
    remarks: String,
})

const InputData = mongoose.model('InputData',inputSchema);

app.get('/sampleHome',(req,res)=>{
  res.sendFile(__dirname+'/public/sampleHome.html');
})

app.get('/atkFormUpload',authenticate,(req,res)=>{
  res.sendFile(__dirname+'/public/atkFormUpload.html');
});

app.get('/indFormUpload',authenticate,(req,res)=>{
  res.sendFile(__dirname+'/public/indFormUpload.html');
});

app.get('/rzUpload',authenticate,(req,res)=>{
  res.sendFile(__dirname+'/public/rzUpload.html');
});

app.get('/login',(req,res)=>{
  res.render('login');
})

app.get('/loginStaff',(req,res)=>{
  res.render('loginStaff');
})

app.post('/indFormUpload',authenticate,async(req,res)=>{
  let {invoiceNumberf,pn,companyName,status,remarks} = req.body;
  try{
    const inputData = new InputData({
        invoiceNumberf: invoiceNumberf,
        pn: pn,
        companyName: companyName,
        status: status,
        remarks: remarks,
    });
    await inputData.save();
    let a45 = fs.readFileSync('public/indForm.html')
    res.send(a45.toString());
  }
  catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
})

app.get('/icmUpload',authenticate,(req,res)=>{
  res.sendFile(__dirname+'/public/icmUpload.html');
});

app.get('/elvinUpload',authenticate,(req,res)=>{
  res.sendFile(__dirname+'/public/elvinUpload.html');
});

app.get('/tigerUpload',authenticate,(req,res)=>{
  res.sendFile(__dirname+'/public/tigerUpload.html');
});

app.get('/usUpload',authenticate,(req,res)=>{
  res.sendFile(__dirname+'/public/usUpload.html');
});

app.post('/usUpload',authenticate,async(req,res)=>{
  let {invoiceNumberf,pn,companyName,status,remarks} = req.body;
  try{
    const inputData = new InputData({
        invoiceNumberf: invoiceNumberf,
        pn: pn,
        companyName: companyName,
        status: status,
        remarks: remarks,
    });
    await inputData.save();
    let a45 = fs.readFileSync('public/usForm.html')
    res.send(a45.toString());
  }
  catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/tigerUpload',authenticate,async(req,res)=>{
  let {invoiceNumberf,pn,companyName,status,remarks} = req.body;
  try{
    const inputData = new InputData({
        invoiceNumberf: invoiceNumberf,
        pn: pn,
        companyName: companyName,
        status: status,
        remarks: remarks,
    });
    await inputData.save();
    let a45 = fs.readFileSync('public/tigerForm.html')
    res.send(a45.toString());
  }
  catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/elvinUpload',authenticate,async(req,res)=>{
  let {invoiceNumberf,pn,companyName,status,remarks} = req.body;
  try{
    const inputData = new InputData({
        invoiceNumberf: invoiceNumberf,
        pn: pn,
        companyName: companyName,
        status: status,
        remarks: remarks,
    });
    await inputData.save();
    let a45 = fs.readFileSync('public/elvinForm.html')
    res.send(a45.toString());
  }
  catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
})

app.post('/icmUpload',authenticate,async(req,res)=>{
  let {invoiceNumberf,pn,companyName,status,remarks} = req.body;
  try{
    const inputData = new InputData({
        invoiceNumberf: invoiceNumberf,
        pn: pn,
        companyName: companyName,
        status: status,
        remarks: remarks,
    });
    await inputData.save();
    let a45 = fs.readFileSync('public/icmForm.html')
    res.send(a45.toString());
  }
  catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
})

app.get('/display',authenticate, async (req, res) => {
  try {
    const data = await InputData.find();
    res.render('display', { data });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let { invoiceNumberf, pn, companyName, status, remarks } = req.body;
    await InputData.findByIdAndUpdate(id, { invoiceNumberf,pn,companyName,status,remarks });
    res.status(200).send('Data updated successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/atkFormUpload',authenticate,async(req,res)=>{
    let {invoiceNumberf,pn,companyName,status,remarks} = req.body;
    try{
      const inputData = new InputData({
          invoiceNumberf: invoiceNumberf,
          pn: pn,
          companyName: companyName,
          status: status,
          remarks: remarks,
      });
      await inputData.save();
      let a = fs.readFileSync('public/atkForm.html')
      res.send(a.toString());
    }
    catch(err){
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
})

app.post('/rzUpload',authenticate,async(req,res)=>{
  let {invoiceNumberf,pn,companyName,status,remarks} = req.body;
  try{
    const inputData = new InputData({
        invoiceNumberf: invoiceNumberf,
        pn: pn,
        companyName: companyName,
        status: status,
        remarks: remarks,
    });
    await inputData.save();
    let a1 = fs.readFileSync('public/rzForm.html')
    res.send(a1.toString());
  }
  catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
})

app.get('/kpmgUpload',authenticate,(req,res)=>{
  res.sendFile(__dirname+'/public/kpmgUpload.html');
})

app.get('/form3upload',authenticate,(req,res)=>{
  res.sendFile(__dirname+'/public/form3upload.html');
})

app.post('/form3upload',authenticate,async(req,res)=>{
  let {invoiceNumberf,pn,companyName,status,remarks} = req.body;
  try{
    const inputData = new InputData({
        invoiceNumberf: invoiceNumberf,
        pn: pn,
        companyName: companyName,
        status: status,
        remarks: remarks,
    });
    await inputData.save();
    let a3 = fs.readFileSync('public/form3.html')
    res.send(a3.toString());
  }
  catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
})

app.post('/kpmgUpload',authenticate,async(req,res)=>{
  let {invoiceNumberf,pn,companyName,status,remarks} = req.body;
  try{
    const inputData = new InputData({
        invoiceNumberf: invoiceNumberf,
        pn: pn,
        companyName: companyName,
        status: status,
        remarks: remarks,
    });
    await inputData.save();
    let a2 = fs.readFileSync('public/kpmgform.html')
    res.send(a2.toString());
  }
  catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
})


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/home.html');
})

app.get('/offerForm.html',authenticate,(req,res)=>{
  res.sendFile(__dirname+'/public/offerForm.html')
})

app.post('/login', (req, res) => {
    res.render('login');
});

app.get('/landing',authenticate, (req, res) => {
    res.sendFile(__dirname + '/public/landing.html');
});

app.post('/landing',(req, res) => {
    const { username, password } = req.body;
  
    if (username === userName && password === pass) {
      req.session.username = username;
      req.session.password = password;
      res.redirect('/landing');
    } else {
      /*let a5 = fs.readFileSync("/public/invalid.html");
      res.status(401).send(a5.toString())*/
      res.sendFile(__dirname + "/public/invalid.html")
    }
  });

  app.post('/landingLeave',(req, res) => {
    const { usernameStaff, passwordStaff } = req.body;
    res.render('staffLanding', { user: usernameStaff, pass: passwordStaff });
    if (usernameStaff === userName && passwordStaff === passStaff) {
      req.session.usernameStaff = usernameStaff;
      req.session.passwordStaff = passwordStaff;
      res.redirect('/landingLeave');
    } else if (usernameStaff === us1 && passwordStaff === pw1) {
      req.session.usernameStaff = usernameStaff;
      req.session.passwordStaff = passwordStaff;
      res.render('/staffLanding');
    } else if (usernameStaff === us2 && passwordStaff === pw2) {
      req.session.usernameStaff = usernameStaff;
      req.session.passwordStaff = passwordStaff;
      res.redirect('/landingLeave');
    } else if (usernameStaff === us3 && passwordStaff === pw3) {
      req.session.usernameStaff = usernameStaff;
      req.session.passwordStaff = passwordStaff;
      res.redirect('/landingLeave');
    } else if (usernameStaff === us4 && passwordStaff === pw4) {
      req.session.usernameStaff = usernameStaff;
      req.session.passwordStaff = passwordStaff;
      res.redirect('/landingLeave');
    } else if (usernameStaff === us5 && passwordStaff === pw5) {
      req.session.usernameStaff = usernameStaff;
      req.session.passwordStaff = passwordStaff;
      res.redirect('/landingLeave');
    } else if (usernameStaff === us6 && passwordStaff === pw6) {
      req.session.usernameStaff = usernameStaff;
      req.session.passwordStaff = passwordStaff;
      res.redirect('/landingLeave');
    } else if (usernameStaff === us7 && passwordStaff === pw7) {
      req.session.usernameStaff = usernameStaff;
      req.session.passwordStaff = passwordStaff;
      res.redirect('/landingLeave');
    } else if (usernameStaff === us8 && passwordStaff === pw8) {
      req.session.usernameStaff = usernameStaff;
      req.session.passwordStaff = passwordStaff;
      res.redirect('/landingLeave');
    } 
    else {
      res.sendFile(__dirname + "/public/invalid.html")
    }
  });

app.get('/contact',authenticate,(req,res)=>{
  res.sendFile(__dirname+'/public/contact.html')
})

app.listen(port,()=>{
    console.log(`server runnig at ${port}`)
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// OFFER DETAILS ///////////////////////////////////////////////////////

//const conn1 = process.env.MONGO_URL1;


app.use(session({
  secret: '13', 
  resave: false,
  saveUninitialized: true,
}));

// Authentication middleware

//mongoose.connect(conn1);

app.post('/login', (req, res) => {
  res.render('login');
});

let inputSchema1 = new mongoose.Schema({
    fullName: String,
    lName: String,
    fName: String,
    nationality: String,
    birthPlace: String,
    passNumber: String,
    pid: String,
    ped: String,
    pic: String,
    dob: String,
    gender: String,
    race: String,
    religion: String,
    ms: String,
    homeAdd: String,
    spouse: String,
    child: String,
    mail: String,
    tCon: String,
    mCon: String,
    bankDetails: String,
    pBank: String,
    addrBank: String,
    accNum: String,
    sortCode: String,
    swiftCode: String,
    iban: String,
    bInfo: String,
    taxIdentity: String,
    emgName: String,
    emgRelation: String,
    contact: String,
    addr: String,
})

let InputData1 = mongoose.model('employeeDetails',inputSchema1);

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/home.html');
})

app.get('/update',authenticate,(req,res)=>{
    res.sendFile(__dirname+'/public/offerUpdate.html');
});

app.get('/fgetDetails',authenticate,(req,res)=>{
  res.sendFile(__dirname+'/public/fsname.html');
});

app.get('/contact',authenticate,(req,res)=>{
  res.sendFile(__dirname+'/public/contact.html');
});

app.get('/upload',authenticate,(req,res)=>{
  res.sendFile(__dirname+'/public/offerForm.html');
});

app.post('/update',authenticate, async (req, res) => {
    let lName = req.body.lName1;
    let {fName,nationality,birthPlace,passNumber,pid,ped,pic,dob,gender,race,religion,ms,homeAdd,spouse,child,mail,tCon,mCon,bankDetails,pBank} = req.body;
    let {addrBank,accNum,sortCode,swiftCode,iban,bInfo,taxIdentity,emgName,emgRelation,contact,addr} = req.body;
    let fullName = fName+" "+lName;
    try {
      const updatedUser = await InputData1.findOneAndUpdate(
        {lName},
        {fName,fullName,nationality,birthPlace,passNumber,pid,ped,pic,dob,gender,race,religion,ms,homeAdd,spouse,child,mail,tCon,mCon,bankDetails,pBank,addrBank,accNum,sortCode,swiftCode,iban,bInfo,taxIdentity,emgName,emgRelation,contact,addr},
        { new: true },
      );
      if (updatedUser) {
        let z = fs.readFileSync("public/submit.html")
        res.send(z.toString())
      } else {
        res.json({ message: 'User not found' }); 
        console.log(lName);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.post('/getDetails',authenticate, async (req, res) => {
    const fullName = req.body.fullName;  
    try {
      const user = await InputData1.findOne({ fullName });
      if (user) {
        res.json(user);
      } else {
        res.json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/fgetDetails',authenticate, async (req, res) => {
    const fName = req.body.fName;
    console.log(fName);  
    try {
      const user = await InputData1.findOne({ fName: fName });
      console.log(fName);
      if (user) {
        res.json(user);
      } else {
        res.json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/search',authenticate, (req, res) => {
    res.sendFile(__dirname + '/public/search.html');
  });
  
  app.post('/search',authenticate, (req, res) => {
    const searchName = req.body.search_name;
  
    InputData1.findOne({ fullName: searchName }).exec()
      .then(result => {
        if (result) {
          res.render('result', { result: result });
        } else {
          res.render('result', { error: "No data found for the given name." });
        }
      })
      .catch(err => {
        res.render('Please check the spelling');
      });
  }); 

  app.post('/fSearch',authenticate, (req, res) => {
    const searchName = req.body.f_name;
  
    InputData1.findOne({ fName: searchName }).exec()
      .then(result => {
        if (result) {
          res.render('result', { result: result });
        } else {
          res.render('result', { error: "No data found for the given name." });
        }
      })
      .catch(err => {
        res.render('Please check the spelling');
      });
  });  

  app.post('/lSearch',authenticate, (req, res) => {
    const searchName = req.body.l_name;
  
    InputData1.findOne({ lName: searchName }).exec()
      .then(result => {
        if (result) {
          res.render('result', { result: result });
        } else {
          res.render('result', { error: "No data found for the given name." });
        }
      })
      .catch(err => {
        res.render('Please check the spelling');
      });
  });

  app.post('/phoneSearch',authenticate, (req, res) => {
    const searchName = req.body.phone;
  
    InputData1.findOne({ mCon: searchName }).exec()
      .then(result => {
        if (result) {
          res.render('result', { result: result });
        } else {
          res.render('result', { error: "No data found for the given name." });
        }
      })
      .catch(err => {
        res.render('Please check the spelling');
      });
  });

app.post('/upload',authenticate,async(req,res)=>{
    let {lName,fName,fullName,nationality,birthPlace,passNumber,pid,ped,pic,dob,gender,race,religion,ms,homeAdd,spouse,child,mail,tCon,mCon,bankDetails,pBank} = req.body;
    let {addrBank,accNum,sortCode,swiftCode,iban,bInfo,taxIdentity,emgName,emgRelation,contact,addr} = req.body;
    try{
        const inputData = new InputData1({
            fullName: fullName,
            lName: lName,
            fName: fName,
            nationality: nationality,
            birthPlace: birthPlace,
            passNumber: passNumber,
            pid: pid,
            pic: pic,
            ped: ped,
            dob: dob,
            gender: gender,
            race: race,
            religion: religion,
            ms: ms,
            homeAdd: homeAdd,
            spouse: spouse,
            child: child,
            mail: mail,
            tCon: tCon,
            mCon: mCon,
            bankDetails: bankDetails,
            pBank: pBank,
            addrBank: addrBank,
            accNum: accNum,
            sortCode: sortCode,
            swiftCode: swiftCode,
            iban: iban,
            bInfo: bInfo,
            taxIdentity: taxIdentity,
            emgName: emgName,
            emgRelation: emgRelation,
            contact: contact,
            addr: addr, 
        });
        await inputData.save();
        let a3 = fs.readFileSync('public/submit.html')
        res.send(a3.toString());
    }
    catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})


app.get('/landing1',authenticate, (req, res) => {
  res.sendFile(__dirname + '/public/landing1.html');
});

app.get('/updatedDetails', authenticate,async (req, res) => {
  try {
    const data = await InputData1.find();
    res.render('updatedDetails', { data });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////OFFER DETAILS FROM USER////////////////////////////////////////////////////

InputData1 = mongoose.model('employeeDetails',inputSchema1);

app.post('/uploadUser',async(req,res)=>{
    let {lName,fullName,fName,nationality,birthPlace,passNumber,pid,ped,pic,dob,gender,race,religion,ms,homeAdd,spouse,child,mail,tCon,mCon,bankDetails,pBank} = req.body;
    let {addrBank,accNum,sortCode,swiftCode,iban,bInfo,taxIdentity,emgName,emgRelation,contact,addr} = req.body;
    try{
        const inputData = new InputData1({
            fullName: fullName,
            lName: lName,
            fName: fName,
            nationality: nationality,
            birthPlace: birthPlace,
            passNumber: passNumber,
            pid: pid,
            pic: pic,
            ped: ped,
            dob: dob,
            gender: gender,
            race: race,
            religion: religion,
            ms: ms,
            homeAdd: homeAdd,
            spouse: spouse,
            child: child,
            mail: mail,
            tCon: tCon,
            mCon: mCon,
            bankDetails: bankDetails,
            pBank: pBank,
            addrBank: addrBank,
            accNum: accNum,
            sortCode: sortCode,
            swiftCode: swiftCode,
            iban: iban,
            bInfo: bInfo,
            taxIdentity: taxIdentity,
            emgName: emgName,
            emgRelation: emgRelation,
            contact: contact,
            addr: addr, 
        });
        await inputData.save();
        let a3 = fs.readFileSync('public/submitUser.html')
        res.send(a3.toString());
    }
    catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/uploadUser',(req,res)=>{
    res.sendFile(__dirname+'/public/uploadUser.html');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// LEAVE TRACKER ////////////////////////////////////////////////////

const inputSchema2 = new mongoose.Schema({
  year: Number,
  cn: String,
  clientName: String,
  name: String,
  cf: Number,
  ml: Number,
  al: Number,
  jan: Number,
  feb: Number,
  mar: Number,
  apr: Number,
  may: Number,
  jun: Number,
  jul: Number,
  aug: Number,
  sep: Number,
  oct: Number,
  nov: Number,
  dec: Number,
  jan_ml: Number,
  feb_ml: Number,
  mar_ml: Number,
  apr_ml: Number,
  may_ml: Number,
  jun_ml: Number,
  jul_ml: Number,
  aug_ml: Number,
  sep_ml: Number,
  oct_ml: Number,
  nov_ml: Number,
  dec_ml: Number,
  aLeaves: Number,
  mLeaves: Number,
});

const InputData2 = mongoose.model('Leave_Tracker', inputSchema2);

app.get('/landingLeave',authenticateStaff, (req, res) => {
res.sendFile(__dirname + '/public/landingLeave.html');
});

// Upload.html route
app.get('/uploadLeave',authenticateStaff, (req, res) => {
  res.sendFile(__dirname + '/public/uploadLeave.html');
});

// Update details route
app.post('/updateDetailsLeave',authenticateStaff, async (req, res) => {
  const name = req.body.name;
  const jan = req.body.jan;
  const { cn,clientName,year,cf,al,ml,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec,jan_ml,feb_ml,mar_ml,apr_ml,may_ml,jun_ml,jul_ml,aug_ml,sep_ml,oct_ml,nov_ml,dec_ml } = req.body;
  let {aLeaves,mLeaves} = req.body;
  aLeaves = parseInt(jan)+parseInt(feb)+parseInt(mar)+parseInt(apr)+parseInt(may)+parseInt(jun)+parseInt(jul)+parseInt(aug)+parseInt(sep)+parseInt(oct)+parseInt(nov)+parseInt(dec);
  mLeaves = parseInt(jan_ml)+parseInt(feb_ml)+parseInt(mar_ml)+parseInt(apr_ml)+parseInt(may_ml)+parseInt(jun_ml)+parseInt(jul_ml)+parseInt(aug_ml)+parseInt(sep_ml)+parseInt(oct_ml)+parseInt(nov_ml)+parseInt(dec_ml);
  aLeaves= parseInt(al)-parseInt(aLeaves)+parseInt(cf);
  mLeaves= parseInt(ml)-parseInt(mLeaves);
  try {
    const updatedUser = await InputData2.findOneAndUpdate(
      { name },
      { cn,clientName,year,cf,al,ml,jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec,jan_ml,feb_ml,mar_ml,apr_ml,may_ml,jun_ml,jul_ml,aug_ml,sep_ml,oct_ml,nov_ml,dec_ml,aLeaves,mLeaves },
      { new: true },
    );
    if (updatedUser) {
      let z = fs.readFileSync("public/upsc.html")
      res.send(z.toString())
    } else {
      res.status(404).json({ message: 'User not found' }); // Set status code
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/uploadLeave',authenticateStaff, async (req, res) => {
let {year,cn,clientName,name,cf,al,ml,jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec,jan_ml,feb_ml,mar_ml,apr_ml,may_ml,jun_ml,jul_ml,aug_ml,sep_ml,oct_ml,nov_ml,dec_ml} = req.body;
const aLeaves = parseInt(jan)+parseInt(feb)+parseInt(mar)+parseInt(apr)+parseInt(may)+parseInt(jun)+parseInt(jul)+parseInt(aug)+parseInt(sep)+parseInt(oct)+parseInt(nov)+parseInt(dec);
const mLeaves = parseInt(jan_ml)+parseInt(feb_ml)+parseInt(mar_ml)+parseInt(apr_ml)+parseInt(may_ml)+parseInt(jun_ml)+parseInt(jul_ml)+parseInt(aug_ml)+parseInt(sep_ml)+parseInt(oct_ml)+parseInt(nov_ml)+parseInt(dec_ml);
try {
  const inputData = new InputData2({
    year: year,
    cn: cn,
    clientName: clientName,
    name: name,
    cf: parseInt(cf),
    al: parseInt(al),
    ml: parseInt(ml),
    jan: parseInt(jan),
    feb: parseInt(feb),
    mar: parseInt(mar),
    apr: parseInt(apr),
    may: parseInt(may),
    jun: parseInt(jun),
    jul: parseInt(jul),
    aug: parseInt(aug),
    sep: parseInt(sep),
    oct: parseInt(oct),
    nov: parseInt(nov),
    dec: parseInt(dec),
    jan_ml: parseInt(jan_ml),
    feb_ml: parseInt(feb_ml),
    mar_ml: parseInt(mar_ml),
    apr_ml: parseInt(apr_ml),
    may_ml: parseInt(may_ml),
    jun_ml: parseInt(jun_ml),
    jul_ml: parseInt(jul_ml),
    aug_ml: parseInt(aug_ml),
    sep_ml: parseInt(sep_ml),
    oct_ml: parseInt(oct_ml),
    nov_ml: parseInt(nov_ml),
    dec_ml: parseInt(dec_ml),
    aLeaves: parseInt(al)-parseInt(aLeaves)+parseInt(cf),
    mLeaves: parseInt(ml)-parseInt(mLeaves),
  });
  await inputData.save();
  let a = fs.readFileSync("public/submitLeave.html")
  res.send(a.toString())
} catch (err) {
  console.error(err);
  res.status(500).send('Internal Server Error');
}
});

// Search
app.get('/searchLeave',authenticateStaff, (req, res) => {
res.sendFile(__dirname + '/public/searchLeave.html');
});

app.post('/searchLeave',authenticateStaff, (req, res) => {
const searchName = req.body.name;

InputData2.findOne({ name: searchName }).exec()
  .then(result => {
    if (result) {
      res.render('leave', { result: result });
    } else {
      res.render('leave', { error: "No data found for the given name." });
    }
  })
  .catch(err => {
    res.render('Please check the spelling');
  });
}); 

// Delete
app.get('/delete',authenticateStaff, (req, res) => {
res.sendFile(__dirname + '/public/delete.html');
});

app.post('/delete',authenticateStaff, async (req, res) => {
const nameToDelete = req.body.name;
try {
  const result = await InputData2.findOneAndDelete({ name: nameToDelete });
  if (result) {
    let a = fs.readFileSync("public/f.html");
    res.send(a.toString());
  } else {
    let b = fs.readFileSync("public/n.html")
    res.send(b.toString())
  }
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
});

//Update
app.get('/updateLeave',authenticateStaff,(req,res)=>{
res.sendFile(__dirname+'/public/updateLeave.html')
});

app.get('/viewLeaves', authenticateStaff,async (req, res) => {
  try {
    const result = await InputData2.find();
    res.render('viewLeaves', { result });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/getDetailsLeave', authenticateStaff, async (req, res) => {
const name = req.body.name;
try {
  const user = await InputData2.findOne({ name: name });
  if (user) {
    res.json(user);
  } else {
    res.json({ message: 'User not found' });
  }
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// Uploading to the drive ///////////////////////////////////////////////
const { google } = require('googleapis');


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({ version: 'v3', auth: oauth2Client });

app.use(express.urlencoded({ extended: true }));

// === Multer Setup (store uploaded files in /uploads) ===
const upload = multer({ dest: 'uploads/' });

let folderNam = 'MyDriveFolder';

let allFoldersParentId = '';

async function ensureAllFoldersParentExists() {
  allFoldersParentId = await getOrCreateFolderId('all_folders');
}

ensureAllFoldersParentExists().then(() => {
  console.log('✅ all_folders parent folder is ready.');
});


async function getOrCreateFolderId(folderName, parentFolderId = null) {
  const query = parentFolderId
    ? `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and '${parentFolderId}' in parents and trashed=false`
    : `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`;

  const res0 = await drive.files.list({
    q: query,
    fields: 'files(id, name)',
    spaces: 'drive',
  });

  if (res0.data.files.length > 0) {
    console.log(`Folder '${folderName}' already exists.`);
    return res0.data.files[0].id;
  }

  const createRes = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentFolderId ? [parentFolderId] : [],
    },
    fields: 'id',
  });

  return createRes.data.id;
}


// === Helper: Upload file to Drive ===
async function uploadFileToFolder(localPath, originalName, mimeType, folderId) {
  await drive.files.create({
    requestBody: {
      name: originalName,
      parents: [folderId],
      mimeType,
    },
    media: {
      mimeType,
      body: fs.createReadStream(localPath),
    },
  });
}

// === Serve HTML frontend ===
app.get('/uploadFile', (req, res) => {
  res.sendFile(__dirname+'/public/fileUpload.html')
});

//create folder

app.get('/createFolder', authenticate,(req, res) => {
  res.sendFile(__dirname+'/public/createFolder.html');
});

let folderId = '';


const { v4: uuidv4 } = require('uuid'); 
const { addFolderMapping, getFolderByLink } = require('./folderStore.js');

let folderName = '';
app.post('/createFolder', authenticate, upload.none(), async (req, res) => {
  try {
    folderNam = req.body.postName;

      for(let i=0;i<folderNam.length;i++){
        if(folderNam[i] === ' '){
          folderName += '_';
        }
        else{
          folderName+=folderNam[i];
        }
      }
      //folderId = await getOrCreateFolderId(folderName);
      folderId = await getOrCreateFolderId(folderName, allFoldersParentId);


    const linkId = uuidv4(); // unique identifier
    addFolderMapping(linkId, folderName, folderId); // Save to file

    const uploadLink = `${req.protocol}://${req.get('host')}/upload/${folderName}/${linkId}`;
    res.json({ message: `✅ Folder '${folderName}' is ready.`, uploadLink });
    folderName = ''; // Reset folderName for next use
    
  } catch (error) {
    console.error('Folder creation error:', error.message);
    res.status(500).json({ message: '❌ Failed to create folder.' });
  }
});

app.get('/upload/:folderName/:linkId', async (req, res) => {
  const folder = getFolderByLink(req.params.linkId);
  if (!folder) {
    return res.status(404).send('❌ Invalid or expired upload link.');
  }

  res.sendFile(__dirname + '/public/fileUpload.html');
});


app.post('/upload/:folderName/:linkId', upload.fields([{ name: 'files', maxCount: 50 }]), async (req, res) => {
  try {
    const linkId = req.params.linkId;

    const folder = getFolderByLink(linkId);

    if (!folder) {
      return res.status(400).json({ message: '❌ Invalid upload link.' });
    }

    const uploadedFiles = req.files['files'] || [];

    for (const file of uploadedFiles) {
      await uploadFileToFolder(file.path, file.originalname, file.mimetype, folder.folderId);
      fs.unlinkSync(file.path);
    }

    res.json({ message: `✅ Files uploaded to folder '${folder.folderName}'.` });
  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(500).json({ message: '❌ Upload failed.' });
  }
});


//////////////////////////////////////////display files////////////////////////////////////////////////////

app.get('/viewFiles', authenticate,(req, res) => {
  res.sendFile(__dirname+'/public/displayFiles.html');
});


app.get('/folders', authenticate, async (req, res) => {
  try {
    const parentId = allFoldersParentId;  // Get or create all_folders

    const response = await drive.files.list({
      q: `'${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
    });

    res.json(response.data.files);
  } catch (error) {
    console.error('Error listing subfolders:', error.message);
    res.status(500).json({ error: error.message });
  }
});


// List files inside a folder
app.get('/folders/:folderId/files', authenticate, async (req, res) => {
  const folderId = req.params.folderId;
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id, name, webViewLink, mimeType)'
    });
    res.json(response.data.files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download file
app.get('/download/:fileId', authenticate, async (req, res) => {
  const fileId = req.params.fileId;
  try {
    const fileMeta = await drive.files.get({ fileId, fields: 'name' });
    const fileName = fileMeta.data.name;

    const fileStream = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    fileStream.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

