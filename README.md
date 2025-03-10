# Agenda Servidor

## Overview
Agenda Servidor is a service designed for students and staff of Universidade Federal do Espírito Santo, facilitating schedule management within the Área dos Servidores. The project is developed using React and FastAPI, with PostgreSQL handling the database management.

## Features
* User authentication and authorization with JWT
* Schedule management (create, read, update, delete)
* Area management
* Integration with PostgreSQL
* CORS support for frontend integration

## Getting Started
### Prerequisites
* Python 3.10 or higher
* PostgreSQL
* Docker (optional but recommended for easier setup)

Getting Started
Installation
Ensure you have Alembic installed. If not, you can install it using pip:

## Installation
1. Clone the repository:
```
git clone https://github.com/your-username/agenda-servidor.git
cd agenda-servidor
```

2. Create and activate a virtual environment:
```
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

3. Set up environment variables:

Create a .env file in the root directory and add the following variables:
```
DATABASE_HOSTNAME=localhost
DATABASE_PORT=5432
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_database_user
DATABASE_PASSWORD=your_database_password
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Running the Application

### With Docker:
```
docker-compose up --build
```

## Running Tests
To run the tests, use the following command:
```
pytest
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.

