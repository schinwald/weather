![Weather Or Not](/logo.svg)

[![Netlify Status](https://api.netlify.com/api/v1/badges/ad5270f6-de72-4a7e-a749-ede6d352b2ac/deploy-status)](https://app.netlify.com/sites/trusting-goldberg-c06bfd/deploys)

:link: [Demo](https://trusting-goldberg-c06bfd.netlify.app/)

## Description

A weather dashboard created using react.js and the jamstack which elegantly displays current, hourly, and weekly forecasts. These forecasts are stored in local storage and updated on an hourly basis to avoid excessive api calls. The current forecast uses minute data to estimate weather parameters as time progresses between api calls. The css used in this project was made from scratch (no css libraries other than those provided from erikflowers' weather icons).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Preview

https://user-images.githubusercontent.com/5532419/163467872-05d3204b-1685-4597-bbec-255415ffd60a.mp4

## Learning Outcomes

- Understanding react using hooks as opposed to the traditional method
    - useEffect
    - useState
    - useRef
    - useContext
        - ContextProviders
        - ContextConsumers (not used explicitly since useContext hook was used)
- Understanding css on a deeper level and using scss to enhance the experience
    - Variables
    - Nesting
    - Pseudo classes
        - :nth-child
        - :first-child
        - :last-child
        - :not
    - Difference between animations and transitions
    - Difference between different display types
        - block
        - inline-block
        - flex
        - grid
    - Justification/alignment techniques for each display type
    - Strategies for creating custom components
        - Search
        - Dropdown
- User interface
    - Proper HTML tags and aria attributes for accessibility
    - Using contrast to help users see text more clearly
    - Media queries for different screens (not implemented, but learned)
- Benefit of researching a problem prior to implementing a solution for it

## Attributions

| Attributor                                                 | Description                                     |
|-----------------------------------------------------------:|:------------------------------------------------|
| [Simplemaps](https://simplemaps.com/data/world-cities)     | access to 41 thousand world city entries        |
| [OpenWeatherMap](https://openweathermap.org)               | access to weather data around the world         |
| [Storyset](https://storyset.com)                           | many different free vector images               |
| [Erikflowers](https://erikflowers.github.io/weather-icons) | weather icons with openweathermap compatibility |
| [FontAwesome](https://fontawesome.com)                     | general icons in the free and brands categories |

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
