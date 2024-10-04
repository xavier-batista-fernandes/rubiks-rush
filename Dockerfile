# Stage 1:
# Build the application
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Stage 2:
# Serve the application
FROM nginx:latest AS serve
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/rubiks-rush-fe/browser /usr/share/nginx/html
EXPOSE 80
