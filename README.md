This repo contains all codes for the ECommerce freelance marketplace application.

## Functional requirements:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User Authentication :

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Create accounts, login, password reset
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User Profiles :

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Create a seller's profile

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Update profile
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Search and Filters :

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Search for gigs
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Messaging System :

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Buyers should be able to message sellers

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rating and Reviews :

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Buyers can review sellers

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Sellers can review buyers

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View Orders :

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Buyers and sellers can view active, completed and cancelled orders

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Payment Gateway Integration
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cancellation of Orders

## Kubernetes

- The `freelancer-k8s` folder contains the objects code needed to deploy the microservices to kubernetes.
- The microservices are deployed to `Minikube`.

## Microservices

- The `microservices` folder contains all the backend code for the application's services.
- The services can be started either individually from the terminal or via docker compose.
- [Microservices README file](https://github.com/datz0512/Freelancer-App/blob/main/microservices/README.md)

## Volumes

- The `volumes` folder contains files that are used to run services for local development.
- [Volumes README file](https://github.com/datz0512/Freelancer-App/blob/main/volumes/README.md)
