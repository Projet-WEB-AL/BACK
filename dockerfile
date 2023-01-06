FROM node:19.2.0 AS builder

# Create app directory
WORKDIR /user/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:19.2.0

COPY --from=builder /user/src/app/node_modules ./node_modules
COPY --from=builder /user/src/app/package*.json ./
COPY --from=builder /user/src/app/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]

