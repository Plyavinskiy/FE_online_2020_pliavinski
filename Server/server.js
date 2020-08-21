//initialize global variable with our path
global.ABSPATH = __dirname;
global.INCPATH = ABSPATH + "/libs";

const path = require("path"); //helps to establish the right ways
const express = require("express"); //the framework itself - the shell over the node JS
const app = express(); //create our application
const config = require(INCPATH + "/config"); //our common config
const log = require(INCPATH + "/log")(module); //log is a function. which is called with the current model to which
// it is connected
const cors = require("cors"); //https://github.com/expressjs/cors
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./config/swagger.yaml");
const fs = require("fs");
const uuidv4 = require('uuid/v4');
const formidable = require('formidable');
const db = require("./libs/mongoose");
const bodyParser = require('body-parser');
let list;

function writePosts(posts) {
  fs.writeFileSync('./config/articles.json', JSON.stringify(posts));
}

fs.readFile("./config/articles.json", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  list = data;
  list = JSON.parse(list);
});


// const apiConfig = require(ABSPATH + '/api');
// app.use ->  this is middleware
app.use(cors());
// app.use('/api', apiConfig);
app.use(express.static(__dirname)); //reading static files
app.use(express.json()); //initialize json parser
app.use(express.urlencoded({
  extended: true
})); //pars url
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//getting static file
app.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.post('/api/create-article', function (req, res) {
  log.info('==Save article==');
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let file = files.preview;
    var oldpath = file.path;
    var preview = `images/${uuidv4()}.jpg`;
    fs.rename(oldpath, preview, function (err) {
      if (err) {
        throw err;
      } else {
        fields.preview = 'http://localhost:3000/' + preview;
        db.ArticleModel.create(fields, function (err, doc) {
          if (err) {
            return console.log(err);
          } else {
            res.end(JSON.stringify({id: doc._id}))
          }
        });
      }
    });
  });
});

app.get("/api/list", function (req, res) {
  log.info("==Get all list articles==");
  db.ArticleModel.find({}, function (err, docs) {
    if (err) {
      log.info("Fail");
    } else {
      log.info("Success");
      res.end(JSON.stringify(docs))
    }
  });
});

app.get("/api/list/:id", function (req, res) {
  log.info("==Get article by id==");
  db.ArticleModel.findOne({
    _id: req.params.id
  }, function (err, docs) {
    if (err) {
      res.status(400)
      res.end(JSON.stringify(`Article with [id == ${req.params.id}] not founded!`));
    } else {
      res.end(JSON.stringify(docs))
    }
  });

});

app.put("/api/list/:id", function (req, res) {
  log.info("==Update article by id==");
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    log.info(JSON.stringify(fields));
    let file = files.preview;
    log.info(JSON.stringify(file));

    if (file.size > 0) {
      var oldpath = file.path;
      var preview = `images/${uuidv4()}.jpg`;
      fs.rename(oldpath, preview, function (err) {
        if (err) {
          throw err;
        } else {
          fields.preview = 'http://localhost:3000/' + preview;
          db.ArticleModel.updateOne({
            _id: fields._id
          }, fields, function (err, doc) {
            if (err) {
              return console.log(err);
            } else {
              res.end(JSON.stringify({id: fields._id}))
            }
          });
        }
      });
    } else {
      db.ArticleModel.updateOne({
        _id: fields._id
      }, fields, function (err, doc) {
        if (err) {
          return console.log(err);
        } else {
          res.end(JSON.stringify({id: fields._id}))
        }
      });
    }
  });

});

app.delete("/api/list/:id", function (req, res) {
  log.info('==Delete article by id==');
  db.ArticleModel.deleteOne({
    _id: req.params.id
  }, function (err, result) {
    if (err) {
      res.status(400)
      res.end(JSON.stringify(`Article with [id == ${req.params.id}] not founded!`));
    } else {
      res.end(JSON.stringify(`Article with [id == ${req.params.id}] deleted!`));
    }
  });

});
app.delete("/api/list", function (req, res) {
  log.info('==Delete all article==');
  db.ArticleModel.deleteMany({}, function (err, result) {
    if (err) {
      res.status(400)
      res.end(JSON.stringify(`Error: ${err}`));
    } else {
      res.end(JSON.stringify(`All articles deleted!`));
    }
  });
});

//listen our post, 3000
app.listen(config.get("port"), function () {
  log.info("Server start running on port " + config.get("port"));
});
