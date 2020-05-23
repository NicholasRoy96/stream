import { shallowMount, createLocalVue } from "@vue/test-utils"
import Vuetify from "vuetify"
import MovieCard from "@/components/MovieCard.vue"

const localVue = createLocalVue()

const movie = {
  popularity: 516.776,
  vote_count: 3432,
  video: false,
  poster_path: "/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
  id: 419704,
  adult: false,
  backdrop_path: "/5BwqwxMEjeFtdknRV792Svo0K1v.jpg",
  original_language: "en",
  original_title: "Ad Astra",
  genre_ids: [18, 878],
  title: "Ad Astra",
  vote_average: 6,
  overview:
    "The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.",
  release_date: "2019-09-17"
};


let validMovie, invalidMovie
beforeEach(() => {
  let vuetify = new Vuetify()

  validMovie = shallowMount(MovieCard, {
    propsData: {
      movie
    },
    localVue,
    vuetify
  });

  invalidMovie = shallowMount(MovieCard, {
    propsData: {
      movie: {}
    },
    localVue,
    vuetify
  });
})

afterEach(() => {
  validMovie.destroy();
  invalidMovie.destroy();
})

describe("MovieCard.vue", () => {
  test("is a Vue instance", () => {
    expect(validMovie.isVueInstance()).toBeTruthy();
  })

  describe('with a valid movie poster path', () => {
    test("it creates a v-img with valid src", () => {
      expect(validMovie.find(".movie-card-poster").attributes("src")).toBe(
        "https://image.tmdb.org/t/p/w185/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg"
      );
    });
  })

  // only shows if valid poster_path
  describe("without a valid movie poster path", () => {
    test("it renders placeholder icon", () => {
      expect(invalidMovie.find(".placeholder-movie-icon").text()).toBe(
        "mdi-video-image"
      );
    });
    test("it renders placeholder heading", () => {
      expect(invalidMovie.find(".placeholder-movie-title").text()).toBe(
        "No movie poster"
      );
    });
  });

  // only shows if poster_path is falsy
  test("card title shows movie name", () => {
    expect(validMovie.find(".movie-card-title").text()).toBe(
      "Ad Astra"
    );
  });

  test("shows a star icon for vote_average", () => {
    expect(validMovie.find(".movie-card-rating-star").text()).toBe(
      "mdi-star"
    );
  })

  // only shows if vote_average is truthy
  describe('with a valid vote_average', () => {
    test("it renders the vote_average", () => {
      expect(validMovie.find(".movie-card-rating").text()).toBe('6');
    });
  })

  // only shows if vote_average is falsy
  describe('with a missing vote_average', () => {
     test("it renders the vote_average", () => {
       expect(invalidMovie.find(".movie-card-rating").text()).toBe("N/A");
     });
  })

})
