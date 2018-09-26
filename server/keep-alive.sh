#!/bin/bash
set -e
host="$1"
shift
cmd="$@"
until mysql -hmysql -p"3306" -u"${DB_DEV_USERNAME}" -p"${DB_DEV_PASSWORD}" 
-D"${DB_HOST}" ; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done
>&2 echo "MySQL is up - executing command"
exec "$@"