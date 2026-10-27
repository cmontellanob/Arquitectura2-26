# Usa una imagen base de Node.js
FROM node:24-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos de dependencia primero, para aprovechar el caché de Docker si las dependencias no cambian.
COPY package*.json ./

# Instala solo las dependencias de producción
RUN npm install --only=production

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto 3005
EXPOSE 3005

# Comando para iniciar la aplicación
CMD ["npm", "start"]
