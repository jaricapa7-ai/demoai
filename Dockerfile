# Dockerfile para proyecto Vite + React + TypeScript
FROM node:20-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias y lockfile
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código
COPY . .

# Construir la app
RUN npm run build

# --- Etapa de producción ---
FROM nginx:alpine AS production

# Copiar archivos estáticos generados al directorio de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx si es necesario
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
