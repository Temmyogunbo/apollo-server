FROM node:9.11.2

# Define working directory and copy source
WORKDIR /app
RUN chmod -R 777 /app

ENV NODE_ENV=${NODE_ENV}

COPY . /app

RUN npm install

RUN  npm cache clean --force

RUN export $(grep -v '^#' .env | xargs -d '\n')

RUN npm run build

# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 4000

# Start the app
CMD ["npm", "start"]