const pg = require("pg");
const settings = require("./settings"); // settings.json
const argv = process.argv.slice(2).join();
var moment = require('moment');

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }


  client.query('SELECT * FROM famous_people where first_name LIKE $1', [`%${argv}%`], (err, result) => {
    console.log("Searching ...");
    console.log(`Found ${result.rowCount} person(s) by the name '${argv}':`)

    result.rows.forEach(function(ele){
        console.log(`- ${ele.id}: ${ele.first_name} ${ele.last_name}, born`, moment(ele.birthdate).format("YYYY-MM-DD"));
    })

    if (err) {
      return console.error("error running query", err);
    }
    client.end();

  });

}); 






