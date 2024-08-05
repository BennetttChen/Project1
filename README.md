# Health Tracker App

This Health Tracker App allows users to manage and track their daily exercise routines, dietary habits, and health goals. The app includes a front-end for user interaction and a back-end API for data storage and retrieval.

## Project Setup

To get started with the project, follow these steps:

1. **Clone the Repository:**

    ```sh
    git clone https://github.com/YourUsername/health-tracker-app.git
    cd health-tracker-app
    ```

2. **Install Dependencies:**

    ```sh
    npm install
    ```

3. **Start the HTTP Server:**

    ```sh
    npm start
    ```

    The server will start on `http://localhost:3001`.

4. **Access the Application:**

    Open your browser and navigate to `http://localhost:3000` to access the application.

## Project Structure

The project is structured as follows:

- **`src/frontend/`**: Contains all front-end related files (HTML, CSS, JavaScript).
  - **`html/`**: HTML files for different views.
  - **`css/`**: Stylesheets for the application.
  - **`js/`**: JavaScript files that manage front-end logic.
- **`src/backend/`**: Contains the server setup and database configuration.
  - **`server.js`**: Express server setup and API routes.
- **`.gitignore`**: Specifies files and directories to be excluded from Git tracking.
- **`package.json`**: Lists dependencies and scripts for running the project.

## API Documentation

The API provides endpoints to manage exercises, diets, and health goals.

### Get All Exercises

- **Endpoint**: `/exercises`
- **Method**: `GET`

#### Request

No body is needed for this request.

#### Response

```json
[
  {
    "_id": "someid",
    "type": "Running",
    "duration": 30,
    "date": "2024-07-29"
  },
  ...
]



### Notes:

1. **Detailed API Documentation**: Continue to add detailed documentation for the `diets` and `goals` endpoints, similar to the exercise endpoints.

2. **Contributing and License Sections**: Adding a contributing section and a license section can make your project more accessible to other developers and clarify legal use.

3. **Use of Placeholders**: Replace `YourUsername` with your actual GitHub username in the clone command URL.

This README structure should meet the rubric criteria for documentation and provide clear, useful information for anyone using or contributing to your project.
