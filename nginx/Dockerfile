FROM nginx:latest

COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template

CMD envsubst '$DOMAIN_NAME $FRONTEND_HOST $FRONTEND_PORT $BACKEND_HOST $BACKEND_PORT' \
    < /etc/nginx/templates/nginx.conf.template \
    > /etc/nginx/nginx.conf && \
    exec nginx -g "daemon off;"
