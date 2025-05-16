# GymPages Developer Installation

Copy & paste the respective commands for your system

## Assumptions & Prerequisites

- Git already installed and setup

- MySQL server is already installed and setup with a username and password

## Step #1 (install node.js with nvm)

Install Node.js and check the current version. Run the commands in your home directory.

### Mac & Linux

Install Node.js with nvm.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

\. "$HOME/.nvm/nvm.sh"

nvm install 22

# verify installation
node -v 
nvm current 
npm -v 
```

### Windows

Install Node.js with fnm.

```bash
winget install Schniz.fnm

fnm install 22

# verify installation
node -v 
npm -v
```

## Step #2 (clone repo)

Clone the GymPages repository using git, and navigate to the new directory.

```bash
git clone https://github.com/logansherlock/GymPages.git

cd GymPages
```

## Step #3 (install dependencies)

Install the projects dependencies using npm.

```bash
npm install
```

## Step 4 (database dump)

Use the database dump from the repository on your own MySQL server. Replace 'your_username' with your MySQL server username. Enter your password when prompted.

```bash
mysql -u your_username -p < gympages_dump.sql
```

## Step 5 (environment variables)

Create a file named '.env.local' in the GymPages directory. Your own Google Places API key, and JWT secret will be required. Preset JWT secret or random string can be used.

```bash
touch .env.local

nano .env.local
```

Add these variables in the file and replace values with your own.

```bash
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=gympages

NEXT_PUBLIC_GOOGLE_API=your_google_places_api_key

JWT_SECRET=your_jwt_secret
```

### Installation and setup is complete. Now you can interact with the GymPages application using a text editor or IDE and utilize node.js developer features from your machine.