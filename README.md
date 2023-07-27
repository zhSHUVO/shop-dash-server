# StoreDash Backend

This is the backend server for the StoreDash e-commerce web application. It provides the necessary API endpoints to manage products, users, and orders.

## Getting Started

To run the backend server locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using npm or yarn:

```bash
npm install
```

3. Create a `.env` file in the root directory and set the following environment variables:

```
DB_URL=<your_mongodb_connection_string>
PORT=<server_port>
```

4. Start the server:

```bash
npm start
```

The backend server should now be running on the specified port, and you can access the API endpoints through `http://localhost:<PORT>`.

## API Endpoints

-   `GET /api/products`: Retrieve all products from the database.
-   `GET /api/products/:id`: Retrieve a specific product by ID.
-   `POST /api/products`: Add a new product to the database.
-   `GET /api/auth/user`: Retrieve all users from the database.
-   `POST /api/auth/user`: Add a new user to the database. The password is hashed before storing.
-   `POST /api/orders`: Add a new order to the database.
-   `GET /api/orders`: Retrieve all orders from the database.

## Database

The backend server uses MongoDB as the database to store products, users, and orders. Make sure to provide the correct MongoDB connection string in the `.env` file.

## Contributing

Contributions to the StoreDash backend are welcome! If you encounter any issues or want to improve the functionality, feel free to open a pull request or report an issue in the GitHub repository.
