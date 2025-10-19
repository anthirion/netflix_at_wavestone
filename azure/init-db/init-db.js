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