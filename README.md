# Leetcode Functions

## Documentation for API endpoint "https://us-central1-leetcode-90738.cloudfunctions.net/api"

### Problem Routes
* `/problems`
    * Get: Gets all problems, no authentication/params required

*  `/problem`
    * Allows user to post a problem under their name
    * Requires Authentication under Authorization header must be of the form "Bearer " <token>
    * Params:
        * category: Cateogry of Leetcode problem,Array
        * Time: Number of minutes spent on problem (rounded), Number
        * Title: Title of LC problem, String
    * Returns ID of created document

* `/getproblem/:userHandle`
    * Gets all problems done by user of handle userHandle
    * Doesn't require authentication
    * Parameter must be given in url, replace with :userHandle
    
* `/problemcounts/:userHandle`
    * Gets problem categories and counts of number of problems for each user
    * Doesn't require authentication
    * Parameter must be given in url, replace with :userHandle
    * Returns data in format of Map

### User Routes
*  `/signup`
    * Creates userHandle and authentication for each user
    * Params:
        * email: String that must be valid email, not empty
        * password: String must not be empty
        * confirmPasword: String must match password and not be empty
        * userHandle: String, must be unique and not empty
    * Returns user token that can be used in authentication header to post problem

* `/login`
    * Uses firebase to authenticate users
    * Params:
        * email: String must not be empty and be stored in Firebase Authentication
        * password: String must not be empty and be valid for authentication
    * Returns user token that can be used in authentication header to post problem

* `/users`
    * Gets all users registered on firebase
    * No params required
    * Returns array list of users IDs as stored in database

* `/userInfo`
    * Gets info about particular user based on credentials/token from Firebase
    * Must include Firebase token in format of "Bearer <Token>" in authentication header
