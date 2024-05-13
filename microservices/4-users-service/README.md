## Users Microservice for FreelancerApp
* The users microservice is responsible for creating sellers and manging sellers and buyers.
* A buyer can become a seller by creating a profile.
* Sellers can update profile, view sellers dashboard information.
* In this service, events can be `published` to other microservices and `consumed` from other microservices.
* Server side errors from the users microservice is sent to `elasticsearch` and can be viewed on `kibana`.
* Users service uses these tools as the main tools
  * `Shared library`
  * `NodeJS`
  * `Express`
  * `Typescript`
  * `Rabbitmq`
  * `Elasticsearch`
  * `MongoDB database`
  * `Mongoose`
  * `Json web token`
  * `Faker to create seed data`
* There are other packages that are used.
* You can start the service with `npm run dev`.

### API endpoints:
![alt text](https://i.imgur.com/8gW3ZMK.png)

### Create docker images
* You can create your own docker image from this microservice.
* Create an account on `hub.docker.com` or login if you already have one.
* Make sure to login on your terminal as well.
* Steps to build and push your image to docker hub
  * `docker build -t <your-dockerhub-username>/freelancer-users .`
  * `docker tag <your-dockerhub-username>/freelancer-users <your-dockerhub-username>/freelancer-users:stable`
  * `docker push <your-dockerhub-username>/freelancer-users:stable`
