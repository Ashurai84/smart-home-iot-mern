# Smart Home IoT Control System - Backend

A complete backend API for Smart Home Automation built with Node.js, Express, and MongoDB.

## Project Overview

This project is a **Smart Home Automation System** that allows users to control smart home devices like lights, fans, AC units, and sensors through a web dashboard. Users can toggle devices ON/OFF, view activity logs, and manage their smart home remotely.

## Features

- User Authentication (Register/Login with JWT)
- Device Management (Add, Toggle, Delete devices)
- Activity Logs (Track all device actions)
- Secure API with Token-based Authentication

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** Bcrypt

## Project Structure

```
src/
  index.js              # Entry point - starts server
  routes/
    index.js            # Combines all routes under /api
    auth.routes.js      # Login, Register APIs
    device.routes.js    # Device CRUD APIs
    log.routes.js       # Activity logs API
  models/
    User.js             # User schema
    Device.js           # Device schema
    Log.js              # Log schema
  middleware/
    auth.js             # JWT token verification
```

## API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get token |

### Device Routes (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/devices` | Get all devices |
| POST | `/api/devices` | Create new device |
| PATCH | `/api/devices/:id/toggle` | Toggle device ON/OFF |
| DELETE | `/api/devices/:id` | Delete device |

### Log Routes (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/logs` | Get all activity logs |
| GET | `/api/logs/:deviceId` | Get logs for specific device |

## Installation

1. Clone the repository
```bash
git clone https://github.com/Ashurai84/smart-home-iot-mern.git
cd smart-home-node-server
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```
PORT=5001
DB_URL=mongodb://localhost:27017/
DB_NAME=smarthome_db
JWT_SECRET=your_secret_key
```

4. Start the server
```bash
npm run dev
```

## How It Works

1. **User registers/logs in** and receives a JWT token
2. **Token is sent** in Authorization header for protected routes
3. **User can add devices** (light, ac, fan, sensor, tv, door)
4. **Toggle devices** ON/OFF with single API call
5. **Every action is logged** in the database for history

## Device Types Supported

- Light
- AC (Air Conditioner)
- Fan
- Sensor
- TV
- Door Lock

## Credits

**Developed by:** Ashutosh Rai

**Guidance:** Node.js Sir & AI Assistant

---

Made with dedication for learning Full Stack Development
