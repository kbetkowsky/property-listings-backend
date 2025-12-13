# Property Listings Backend

A RESTful API for real estate listing platform built with Spring Boot 3.5.6, PostgreSQL and JWT authentication.


[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)
[![Spring Security](https://img.shields.io/badge/Spring%20Security-JWT-red.svg)](https://spring.io/projects/spring-security)
[![JWT](https://img.shields.io/badge/JWT-jjwt%200.12.3-purple.svg)](https://github.com/jwtk/jjwt)
[![Spring Data JPA](https://img.shields.io/badge/Spring%20Data%20JPA-Hibernate-darkgreen.svg)](https://spring.io/projects/spring-data-jpa)
[![EhCache](https://img.shields.io/badge/Cache-EhCache-yellow.svg)](https://www.ehcache.org/)
[![MapStruct](https://img.shields.io/badge/Mapping-MapStruct%201.6.3-blueviolet.svg)](https://mapstruct.org/)
[![OpenAPI](https://img.shields.io/badge/API%20Docs-OpenAPI%203-darkblue.svg)](https://springdoc.org/)
[![Maven](https://img.shields.io/badge/Build-Maven%203.8+-C71A36.svg)](https://maven.apache.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](https://www.docker.com/)
[![Validation](https://img.shields.io/badge/Validation-Bean%20Validation-lightgrey.svg)](https://beanvalidation.org/)

## Features

- **JWT Authentication** with refresh tokens
- **Property Management** - CRUD operations with pagination
- **Image Upload** - Multi-file upload with validation
- **Role-Based Access Control** (USER, AGENT, ADMIN)
- **Contact System** - Messaging between users
- **High Performance** - EhCache second-level cache
- **API Documentation** - OpenAPI 3 (Swagger UI)
- **Docker Ready** - Docker Compose included


## Prerequisites

- Java 17 or higher
- Maven 3.8+
- PostgreSQL 15+
- Docker & Docker Compose (optional)

## Quick Start

### Option 1: Docker Compose (Recommended)

**Prerequisites:** Docker & Docker Compose must be installed

Clone the repository
git clone https://github.com/kbetkowsky/property-listings-backend.git
cd property-listings-backend

Create .env file with your configuration
cat > .env << EOF
DB_PASSWORD=your_secure_password
JWT_SECRET=your_256bit_secret_key_here_min_256_bits
EOF

**For Windows (PowerShell):** Create `.env` file manually in the project root:
DB_PASSWORD=your_secure_password
JWT_SECRET=your_256bit_secret_key_here_min_256_bits

**Start the application:**

Start services in background
docker-compose up -d

Check if containers are running
docker ps

View application logs
docker-compose logs -f property-listings-backend

Stop the application
docker-compose down


Application will be available at `http://localhost:8080`

**Access the database (if needed):**

docker exec -it property-listings-backend-postgres psql -U postgres -d real_estate_db

### Option 2: Local Development

**Prerequisites:**
- Java 17 or higher
- Maven 3.8+
- PostgreSQL 15+

**1. Create PostgreSQL database:**

CREATE DATABASE real_estate_db;

**2. Configure environment variables:**

**Linux/Mac:**
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=real_estate_db
export DB_USERNAME=postgres
export DB_PASSWORD=your_password
export JWT_SECRET=your_secret_key_min_256_bits
export JWT_EXPIRATION=86400000
export CORS_ORIGINS=http://localhost:3000,http://localhost:5173

**Windows (PowerShell):**
$env:DB_HOST = "localhost"
$env:DB_PORT = "5432"
$env:DB_NAME = "real_estate_db"
$env:DB_USERNAME = "postgres"
$env:DB_PASSWORD = "your_password"
$env:JWT_SECRET = "your_secret_key_min_256_bits"
$env:JWT_EXPIRATION = "86400000"
$env:CORS_ORIGINS = "http://localhost:3000,http://localhost:5173"

**3. Run the application:**
cd property-listings-backend
./mvnw spring-boot:run

Application will be available at `http://localhost:8080`

### Option 3: Build & Run JAR
Build the application
./mvnw clean package

Run the JAR
java -jar target/property-listings-backend-0.0.1-SNAPSHOT.jar

## Docker Troubleshooting

<details>
<summary><strong>Containers don't start</strong></summary>

Check logs:
docker-compose logs

Make sure ports are not in use:
Windows
netstat -ano | findstr :8080
netstat -ano | findstr :5432

Linux/Mac
lsof -i :8080
lsof -i :5432

If ports are in use, change them in `docker-compose.yml`:
ports:

"8081:8080" # Change 8080 to 8081

</details>

<details>
<summary><strong>Database connection error</strong></summary>

Check if PostgreSQL container is running:
