# Usar uma imagem base oficial do Node.js
FROM node:18

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install --production

# Copiar todos os arquivos do diretório atual para o diretório de trabalho do contêiner
COPY . .

# Expor a porta em que a aplicação será executada
EXPOSE 3000

# Definir o comando para iniciar a aplicação
CMD ["npm", "start"]
