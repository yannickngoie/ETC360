# Quasar Capacitor Record Synchronization App

This project is a Quasar Capacitor app for synchronizing records between a local database and a remote server. The backend API is built using **Express.js** and **PostgreSQL**.

---

## Features
- **Frontend:** Built using Quasar Framework with Capacitor integration for native mobile capabilities.
- **Backend:** An Express.js API connected to a PostgreSQL database.
- **Data Synchronization:** Handles create, update, and delete operations locally and synchronizes changes with the server.
- **Authentication:** Uses JWT for secure communication.

---

## Technologies Used

### Frontend
- **Quasar Framework**: Vue.js-based UI framework.
- **Capacitor**: Enables native app features.
- **SQLite**: Local storage for records and authentication tokens.

### Backend
- **Express.js**: Handles RESTful API requests.
- **PostgreSQL**: For persistent server-side data storage.

---

## Prerequisites

### General
1. **Node.js**: Install from [Node.js official site](https://nodejs.org/).
2. **PostgreSQL**: Ensure PostgreSQL is installed and configured.


## Development

### FrontEnd

 Install Quasar CLI and Capacitor CLI


```sh
npm install -g @quasar/cli @capacitor/cli
```

Install Android Studio: Required for deploying to an Android device/emulator.

Clone the Repository

```sh
git clone https://github.com/ETC360/quasar-capacitor-app.git
cd quasar-capacitor-app

```
Install Dependencies


```sh
npm install

```
Build the Frontend

```sh
quasar build

```
Add Capacitor to the Project

```sh
npx cap add android

```
Synchronize Capacitor Files

```sh
npx cap sync

```

Open the Project in Android Studio

```sh
npx cap open android


```

Deploy to Emulator/Device

```sh
In Android Studio, select your target emulator or device.
Click Run to deploy the application.

```


### Backend

Clone the Repository

```sh
git clone https://github.com/ETC360/backend.git
cd backend

```
Install Dependencies


```sh
npm install

```



Configure Environment Variables.
Udpate the .env file in the backend directory with the following content:

```sh
env
Copy code
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
PORT=5000

```


Initialize the Database
Run the following commands in your PostgreSQL terminal:

```sh
sql
CREATE DATABASE your_database_name;
CREATE USER your_postgres_username WITH PASSWORD 'your_postgres_password';
GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_postgres_username

```

Build the Backend

```sh
npx tsc 

```

Start the Backend

```sh
node dist/app.js
The backend will be available at http://localhost:5000.

```
