FROM nginx:1.9
COPY htdocs /usr/share/nginx/html
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
