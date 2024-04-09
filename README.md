# Checkbox Tech Challenge <!-- omit in toc -->

Project template for Checkbox's Tech Challenge, a React client and Express/Node server bootstrapped with [Vite](https://vitejs.dev/) and [Vite-Express](https://github.com/szymmis/vite-express).

## Table of contents <!-- omit in toc -->

- [Project scope](#project-scope)
    - [Your task](#your-task)
    - [Out of scope](#out-of-scope)
    - [What we’ll be looking for](#what-well-be-looking-for)
- [Getting started](#getting-started)
    - [Development server](#development-server)
        - [Prerequisites](#prerequisites)
        - [Installing and running](#installing-and-running)
    - [Docker Compose](#docker-compose)
        - [Prerequisites](#prerequisites-1)
        - [Installing and running](#installing-and-running-1)
- [Database configuration](#database-configuration)

## Project scope

You’ve been assigned to a team working on building out a new task
management software. Over the course of a few days, many customer
interviews & user mapping flows, you and your product manager arrive
together at the following set of user stories.

- User should be able to create a new task, including the following
  fields
    - Name
    - Description
    - Due date

- User should be able to view all tasks created in a list view, showing
  all the following details
    - Name
    - Description
    - Due date
    - Create date
    - Status
        - Not urgent
        - Due soon (Due date is within 7 days)
        - Overdue
- User should be able to edit task name, description and due date
- User should be able to search based on task name

### Your task

- Create a working solution that showcases the above user
  stories using the project template provided in this repository
- Please articulate and explain any design decisions you made in your
  readme.
- Feel free to use any libraries to help you
- Don’t worry too much about styling it perfectly!
- List any further improvements to your code that you would’ve made if
  you had time

### Out of scope

- Do not implement any authentication or authorisation
- Do not implement any user management.

### What we’ll be looking for

- Clean, manageable & well structured code
- Production quality code
- Git maturity. Please show your full git commit history (rather than
  pushing everything up in one commit).
- Understanding & effective implementation of fundamental software development principles
- Demonstrated understanding of other tasks you would do if you had time
  & how you would implement them

## Getting started

There are 2 ways to start the project out-of-the-box: [development server](#development-server) or [Docker Compose](#docker-compose). Please note that, for the purposes of the assessment, the final solution **_must_** work as intended via Docker Compose.

### Development server

#### Prerequisites

- [Node](https://nodejs.org/en/) _(see [`.nvmrc`](.nvmrc) for version number)_
- [Yarn 1](https://classic.yarnpkg.com/lang/en/)

#### Installing and running

Open a command line of your preference and do the following:

1. Run `yarn install` to install the dependencies.

2. Run `yarn dev` to start the development server.

3. Wait for a console message saying the app is ready, open the browser of your preference and navigate to http://localhost:3000.

### Docker Compose

#### Prerequisites

- [Node](https://nodejs.org/en/) _(see [`.nvmrc`](.nvmrc) for version number)_
- [Docker Desktop](https://docs.docker.com/desktop/): more convenient as it bundles Docker Compose as well

#### Installing and running

1. Duplicate `.env.sample` in the root folder, name it `.env` and configure all the empty `DB_POSTGRES_*` variables.

2. Run `docker compose up` on a terminal of your choice.

3. Wait for a console message saying the app is ready, open the browser of your preference and navigate to http://localhost:3000.

4. Run `docker compose down` on a separate terminal whenever you want to stop the services.

## Database configuration

The challenge assumes you will be storing and retrieving records from a database. The project contains an initial configuration for [PostgreSQL](https://www.postgresql.org/) to speed things up but you might pick your system of choice if you prefer. Either way, as mentioned before, the application should work as expected when running Docker Compose.
In case you are not using an ORM to manage and connect to the database and are sticking to the project's setup, you should populate the `init.sql` schema creation script at the root. It is run automatically as part of `docker compose up` the first time it gets executed to create your table(s).

## Project approach

From the project scope, there were a few things that were evident to me.

1. This app should be scaleable
2. It should be simple, don't overcomplicate things
3. The UI should be responsive
4. Be wary of techniques to take load off the database

### The backend
I went with the database that came with the project, having not done anything database related for year in uni and in the work place i had to learn quite a lot quite quickly. My schema is relatively simple, just a table holding the values id, name, description, time_created and time_due. I limited the length of ID to 50 characters and the description to 150 characters, I believe an app like this shouldn't carry too much information, just a short sentence here and there to summarise what needs to be done.

I used pg to access the pgsql database in node and built on top of the main.ts that was provided. After much fiddling as i had pretty never used docker before i figured out how to move the .env variables into the container where node resides, allowing me to configure the pg connection via environment variables.

#### Main.ts db.ts and fetchApi.ts
FetchApi.ts is the first point of contact from the frontend to the backend, it is a collection of fetch calls specific to each rest endpoint. Main.ts is where the express API endpoints are built, they call functions within db.ts which directly makes sql calls to the database. Within db.ts, i had string formatting functions to make calls to the database, i know pg has a way to do it but i just always preferred doing it myself.

The design concept here is to separate different stages of calling the backend, this way it's modular and has good readability, allowing for others to understand it more easily and build on top of it.

### The frontend
The frontend is where i spent probably 70% of the time, i used these technologies:
1. redux toolkit
2. mui x
3. mui joy
4. mui
5. styled components
6. use debounce
7. dayjs

#### Main focuses
Once again, i try to structure my folders in a way such they are modular. This is for ease of access and readability. I designed the frontend to maximise the user experience with smooth UI whilst thinking of ways to minimise API calls to the backend, this reduces stress on the database.

Initially, i did not use redux and only stuck with useState. This quickly ended up being very messy which resulted in me refactoring all my code to use redux toolkit. The store itself is also modular, each slice represents one component or functionality where most of it is focused on a component. There is one slice which is the snackBarslice, this is responsible for the notifications or toasts that pop up after an event is completed, created or edited.

In terms of designing the UI, i just went with a simple autocomplete search bar and a button for creating tasks. The tasks themselves are organised in a grid below the search bar and add task button and are responsive just like the rest of the application, reducing columns to fit the size of the users screen.

#### The search bar
My approach for the search bar is that I wanted the user to have a seamless experience, if they add a task and search for it ideally it should ideally appear in the search bar right after. This means that whenever there is input, a call has to be made to the database to query the users input but this can be really bad especially when the application needs to be scaleable. Someone who types 100 characters will call an endpoint 100 times within a few seconds, this is where i used the debouncer. It throttles the users calls to half a second, i found this to be the sweet spot as any longer causes the search bar to be jittery. The search bar is also state managed, if it is calling an api a spinner will show to let the user know it is querying the database.

#### Notifications
Notifications are powered by joyUI's snackBar component. Through the use of redux toolkit's slicing, we can control all the notifications via dispatches and queries. The snackbar components themselves are mounted in the App component and will automatically disappear after 3 seconds.

#### Creating, editing and completing a task
Completion wasn't apart of the spec, however I felt like it was a feature that was integral to making an app like this work. In terms of creating and editing tasks, a modal pops up when you either press the create button at the top of the screen or the edit on a task card, the inputs on the modals themselves also enforce the 50 and 150 char limit on the name and description respectively.

On submission, the frontend will update redux pre emptively with a technique called optimistic updating, however i never got around to finishing that which ill explain later. The main tasksSlice handles all the updating for each action, mapping, filtering and pushing onto the state, the backend only has to return the id which is assigned to the task as the database is responsible for generating ids. This means minimal information has to be returned back, once again reducing the load improving performance and scaleability.

#### Type safety
I think overall i did a decent job with typesafety. The redux store is fully typed, meaning it is essentially guaranteed to throw an error if any mismatches are found. The rest of code is also typed, there are some instances where i use as due to some weird behaviour or to type API calls.

#### Things that i would've done if i had more time
I definitely ran out of time for this project, i wanted to use react query so i could:
1. Implement query bashing
2. Implement optimistic updates for a fast and safe user experience
3. Possibly made some improvements to naming conventions, got a bit messy at the end as i got tired

