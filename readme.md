# Netflix at Wavestone

## Présentation

Netflix at Wavestone est une implémentation d'une API simple utilisée dans le cadre d'une formation introductive aux APIs.
Cette implémentation n'expose qu'un seul endpoint (/series) et propose des opérations basiques d'ajout, de modification et de suppression des séries et de ses attributs.
Elle a pour but de faire découvrir les principales requêtes API (GET, PUT, POST, DELETE) et les filtres simples.
Pour plus d'informations sur les endpoints, les réponses et les erreurs, veuillez consulter le swagger fourni dans ce repo.

## Utilisation via le cloud Azure (à destination des formateurs)

L'infrastructure est hébergée sur Azure et gérée via Terraform. Les fichiers de code IaC sont stockés dans le dossier `azure`.
L'infrastructure s'appuie sur Azure Container Instances (ACI) pour déployer un groupe de conteneurs comprenant 2 conteneurs :
- **netflix-api-server** : l'API exposée publiquement sur le port HTTP 80,
- **netflix-db** : la base de données MongoDB personnalisée, qui communique avec l'API et qui stocke des données de films.

Les logs des conteneurs sont par ailleurs centralisés dans un espace de travail Azure Log Analytics (`netflix-logs`).

Une fois déployée, l'API se verra attribuer un nom de domaine public (FQDN) configuré par Azure. Pour récupérer l'adresse IP, allez voir dans l'onglet 'Overview' de la ressource Azure Container Instances directement sur le portail Azure (l'adresse publique n'est pas statique et est regénérée à chaque déploiement).

## Déployer l'infrastructure (à destination des formateurs)

> [!WARNING]
> Avant de procéder au déploiement, veillez à bien vérifier que le nom du groupe de ressources (`rg_name`) configuré dans le fichier `azure/variables.tf` est correct.

Assurez-vous d'être authentifié sur Azure (via `az login`) et d'avoir choisi la bonne subscription (via `az account show`). Ensuite, dans un terminal, naviguez dans le dossier `azure` et exécutez les commandes suivantes :

1. Initialisation de Terraform :
```bash
terraform init
```

2. Déploiement :
```bash
terraform apply
```
*(Il vous sera demandé de renseigner les variables `mongo_user` et `mongo_password` utilisées pour sécuriser la base de données MongoDB. Rapprochez-vous du propriétaire du projet pour les obtenir).*
