import { createClient } from "contentful";
const client = createClient({
  space: "7yrilk3o6kx9",
  accessToken:
    "26422469b9918126673d969554875b5e17d29fc93e8ec159657e069efb23d1d1",
  host: "preview.contentful.com"
});

export default client;
