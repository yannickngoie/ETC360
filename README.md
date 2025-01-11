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
