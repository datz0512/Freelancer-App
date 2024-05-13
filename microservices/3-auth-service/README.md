## Authentication Microservice for FreelancerApp

* The authentication microservice is responsible for creating users.
* A user that creates an account automatically becomes a buyer in the application.
* When a user successfully creates an account, an event is published from the `authentication service` to the `users service` so as to add buyer data to `mongodb`.
* Server side errors from the authentication microservice is sent to `elasticsearch` and can be viewed on `kibana`.
* Authentication service uses these tools as the main tools
  * `Shared library`
  * `NodeJS`
  * `Express`
  * `Typescript`
  * `Rabbitmq`
  * `Elasticsearch`
  * `MySQL database`
  * `Sequelize`
  * `Json web token`
  * `Faker to create seed data`
* You can start the service with `npm run dev`.

### Create docker images
* You can create your own docker image from this microservice.
* Create an account on `hub.docker.com` or login if you already have one.
* Make sure to login on your terminal as well.
* Steps to build and push your image to docker hub
  * `docker build -t <your-dockerhub-username>/freelancer-auth .`
  * `docker tag <your-dockerhub-username>/freelancer-auth <your-dockerhub-username>/freelancer-auth:stable`
  * `docker push <your-dockerhub-username>/freelancer-auth:stable`
