## Review Microservice for FreelancerApp

- The review microservice is responsible for creating and managing sellers and buyers reviews.
- In this service, events are only `published` to other microservices.
- Server side errors from the review microservice is sent to `elasticsearch` and can be viewed on `kibana`.
- Review service uses these tools as the main tools
  - `Shared library`
  - `NodeJS`
  - `Express`
  - `Typescript`
  - `Rabbitmq`
  - `Elasticsearch`
  - `Postgresql database`
  - `NodeJS pg`
  - `Json web token`
- There are other packages that are used.
- You can start the service with `npm run dev`.

### Create docker images

- You can create your own docker image from this microservice.
- Create an account on `hub.docker.com` or login if you already have one.
- Make sure to login on your terminal as well.
- Steps to build and push your image to docker hub
  - `docker build -t <your-dockerhub-username>/freelancer-review .`
  - `docker tag <your-dockerhub-username>/freelancer-review <your-dockerhub-username>/freelancer-review:stable`
  - `docker push <your-dockerhub-username>/freelancer-review:stable`
