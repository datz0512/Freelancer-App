## Notification Microservice for FreelancerApp
* The notification microservice is responsible for sending out email notifications to users.
* The email templates available are for
  * `forgot password`
  * `verify email`
  * `reset password success`
  * `offer`
  * `order placed`
  * `order receipt`
  * `order extension request`
  * `order extension approval`
  * `order delivered`
* Notification service uses these tools as the main tools
  * `Shared library`
  * `NodeJS`
  * `Express`
  * `Typescript`
  * `Rabbitmq`
  * `Elasticsearch`
  * `Nodemailer`
  * `Email templates`
* There are other packages that are used.
* You can start the service with `npm run dev`.

### Create docker images
* You can create your own docker image from this microservice.
* Create an account on `hub.docker.com` or login if you already have one.
* Make sure to login on your terminal as well.
* Steps to build and push your image to docker hub
  * `docker build -t <your-dockerhub-username>/freelancer-notification .`
  * `docker tag <your-dockerhub-username>/freelancer-notification <your-dockerhub-username>/freelancer-notification:stable`
  * `docker push <your-dockerhub-username>/freelancer-notification:stable`
