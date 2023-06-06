# stage1 as builder
FROM node:14-alpine as builder

RUN apk update && apk add git

# copy the package.json to install dependencies
RUN git clone https://github.com/Neakio/Grades-Sharing-Application.git
COPY package.json ./

# Install the dependencies and make the folder
RUN yarn install --frozen-lockfile && mkdir /app && mv ./node_modules ./app

WORKDIR /app

COPY . .

# Build the project and copy the files
RUN yarn build

