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

### Frontend
3. **Quasar CLI**: Install globally:
   ```bash
   npm install -g @quasar/cli


Capacitor CLI: Install globally using:
bash
Copy code
npm install -g @capacitor/cli
Android Studio (if deploying to an Android device/emulator).

### Frontend Setup
1. **Clone the Repository**
bash
Copy code
git clone https://github.com/ETC360/quasar-capacitor-app.git
cd frontend
2. **Install Dependencies**
bash
Copy code
npm install
3. **Configure the API URL**
Open the src/config.js file (or equivalent) in the frontend directory and set the API_BASE_URL:

typescript
Copy code
export const API_BASE_URL = 'http://10.0.2.2:5000'; // For Android emulator
4. **Build the Frontend**
bash
Copy code
quasar build
5. **Add Capacitor to the Project**
bash
Copy code
npx cap add android
6. **Synchronize Capacitor Files**
bash
Copy code
npx cap sync
7. **Open the Project in Android Studio**
bash
Copy code
npx cap open android
8. **Deploy to Emulator/Device***
In Android Studio, select your target emulator or device.
Click Run to deploy the application.

