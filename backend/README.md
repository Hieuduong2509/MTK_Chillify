# Chillify Backend (ASP.NET Core)

## Overview

Chillify is a web-based music player backend built with **ASP.NET Core (.NET 9)** following a layered architecture:

* **API Layer** → Controllers, DTOs, middleware
* **Application Layer** → Business logic, interfaces, design patterns
* **Infrastructure Layer** → Database access, external services

This project is structured for **scalability, maintainability, and clean architecture principles**.

---

## Current Status

### Completed

* ASP.NET Core Web API setup
* PostgreSQL connection via Entity Framework Core
* Health check endpoint (`/health`)
* Swagger API documentation
* CORS configuration
* Clean project structure (API / Application / Infrastructure)

### Verified

* Application builds successfully
* Server runs correctly
* Swagger UI accessible
* Database connection **confirmed working**

```http
GET /health → Healthy
```

---

## Project Structure

```
backend/
│
├── api/
│   ├── controllers/
│   │   ├── AuthController.cs
│   │   ├── UserController.cs
│   │   ├── SongController.cs         
│   │   ├── PlayerController.cs
│   │   └── PlaylistController.cs
│   │
│   ├── DTOs/
│   │   ├── Auth/
│   │   ├── User/
│   │   ├── Song/
│   │   └── Playlist/
│   │
│   ├── middlewares/
│   ├── Properties/
│   │   ├── launchSettings.json
│   ├── api.csproj
│   ├── api.http
│   ├── appsettings.Development.json
│   ├── appsettings.json
│   └── Program.cs		# Entry point, config DBContext, middleware pipline
│
├── application/
│   ├── application.csproj
│   ├── services/			# Logic chính của từng feature
│   │   ├── AuthService.cs		
│   │   ├── UserService.cs             
│   │   ├── SongService.cs             
│   │   ├── PlayerService.cs		# Tăng playCount, lịch sử nghe
│   │   └── PlaylistService.cs
│   │
│   ├── interfaces/
│   │   ├── Services/			# Interface cho service
│   │   │   ├── IAuthService.cs
│   │   │   ├── IUserService.cs
│   │   │   ├── ISongService.cs
│   │   │   ├── IPlayerService.cs
│   │   │   └── IPlaylistService.cs
│   │   │
│   │   └── Repositories/		# Interface cho data layer
│   │       ├── IUserRepository.cs	
│   │       ├── ISongRepository.cs
│   │       ├── IPlaylistRepository.cs
│   │       └── IPlayHistoryRepository.cs
│   │
│   ├── models/				# 1 model <=> 1 table trong DB
│   │   ├── User.cs
│   │   ├── Song.cs                   
│   │   ├── Playlist.cs
│   │   ├── PlaylistSong.cs          
│   │   └── SongPlayHistory.cs        
│   │   
│   └── patterns/
│       ├── section/                   # Factory Method + Strategy Pattern
│       │   ├── ISectionStrategy.cs
│       │   ├── TrendingSection.cs
│       │   ├── DiscoverSection.cs
│       │   ├── NewSection.cs
│       │   └── SectionFactory.cs
│       │
│       └── observer/
│           ├── IPlayerObserver.cs
│           └── AnalyticsObserver.cs
│
├── infrastructure/	# Tầng làm việc với thế giới bên ngoài 
│   ├──infrastructure.csproj
│   ├── Repositories/	# Giao tiếp trực tiếp với database (implment interface)
│   │   ├── UserRepository.cs
│   │   ├── SongRepository.cs         
│   │   ├── PlaylistRepository.cs
│   │   └── PlayHistoryRepository.cs  
│   │
│   ├── Persistence/		# Quản lý connection DB
│   │   └── AppDbContext.cs
│   │
│   └── ExternalServices/	# Gọi API, map data → Song model
│       └── JamendoService.cs
│
├──Chillify.sln
├──.env
├──.env.example
└── README.md
```

---

## Installation Guide

### 1. Prerequisites

* .NET SDK 9.0+
* PostgreSQL (pgAdmin recommended)
* Visual Studio Code

---

### 2. Clone Project

```bash
git clone <your-repo>
cd backend
```

---

### 3. Setup Environment Variables

Copy `.env.example` → `.env`

```bash
cp .env.example .env
```

Update values:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=chillify_db
DB_USER=postgres
DB_PASSWORD=your_password
```

---

### 4. Configure Connection String

Inside:

```
api/appsettings.json
```

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=chillify_db;Username=postgres;Password=your_password"
  }
}
```

---

### 5. Install Dependencies

```bash
dotnet restore
```

---

### 6. Run Application

```bash
cd api
dotnet run
```

---

## How to Verify

### Swagger UI

```
http://localhost:5088/swagger
```

### Health Check

```
http://localhost:5088/health
```

Expected result:

```
Healthy
```

---

## Why `DbContext` → `Persistence`

Originally:

```
infrastructure/DbContext/
```

Renamed to:

```
infrastructure/Persistence/
```

### Reason:

This follows **Clean Architecture terminology**:

| Term        | Meaning                                  |
| ----------- | ---------------------------------------- |
| DbContext   | Implementation detail (EF Core specific) |
| Persistence | Abstract concept (data storage layer)    |

### Benefits:

* Decouples business logic from EF Core
* Allows future replacement (e.g., Dapper, MongoDB)
* Improves architectural clarity

---

## `.env` and `.env.example`

### `.env`

* Contains **real environment variables**
* Used at runtime
* **Must NOT be committed** (sensitive data)

Example:

```
DB_PASSWORD=chillify
```

---

### `.env.example`

* Template for developers
* No sensitive data
* Helps onboarding

Example:

```
DB_PASSWORD=your_password_here
```

---

## Build Artifacts (`bin/` and `obj/`)

These folders:

* Are automatically generated by .NET
* Contain compiled binaries and temporary files

### Best Practice

Delete before committing:

```bash
rm -rf **/bin
rm -rf **/obj
```

Add to `.gitignore`:

```
bin/
obj/
```

---

## Notes

* The backend is currently in **infrastructure-ready state**
* Database connection is fully verified
* Business logic (services, repositories) will be implemented next

---

## Next Steps

* Implement Repository Layer
* Implement Service Layer
* Add CRUD APIs
* Add Authentication (JWT)
* Integrate external music API (Jamendo)

---

## Summary

* Backend architecture is correctly structured
* Database connection is stable and verified
* System is ready for feature development phase
