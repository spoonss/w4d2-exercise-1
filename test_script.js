const pg = require("pg");
const settings = require("./settings"); // settings.json
const argv = process.argv.slice(2).join();

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

// client.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
//   client.query("SELECT * FROM famous_people", (err, result) => {
//     console.log(result);
//     if (err) {
//       return console.error("error running query", err);
//     }
//     console.log(result.rows[0].number); //output: 1
//     client.end();
//   });
// });


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query('SELECT * FROM famous_people where first_name LIKE $1', [`%${argv}%`], (err, result) => {
    console.log(result.rows);
    if (err) {
      return console.error("error running query", err);
    }
    client.end();

  });

}); 




// const client = new Client({database: "hockey"});

// const query = "SELECT * FROM famous_people";

// const queryHandler = (err, res) => {
//   console.log(res);
//     if (err) return "Query error!";
//     res.rows.forEach(ele =>{
//         if(argv = row[ele].first_name){
//         console.log(row[ele].first_name);}
//     })
// };


// function runQuery (query, cb, values = []){
//     client.query(query, values, cb);
// }

// function runQuery (query, cb){
//   console.log(query);
//   client.query(query, cb);
// }

// runQuery(query, queryHandler);









