# Challenge 13: E-commerce Backend API
## Description

This project is a RESTful API for managing products in a database. It allows users to perform CRUD operations (Create, Read, Update, Delete) on products. The API is built using [insert framework or technology here] and communicates with a [insert type of database here] database.
## Table of Contents
- [Challenge 13: E-commerce Backend API](#challenge-13-e-commerce-backend-api)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Endpoints](#endpoints)
  - [Examples](#examples)
      - [Get all products](#get-all-products)
      - [Create a new product](#create-a-new-product)
  - [Contributing](#contributing)
  - [Video Walkthrough](#video-walkthrough)
  - [License](#license)

## Installation

1. Clone the repo:
    ```
    git clone https://github.com/Nihsad/e-commerce_backend.git
    ```

1. Navigate to the project directory:
    ```
    cd e-commerce_backend
    ```

2. Install NPM requirements:
    ```
    npm install
    ```

3. Create a .env file with the following environmental variables:
    ```
    DB_NAME='ecommerce_db'
    DB_USER='your_username'
    DB_PASSWORD='your_password'
    ```

1. Log in to the PostgreSQL terminal, run the schema.sql file, and exit out of the PostgreSQL terminal:
    ```
    psql -U your_username
    *enter your PostgreSQL password when prompted*
    \i db/schema.sql;
    \q
    ```

1. Seed the database:
    ```
    npm run seed
    ```

2. Start the application:
    ```
    npm run start
    ```


## Usage

Once the application is running, you can interact with it using HTTP requests. You can use tools like **Insomnia**, **Postman**, or **cURL** to send requests to the API endpoints.

## Endpoints

The API provides the following endpoints:
```
    GET /products: Get all products.
    GET /products/:id: Get a single product by ID.
    POST /products: Create a new product.
    PUT /products/:id: Update an existing product.
    DELETE /products/:id: Delete a product by ID.
```

These endpoints can be used for `/api/products`, `/api/categories`, and `/api/tags`

## Examples
#### Get all products

    GET /products

Response:
```
[
{
    "id": 1,
    "product_name": "Product 1",
    "price": 10.99,
    "stock": 20
},
{
    "id": 2,
    "product_name": "Product 2",
    "price": 15.99,
    "stock": 15
}
]
```

#### Create a new product
```
POST /products
```
Request body:
```
{
  "product_name": "New Product",
  "price": 19.99,
  "stock": 25
}
```
Response:
```
{
  "id": 3,
  "product_name": "New Product",
  "price": 19.99,
  "stock": 25
}
```
## Contributing
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## Video Walkthrough
* [Video showcasing GET routes](https://drive.google.com/file/d/1wdEYmwJTIgiFCsurIbGqxI5ftUBIhTHu/view?usp=sharing)
* [Video showcasing POST, PUT, DELETE routes](https://drive.google.com/file/d/1q93fp4sunNEsh_KwZ3UZZcPvMPA7ow3O/view?usp=sharing)

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License. See the LICENSE file for details. 