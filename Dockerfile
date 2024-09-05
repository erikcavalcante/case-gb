# Use uma imagem base do Node.js oficial
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json (se existir) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do diretório atual para o diretório de trabalho do contêiner
COPY . .

# Exponha a porta em que a aplicação será executada
EXPOSE 3000

# Defina o comando para iniciar a aplicação
CMD ["npm", "start"]
