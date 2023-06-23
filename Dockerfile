FROM node:10.15-slim
WORKDIR /usr/src/app
COPY package.json yarn.lock .npmrc ./
COPY . /usr/src/app
# Run yarn after copying all code so it uses the workspace feature and traverse through all workspace folders (I.E every package) and hoist their package.json node_modules entries to root
RUN yarn
EXPOSE 9001
CMD ["yarn", "start:ci"]
