FROM node:19 as base

# CONTEXT MUST BE PARENT FOLDER !!!

WORKDIR /workdir
COPY backend/package*.json ./
EXPOSE 4000

FROM base as production
RUN npm install
COPY backend/src /workdir/src
COPY backend/tsconfig.json /workdir/
COPY backend/tsconfig.build.json /workdir/
COPY backend/.env /workdir/
ENV NODE_OPTIONS=--max_old_space_size=2048
RUN npm install -g typescript ts-node
RUN npm install -g pm2
RUN npm run build
CMD ["ts-node", "dist/app.js"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY backend/src /workdir/src
# COPY backend/public /workdir/public
COPY backend/tsconfig.json /workdir/
COPY backend/.env /workdir/
CMD ["nodemon", "src/app.js"]

FROM base as test
ENV NODE_ENV=test
RUN npm install -g nodemon && npm install
COPY backend/src /workdir/src
COPY backend/public /workdir/public
COPY backend/tsconfig.json /workdir/
COPY backend/.env /workdir/
COPY backend/babel.config.js /workdir/
COPY backend/dump.sql /workdir/
COPY backend/jest.config.ts /workdir/
COPY backend/migrate.ts /workdir/