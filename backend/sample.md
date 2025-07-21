# Habit Tracker

A Spring Boot application for managing your daily habits.  Track your progress, set goals, and stay motivated.

## Introduction

Habit Tracker is a web application built with Spring Boot, Docker, and PostgreSQL that allows users to easily track their habits and monitor their progress over time.  It provides a simple and intuitive interface for adding, editing, and deleting habits, as well as visualizing progress through a user-friendly dashboard.

## Features

* **Add and Manage Habits:** Easily create new habits with customizable names, descriptions, and goals.
* **Track Progress:** Record your daily progress for each habit with simple checkboxes.
* **Visualize Progress:**  View your progress over time with charts and graphs (future enhancement).
* **Goal Setting:** Set realistic goals for each habit to stay motivated.
* **User Authentication:** Secure user accounts to protect your data (future enhancement).


## Technologies Used

* **Backend:** Spring Boot (Java)
* **Database:** PostgreSQL
* **Containerization:** Docker
* **Frontend:** HTML, CSS (Future enhancements will include a more robust frontend framework)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   ```

2. **Database Setup:**
   * Create a PostgreSQL database.  You can use your preferred method (e.g., `psql`).  The application will require a database named `habit_tracker` (you can modify this in the application properties).
   * Create a database user with appropriate privileges.

3. **Build the application:**

   ```bash
   cd habit-tracker
   mvn clean install
   ```

4. **Docker Setup:**
    * Ensure Docker is installed and running on your machine.
    * Build the Docker image:
      ```bash
      docker build -t habit-tracker .
      ```
    * Run the Docker container:
      ```bash
      docker run -p 8080:8080 habit-tracker
      ```
      (Adjust the port mapping if necessary).  You may need to adjust environment variables for database connection details within the docker run command.


## Usage

Once the application is running, open your web browser and navigate to `http://localhost:8080` (or the appropriate port if you changed it).  Currently, the application provides basic HTML pages for interaction.  Future enhancements will include a more sophisticated user interface.

## License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.


## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.


## Future Enhancements

* Implement a more robust and visually appealing frontend using a framework like React or Angular.
* Add user authentication and authorization.
* Implement data visualization features (charts and graphs).
* Add features for setting reminders and notifications.
* Implement unit and integration tests.


Remember to replace `<repository_url>` with the actual Git repository URL.  This README provides a basic structure. You'll need to fill in specifics related to database configuration, environment variables, and other project-specific details.