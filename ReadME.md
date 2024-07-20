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
- `/back/handlers` contain workshop/trainer handlers. These handlers are responsible for providing an interface for interacting with the MongoDB database through Mongoose.

### TODO (Core functionality)
- Implement TrainerController (Assigns trainers to workshops, View trainer schedule)
- Fix structure of frontend code

### Frontend
- `/front` constains the ReactJS frontend application

## MongoDB Atlas
username : admin
password : testpass123

Connect using MongoDB directly or Mongoose
mongodb+srv://admin:<password>@cluster0.ldwipqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
