FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install react-router-dom
RUN npm install react-icons --save

COPY . .

EXPOSE 5173

CMD ["npm", "run" , "dev"]
