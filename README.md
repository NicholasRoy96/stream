![logo](https://user-images.githubusercontent.com/54635883/82729346-abff3480-9cee-11ea-97b3-228b725fb6f3.png)

# stream
### Visit the live stream site [here](http://stream-co.herokuapp.com/), hosted with Heroku.

----
## What is stream?

> Stream is a concept movie streaming site that fetches data from [the TMDB API](https://developers.themoviedb.org/3/), a huge online movie database. Stream has been built using __Nuxt.js__ (SSR for Vue.js), __Vuetify__, and __Vuex__.

----
## How to run locally

### Clone and install dependencies (requires Node v12 or later)
```
1. git clone https://github.com/NicholasRoy96/stream.git
2. cd stream
3. npm install
4. npm run dev
```

----
## Features
* A homepage that fetches data of popular and top-rated movies, trending actors, and ~20 film genres, allowing the user to navigate any of these categories.
* Pages for each genre that list all movies of the selected genre and infinitely loads more movies as the user scrolls.
* A dynamic movie page that contains information of a selected movie,  including trailers, cast, and similar movies.
* A dynamic actor page that contains information of a selected actor, including their most notable credits.
* A watchlist (essentially a cart) that users can add and remove movies from.
* A live search that enables users to search for any film in the database.

---
## Notes and points for improvement

### Testing
* With the size the site grew to become, I have not had time to test all pages and components.
* However, I have written tests for one component using Jest (MovieCard.vue) as an example  of how I could test the other pages and components. Run __npm test__ to test this component.
* As a further note, most of my testing experience involves backend unit-testing with Mocha/Chai, and so front-end testing with Jest is new to me. I have tried my best write a few tests though, and I look forward to learning more about front-end testing.

### Genres
* With the way the TMDB API is designed, fetching a list of the current genres only returns a genre id and name. To fetch any further information about a genre (including image paths), a separate API request must be made for each genre.
* As a consequence, I would have needed to make ~20 separate API requests just to receive a placeholder image for each genre card on the homepage.
* Although given more time I could have found a better solution, for the moment I have hard coded the genres that exist (and some image paths) in the homepage file.

### Search
* At the moment, the live search only allows the user to search for movies. 
* If I were expanding the site, the search could be improved to allow for filters (genres, keywords, top-rated etc.), and could also allow the user to search for actors.

### Error pages
* Given more time, I would using utliise Nuxt validation on the dynamic pages, meaning that if a user passed in an invalid id in the params, a well-designed 404 page could be rendered.
* Currently, the site essentially renders a blank page when an invalid id is  passed into params, so this could be improved upon.

### Project structure
*  

### Config
* In a production environment I wouldn't expose the API key I am using. In this instance though, to make running the site locally easier, the API key has been included in the config.

### Hosting
* The site is currently hosted using a free tier of Heroku. In a production environment, paying for better hosting (and using a custom domain name) would improve the site look and performance.