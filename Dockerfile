#test
FROM mashrequae.azurecr.io/nginx:stable-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup && addgroup appuser bin && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/cache/nginx

USER appuser

COPY nginx.conf /etc/nginx/nginx.conf

COPY ./build /var/www

EXPOSE 8080

ENTRYPOINT [ "nginx","-g","daemon off;" ]
