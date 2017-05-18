# wdi-group-project

#*WHAT'S YOUR BEEF*


##Intro

*WHAT'S YOUR BEEF* is an app directed at both vegans and non-vegans who can share their own vegan recipe versions of various cuisines.

The user can register and login and then can navigate the website easily by clicking on the cuisine they are interested in. Then a list of all the recipes under that cuisine appear and the user is able to choose one.
The recipe show page has various information on ingredients used, instructions and the chef's profile page where they can navigate and check out more recipes by that particular chef.

--

##How it was made

###The team - LDDS

*Louis*
*Dave*
*Danai*
*Sunny*

A diverse bunch with individual strengths and weeknesses who have achieved to combine and build a MEAN machin..eeeerrr.. application from scratch.

###The app

Built on AngularJS


###Testing first (TDD with LDD)

We wrote about 22 tests before writing any code, checking basic things like response statuses, headers and keys in JSON responses.

We wrote the API very quickly then fleshed out the tests further, some expecting errors.

When we added JWT authentication to the API is broke many of the tests because they failed to authenticate. It took some time to work out how to authenticate the tests.

In the end, we created a user before each describe block, then authenticated by sending the JWT token in the headers of the request. At this point we had about 90% test coverage.

We then added error handlers which improved coverage a little, then wrote tests to make sure they work.

We ended up with 81 test passing at MVP.

--Walkthrough--

We first installed the dependancies using the following commands: `yarn add bcrypt bluebird body-parser chai cors express-jwt istanbul jsonwebtoken mocha mongoose morgan supertest validator` and `bower i angular-ui-router angular-resource angular-jwt --save`
 and then we created a separate branch for testing `git branch setup_tests`

Created then all test files inside a test directory. Files included  index_spec.js, mocha.opts and spec_helper.js

At this point we were running some basic tests such if there is a 200 response from the server, if the file in question is an html file and if the title of the app is Vegan Chef.

Made sure the test passed and then merged it to the development branch by using `git merge setup_tests` on the development branch.


--

###API and additional Testing

Afer basic testing was completed we found it was a good idea to split up in two groups. Dave and Danai started pair programming on the API's initital build and Louis began planning out the rest of the tests.

It was quite quick setting up all of the routes and controllers as a first step and then writing the tests out and figuring out git merging system took the rest of our first day of the project.

By the end of Saturday we managed to sign off quite a few of our Trello tabs to be completed so it was a pretty successful day.

--

###Error Handler

On Sunday we created an error handler and custom responses which provided a 100% test coverage on our controllers.


--

###Authentication

Started off with back-end authentication by creating the user model and preparing the index.js using jsonwebtoken. After that we created the user controller and we tested our registration and login on Insomnia. Once everything was successful we re-run our tests but due to not being allowed having access anymore to the user authentication 30 or so of our tests broke.

We found a way around this problem by tricking the test file to log in by storing a token as a global variable and added it to the headers of every single request.

We then proceeded to front-end angular authentication and making the back-end available to the front-end and added more tests for users.

--

###Front-End

Using Balsamiq we began a basic layout for the website going mobile-first.

We then proceeded with Front-End authentication

--

###Styling

We decided to use Bootstrap as our CSS Framework because of its amazing mobile-first functionality. Skeleton was a close second but we decided that we did not have enough time to develop a fully functional responsive navigation bar.

--

#Challenges

***GitHub -*** Overcoming merge conflicts and synchonizing our pull and push requests proved to be a little bit challenging but thanks to Louis' patience and problem solving abilities we managed to get through this obstacle and merge our branches smoothly for the rest of the project.

***Authentication Test Errors -***
We found a way around this problem by tricking the test file to log in by storing a token as a global variable and added it to the headers of every single request.

***Front-End Authentication -***

#Quotes

Louis - When I pseudocode, I code.

Sunny - (out of the blue) Opera singers can go very f*cking loud!!


#Future plans
--

***Index of users / chefs***

- We would like to allow users to browse Chefs, though at the moment we want to draw attention to the recipes as opposed to the individual Chefs. 

***External API***

- Perhaps we could source ingredients from an external API, we used a lot of ingredients from Beyond Meat, but they don't have an API for it. There are many, but it would have been a lot fo work to implement them.
- There are other potential uses for external APIs.

***External links for more information***

- We would like to add an ingredients show page and provide more information about ingredients, an API would likely provide these features. 

***User and profile features***

- We wanted to have more complex user profiles, allowing users to follow each other etc. 
- We also wanted comments and sub-comments, but ran out of time. This would require more work on the back end as well as the front. Too big a challenge for such a short time. 