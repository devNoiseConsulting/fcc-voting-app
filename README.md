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
    -   Need to figure out authentication. [Passport?](http://passportjs.org/)
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

-   /api/newpoll
    -   POST request
    -   add new poll to "database".
    -   **Requirement:** user has to be authenticated.
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
