FROM alpine:latest

Run apk --update add 'nodejs'
Run apk --update add 'git'
Run git clone https://github.com/mstraughan86/slack-jeeves.git
Run cd slack-jeeves && npm install
Run cd slack-jeeves && npm install forever -g

COPY token.txt /slack-jeeves/config/
COPY path.txt /slack-jeeves/config/
COPY secret.txt /slack-jeeves/config/
COPY port.txt /slack-jeeves/config/

# replace this with your application's default port
EXPOSE 4567