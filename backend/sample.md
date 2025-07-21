# Habit Tracker

A Spring Boot application built to help you track your habits and visualize your progress with insightful analytics.

## Introduction

Habit Tracker is a web application designed to empower you to build and maintain positive habits.  It provides a simple and intuitive interface to log your daily activities, track your progress over time, and analyze your consistency.  The application is built using a robust technology stack ensuring scalability and maintainability.

## Features

* **Habit Creation:** Easily add new habits with customizable names, descriptions, and targets.
* **Daily Logging:**  Log your progress for each habit daily with a simple yes/no or custom value input.
* **Progress Visualization:**  View your progress with clear charts and graphs, showcasing streaks and overall consistency.
* **Analytics Dashboard:**  Analyze your habit data to identify patterns and areas for improvement.
* **User Authentication:** Secure user accounts to protect your data. (Future Enhancement)


## Technologies Used

* **Backend:** Spring Boot (Java)
* **Database:** PostgreSQL
* **Containerization:** Docker
* **Frontend:** HTML, CSS, JavaScript (Future Enhancement -  consider expanding with a modern framework like React, Vue, or Angular)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

1. **Prerequisites:**
    * Ensure you have Java 11+ installed.
    * Install Docker and Docker Compose.
    * Install PostgreSQL (or use the Dockerized version provided).

2. **Clone the Repository:**

   ```bash
   git clone <repository_url>
   ```

3. **Database Setup (Using Docker):**  The application utilizes a Dockerized PostgreSQL instance.  Navigate to the project root directory and run:

   ```bash
   docker-compose up -d
   ```
   This will start the PostgreSQL container.

4. **Build the Application:**

   ```bash
   ./mvnw clean package
   ```

5. **Run the Application:**

   ```bash
   java -jar target/habit-tracker-*.jar
   ```

## Usage

Once the application is running, you can access it through your web browser at `http://localhost:8080` (or the port specified in your application.properties).  (Note:  Currently, the UI is basic HTML. Future iterations will include a more sophisticated user interface).

## License

This project is licensed under the [MIT License](LICENSE).  (You'll need to create a LICENSE file with the MIT License text.)


## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.


## Future Enhancements

* Implement a robust and user-friendly frontend using a modern JavaScript framework.
* Add user authentication and authorization.
* Implement more advanced analytics and reporting features.
* Integrate with other health and fitness tracking applications.


This README provides a comprehensive overview of the Habit Tracker project. Remember to replace `<repository_url>` with the actual Git repository URL.  The application currently features a basic HTML frontend; future development will focus on enhancing the user interface and adding more advanced features.