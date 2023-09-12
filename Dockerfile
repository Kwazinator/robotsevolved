FROM tiangolo/uwsgi-nginx-flask:python3.6-alpine3.7
RUN apk --update add bash nano
RUN apk add --no-cache libressl-dev musl-dev libffi-dev
RUN apk add --no-cache mariadb-dev
RUN apk add gcc musl-dev python3-dev
RUN pip install --upgrade pip
RUN pip install random-word
RUN pip install flask
RUN pip install requests
RUN pip install urllib3
RUN pip install pyjwt
RUN pip install flask-table
RUN pip install google-auth
RUN pip install google-auth-oauthlib
RUN pip install google-auth-httplib2
RUN pip install google-api-python-client
RUN pip install oauth2client
RUN pip install python-dateutil
RUN pip install blinker
RUN pip install flask-dance
RUN pip install flask-jwt-extended
RUN pip install spotipy
RUN pip install mysql-connector-python
ENV STATIC_URL /static
ENV STATIC_PATH /var/www/app/static
COPY sslnginx.conf /etc/nginx/conf.d/
COPY ./flaskr/static/ /var/www/app/static
COPY . /app