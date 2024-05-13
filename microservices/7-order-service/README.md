## Order Microservice for FreelancerApp
* The order microservice is responsible for managing orders created by buyers and managing orders worked on by sellers.
* In this service, events can be `published` to other microservices and `consumed` from other microservices.
* Server side errors from the order microservice is sent to `elasticsearch` and can be viewed on `kibana`.
* Order service uses these tools as the main tools
  * `Shared library`
  * `NodeJS`
  * `Express`
  * `Typescript`
  * `Rabbitmq`
  * `Stripe API`
  * `Elasticsearch`
  * `MongoDB database`
  * `Mongoose`
  * `Json web token`
  * `SocketIO`
* There are other packages that are used.
* You can start the service with `npm run dev`.

### Create docker images
* You can create your own docker image from this microservice.
* Create an account on `hub.docker.com` or login if you already have one.
* Make sure to login on your terminal as well.
* Steps to build and push your image to docker hub
  * `docker build -t <your-dockerhub-username>/freelancer-order .`
  * `docker tag <your-dockerhub-username>/freelancer-order <your-dockerhub-username>/freelancer-order:stable`
  * `docker push <your-dockerhub-username>/freelancer-order:stable`
