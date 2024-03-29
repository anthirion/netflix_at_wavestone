# Netflix at Wavestone
## Présentation
Netflix at Wavestone est une implémentation d'une API simple utilisée dans le cadre d'une formation introductive aux APIs. 
Cette implémentation n'expose qu'un seul endpoint (/series) et propose des opérations basiques d'ajout, de modification et de suppression des séries et de ses attributs.
Elle a pour but de faire découvrir les principales requêtes API (GET, PUT, POST, DELETE) et les filtres simples.
Pour plus d'informations sur les endpoints, les réponses et les erreurs, veuillez consulter le swagger fourni dans ce repo.

## Utilisation en local
### Installer une base de données MongoDB
Installez la dernière version Compass de MongoDB disponible sur le site de l'éditeur.

### Installer Postman
Installez la dernière version de Postman disponible sur le site de l'éditeur.

### Installer node js et les modules nécessaires
Pour installer node js, tapez "node js download" dans un navigateur et installez la dernière version disponible sur le site nodejs.org.
Installez ensuite les modules *express, mongoose et nodemon*, en tapant dans un terminal powershell la commande suivante :
```powershell
npm i express mongoose nodemon
```

### Ajouter l'URL de la base de données MongoDB
Ajouter un fichier nommé *.env* dans le dossier *server* et ajouter l'URL de connection à la base de donnée indiquée dans MongoDB Compass.
Si vous êtes en local et que vous nommez votre BDD *Netflix*, vous devriez avoir :
```nodejs
DATABASE_URL = "mongodb://localhost:27017/Netflix"
```

### Lancer le serveur
Lancer le serveur dans un terminal powershell à l'aide de la commande suivante :
```powershell
npm start
```

### Intéragir avec l'API via Postman
Utilisez Postman pour effectuer des requêtes. L'adresse de connection devrait être la suivante :
http://localhost:4000/series

## Utilisation à travers l'instance ec2 Wavestone (à destination des formateurs)
### Se connecter à l'instance via ssh
Si vous ne l'avez pas encore fait, créez une paire de clés ssh en suivant la documentation sur le lien suivant :
https://docs.aws.amazon.com/fr_fr/servicecatalog/latest/adminguide/getstarted-keypair.html
Ensuite, démarrer l'instance ec2 et connectez-vous y avec la commande suivante :
```bash
ssh -i cle_ssh_publique.pem dns_public
```
(la commande est indiquée dans l'onglet Client SSH sur la console AWS)

### Lancer la base de données MongoDB
Lancer la base de données en lançant le script launch_mongodb.sh de la manière suivante :
```bash
sudo ./launch_mongodb.sh
```

### Lancer le serveur API
Lancer le serveur en lançant le script launch_server.sh de la manière suivante :
```bash
sudo ./launch_server.sh
```

### Intéragir avec l'API via Postman
Utilisez Postman avec l'adresse DNS publique de l'instance ec2 fournie dans la console AWS.