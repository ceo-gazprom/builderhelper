# Базовый образ
FROM node:18

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование всех остальных файлов
COPY . .

# Сборка приложения
RUN npm run build

# Открытие порта
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "start:prod"]