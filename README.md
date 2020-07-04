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
* A homepage that fetches data of popular and top-rated movies, TV series, trending actors, and recently viewed pages, allowing the user to navigate any of these categories.
* Pages for each genre and keyword that list all movies of the selected genre and infinitely loads more movies as the user scrolls.
* A dynamic movie page that contains information of a selected movie, including trailers, cast, collections, and similar movies.
* A dynamic TV series page that contains information of a selected movie, including episode/seasons, trailers, cast, and similar TV series.
* A dynamic actor page that contains information of a selected actor, including their most notable credits.
* A watchlist (essentially a cart) that users can add and remove movies from.
* A live search that enables users to search for any film in the database.
* Distinct page layouts based on user viewport (i.e. Mobile vs. Laptop)

---
## Notes and points for improvement

### Testing
* With the size the site grew to become, I have tested all pages and components.
* However, I have written tests for one component using Jest (MovieCard.vue) as an example  of how I could test the other pages and components. Run __npm test__ to test this component.

### Genres
* With the way the TMDB API is designed, fetching a list of the current genres only returns a genre id and name. To fetch any further information about a genre (including image paths), a separate API request must be made for each genre.
* As a consequence, I would have needed to make ~20 separate API requests just to receive a placeholder image for each genre card on the homepage.

### Hosting
* The site is currently hosted using a free tier of Heroku. In a production environment, paying for better hosting (and using a custom domain name) would improve the site look and performance.