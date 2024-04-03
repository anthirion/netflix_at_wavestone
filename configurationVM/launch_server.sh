#!/bin/bash

# Move to the correct path
path_to_server=/home/netflix_at_wavestone/server
cd path_to_server

# Install all requirements
# Install node js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts
sudo npm install express node mongoose nodemon

# Check that the server file exists
server_file=$path_to_server/server.js
if [[ ! -f "$server_file" ]]; then
        echo "Server.js does not exist... Uploading it from git"
        # remove the project
        cd ../../
        sudo rm -rf netflix_at_wavestone
        sudo git clone https://github.com/anthirion/netflix_at_wavestone.git
        cd netflix_at_wavestone/server
        sudo echo DATABASE_URL = "mongodb://localhost:27017/" > .env
fi

# Check that the .env file exists
env_file=$path_to_server/.env
if [[ ! -f $"env_file" ]]; then
       sudo echo DATABASE_URL = "mongodb://localhost:27017/" > .env
fi

# Start the server
npm start