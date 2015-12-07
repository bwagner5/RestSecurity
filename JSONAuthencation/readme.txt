1. create a mongoDB database with collection name "User",
2. Run npm install and install all the dependencies.
3. npm install -g nodemon
3. nodemon ./server.js localhost 8080

http://yourip:8080/api/authenticate

add a user into the User collection

set the header type to Content-Type
set the value to application/json


{
    "name":"yourusername",
     "password":"password"

}