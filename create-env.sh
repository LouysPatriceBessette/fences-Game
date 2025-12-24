#!/bin/bash

# Check if the $1 arg is good
if [[ -z "$1" || ("$1" != "development" && "$1" != "production") ]]; then
  echo "Please provide a name for the environment"
  echo "Usage: ./create-env.sh [development|production]"
  exit 1
fi

# Create or update .env file
if [ ! -f .env ]; then
  touch .env
  echo "NODE_ENV='$1'" > .env
  echo "#========================== The above line is auto generated at 'every npm start' and 'npm run dev'." >> .env
  echo "" >> .env
  echo "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=d5fa1a28dc254540f879c679e4b89e4f1fcddf2d69edacbfac992f237fb15e01"  >> .env
  echo "NEXT_PUBLIC_VERSION='0.2.1'" >> .env
  
  echo "#========================== Below are some very useful debuging switches generated" >> .env
  echo "#========================== 0 = false, 1 = true" >> .env
  echo "#========================== only if the .env file does not exist." >> .env
  echo "#========================== You can enable/disable them... But they MUST STAY." >> .env
  echo "#========================== Search fo 'DEBUG_' to find where they're used." >> .env
  echo "NEXT_PUBLIC_DEBUG_STORE=0" >> .env
  echo "NEXT_PUBLIC_DEBUG_PING_PONG=0" >> .env
  echo "NEXT_PUBLIC_DEBUG_GAMES=0" >> .env
  echo "NEXT_PUBLIC_DEBUG_LOCAL_STORAGE=0" >> .env
  echo "NEXT_PUBLIC_DEBUG_DISPLAY_MY_SOCKET_ID=0" >> .env
  echo "NEXT_PUBLIC_DEBUG_EDITING_STEPS=0" >> .env
  echo "#========================== " >> .env
  echo "" >> .env
  echo "#========================== Anything below is safe to edit like a normal .env file." >> .env
else
  sed -i "s/NODE_ENV='.*'/NODE_ENV='$1'/" .env
fi

echo "Created/Updated .env file"