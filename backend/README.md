# Project Setup Guide

## Prerequisites
- **MongoDB**: Ensure MongoDB is installed and running on your machine.
- **Node.js & npm**: Make sure you have Node.js and npm installed.

## Installation Steps

1. **Clone the Repository**
   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Setup Environment Variables**
    - Copy the example environment file and create your own `.env` file.
   ```sh
   cp .env.example .env
   ```
    - Update the `.env` file with the necessary configuration.

3. **Install Dependencies**
   ```sh
   npm install
   ```

4. **Start the Application**
   ```sh
   npm run start
   ```


## Notes
- Ensure MongoDB is running before starting the application.
- Check `.env` file for necessary configurations such as database connection string.

Happy coding! 🚀
