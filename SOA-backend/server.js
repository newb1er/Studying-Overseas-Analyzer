var mysql = require("mysql");
var express = require("express");
var http = require("http");
var request = require("request");
var cors = require("cors");
var app = express();

// add cors policy
app.use(cors());
//將request進來的 data 轉成 json()
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// db
var conn = mysql.createConnection({
  host: "studyabroaddash.mysql.database.azure.com",
  user: "user@studyabroaddash",
  password: "DB_finPro",
  database: "data",
  port: 3306,
});
conn.connect(function (err) {
  if (err) throw err;
  console.log("DB connected");
});

setInterval((_) => {
  conn.query("SELECT 1");
}, 60000);

// require outbound exchange college list
app.get("/get_outbound_college", function (req, res) {
  // fix CORS problem
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  conn.query("SELECT * FROM outbound_pref", function (error, results, fields) {
    if (error) throw error;
    console.log("college data sent");
    return res.send({
      error: false,
      data: results,
      message: "GetOutboundCollege: success",
    });
  });
});

// require detail of outbound exchange college
app.get("/get_outbound_college_detail", (req, res) => {
  conn.query("SELECT * FROM outbound_detail", (error, results, fields) => {
    if (error) throw error;
    console.log("GetOutboundCollegeDetail: data sent");
    return res.send({
      error: false,
      data: results,
      message: "GetOutboundCollegeDetail: success",
    });
  });
});

app.get("/get_outbound_rank_detail", (req, res) => {
  conn.query("SELECT * FROM outbound_rank_detail", (error, results, fields) => {
    if (error) throw error;
    console.log("GetOutboundRankDetail: data sent");
    return res.send({
      error: false,
      data: results,
      message: "GetOutboundRankDetail: success",
    });
  });
});

// get others info of outbound exchange college list
app.get("/get_outbound_others", (req, res) => {
  conn.query("SELECT * FROM `outbound_others`", (error, results, fields) => {
    if (error) throw new Error(error);
    console.log("GetOutboundOthers: data sent");
    return res.send({
      error: false,
      data: results,
      message: "GetOutboundOthers: success",
    });
  });
});

// require world college rank
app.get("/get_rank_college", (req, res) => {
  conn.query("SELECT * FROM rank_college_pref", (error, results, fields) => {
    if (error) throw error;
    console.log("rank college data sent");
    return res.send({
      error: false,
      data: results,
      message: "GetRankCollege: success",
    });
  });
});

// require detail of world college rank
app.get("/get_rank_college_detail", (req, res) => {
  conn.query(
    "SELECT * FROM rank_college_pref_detail",
    (error, results, fields) => {
      if (error) throw error;
      console.log("GetRankCollegeDetail: data sent");
      return res.send({
        error: false,
        data: results,
        message: "GetRankCollegeDetail: success",
      });
    }
  );
});

// get others info of rank college list
app.get("/get_rank_others", (req, res) => {
  conn.query("SELECT * FROM `others`", (error, results, fields) => {
    if (error) throw new Error(error);
    console.log("GetRankOthers: data sent");
    return res.send({
      error: false,
      data: results,
      message: "GetRankOthers: success",
    });
  });
});

// get country list
app.get("/get_countries", function (req, res) {
  conn.query(
    "SELECT country AS name FROM outbound_available",
    function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: "country list" });
    }
  );
});

app.get("/get_user_preference", function (req, res) {
  // fix CORS problem
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  conn.query(
    "SELECT country AS name FROM user_preference WHERE id_user = 1",
    (error, results, fields) => {
      if (error) throw error;
      return res.send({ error: false, data: results, message: "user pref." });
    }
  );
});

async function getCurrentUserPreference() {
  return new Promise((resolve) => {
    conn.query(
      "SELECT country FROM user_preference WHERE id_user=1",
      (error, results, fields) => {
        resolve(JSON.parse(JSON.stringify(results)));
      }
    );
  });
}

app.post("/update_user_preference", function (req, res) {
  console.log("UpdateCurrentUserPreference: new connectiontion");
  // fix CORS problem
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  var data = req.body;
  getCurrentUserPreference().then((resolve) => {
    var curr = resolve.map((obj) => Object.values(obj)[0]);
    /*
            add = data - curr (EXCEPT)
            del = curr - data  (EXCEPT)
        */
    var add = data.filter((item) => {
      return !curr.some((val) => item === val);
    });
    var del = curr.filter((item) => {
      return !data.some((val) => item === val);
    });

    console.log("UpdateCurrentUserPreference: curr: " + curr);
    console.log("UpdateCurrentUserPreference: add: " + add);
    console.log("UpdateCurrentUserPreference: del: " + del);
    add.forEach(function (element) {
      conn.query(
        "INSERT INTO user_preference (country, id_user) VALUES (?, ?)",
        [element, 1],
        (error) => {
          if (error) throw error;
        }
      );
    });
    del.forEach((element) => {
      conn.query(
        "DELETE FROM user_preference WHERE country=?",
        element,
        (error) => {
          if (error) throw error;
        }
      );
    });

    res.send({ error: false, message: "user preference updated" });
  });
});

app.get("/get_covid", (req, res) => {
  var code = req.body.code;
  var url = `https://api.covid19api.com/summary`;
  var options = {
    method: "GET",
    url: "https://api.covid19api.com/summary",
    headers: {},
  };
  request(options, (error, response) => {
    if (error) throw new Error(error);
    var d = JSON.parse(response.body);
    /*
    d.Countries.forEach((e) => {
      var param = [
        e.CountryCode,
        e.TotalConfirmed,
        e.TotalDeaths,
        e.TotalRecovered,
        e.Date.slice(0,19).replace('T', ' ')
      ];
      conn.query(
        "INSERT INTO covid_real_time SET code=?, total_confirmed=?, total_death=?, total_recovered=?, updated_date=?",
        param,
        (error) => {
          if (error) throw error;
        }
      );
    });
    */
    res.send({ error: false, data: d, message: "" });
  });
});

// listen on 5000 port
let port = process.env.PORT;
if(port == null || port == "") port = 8000;
app.listen(5000, function () {
  console.log("Node app is running on port 5000");
});
