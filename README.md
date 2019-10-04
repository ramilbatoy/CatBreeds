-------------------------------------------------------------------------
The application consists in a select a cat breeds, showing the results with a single cat page

- React app that loads images of Cats

detail :

-- 2 Pages: HomePage and Single Cat Page 


Home Page:
    -> Select Input Box : Loads Breeds of Cats Via API :  https://docs.thecatapi.com/

    -> Fetch images After selecting a breed

    -> View Detail button on each email that will load the single cat page

 Single Cat Page:

 	-> Load detail of Specific Cat breed based on the view detail button 
-------------------------------------------------------------------------

## Setting up the environment

You have to install NodeJS and NPM to run this project:

```
$ node -v  # to verify NodeJS instalation
$ npm -v   # to verify the NPM instalation
```

If you need to install NodeJS or NPM, access the official links below and follow the steps to install each software in your OS:
- https://nodejs.org
- https://www.npmjs.com/get-npm

## Install & Run

To install and run this app follow the step below:

```
# Install the create-react-app packege globally
$ npm install -g create-react-app

# Clone this repository
$ git clone https://github.com/ramilbatoy/CatBreeds

# Acess the repository folder
$ cd ./the-cat-breeds-app

# Install the project dependencies
$ npm install

# Run the application in development mode
$ npm start

# Access the development server in http://localhost:3000
````