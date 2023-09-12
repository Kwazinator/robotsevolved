FROM tiangolo/uwsgi-nginx-flask:python3.6-alpine3.7

# Install system packages
RUN apk --update add bash nano \
    && apk add --no-cache libressl-dev musl-dev libffi-dev \
    && apk add --no-cache mariadb-dev \
    && apk add gcc musl-dev python3-dev

# Specify pip version
RUN pip install pip==20.0.2

# Install Python libraries
RUN pip install random-word \
    && pip install flask==1.0.2 \
    && pip install requests==2.23.0 \
    && pip install urllib3==1.25.8 \
    && pip install PyJWT \
    && pip install flask-table \
    && pip install google-auth==1.11.0 \
    && pip install google-auth-oauthlib==0.4.1 \
    && pip install google-auth-httplib2==0.0.3 \
    && pip install google-api-python-client==1.7.11 \
    && pip install oauth2client==4.1.3 \
    && pip install python-dateutil==2.8.1 \
    && pip install blinker==1.4 \
    && pip install flask-dance \
    && pip install flask-jwt-extended \
    && pip install spotipy==2.9.0 \
    && pip install mysql-connector-python==8.0.19

# Set environment variables
ENV STATIC_URL /static
ENV STATIC_PATH /var/www/app/static

# Copy files
COPY sslnginx.conf /etc/nginx/conf.d/
COPY ./flaskr/static/ /var/www/app/static
COPY . /app
