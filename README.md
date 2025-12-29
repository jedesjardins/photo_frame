
# Installation:

1. Create a `.env` file. Add your immich url and api key, like so:
```
IMMICH_API_URL=http://<url>:<port>
IMMICH_API_KEY=<user_api_key>
```

2. Run the project:
```
$ docker compose up --build
```

Note: The project was initialized with `$ docker run --rm -v $(pwd):/app -w /app node:20-slim npx create-react-router@latest .`

# Roadmap:
* [ ] Transition effects?
* [ ] Filter Photos (landscape, portrait, favorited, Camera, tags, People)
* [ ] Change photo ordering (random, chronological, reverse-chronological)
* [ ] Arrow keys/swiping to go to the next/previous
* [ ] Space button/Click to pause/resume
* [ ] Modify Photo Switch Timer
* [ ] Better UI (Hamburger Menu with UI selections)
* [x] Rotate the displayed image from the album
* [x] Add Album Selector