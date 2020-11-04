# Shoppingify

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://shoppingify-dev-challenge.vercel.app/">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/Benjamin-Roger/shoppingifyDevChallenge">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/mGd5VpbO4JnzU6I9l96x">
      Challenge
    </a>
  </h3>
</div>


This repo is my take on the Shoppingify dev challenge.

It has been built with React and Next.js, runs on Vercel with a MongoDB database. It is rendered mostly client-side, with API exposed on a separate server.


## How to use

Clone this repo to your folder.

### Database settings

Create a MongoDB database.

Create 3 collections :
- lists
- items
- users

Create a few items with the following structure
```json
    {
        "_id": "5f9fb2318e7d6fb94515ccd9",
        "name": "Avocado 2kg",
        "category": "Vegetables",
        "amount": 1,
        "note": "Hello avocado",
        "image": "https://i.imgur.com/zPu5pXI.jpeg"
    }
```

### Environment variables

Create a .env.local file at the root of the folder "api" with 2 environment variables
```
PORT=8000
MONGODB_CONNECTION_STRING={your MongoDB connection string}
```
Create a .env.local file at the root of the folder "client" with 1 environment variable
```
BASE_API_URL='http://localhost:8000'
```

### Launch the API app

In the /api folder, run

```shell
npm i

npm run dev
```
It will open the webserver, to serve the API requests on http:localhost:8000

### Launch the client app

Open a separate command window. In the /client folder, run

```shell
npm i

npm run dev
```
It will open the client app itself, available on http:localhost:3000


## Deploy your own

Deploy the example using [Vercel](https://vercel.com):

### API app

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/Benjamin-Roger/shoppingifyDevChallenge/api)

### Client app

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/Benjamin-Roger/shoppingifyDevChallenge/client)

Be careful to add the environment variables !