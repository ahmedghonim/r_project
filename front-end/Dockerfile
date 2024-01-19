FROM node:18.0.0-alpine3.14

WORKDIR /front-end

COPY package.json ./

RUN npm install

COPY . .

# RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
