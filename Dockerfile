# Usar a imagem oficial do Node.js como base
FROM node:14

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o arquivo package.json e instalar as dependências
COPY package*.json ./
RUN npm install

# Copiar todo o código do projeto para o diretório de trabalho
COPY . .

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "index.js"]
