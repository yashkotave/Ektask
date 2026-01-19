# Ektask Backend - Admin Authentication

Simple Express.js backend for admin authentication using JWT.

## Setup

1. **Install dependencies:**

   ```bash
   cd Backend
   npm install
   ```

2. **Configure environment variables:**
   Edit `.env` file to set your admin credentials:

   ```
   ADMIN_EMAIL=admin@ektask.com
   ADMIN_PASSWORD=Admin@123
   JWT_SECRET=your_super_secret_key_here
   PORT=5000
   ```

3. **Run the server:**
   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint            | Description                    |
| ------ | ------------------- | ------------------------------ |
| GET    | `/`                 | Health check                   |
| POST   | `/api/admin/login`  | Admin login                    |
| GET    | `/api/admin/verify` | Verify JWT token               |
| POST   | `/api/admin/logout` | Logout (clears frontend state) |

## Default Admin Credentials

- **Email:** admin@ektask.com
- **Password:** Admin@123

> ⚠️ **Important:** Change these credentials in production!

## Usage

### Login Request

```json
POST /api/admin/login
{
  "email": "admin@ektask.com",
  "password": "Admin@123"
}
```

### Login Response

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "email": "admin@ektask.com",
    "role": "admin"
  }
}
```

### Protected Routes

Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_token_here>
```
