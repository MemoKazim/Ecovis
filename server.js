require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const PORT = 8080;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

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

const upload = multer({ dest: "public/uploads/" });

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
app.get("/eng/index#section2", (req, res) => {
  //
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
  res.render("aze/index", { title: title });
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
  res.render("aze/about", { title: title });
});
app.get("/aze/employees", (req, res) => {
  res.render("aze/employees", { title: title });
});
app.get("/aze/partners", (req, res) => {
  res.render("aze/partners", { title: title });
});
app.get("/aze/services", (req, res) => {
  res.render("aze/services", { title: title });
});
app.get("/aze/news", (req, res) => {
  res.render("aze/news", { title: title });
});
app.get("/aze/career", (req, res) => {
  res.render("aze/career", { title: title });
});
app.get("/aze/contact", (req, res) => {
  res.render("aze/contact", { title: title });
});

app.listen(PORT, () => {
  console.log(`Server is open at ${PORT}`);
});

// UPLOAD SECTION

app.get("/uploadMember", (req, res) => {
  res.render("uploadMember", { title: "Admin Panel | Member" });
});

app.post("/uploadMember", upload.single("uploadedImage"), (req, res) => {
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
});
app.get("/uploadPartner", (req, res) => {
  res.render("uploadPartner", { title: "Admin Panel | Partner" });
});

app.post("/uploadPartner", upload.single("uploadedImage"), (req, res) => {
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
});
app.get("/uploadService", (req, res) => {
  Member.find({}, (err, memberResult) => {
    if (err) {
      console.log(err);
    } else {
      res.render("uploadService", {
        title: "Admin Panel | Services",
        members: memberResult,
      });
    }
  });
});

app.post("/uploadService", upload.single("uploadedImage"), (req, res) => {
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
});

app.get("/uploadNew", (req, res) => {
  res.render("uploadNew", { title: "Admin Panel | New" });
});

app.post("/uploadNew", upload.single("uploadedImage"), (req, res) => {
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
});
