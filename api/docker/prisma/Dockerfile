FROM node:22-alpine3.22

WORKDIR /app

# instaling prisma cli globally
RUN npm install -g prisma

# instaling some necessary libs to use prisma properly
RUN apk add --no-cache \
    openssl \
    musl \
    libgcc \
    zlib 

# Copy prisma files
COPY prisma ./prisma

# A command to start the server 
CMD prisma db push --accept-data-loss --skip-generate