# Use lightweight official Nginx Alpine image
FROM nginx:alpine

# Copy custom static landing page into Nginx document root
COPY index.html /usr/share/nginx/html/index.html

# Expose standard HTTP port
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
