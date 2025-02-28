# Task Manager Application

## 🚀 Live Application
[Task Manager](http://taskmanager331.s3-website.ap-south-1.amazonaws.com)

## 📌 About the Project
The **Task Manager** application is a user-role-based system designed to efficiently manage tasks within an organization. The system consists of three user roles: **Manager, Team Lead, and Employee**, each with specific permissions and responsibilities.

## 👥 User Roles & Permissions

### 1️⃣ **Manager**
- Can access the **list of users**.
- Can **modify user roles** (promote/demote users).
- By default, every newly registered user is assigned the role of an **Employee**.
- Can **create teams** and assign **Team Leaders** and **Employees** to teams.

### 2️⃣ **Team Lead**
- Can manage **their own tasks**.
- Can manage **tasks of their team members (employees assigned to them)**.

### 3️⃣ **Employee**
- Can only access and manage **their own tasks**.

## 🔑 Default Manager Credentials
To test the **Manager** role, use the following credentials:

- **Email**: `managerUser@gmail.com`
- **Password**: `12345678`

## 🛠️ Tech Stack
- **Frontend**: Angular, Bootstrap
- **Backend**: Node.js, NestJS
- **Database**: MongoDB / PostgreSQL (Assumed)
- **Hosting**: AWS S3 (Frontend), AWS Lambda / EC2 (Backend - if applicable)

## 📖 Features
- **Role-based access control (RBAC)**
- **Task management** (create, update, delete tasks based on roles)
- **User management** (handled by the Manager role)
- **Team management** (assign Team Leads and Employees to teams)

## 📜 How to Use
1. **Sign up** as a new user (you will be assigned the Employee role by default).
2. **Log in** with your credentials.
3. If you are a **Manager**, you can navigate to the user list and update roles.
4. If you are a **Team Lead**, you can assign and manage tasks for your team members.
5. If you are an **Employee**, you can manage only your own tasks.

## 🔗 Future Enhancements
- **Task Prioritization**: Allow users to set priority levels.
- **Notifications**: Notify users about assigned or updated tasks.
- **Reports & Analytics**: Generate productivity reports.
- **API Authentication**: Enhance security with JWT-based authentication.

## 📩 Contributing
If you'd like to contribute, please feel free to fork the repository and submit a pull request!

## 📞 Support
If you encounter any issues or have suggestions, feel free to reach out.

---
✨ **Enjoy managing your tasks efficiently!** 🚀

