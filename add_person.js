const pg = require("pg");
const settings = require("./settings"); // settings.json

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


  const argv = process.argv.slice(2);
  console.log(argv)
  const insertData = {first_name: argv[0], last_name: argv[1], birthdate: argv[2]};

knex.insert(insertData).into("famous_people").then(function (id) {
  console.log(id);
})
.finally(function() {
  knex.destroy();
});


