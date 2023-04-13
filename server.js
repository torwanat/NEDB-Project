const express = require("express");
const hbs = require("express-handlebars");
const app = express();
const PORT = 3000;
const path = require("path");
const context = require("./data/data.json");
const Datastore = require('nedb');

const collection = new Datastore({
    filename: './data/kolekcja.db',
    autoload: true
})

app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    helpers: {
        formatHelper: function (data) {
            switch (data) {
                case "no":
                    return "NIE";
                case "yes":
                    return "TAK";
                default:
                    return "BRAK DANYCH";
            }
        },
    },
    extname: '.hbs',
    partialsDir: "views/partials",
}));
app.set('view engine', 'hbs');
app.use(express.static('static'));

app.get('/', function (req, res) {
    res.render("index.hbs", context);
});

app.get('/add', function (req, res) {
    const addContext = {
        subject: "Add cars page",
        message: ""
    }
    res.render("add.hbs", addContext);
});

app.post('/addCar', function (req, res) {
    let addContext;

    const document = {
        insurance: req.body.insurance === "on" ? "yes" : "no",
        gasoline: req.body.gasoline === "on" ? "yes" : "no",
        damaged: req.body.damaged === "on" ? "yes" : "no",
        fourWheels: req.body.fourWheels === "on" ? "yes" : "no",
    }

    collection.insert(document, (err, newDoc) => {
        addContext = {
            subject: "Add cars page",
            message: "Dodano samochód o id " + newDoc._id
        }
        res.render("add.hbs", addContext);
    })
});

app.get('/list', function (req, res) {
    collection.find({}, (err, docs) => {
        const listContext = {
            subject: "List cars page",
            content: docs
        }
        res.render("list.hbs", listContext);
    });
});

app.post('/deleteCar', function (req, res) {
    collection.remove({ _id: req.body.deleteBtn }, {}, function (err, numRemoved) {
        collection.find({}, (err, docs) => {
            const listContext = {
                subject: "List cars page",
                content: docs
            }
            res.render("list.hbs", listContext);
        });
    });
});

app.get('/edit', function (req, res) {
    collection.find({}, (err, docs) => {
        const listContext = {
            subject: "Edit cars page",
            content: docs.map(e => {
                let tmp = {
                    insurance: e.insurance,
                    gasoline: e.gasoline,
                    damaged: e.damaged,
                    fourWheels: e.fourWheels,
                    _id: e._id,
                    editing: false
                }
                return tmp
            })
        }
        res.render("edit.hbs", listContext);
    });
});

app.post('/editCar', function (req, res) {
    collection.find({}, (err, docs) => {
        const listContext = {
            subject: "Edit cars page",
            content: docs.map(e => {
                let tmp = {
                    insurance: e.insurance,
                    gasoline: e.gasoline,
                    damaged: e.damaged,
                    fourWheels: e.fourWheels,
                    _id: e._id,
                    editing: e._id === req.body.editBtn
                }
                return tmp
            })
        }
        res.render("edit.hbs", listContext);
    });
});

app.post('/updateCar', function (req, res) {
    const tmpObj = {
        insurance: req.body.insurance,
        gasoline: req.body.gasoline,
        damaged: req.body.damaged,
        fourWheels: req.body.fourWheels,
    }
    collection.update({ _id: req.body.btnUpdate }, { $set: tmpObj }, {}, function (err, numUpdated) {
        collection.find({}, (err, docs) => {
            const listContext = {
                subject: "Edit cars page",
                content: docs.map(e => {
                    const tmp = {
                        insurance: e.insurance,
                        gasoline: e.gasoline,
                        damaged: e.damaged,
                        fourWheels: e.fourWheels,
                        _id: e._id,
                        editing: false
                    }
                    return tmp
                })
            }
            res.render("edit.hbs", listContext);
        });
    });
});

app.post('/cancelUpdate', function (req, res) {
    collection.find({}, (err, docs) => {
        const listContext = {
            subject: "Edit cars page",
            content: docs.map(e => {
                let tmp = {
                    insurance: e.insurance,
                    gasoline: e.gasoline,
                    damaged: e.damaged,
                    fourWheels: e.fourWheels,
                    _id: e._id,
                    editing: false
                }
                return tmp
            })
        }
        res.render("edit.hbs", listContext);
    });
});

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
});