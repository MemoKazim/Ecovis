require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const session = require("express-session");
const passport = require("passport");
// const bcrypt = require("bcrypt");
const passportLocalMongoose = require("passport-local-mongoose");
const PORT = 8080;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// DATABASE CONNECT
mongoose.set("strictQuery", true);
new mongoose.connect(
  "mongodb+srv://" +
    process.env.MONGO_USR +
    ":" +
    process.env.MONGO_PASS +
    "@ecovisdb.ln5ss4p.mongodb.net/" +
    process.env.MONGO_DB_NAME
)
  .then(() => {
    console.log("DB successfully connected!");
  })
  .catch((err) => {
    console.log(err);
  });

// MODELS
const Contact = require("./models/contact");
const Member = require("./models/member");
const Partner = require("./models/partner");
const Service = require("./models/service");
const New = require("./models/new");
const User = require("./models/user");

const upload = multer({ dest: "public/uploads/" });

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.redirect("/eng/index");
});

app.get("/eng", (req, res) => {
  res.redirect("/eng/index");
});

app.get("/eng/index", (req, res) => {
  Partner.find({}, (err, partnerResult) => {
    Service.find({}, (err, serviceResult) => {
      res.render("eng/index", {
        title: "Home",
        partners: partnerResult,
        services: serviceResult,
      });
    });
  });
});

app.post("/eng/success", (req, res) => {
  const contact = new Contact({
    firstName: req.body.fname,
    lastName: req.body.lname,
    email: req.body.email,
    phoneNumber: req.body.phone,
    message: req.body.message,
  });
  contact
    .save()
    .then(() => {
      res.render("eng/success");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/eng/about", (req, res) => {
  res.render("eng/about", { title: "About" });
});
app.get("/eng/employees", (req, res) => {
  Member.find({}, (err, memberResult) => {
    if (err) {
      console.log(err);
    } else {
      res.render("eng/employees", {
        title: "Employees",
        AllMembers: memberResult,
      });
    }
  });
});
app.get("/eng/employees/members/:id", (req, res) => {
  Member.findById(req.params.id, (err, memberResult) => {
    if (err) {
      console.log(err);
    } else {
      res.render("eng/member", { title: "Member", singleMember: memberResult });
    }
  });
});
app.get("/eng/partners", (req, res) => {
  Partner.find({}, (err, partnerResult) => {
    if (err) {
      console.log(err);
    } else {
      res.render("eng/partners", {
        title: "Partners",
        partners: partnerResult,
      });
    }
  });
});
app.get("/eng/partners/:id", (req, res) => {
  Partner.findById(req.params.id, (err, partnerResult) => {
    if (err) {
      console.log(err);
    } else {
      res.render("eng/partners", {
        title: "Partner",
        partners: partnerResult,
      });
    }
  });
});
app.get("/eng/services", (req, res) => {
  Service.find({}, (err, serviceResult) => {
    if (err) {
      console.log(err);
    } else {
      res.render("eng/services", {
        title: "Services",
        services: serviceResult,
      });
    }
  });
});
app.get("/eng/services/:id", (req, res) => {
  Service.findById(req.params.id, (err, serviceResult) => {
    if (err) {
      console.log(err);
    } else {
      Member.find({}, (err, memberResult) => {
        res.render("eng/service", {
          title: "Service",
          service: serviceResult,
          members: memberResult,
        });
      });
    }
  });
});
app.get("/eng/news", (req, res) => {
  New.find({}, (err, newResult) => {
    if (err) {
      console.log(err);
    } else {
      res.render("eng/news", { title: "News", news: newResult });
    }
  });
});
app.get("/eng/news/:id", (req, res) => {
  New.findById(req.params.id, (err, newResult) => {
    if (err) {
      console.log(err);
    } else {
      res.render("eng/new", { title: "New", singleNew: newResult });
    }
  });
});
app.get("/eng/career", (req, res) => {
  res.render("eng/career", { title: "Career" });
});
app.get("/eng/contact", (req, res) => {
  res.render("eng/contact", { title: "Contact" });
});

// AZE PATTERNS

app.get("/aze/index", (req, res) => {
  Partner.find({}, (err, partnerResult) => {
    Service.find({}, (err, serviceResult) => {
      res.render("aze/index", {
        title: "Əsas Səhifə",
        partners: partnerResult,
        services: serviceResult,
      });
    });
  });
});

app.post("/aze/success", (req, res) => {
  const contact = new Contact({
    firstName: req.body.fname,
    lastName: req.body.lname,
    email: req.body.email,
    phoneNumber: req.body.phone,
    message: req.body.message,
  });
  contact
    .save()
    .then(() => {
      res.render("aze/success");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/aze/about", (req, res) => {
  res.render("aze/about", { title: "Haqqımızda" });
});
app.get("/aze/employees", (req, res) => {
  Member.find({}, (err, memberResult) => {
    if (err) {
      console.log(err);
    } else {
      res.render("aze/employees", {
        title: "İşçilər",
        AllMembers: memberResult,
      });
    }
  });
});
app.get("/aze/employees/members/:id", (req, res) => {
  Member.findById(req.params.id, (err, memberResult) => {
    if (err) {
      console.log(err);
    } else {
      res.render("aze/member", { title: "Üzv", singleMember: memberResult });
    }
  });
});
app.get("/aze/partners", (req, res) => {
  Partner.find({}, (err, partnerResult) => {
    if (err) {
      console.log(err);
    } else {
      res.render("aze/partners", {
        title: "Tərədaşlar",
        partners: partnerResult,
      });
    }
  });
});
app.get("/aze/partners/:id", (req, res) => {
  Partner.findById(req.params.id, (err, partnerResult) => {
    if (err) {
      console.log(err);
    } else {
      res.render("aze/partners", {
        title: "Tərəfdaş",
        partners: partnerResult,
      });
    }
  });
});
app.get("/aze/services", (req, res) => {
  Service.find({}, (err, serviceResult) => {
    if (err) {
      console.log(err);
    } else {
      res.render("aze/services", {
        title: "Xidmətləmiz",
        services: serviceResult,
      });
    }
  });
});
app.get("/aze/services/:id", (req, res) => {
  Service.findById(req.params.id, (err, serviceResult) => {
    if (err) {
      console.log(err);
    } else {
      Member.find({}, (err, memberResult) => {
        res.render("aze/service", {
          title: "Xidmət",
          service: serviceResult,
          members: memberResult,
        });
      });
    }
  });
});
app.get("/aze/news", (req, res) => {
  New.find({}, (err, newResult) => {
    if (err) {
      console.log(err);
    } else {
      res.render("aze/news", { title: "Xəbərlər", news: newResult });
    }
  });
});
app.get("/aze/news/:id", (req, res) => {
  New.findById(req.params.id, (err, newResult) => {
    if (err) {
      console.log(err);
    } else {
      res.render("aze/new", { title: "Xəbər", singleNew: newResult });
    }
  });
});
app.get("/aze/career", (req, res) => {
  res.render("aze/career", { title: "Kariyera" });
});
app.get("/aze/contact", (req, res) => {
  res.render("aze/contact", { title: "Əlaqə" });
});

// ADMIN

app.get("/admin/uploadMember", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("admin/uploadMember", { title: "Member" });
  } else {
    res.redirect("/admin");
  }
});

app.post("/admin/uploadMember", upload.single("uploadedImage"), (req, res) => {
  if (req.isAuthenticated()) {
    const newMember = new Member({
      fname: {
        az: req.body.fnameAZ,
        en: req.body.fnameEN,
      },

      lname: {
        az: req.body.lnameAZ,
        en: req.body.lnameEN,
      },
      email: req.body.email,
      position: req.body.position,
      image: {
        data: req.file.filename,
        contentType: "image/png",
      },
      memberType: req.body.memberType,
      education: [
        {
          year: req.body.eduYear,
          university: {
            az: req.body.eduUniversityAZ,
            en: req.body.eduUniversityEN,
          },
          faculty: {
            az: req.body.eduFacultyAZ,
            en: req.body.eduFacultyEN,
          },
        },
      ],
      experience: [
        {
          year: req.body.expYear,
          position: req.body.expPosition,
          organization: req.body.expOrganization,
        },
      ],
    });
    newMember
      .save()
      .then(() => {
        console.log("Member saved in DB");
        res.send("Member saved in DB");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.redirect("/admin");
  }
});
app.get("/admin/uploadPartner", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("admin/uploadPartner", { title: "Partner" });
  } else {
    res.redirect("/admin");
  }
});

app.post("/admin/uploadPartner", upload.single("uploadedImage"), (req, res) => {
  if (req.isAuthenticated()) {
    const newPartner = new Partner({
      name: req.body.name,
      website: req.body.website,
      details: {
        az: req.body.detailsAZ,
        en: req.body.detailsEN,
      },
      image: {
        data: req.file.filename,
        contentType: "image/png",
      },
    });
    newPartner
      .save()
      .then(() => {
        console.log("Partner saved in DB");
        res.send("Partner saved in DB");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.redirect("/admin");
  }
});
app.get("/admin/uploadService", (req, res) => {
  if (req.isAuthenticated()) {
    Member.find({}, (err, memberResult) => {
      if (err) {
        console.log(err);
      } else {
        res.render("uploadService", {
          title: "Services",
          members: memberResult,
        });
      }
    });
  } else {
    res.redirect("/admin");
  }
});

app.post("/admin/uploadService", upload.single("uploadedImage"), (req, res) => {
  if (req.isAuthenticated()) {
    const newService = new Service({
      name: {
        az: req.body.nameAZ,
        en: req.body.nameEN,
      },
      details: {
        az: req.body.detailsAZ,
        en: req.body.detailsEN,
      },
      image: {
        data: req.file.filename,
        contentType: "image/png",
      },
      responsibleMembers: req.body.responsibleMembers,
    });
    newService
      .save()
      .then(() => {
        console.log("Service saved in DB");
        res.send("Service saved in DB");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.redirect("/admin");
  }
});

app.get("/admin/uploadNew", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("admin/uploadNew", { title: "New" });
  } else {
    res.redirect("/admin");
  }
});

app.post("/admin/uploadNew", upload.single("uploadedImage"), (req, res) => {
  if (req.isAuthenticated()) {
    const newNew = new New({
      title: {
        az: req.body.titleAZ,
        en: req.body.titleEN,
      },
      content: {
        az: req.body.contentAZ,
        en: req.body.contentEN,
      },
      date: req.body.date,
      image: {
        data: req.file.filename,
        contentType: "image/png",
      },
    });
    newNew
      .save()
      .then(() => {
        console.log("New saved in DB");
        res.send("New saved in DB");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.redirect("/admin");
  }
});

app.get("/admin", (req, res) => {
  res.render("admin/login", { title: "Log in" });
});

app.post("/admin", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  let collection_names = [];
  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        mongoose.connection.db.listCollections().toArray((err, collections) => {
          collections.forEach((collection) => {
            collection_names.push(collection.name);
          });
          res.status(200).render("admin/adminPanel", {
            title: "",
            collections: collection_names,
          });
        });
      });
    }
  });
});
app.get("/admin/:collection", (req, res) => {
  if (req.isAuthenticated()) {
    let collection_names = [];
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      collections.forEach((collection) => {
        collection_names.push(collection.name);
      });
      eval(
        req.params.collection.charAt(0).toUpperCase() +
          req.params.collection.slice(1, -1)
      ).find({}, (error, resultCollection) => {
        if (error) {
          console.log(error);
        } else {
          res.render(`admin/${req.params.collection}`, {
            title: req.params.collection,
            collections: collection_names,
            current: resultCollection,
          });
        }
      });
    });
  } else {
    res.redirect("/admin");
  }
});

app.listen(PORT, () => {
  console.log(`Server is open at ${PORT}`);
});
