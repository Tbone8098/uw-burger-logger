var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");


var app = express();


// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;


// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// ===============================================================
// ==================== LOGIN CREDS ==============================
// ===============================================================


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "your-database-name"
});


// ===============================================================
// ==================== SERVER CONNECTION ========================
// ===============================================================


connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }


    console.log("connected as id " + connection.threadId);
});


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});



// ===============================================================
// ==================== ROUTES ===================================
// ===============================================================


app.get('/', (req, res) => {
    connection.query("SELECT * FROM watch_list", (err, data) => {
        if (err) {
            res.status(500).end()
        }
        res.render('index', { handlebar_name: data })
    })
})




// ===============================================================
// ==================== CRUD COMMANDS ============================
// ===============================================================


// ************************ C


app.post("/api/your-table", (req, res) => {
    connection.query("INSERT INTO your-table SET ?",
        {
            column- name: req.body.column - name,
        }, (err, result) => {
    if (err) {
        return res.status(500).end();
    }


    // Send back the ID of the new plan
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
});
});


// ************************ R


app.get('/api/your-table', (req, res) => {
    connection.query("SELECT * FROM plan", (err, data) => {
        if (err) {
            return res.status(500).end()
        }
        return res.json(data);
    })
})


// ************************ U


app.put("/api/your-table/:id", (req, res) => {
    connection.query("UPDATE your-table SET plan = ? WHERE id = ?", [req.body.plan,
    req.params.id], (err, result) => {
        if (err) {
            // If an error occurred, send a generic server failure
            return res.status(500).end();
        }
        else if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();
    });
});


// ************************ D


app.delete("/api/your-table/:id", (req, res) => {
    connection.query("DELETE FROM your-table WHERE id = ?", [req.params.id], (err,
        result) => {
        if (err) {
            // If an error occurred, send a generic server failure
            return res.status(500).end();
        }
        else if (result.affectedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();
    });
})