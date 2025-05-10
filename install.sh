# download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# download and install Node.js:
nvm install 22

# verify the Node.js version:
node -v 
nvm current 

# verify npm version:
npm -v 

# make sure currently in home directory
cd

# clone GymPages repository 
git clone https://github.com/logansherlock/GymPages.git

# navigate to project directory 
cd GymPages

# install application dependencies 
npm install 

echo "--all dependencies installed successfully--"


touch .env.local
nano .env.local
