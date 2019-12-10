# GEO PAL Assignment (Google Maps API)

### Controllers:

1. MapController.php

### Models:

None

### Views:

1. views/geo/map/index.blade.php
2. views/inc/modals/geo/general.blade.php

### Additional Files:

1. public/js/map-handler.js
2. public/css/index.css
3. resources/lang/gb/messages.php


### MySQL Database:

None

## Installation

1. Clone the project: git clone
2. cd <project-root-directory> (the folder containing the /app/ directory)
3. Clone laradock: git clone https://github.com/Laradock/laradock.git
4. Follow overview/instructions here: https://laradock.io/
5. Spin up the project containers: docker-compose up -d nginx mysql workspace
6. Composer update
7. Replace the GOOGLE MAPS API KEY in /app/config with your own key
8. Run the project in your browser: http://localhost/index

## API Reference

Not required

## Contributors

Donal Lynch <donal.lynch.msc@gmail.com>

## License

© 2019 Donal Lynch Software, Inc.