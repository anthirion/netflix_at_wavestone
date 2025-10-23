#!/bin/bash
# Crée l'utilisateur et la base de données avec mongosh
mongosh <<EOF
use netflix;
db.createUser({
  user: "${MONGO_USER}",
  pwd: "${MONGO_PASSWORD}",
  roles: [
    { role: "readWrite", 
      db: "netflix" 
    }
  ]
});
EOF

# Importe les données du fichier JSON
mongoimport --db netflix --collection series --file /docker-entrypoint-initdb.d/series.json --jsonArray