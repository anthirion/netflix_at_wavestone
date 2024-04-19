#!/bin/bash

mongodb_directory="/etc/yum.repos.d/"
# Check that the mongodb repo exists
mongodb_repo=$mongodb_directory/mongodb-org-7.0.repo
if [[ ! -f $"mongodb_repo" ]]; then
        sudo echo "[mongodb-org-7.0]
        name=MongoDB Repository
        baseurl=https://repo.mongodb.org/yum/amazon/2023/mongodb-org/7.0/x86_64/
        gpgcheck=1
        enabled=1
        gpgkey=https://www.mongodb.org/static/pgp/server-7.0.asc" > mongodb_repo
fi

sudo yum install -y mongodb-org
sudo systemctl start mongod