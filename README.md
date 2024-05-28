# Vanilla JS Calendar App

This is a simple calendar application built with vanilla JavaScript, HTML, and CSS. The calendar displays a grid of days for the selected month and allows users to add, view, and delete events. Events are stored in the browser's local storage, so they persist across page reloads.

## Features

-   Add events to specific days by clicking on the day's square.
-   View events directly on the calendar without additional clicks.
-   Events can have an optional time; they are sorted by time.
-   Add events without time, which are displayed above the sorted timed events.
-   Delete events by clicking a small cross button next to the event.
-   The calendar follows the European date format (DD/MM/YY) and starts the week on Monday.
-   Highlights the current day and hovered-over day.
-   Small scrollbar appears if there are too many events to fit inside a day square.

## Installation

1. Clone the repository or download the source code.

    ```sh
    git clone https://github.com/your-username/vanilla-js-calendar-app.git
    ```

2. Navigate to the project directory.

    ```sh
    cd vanilla-js-calendar-app
    ```

3. Open the `index.html` file in your preferred web browser.

    ```sh
    open index.html
    ```

## Files

-   `index.html`: The main HTML file that contains the structure of the calendar.
-   `styles.css`: The CSS file that styles the calendar.
-   `calendar.js`: The JavaScript file that contains the logic for the calendar.

## Usage

1. Open the `index.html` file in your web browser.
2. Use the "Previous Month" and "Next Month" buttons to navigate through months.
3. Click on a day's square to open a modal where you can add an event.
4. Enter the event description and optionally a time, then click "Add Event".
5. View the added events directly on the calendar.
6. Click the small cross button next to an event to delete it.

## Screenshots

![Screenshot of the Calendar](screenshot.png)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. We welcome all contributions that improve the project.

---

Feel free to adjust the repository URL, add a screenshot image, and include any additional sections or details as needed.
