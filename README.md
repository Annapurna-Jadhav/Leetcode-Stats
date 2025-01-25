# Leetcode Stats Fetcher

This project is a web application that fetches and displays Leetcode statistics for a user by utilizing the Leetcode Stats API. It provides insights into the user's progress across different difficulty levels (easy, medium, and hard), along with other relevant metrics.

## Features

- **User Input Validation**: Ensures the Leetcode username is valid before fetching data.
- **Leetcode Statistics Display**:
  - Number of problems solved for each difficulty level.
  - Additional statistics such as total submissions, acceptance rate, earned points, and ranking.
- **Dynamic Progress Visualization**: Updates progress levels for easy, medium, and hard problems dynamically.
- **Responsive Design**: Uses Tailwind CSS for a visually appealing and mobile-friendly interface.
- **Error Handling**: Handles invalid usernames or API errors gracefully.

## Technologies Used

- HTML
- CSS (Tailwind CSS)
- JavaScript (ES6+)

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/leetcode-stats-fetcher.git
    ```

2. Navigate to the project directory:
    ```bash
    cd leetcode-stats-fetcher
    ```

3. Open the `index.html` file in your preferred browser:
    ```bash
    open index.html
    ```

## Usage

1. Enter your Leetcode username in the input field.
2. Click the "Search" button.
3. View your Leetcode statistics, including:
   - Problems solved across difficulty levels.
   - Additional stats such as total submissions, acceptance rate, earned points, and ranking.

## File Structure

- `index.html`: The main HTML file containing the application's structure.
- `./src/output.css`: Tailwind CSS for styling.
- `script.js`: Contains the core logic for user input validation, API data fetching, and updating the DOM.

## Key Learnings

- **API Integration**: Fetching and handling data from the Leetcode Stats API.
- **DOM Manipulation**: Updating the UI dynamically based on fetched data.
- **Progress Visualization**: Using CSS properties to create visually appealing progress indicators.
- **Error Handling**: Managing API errors and invalid user inputs.

## Example

![Screenshot](screenshot.png)

## Acknowledgements

- **[Leetcode Stats API](https://leetcode-stats-api.herokuapp.com/)**: For providing the data.
- **[Tailwind CSS](https://tailwindcss.com/)**: For the styling framework.




