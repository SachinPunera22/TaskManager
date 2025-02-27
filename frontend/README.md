# Task Manager Angular App Setup

## Prerequisites
- Node.js (Recommended: Latest LTS version)
- Angular CLI (Install globally if not already installed: `npm install -g @angular/cli`)

## Installation Steps

1. **Clone the Repository**
   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Run the Development Server**
   ```sh
   ng serve
   ```
   The application will be available at `http://localhost:4200/` by default.

## Environment Setup
- Copy `.env.example` and rename it to `.env` if applicable.
- Configure necessary environment variables.

## Build for Production
To build the Angular app for production, run:
```sh
ng build --configuration=production
```


## Notes
- Ensure all environment variables are properly set before running the application.
- If using a backend, ensure it is running before making API calls.

Happy Coding! 🚀

