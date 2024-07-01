# Alembic Migrations
This directory contains Alembic migration scripts for managing database schema changes.

## Getting Started

### Installation
Ensure you have Alembic installed. If not, you can install it using pip:
```
pip install alembic
```

### Configuration
The main configuration file for Alembic is alembic.ini. This file contains the configuration for the database connection and other settings. The actual migrations are stored in the versions directory.



### Environment Configuration
Set your environment variables for the database connection. These are typically stored in a .env file or directly in your environment:
```
DATABASE_HOSTNAME=localhost
DATABASE_PORT=5432
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_database_user
DATABASE_PASSWORD=your_database_password
```
Ensure your alembic.ini file uses these environment variables correctly:
```
[alembic]
# A path to migration scripts
script_location = alembic

# Database connection string
sqlalchemy.url = postgresql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOSTNAME}:${DATABASE_PORT}/${DATABASE_NAME}
```

## Running Migrations

### Create a New Migration
To create a new migration, run:
```
alembic revision -m "Migration message"
```
This will generate a new file in the versions directory. Edit this file to define the changes you want to make to the database schema.

### Upgrade the Database
To apply the latest migrations, run:
```
alembic upgrade head
```

## Downgrade the Database
To revert the last migration, run:
```
alembic downgrade -1
```

### Alembic Commands
* alembic current - Display the current revision for the database.
* alembic history - Show the list of all migrations.
* alembic heads - Show the current available heads in the script directory.
* alembic branches - Show the branch points.

### Troubleshooting
If you encounter issues with migrations, ensure that:
* Your database connection is correctly configured.
* Environment variables are correctly set.
* The Alembic configuration (alembic.ini) is correct.
