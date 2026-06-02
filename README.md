# Weather Dashboard Project

![HTML](https://img.shields.io/badge/HTML-5-orange?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-3-blue?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Frontend-yellow?style=for-the-badge&logo=javascript&logoColor=black)
![Weather API](https://img.shields.io/badge/Open--Meteo-Live%20Weather-0b7285?style=for-the-badge)


An end-to-end frontend weather dashboard project built during the Capabl Summer Internship. This repository includes a responsive user interface, live weather search, reusable project structure, and internship certificate documentation for portfolio presentation.

## Overview

The goal of this project is to provide users with a simple and clean way to check current weather conditions for any city or place. The original version was a basic static weather app and was later improved into a more reliable and GitHub-ready project structure that is easier to run, understand, and showcase.

## Problem Statement

Given a city or place entered by the user, the application fetches current weather details and displays key metrics such as temperature, condition, humidity, and wind speed in an easy-to-read dashboard format.

## Key Improvements

- Converted the original basic weather app into a cleaner GitHub-ready project
- Replaced the old hardcoded API-key dependency with Open-Meteo APIs
- Added better handling for empty input, invalid locations, and network failures
- Improved UI responsiveness and keyboard accessibility
- Organized project files and included internship certificate documentation

## Workflow

1. Open the weather dashboard in a browser.
2. Enter a city or place name in the search box.
3. Fetch live weather data from the API.
4. Display the current temperature, weather condition, humidity, and wind speed.
5. Show a user-friendly message for invalid locations or network issues.

## Features

The improved dashboard provides the following features:

- Search weather by city or place name
- Live weather data integration using Open-Meteo APIs
- Temperature, weather condition, humidity, and wind speed display
- Friendly feedback for invalid searches
- Loading and network error handling
- Enter key support for faster search
- Responsive layout for desktop and mobile screens

## Technologies Used

- HTML
- CSS
- JavaScript
- Open-Meteo Geocoding API
- Open-Meteo Forecast API

## Project Contents

- `index.html` - page structure and layout
- `style.css` - styling and responsive design
- `index.js` - weather search logic and API integration
- `images/` - weather condition icons and error image
- `certificate/` - internship certificate PDF

## How to Run

1. Open the project folder.
2. Start a simple local server from that folder.
3. Visit the local server URL in your browser.

Example using Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Project Structure

```text
Project Weather Web/
|-- README.md
|-- index.html
|-- index.js
|-- style.css
|-- images/
|   |-- 404.png
|   |-- clear.png
|   |-- cloud.png
|   |-- mist.png
|   |-- rain.png
|   `-- snow.png
`-- certificate/
    `-- Certificate of Participation Capabl Summer Internship in FULL STACK DEVELOPMENT on WEATHER DASHBOARD N.pdf
```

## Future Improvements

- Add hourly and multi-day weather forecast support
- Detect the user's current location automatically
- Add unit switching between Celsius and Fahrenheit
- Improve animations and richer weather visuals
- Deploy the project with a live demo link

## Author

Nadeem Ahamad

Prepared as a Full Stack Development Project under Capabl Summer Internship and refined for GitHub portfolio presentation.
