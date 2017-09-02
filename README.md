# fcc-voting-app

An implamentation of freeCodeCamp's Build a Voting App.

## User Stories:

-   As an authenticated user, I can keep my polls and come back later to access them.
-   As an authenticated user, I can share my polls with my friends.
-   As an authenticated user, I can see the aggregate results of my polls.
-   As an authenticated user, I can delete polls that I decide I don't want anymore.
-   As an authenticated user, I can create a poll with any number of possible items.
-   As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
-   As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)
-   As an authenticated user, if I don't like the options on a poll, I can create a new option.

## React App Routes:

-   /login
    -   Need to figure out authentication.
    -   [Passport?](http://passportjs.org/)
-   /
    -   Display all the polls
    -   Let user authentication
-   /newpoll
    -   User has be authenticated to use this page.
    -   Call backend API on submit.
-   /poll/:id
    -   Display the results of this poll. Make it a chart.
    -   Let users vote.
    -   Authenticated user can create new option.
    -   Owner can delete this poll.

## Express.JS API Routes:

-   /api/login
    -   POST request
-   /api/signup
    -   POST request
    -   add new user to "database".
-   /api/poll
    -   GET request
        -   return a list of polls.
        -   Starting at 0 and return up to 20 results.
    -   POST request
        -   add new poll to "database".
        -   **Requirement:** user has to be authenticated.
-   /api/poll/:offset/:limit
    -   GET request
        -   return a list of polls starting at offset
-   /api/poll/:id
    -   GET request
        -   return the information for the poll with id.
    -   POST request
        -   record vote for poll
    -   PUT request
        -   add new option to poll
        -   **Requirement:** user has to be authenticated.
    -   DELETE request
        -   remove poll
        -   **Requirement:** user had to be authenticated and owner.

## Poll Object

    {
      id: number, // base64 encoded UUID?
      title: string,
      owner: user Id,
      choices: {},
      voters: [] // IP or user Id
    }

## User Object

    {
      id: number, // base64 encoded UUID?
      email: string,
      password: hashed string
    }

## Source of Info/help

-   [How to get "create-react-app" to work with your API](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/)
-   [Express Router](http://www.syntaxsuccess.com/viewarticle/express-router)

-   [Express Tutorial Part 3: Using a Database (with Mongoose)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)
-   [Part 2: Introducing Mongoose to Your Node.js and Restify API](https://www.mongodb.com/blog/post/part-2-introducing-mongoose-to-your-nodejs-and-restify-api)
-   [Easily Develop Node.js and MongoDB Apps with Mongoose ― Scotch](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications)
-   [Cookie Management in Express](https://www.codementor.io/noddy/cookie-management-in-express-js-du107rmna)
-   [Creating Role Based Authentication with Passport in Ionic 2 – Part 1](https://www.joshmorony.com/creating-role-based-authentication-with-passport-in-ionic-2-part-1/)
-   [Mongoose CRUD (Create, Read, Update, Delete)](https://coursework.vschool.io/mongoose-crud/)
-   [Create basic login forms using create react app module in reactjs](https://medium.com/technoetics/create-basic-login-forms-using-create-react-app-module-in-reactjs-511b9790dede)
-   [How To Add React Router To Create React App2](http://www.penta-code.com/how-to-add-react-router-to-create-react-app/) Outdated, not using v4.
