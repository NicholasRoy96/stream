import { shallowMount, createLocalVue } from "@vue/test-utils"
import Vuetify from "vuetify"
import MovieCard from "@/components/MovieCard.vue"

const localVue = createLocalVue()

const movie = {
  poster_path: "/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
  id: 419704,
  title: "Ad Astra",
  vote_average: 6,
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
