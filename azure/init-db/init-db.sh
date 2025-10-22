#!/bin/bash
set -e
set -x # Active le mode de débogage

# Crée l'utilisateur et la base de données avec mongosh
mongosh <<EOF
use netflix
db.createUser({
  user: "attendee",
  pwd: "apppassword",
  roles: [
    { role: "readWrite", 
      db: "netflix" 
    }
  ]
})
EOF

# Importe les données du fichier JSON
mongoimport --db netflix --collection series --file /tmp/series.json --jsonArray