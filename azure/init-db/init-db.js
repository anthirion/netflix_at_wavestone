const fs = require('node:fs');

db = db.getSiblingDB('netflix'); // Crée ou sélectionne la base "netflix"

db.createUser({
  user: "attendee",
  pwd: "apppassword",
  roles: [
    { role: "readWrite", 
      db: "netflix" 
    }
  ]
});

// Insert data
try {
  const seriesData = fs.readFileSync('/docker-entrypoint-initdb.d/series.json', 'utf8');
  var series = JSON.parse(seriesData);
  db.series.insertMany(series);
} catch (err) {
  console.error(err);
}
