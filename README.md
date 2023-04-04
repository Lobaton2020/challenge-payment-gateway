<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Challenge Payment Grateway
This its the project that I have done in terms of the limit time from my end and interesting challenge.

## Dependecies
- docker-compose
  - Please have in account when you run the command `docker-compose up -d` that the port 5432 is free to avoid errors
- node 18+

## Installation

```bash
$ git clone https://github.com/Lobaton2020/challenge-payment-gateway
```

## Running the app
Before ejecute the below command add the file `.env.development.local` at root folder. I'll share the file for the email, please request it.
```bash
$ docker-compose up -d
```
As soon you run the docker compose you need run the seeders with the command:
```
yarn seed:run
```
The application will run at the port `3000`\
The API Rest will have a POSTMAN file attached in the folder that you can dowload. In addition you have the swagger at `http://server:port/api/v1/docs`
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Anotations
- In terms of database I have created the tables rider and driver because thinking at scalable solutions is has too many requirements and bussiness logic, I mean other tables to create. This apply for the repository structure of folder too.

## User for tests
### Driver
```bash
email: driver@test.com
password: 12345
```
### Rider
```bash
email: rider@test.com
password: 12345
```
## License

Nest is [MIT licensed](LICENSE).
