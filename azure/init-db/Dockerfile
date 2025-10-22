FROM mongo:noble
COPY azure/init-db/init-db.sh /docker-entrypoint-initdb.d/
COPY azure/init-db/data/series.json /docker-entrypoint-initdb.d/