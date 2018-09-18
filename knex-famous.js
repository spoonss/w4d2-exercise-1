const pg = require("pg");
const settings = require("./settings"); // settings.json
const argv = process.argv.slice(2).join();
var moment = require('moment');


  const knex = require('knex')({
    client: 'pg',
    connection: {
      host:         settings.hostname,
      user:         settings.user,
      password:     settings.password,
      database :    settings.database,
      port     :    settings.port,
      ssl      :    settings.ssl
    },
    pool: { min: 0, max: 7 }
  })


 

knex.select('*').from('famous_people')
.where('first_name', 'like', `%${argv}%`)
.asCallback(function(err, rows) {
    if (err) {
        return console.error("Connection Error", err);
            };

    console.log("Searching ...");
    console.log(`Found ${rows.length} person(s) by the name '${argv}':`);

    rows.forEach(ele => {
        console.log(`- ${ele.id}: ${ele.first_name} ${ele.last_name}, born`, moment(ele.birthdate).format("YYYY-MM-DD"));
        });
        
       knex.destroy();

});






