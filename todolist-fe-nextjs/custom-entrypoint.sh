#!/bin/sh

NGINX_ENV=${NGINX_ENV:-docker}

case "$NGINX_ENV" in
  local)
    export SSL_CERT=dev.crt
    export SSL_KEY=dev.key
    export API_BACKEND_URL=https://localhost:5000/api/
    export API_SSL_VERIFY=off
    ;;
  docker)
    export SSL_CERT=dev.crt
    export SSL_KEY=dev.key
    export API_BACKEND_URL=http://todolist-be-csharp:5000/api/
    export API_SSL_VERIFY=off
    ;;
  production)
    export SSL_CERT=prod.crt
    export SSL_KEY=prod.key
    export API_BACKEND_URL=https://todolist-be-csharp.onrender.com/api/
    export API_SSL_VERIFY=on
    ;;
  *)
    echo "❌ Unknown NGINX_ENV: $NGINX_ENV"
    exit 1
    ;;
esac

echo "🔧 Generating nginx.conf..."
envsubst '${SSL_CERT} ${SSL_KEY} ${API_BACKEND_URL} ${API_SSL_VERIFY}' \
  < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf

if [ ! -s /etc/nginx/nginx.conf ]; then
  echo "❌ nginx.conf not generated or empty!"
  exit 1
fi

echo "🚀 Starting Next.js..."
yarn start &

echo "🚀 Starting NGINX..."
exec nginx -g 'daemon off;'
