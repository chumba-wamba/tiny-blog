# Tiny-Blog
A minimal, text-based web-application which allows you to create, read, update, and delete blogs. The intetion behind developing this project is to learn how to use Node.js and various other node libraries/frameworks such as Express.js, Handlebars, Mongoose, OAuth2 (with Passport), etc. The back-end relies on routers created using Express.js and the front-end is powered by HTML, CSS, and Vanilla JS with the Handlebars as the templating engine. The future scope of the project is to replace the front-end with React.js or any other subsequent framework/library for better state management.

## Usage

Add your mongoDB URI and Google OAuth credentials to the config.env file

``` bash
# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm start
```