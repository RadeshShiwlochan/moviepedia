FROM node:8

WORKDIR /usr/src/app

#use the wildcard character to copy both package.json and 
#package-lock.json
COPY package*.json ./

RUN npm install

#bundle app source
COPY . . 

EXPOSE 3000

CMD ["npm","start"]