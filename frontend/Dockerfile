# Use uma imagem base do Node.js
FROM node:16

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install
RUN npm install react-router-dom
RUN npm install react-icons --save

# Copie o restante dos arquivos da aplicação
COPY . .

# COPY entrypoint.sh /usr/src/app/entrypoint.sh
# RUN chmod +x /usr/src/app/entrypoint.sh

# Exponha a porta que o aplicativo React usará
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "run" , "dev"]
