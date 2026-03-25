# Chillify Backend (ASP.NET Core)

## Overview

Chillify is a web-based music player backend built with **ASP.NET Core (.NET 9)** following a layered architecture:

- **API Layer** → Controllers, DTOs, middleware
- **Application Layer** → Business logic, interfaces, design patterns
- **Infrastructure Layer** → Database access, external services

This project is structured for **scalability, maintainability, and clean architecture principles**.

---

## Current Status

### Completed

- ASP.NET Core Web API setup
- PostgreSQL connection via Entity Framework Core
- Health check endpoint (`/health`)
- Swagger API documentation
- CORS configuration
- Clean project structure (API / Application / Infrastructure)

### Verified

- Application builds successfully
- Server runs correctly
- Swagger UI accessible
- Database connection **confirmed working**

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

- .NET SDK 9.0+
- PostgreSQL (pgAdmin recommended)
- Visual Studio Code

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
api/appsettings.Development.json
```

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=chillify_db;Username=postgres;Password=your_password"
  }
}
```

---

### 5. Create Database

Open PostgreSQL pgAdmin and create a new database with the name "chillify_db"

---

### 6. Install Dependencies

```bash
dotnet restore
```

---

### 7. Run Application

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

- Decouples business logic from EF Core
- Allows future replacement (e.g., Dapper, MongoDB)
- Improves architectural clarity

---

## `.env` and `.env.example`

### `.env`

- Contains **real environment variables**
- Used at runtime
- **Must NOT be committed** (sensitive data)

Example:

```
DB_PASSWORD=chillify
```

---

### `.env.example`

- Template for developers
- No sensitive data
- Helps onboarding

Example:

```
DB_PASSWORD=your_password_here
```

---

## Build Artifacts (`bin/` and `obj/`)

These folders:

- Are automatically generated by .NET
- Contain compiled binaries and temporary files

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

- The backend is currently in **infrastructure-ready state**
- Database connection is fully verified
- Business logic (services, repositories) will be implemented next

---

## Next Steps

- Implement Repository Layer
- Implement Service Layer
- Add CRUD APIs
- Add Authentication (JWT)
- Integrate external music API (Jamendo)

---
# Chillify Backend (ASP.NET Core)

## Overview

Chillify is a web-based music player backend built with **ASP.NET Core (.NET 9)** following a layered architecture:

- **API Layer** → Controllers, DTOs, middleware
- **Application Layer** → Business logic, interfaces, design patterns
- **Infrastructure Layer** → Database access, external services

This project is structured for **scalability, maintainability, and clean architecture principles**.

---

## Current Status

### Completed

- ASP.NET Core Web API setup
- PostgreSQL connection via Entity Framework Core
- Health check endpoint (`/health`)
- Swagger API documentation
- CORS configuration
- Clean project structure (API / Application / Infrastructure)

### Verified

- Application builds successfully
- Server runs correctly
- Swagger UI accessible
- Database connection **confirmed working**

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

- .NET SDK 9.0+
- PostgreSQL (pgAdmin recommended)
- Visual Studio Code

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
api/appsettings.Development.json
```

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=chillify_db;Username=postgres;Password=your_password"
  }
}
```

---

### 5. Create Database

Open PostgreSQL pgAdmin and create a new database with the name "chillify_db"

---

### 6. Install Dependencies

```bash
dotnet restore
```

---

### 7. Run Application

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

- Decouples business logic from EF Core
- Allows future replacement (e.g., Dapper, MongoDB)
- Improves architectural clarity

---

## `.env` and `.env.example`

### `.env`

- Contains **real environment variables**
- Used at runtime
- **Must NOT be committed** (sensitive data)

Example:

```
DB_PASSWORD=chillify
```

---

### `.env.example`

- Template for developers
- No sensitive data
- Helps onboarding

Example:

```
DB_PASSWORD=your_password_here
```

---

## Build Artifacts (`bin/` and `obj/`)

These folders:

- Are automatically generated by .NET
- Contain compiled binaries and temporary files

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

- The backend is currently in **infrastructure-ready state**
- Database connection is fully verified
- Business logic (services, repositories) will be implemented next

---

## Next Steps

- Implement Repository Layer
- Implement Service Layer
- Add CRUD APIs
- Add Authentication (JWT)
- Integrate external music API (Jamendo)

---
# Libraries & Packages
1. API Documentation (Swagger)

```
dotnet add package Swashbuckle.AspNetCore --version 6.5.0
dotnet add package Microsoft.OpenApi --version 2.4.1
```

2. Database & Entity Framework (PostgreSQL)
```
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package EFCore.NamingConventions
```

3. Authentication & Security

```
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package System.IdentityModel.Tokens.Jwt
dotnet add package BCrypt.Net-Next
```

4. Configuration
```
dotnet add package Microsoft.Extensions.Configuration.Abstractions --version 9.0.0
```
5. Health Checks
```
dotnet add package AspNetCore.HealthChecks.NpgSql
```
## Summary

- Backend architecture is correctly structured
- Database connection is stable and verified
- System is ready for feature development phase


## Summary

- Backend architecture is correctly structured
- Database connection is stable and verified
- System is ready for feature development phase

## Database Migration (Entity Framework Core)

### Why Migration is Required

In this project, the database schema is **not created manually**.
Instead, it is managed by **Entity Framework Core Migrations**.

This ensures:

* Consistent schema across environments
* Version control for database changes
* Safe evolution of database structure

---

### Key Concept

This project follows Clean Architecture:

| Layer          | Responsibility               |
| -------------- | ---------------------------- |
| infrastructure | Contains DbContext           |
| api            | Startup project (Program.cs) |

Because of this separation, EF CLI must be told:

* where DbContext is located
* which project runs the application

---

### Run Migration (First Time Setup)

Navigate to:

```bash
cd backend/api
```

Then run:

```bash
dotnet ef migrations add InitialCreate --project ../infrastructure --startup-project .
```

#### Explanation:

| Option              | Meaning                                     |
| ------------------- | ------------------------------------------- |
| `--project`         | Points to the project containing DbContext  |
| `--startup-project` | Points to the project containing Program.cs |

---

### Apply Migration to Database

```bash
dotnet ef database update --project ../infrastructure --startup-project .
```

This will:

* Create all tables (`users`, `songs`, `playlists`, etc.)
* Apply constraints and indexes
* Prepare database for application usage

---

### Expected Output

```bash
Build succeeded.
Applying migration 'InitialCreate'.
Done.
```

---

### Important Notes

* Do NOT use `EnsureCreated()` when using migrations
* Migration must be run before starting the application
* If schema changes → create new migration

---

## Verify Database

After running migration, open PostgreSQL and run:

```sql
SELECT * FROM "songs";
```

Expected:

* Table exists
* Contains seeded data (if seeding is enabled)

---

## API Testing Guide

### 1. Start Backend

```bash
cd api
dotnet run
```

---

### 2. Open Swagger

```
http://localhost:5088/swagger
```

---

### 3. Test Endpoints

#### Get Recommended Songs

```http
GET /songs/{id}/recommend
```

Example:

```http
GET /songs/193232b7-4c38-4ef7-9698-11518652d29b/recommend
```

Expected:

* Returns a list of similar songs
* Based on artist, album, release date, duration

---

#### Song Played (Increase Play Count)

```http
POST /songs/{id}/played
```

Expected:

```
204 No Content
```

---

### 4. Verify Database Changes

#### Check play count

```sql
SELECT "PlayCount"
FROM "songs"
WHERE "SongId" = '193232b7-4c38-4ef7-9698-11518652d29b';
```

---

#### Check play history

```sql
SELECT *
FROM "song_play_history"
ORDER BY "PlayedAt" DESC;
```

---

### Expected Behavior

| Action            | Result                    |
| ----------------- | ------------------------- |
| Call `/played`    | PlayCount increases       |
| Call `/recommend` | Returns similar songs     |
| DB                | Data is updated correctly |

---

## Summary (Database + API)

* Migration ensures correct schema creation
* Database is fully managed by EF Core
* API endpoints are fully testable via Swagger
* System is ready for frontend integration

