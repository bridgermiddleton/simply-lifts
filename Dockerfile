FROM node:20 AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM python:3.11
WORKDIR /app
COPY server/requirements.txt .
RUN pip install -r requirements.txt
COPY server/ ./server/
COPY --from=frontend /app/dist ./dist
CMD ["python", "server/app.py"]