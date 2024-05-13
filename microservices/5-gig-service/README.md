## Gig Microservice for FreelancerApp
* The gig microservice is responsible for creating and managing gigs.
* Sellers create gigs and the gigs are saved to `elasticsearch` and `mongodb`.
* `Elasticsearch` is used as the primary database storage for `creating`, `reading`, `updating` and `deleting` gigs.
* In this service, events can be `published` to other microservices and `consumed` from other microservices.
* Server side errors from the gig microservice is sent to `elasticsearch` and can be viewed on `kibana`.
* Gig service uses these tools as the main tools
  * `Shared library`
  * `NodeJS`
  * `Express`
  * `Typescript`
  * `Rabbitmq`
  * `Redis`
  * `Elasticsearch`
  * `MongoDB database`
  * `Mongoose`
  * `Json web token`
  * `Faker to create seed data`
* There are other packages that are used.
* You can start the service with `npm run dev`.

### Create docker images
* You can create your own docker image from this microservice.
* Create an account on `hub.docker.com` or login if you already have one.
* Make sure to login on your terminal as well.
* Steps to build and push your image to docker hub
  * `docker build -t <your-dockerhub-username>/freelancer-gig .`
  * `docker tag <your-dockerhub-username>/freelancer-gig <your-dockerhub-username>/freelancer-gig:stable`
  * `docker push <your-dockerhub-username>/freelancer-gig:stable`