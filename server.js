//
// ===================================================================
// ===========================| LIBRARIES |===========================
// ===================================================================
//
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const crypto = require("crypto");
const pbkdf2 = require("pbkdf2");
const validator = require("validator");
const PORT = 3000;
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

//
// ===================================================================
// ============================| DATABASE |===========================
// ===================================================================
//

mongoose.set("strictQuery", true);
new mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    console.log("DB successfully connected!");
  })
  .catch((err) => {
    console.log(err);
  });

//
// ===================================================================
// =============================| MODEL |=============================
// ===================================================================
//

const Contact = require("./models/contact");
const Member = require("./models/member");
const Partner = require("./models/partner");
const Service = require("./models/service");
const New = require("./models/new");
const User = require("./models/user");

const upload = multer({ dest: "public/uploads/" });

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//
// ===================================================================
// ==============================| ENG |==============================
// ===================================================================
//

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
    firstName: validator.escape(req.body.fname),
    lastName: validator.escape(req.body.lname),
    email: validator.escape(req.body.email),
    phoneNumber: validator.escape(req.body.phone),
    message: validator.escape(req.body.message),
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

//
// ===================================================================
// ==============================| AZE |==============================
// ===================================================================
//

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
    firstName: validator.escape(req.body.fname),
    lastName: validator.escape(req.body.lname),
    email: validator.escape(req.body.email),
    phoneNumber: validator.escape(req.body.phone),
    message: validator.escape(req.body.message),
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

//
// ===================================================================
// =============================| ADMIN |=============================
// ===================================================================
//

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    User.findOne({ username: username }, function (err, row) {
      if (err) {
        return cb(err);
      }
      if (!row) {
        return cb(null, false, {
          message: "Incorrect username or password.",
        });
      }
      crypto.pbkdf2(
        password,
        row.Salt,
        2023,
        32,
        "sha512",
        function (err, hashedPassword) {
          if (err) {
            return cb(err);
          }
          if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
          }
          return cb(null, row);
        }
      );
    });
  })
);

app.get("/admin", (req, res) => {
  res.render("admin/login", { title: "Log in" });
});

app.post(
  "/admin",
  passport.authenticate("local", {
    successRedirect: "/admin/users",
    failureRedirect: "/admin",
  })
);

//
// ====================================================================
// =============================| CREATE |=============================
// ====================================================================
//

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
    });
    console.log(req.body);
    if (typeof req.body.eduYear === "string") {
      newMember.education.push({
        year: req.body.eduYear,
        university: {
          az: req.body.eduUniversityAZ,
          en: req.body.eduUniversityEN,
        },
        faculty: {
          az: req.body.eduFacultyAZ,
          en: req.body.eduFacultyEN,
        },
      });
    } else if (typeof req.body.eduYear === "object") {
      for (let i = 0; i < req.body.eduYear.length; i++) {
        newMember.education.push({
          year: req.body.eduYear[i],
          university: {
            az: req.body.eduUniversityAZ[i],
            en: req.body.eduUniversityEN[i],
          },
          faculty: {
            az: req.body.eduFacultyAZ[i],
            en: req.body.eduFacultyEN[i],
          },
        });
      }
    }
    if (typeof req.body.expYear === "string") {
      newMember.experience.push({
        year: req.body.expYear,
        position: req.body.expPosition,
        organization: req.body.expOrganization,
      });
    } else if (typeof req.body.expYear === "object") {
      for (let i = 0; i < req.body.expYear.length; i++) {
        newMember.experience.push({
          year: req.body.expYear[i],
          position: req.body.expPosition[i],
          organization: req.body.expOrganization[i],
        });
      }
    }
    newMember
      .save()
      .then(() => {
        res.send("Member added to DB successfully :) ");
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
        res.render("admin/uploadService", {
          title: "Service",
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
    if (req.file === undefined) {
      let newNew = new New({
        title: {
          az: req.body.titleAZ,
          en: req.body.titleEN,
        },
        content: {
          az: req.body.contentAZ,
          en: req.body.contentEN,
        },
        date: req.body.date,
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
      let newNew = new New({
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
    }
  } else {
    res.redirect("/admin");
  }
});

//
// ====================================================================
// =============================| DELETE |=============================
// ====================================================================
//

app.get("/admin/delete/:collection/:id", (req, res) => {
  if (req.isAuthenticated()) {
    eval(req.params.collection).findByIdAndRemove(
      req.params.id,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(`Member should be deleted ${req.params.id}`);
          res.redirect(`/admin/${req.params.collection}s`);
        }
      }
    );
  } else {
    res.redirect("/admin");
  }
});

//
// ====================================================================
// =============================| UPDATE |=============================
// ====================================================================
//

app.get("/admin/update/:collection/:id", (req, res) => {
  if (req.isAuthenticated()) {
    eval(req.params.collection).findById(req.params.id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        Member.find({}, (err, resultMember) => {
          res.render(`admin/update${req.params.collection}`, {
            title: req.params.collection,
            current: result,
            members: resultMember,
          });
        });
      }
    });
  } else {
    res.redirect("/admin");
  }
});

app.post("/admin/update/Member/:id", (req, res) => {
  if (req.isAuthenticated()) {
    Member.findByIdAndUpdate(
      req.params.id,
      { UPDATES: "updates" },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("User updated!");
        }
      }
    );
  } else {
    res.redirect("/admin");
  }
});
app.post("/admin/update/User/:id", (req, res) => {
  if (req.isAuthenticated()) {
    const salt = crypto.randomBytes(32);
    User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        hashed_password: pbkdf2.pbkdf2Sync(
          req.body.password,
          salt,
          2023,
          32,
          "sha512"
        ),
        Salt: salt,
      },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.write("<h1>User updated!</h1>");
        }
      }
    );
  } else {
    res.redirect("/admin");
  }
});
app.post(
  "/admin/update/New/:id",
  upload.single("uploadedImage"),
  (req, res) => {
    if (req.isAuthenticated()) {
      if (req.file === undefined) {
        New.findByIdAndUpdate(
          req.params.id,
          {
            title: {
              az: req.body.titleAZ,
              en: req.body.titleEN,
            },
            content: {
              az: req.body.contentAZ,
              en: req.body.contentEN,
            },
            date: req.body.date,
          },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("New updated!");
            }
          }
        );
      } else {
        New.findByIdAndUpdate(
          req.params.id,
          {
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
          },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("New updated!");
            }
          }
        );
      }
    } else {
      res.redirect("/admin");
    }
  }
);
app.post(
  "/admin/update/Partner/:id",
  upload.single("uploadedImage"),
  (req, res) => {
    if (req.isAuthenticated()) {
      if (req.file === undefined) {
        Partner.findByIdAndUpdate(
          req.params.id,
          {
            name: req.body.name,
            website: req.body.website,
            details: {
              az: req.body.detailsAZ,
              en: req.body.detailsEN,
            },
          },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("Partner updated!");
            }
          }
        );
      } else {
        Partner.findByIdAndUpdate(
          req.params.id,
          {
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
          },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("Partner updated!");
            }
          }
        );
      }
    } else {
      res.redirect("/admin");
    }
  }
);
app.post("/admin/update/Service/:id", (req, res) => {
  if (req.isAuthenticated()) {
    if (req.file === undefined) {
      console.log("NO IMAGE UPLOADED");
      console.log(req.body);
      Service.findByIdAndUpdate(
        req.params.id,
        {
          name: {
            az: req.body.nameAZ,
            en: req.body.nameEN,
          },
          details: {
            az: req.body.detailsAZ,
            en: req.body.detailsEN,
          },
          responsibleMembers: req.body.responsibleMembers,
        },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Service updated!");
          }
        }
      );
    } else {
      Service.findByIdAndUpdate(
        req.params.id,
        {
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
        },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Service updated!");
          }
        }
      );
    }
  } else {
    res.redirect("/admin");
  }
});

//
// ====================================================================
// ==============================| READ |==============================
// ====================================================================
//

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
          Member.find({}, (err, resultMember) => {
            res.render(`admin/${req.params.collection}`, {
              title:
                req.params.collection.charAt(0).toUpperCase() +
                req.params.collection.slice(1),
              collections: collection_names,
              current: resultCollection,
              members_data: resultMember,
            });
          });
        }
      });
    });
  } else {
    res.redirect("/admin");
  }
});

app.get("/admin/detail/Contact/:id", (req, res) => {
  if (req.isAuthenticated()) {
    Contact.findById(req.params.id, (err, resultData) => {
      if (err) {
        throw err;
      }
      res.render(`admin/detailContact`, {
        title: "Contact",
        contact: resultData,
      });
    });
  } else {
    res.redirect("/admin");
  }
});

app.get("/admin/detail/Member/:id", (req, res) => {
  if (req.isAuthenticated()) {
    Member.findById(req.params.id, (err, resultData) => {
      if (err) {
        throw err;
      }
      res.render(`admin/detailMember`, {
        title: "Member",
        member: resultData,
      });
    });
  } else {
    res.redirect("/admin");
  }
});

app.get("/admin/detail/New/:id", (req, res) => {
  if (req.isAuthenticated()) {
    New.findById(req.params.id, (err, resultData) => {
      if (err) {
        throw err;
      }
      res.render(`admin/detailNew`, {
        title: "New",
        news: resultData,
      });
    });
  } else {
    res.redirect("/admin");
  }
});

app.get("/admin/detail/Partner/:id", (req, res) => {
  if (req.isAuthenticated()) {
    Partner.findById(req.params.id, (err, resultData) => {
      if (err) {
        throw err;
      }
      res.render(`admin/detailPartner`, {
        title: "Partner",
        partner: resultData,
      });
    });
  } else {
    res.redirect("/admin");
  }
});

app.get("/admin/detail/Service/:id", (req, res) => {
  if (req.isAuthenticated()) {
    Service.findById(req.params.id, (err, resultData) => {
      if (err) {
        throw err;
      }
      Member.find({}, (err, resultMember) => {
        if (err) {
          throw err;
        }
        res.render(`admin/detailService`, {
          title: "Service",
          service: resultData,
          members: resultMember,
        });
      });
    });
  } else {
    res.redirect("/admin");
  }
});
// app.get("/register", (req, res) => {
//   res.render("admin/login_tmp");
// });
// app.post("/register", (req, res) => {
//   const salt = crypto.randomBytes(32);
//   const user = new User({
//     username: req.body.usrname,
//     hashed_password: pbkdf2.pbkdf2Sync(
//       req.body.passwd,
//       salt,
//       2023,
//       32,
//       "sha512"
//     ),
//     Salt: salt,
//   });
//   user.save();
//   res.send("User saved!");
//   res.redirect("/admin");
// });
app.get("*", (req, res) => {
  res.render("eng/404", { title: "404" });
});

app.listen(PORT, () => {
  console.log(`Server is open at ${PORT}`);
});
