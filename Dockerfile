# Usa una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo en la imagen
WORKDIR /usr/src/wasipay-backend

# Copia los archivos del proyecto al directorio de trabajo de la imagen
COPY . .

# Instala las dependencias
RUN npm install

# Compila el código TypeScript (si es necesario)
RUN npm run tsc

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3098

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["npm", "start"]