## Workshop Management Web Application
This webapp is meant to help manage client workshop requests, trainer allocation and workshops for the "presales" department of a technology company.

## Technical Requirements
- Web Application with frontend and backend
- Database
- Test Cases

## Directory Structure
### Backend
- `/back` contains the NodeJS backend application
- `/back/routes` contain all the routes for express JS. These routes handle the receiving of HTTP requests, responding to these requests, and formatting the request bodies into a format that the `handlers` recognize.
- `/back/handlers` contain workshop/trainer handlers. These handlers are responsible for providing an interface for interacting with the MongoDB database through Mongoose. All logic should be contained in this folder.
- `/public` Contains the compiled ReactJS frontend

### Routes 
- `/admin` Contains all admin routes
    - `/admin/workshops` Handles trainers from the admin panel
        - GET : Gets all workshops.\ <mark>(Workshop filtering to be done on the frontend???)</mark>
        - POST : Updates a workshop. \ <mark>(This is where workshops will be accepted denied. This is also where trainers will be updated to workshops)</mark>
    - `/admin/trainers` Handles trainers from the admin panel
        - GET : Gets a list of all trainers
        - POST : Creates a trainer
        - `/admin/trainers/trainer_id` Handles specific trainers
            - GET : Gets the information for a specific trainer
            - PUT : Updates the information for a specific trainer

- `/client` Contains all client routes\
    <mark> Right now there is no login system for the clients. Normally this would be implemented using cookies and sessions. If we would like an <i>insecure</i> way of implementing client accounts, we can use the /client/client_id route instead. </mark>
    - `/client/workshops` Handles workshops from the client view
        - GET : Gets all workshops associated with particular client \<mark> Normally the client will be identified using sessions, but we are implementing a single client for now so it will simply show all workshops.</mark>
        - POST : Sends a new workshop request.
        - PUT : Updates a workshop request.

- `/trainer` Contains all trainer routes\
    <mark> Similarly to the clients, no login system yet. We can also use trainer ids to implement trainer accounts.</mark>
    - `/trainers/workshops` Handles workshops from the trainer view
        - GET : View assigned Workshops, View schedule

### Handlers
<mark>Right now controllers are treated as a god classes that handle everything. This works because we have not implemented an account system. Once an account system is implemented, we will need another controller that handles authentication and making sure requests are valid.</mark>
- `TrainerController.js` contains a static class that handles all trainer-based operations on the DB.
- `WorkshopController.js` contains a static class that handles all workshop-based operations on the DB.
- `ClientController.js` contains a static class that handles all client-based operations on the DB.\
<mark>Although now with no client accounts, there are no client based operations. Everything is handled within the TrainerController and WorkshopController</mark>
- `AccountValidator.js` Contains a static class that handles all authentication operations for the backend. This will ensure that only clients can make client requests, etc.\
<mark>Only to be implemented if we decide to create an account system.</mark>

### Frontend
- `/front` constains the ReactJS frontend application

## MongoDB Atlas
username : admin
password : testpass123

Connect using MongoDB directly or Mongoose
mongodb+srv://admin:<password>@cluster0.ldwipqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

