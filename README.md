This repo contains all codes for the ECommerce freelance marketplace application.

## Project architecture:
![alt text](https://i.ibb.co/MD9WLy4/Project-architecture.png)

## Functional requirements:
User Authentication
- Create accounts, login, password reset
  
User Profiles
- Create a seller's profile
- Update profile
  
Search and Filters
- Search for gigs
  
Messaging System
- Buyers should be able to message sellers

Rating and Reviews
- Buyers can review sellers
- Sellers can review buyers
  
Payment Gateway Integration

View Orders
- Buyers and sellers can view active, completed and cancelled orders
  
Cancellation of Orders

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
