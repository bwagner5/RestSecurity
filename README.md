# RestSecurity
HTTP Basic Auth and OAuth Security for a simple REST API

This repository contains several branches to demonstrate different methods of securing a REST API:

   - HTTPBasicAuth-HTTP(S)
   - OAuth2-HTTP(S)


------
** To start the applications, `cd` to the directory and execute `./gradlew bootRun`
*** In the case of OAuth2, you will need to also `cd authorization-server`and `./gradlew bootRun` to start the authorization server as well as the RESTful Application.
------


HTTPBasicAuth:

  - The REST API exposes one entity called Courses.
  - You can view available operations and a complete list by sending:
    - HTTP:
      - GET request to http://localhost:8080/courses
    - HTTPS:
      - GET request to https://localhost:8443/courses

OAuth2:

  - The REST API exposes one entity called Persons.
  - You can view the list of person objects by sending:
    - HTTP:
      - GET request to http://localhost:8081/oauth/authorize?client_id=web&response_type=token
         - Authenticate with `isa656` / `password`
         - You will be redirected to http://localhost:8080/persons/#token-here (change the `#` to `?`)
    - HTTPS:
      - GET request to https://localhost:8444/oauth/authorize?client_id=web&response_type=token
        - Authenticate with `isa656` / `password`
        - You will be redirected to https://localhost:8443/persons/#token-here (change the `#` to `?`)


* Thanks to https://jaxenter.com/rest-api-spring-java-8-112289.html for the great tutorial on OAuth2!


