FROM alpine:3

WORKDIR /app

COPY . .

RUN npm install

ENV PORT = 8000
ENV GOOGLE_CLOUD_PROJECT = plantherbs
ENV EMAIL = plantherbs.official@gmail.com
ENV PASS_APPS = cndz otbf srul avxb

EXPOSE 8000

CMD ["npm", "run", "start"]