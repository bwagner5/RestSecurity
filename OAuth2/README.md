OAuth 2.0 Security of a REST API
===========================

    ./gradlew bootRun

** The shared token store (SQLite Database) is stored at: `/tmp/token.db`
    
Example OAuth Server requests
-----------------------------

The console client can request an access token like this:

    curl curl:password@localhost:8081/oauth/token\?grant_type=client_credentials

The web client has to use this URL.

    http://localhost:8081/oauth/authorize?client_id=web&response_type=token

Example requests
-------------
When running the following requests should give you results. Replace $token with the bearer token. 

    curl -H "Authorization: Bearer $token" localhost:8080
    curl -H "Authorization: Bearer $token" localhost:8080/persons
    curl -H "Authorization: Bearer $token" -X POST -H "Content-Type: application/json" -d "{\"firstName\": \"John\"}" localhost:8080/persons
    curl -H "Authorization: Bearer $token" localhost:8080/persons/search/findByFirstNameLike\?firstName=J%25
    curl -H "Authorization: Bearer $token" -X PUT localhost:8080/persons/1 -d "{\"firstName\": \"Jane\"}" -H "Content-Type: application/json"
    curl -H "Authorization: Bearer $token" -X DELETE localhost:8080/persons/1
    
When you use the web client URL the token includes the role and logged in user, so Mary still can't access John's record.

** NOTE When using the web client, change the `#` to a `?` for a URI Query Parameter.


Using with TLS
--------------------

URLs over TLS are:
   
   - https://localhost:8444/oauth/authorize?client_id=web&response_type=token
   - https://localhost:8443