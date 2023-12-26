FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install

ENV PORT=8000
ENV GOOGLE_CLOUD_PROJECT=plantherbs
ENV LINK_PREDICT_API="https://predict-msa6gk7a6q-uc.a.run.app/api/predict"

EXPOSE 8000

CMD ["npm", "run", "start"]
