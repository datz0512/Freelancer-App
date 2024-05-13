## Chat Microservice for FreelancerApp
* The chat microservice is responsible for communication between buyers and sellers.
* Buyers can send messages to sellers and sellers can respond.
* In this service, events are only `published` to other microservices.
* Server side errors from the chat microservice is sent to `elasticsearch` and can be viewed on `kibana`.
* Gig service uses these tools as the main tools
  * `Shared library`
  * `NodeJS`
  * `Express`
  * `Typescript`
  * `Rabbitmq`
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
  * `docker build -t <your-dockerhub-username>/freelancer-chat .`
  * `docker tag <your-dockerhub-username>/freelancer-chat <your-dockerhub-username>/freelancer-chat:stable`
  * `docker push <your-dockerhub-username>/freelancer-chat:stable`
