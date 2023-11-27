# Card-Generator

## Overview

Card-Generator is a web application built with Next.js and React.js that allows users to dynamically generate customizable cards. Users can upload a logo and specify a company name. The application extracts the dominant color from the logo and adjusts the card's background accordingly.

### Features

- **Logo Upload:** Users can upload a logo for their company.
- **Company Name:** Users can input the name of their company.
- **Dynamic Background:** The application automatically extracts the dominant color from the logo and adjusts the card's background.
- **Responsive Design:** The card layout is designed to be responsive, providing a consistent experience across various devices.

### Client Side

#### Dependencies

- **@chakra-ui/react:** A set of accessible and customizable UI components for React.
- **@emotion/react and @emotion/styled:** Emotion is a popular CSS-in-JS library for styling React components.
- **axios:** A promise-based HTTP client for the browser and Node.js.
- **framer-motion:** A library for creating smooth animations in React applications.
- **html-to-image:** A library for converting HTML to an image.
- **next:** A React framework for building server-rendered applications.
- **react:** A JavaScript library for building user interfaces.
- **react-color-extractor:** A library for extracting dominant colors from images.
- **react-dom:** React package for working with the DOM.

### Server Side

#### Dependencies

- **cors:** Cross-Origin Resource Sharing middleware for Express.
- **dotenv:** A zero-dependency module that loads environment variables from a .env file.
- **express:** A web application framework for Node.js.
- **multer:** A middleware for handling multipart/form-data (used for file uploads).
- **mysql:** A Node.js driver for MySQL databases.
- **nodemon:** A tool that helps develop Node.js-based applications by automatically restarting the node application when file changes are detected.

## Getting Started

1. Clone the repository: `git clone https://github.com/your-username/Card-Generator.git`
2. Navigate to the project directory: `cd Card-Generator`
3. Install client-side dependencies: `npm install` (inside the `client` directory)
4. Install server-side dependencies: `npm install` (inside the `server` directory)
5. Start the client and server simultaneously: `npm run dev` (inside the project root)

The application will be accessible at `http://localhost:3000`.
![Card-Generator Image]([path/to/your/image.png](https://github-production-user-asset-6210df.s3.amazonaws.com/95576601/285701677-fe61d02e-f86d-4dc5-92e1-6dda51dccbf4.PNG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231127%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231127T015844Z&X-Amz-Expires=300&X-Amz-Signature=305c6cae0c631e092de20c22e5bb76948bc2af0df4151dae8e6d80993a05d99d&X-Amz-SignedHeaders=host&actor_id=95576601&key_id=0&repo_id=723559045)https://github-production-user-asset-6210df.s3.amazonaws.com/95576601/285701677-fe61d02e-f86d-4dc5-92e1-6dda51dccbf4.PNG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231127%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231127T015844Z&X-Amz-Expires=300&X-Amz-Signature=305c6cae0c631e092de20c22e5bb76948bc2af0df4151dae8e6d80993a05d99d&X-Amz-SignedHeaders=host&actor_id=95576601&key_id=0&repo_id=723559045)

## Development

- Run the client and server in development mode: `npm run dev`
- Build the client for production: `npm run build` (inside the `client` directory)
- Start the server in production mode: `npm start` (inside the `server` directory)
