FROM node:9.11.2

# Define working directory and copy source
WORKDIR /home/node/app
RUN chmod -R 777 /home/node/app

# RUN apt-get update -y && \
#   apt-get install -y mysql-client

# COPY ./keep-alive.sh keep-alive.sh


# FROM node:9-alpine
# WORKDIR /home/node/app

# Install deps for production only
COPY ./package* ./
RUN npm install && \
  npm cache clean --force

# This is our secret sauce
RUN git clone https://github.com/vishnubob/wait-for-it.git

ENV NODE_ENV=${NODE_ENV}
# ENV DB_HOST=172.19.0.1


# Install app dependencies
COPY . .
# RUN chmod +x ./keep-alive.sh
RUN export $(grep -v '^#' .env | xargs -d '\n')
RUN npm run build
# RUN npm run create:migrations

# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 4000

# Start the app
CMD ["npm", "start"]