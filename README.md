# simple-express-postgres

This is a simple express project using sequelize ORM and postgres for CRUD operations. 
Users with a list of subscriptions.

Users and Subscriptions tables will be created by sequelize using sync method based on the models defined.

User has subscriptions, subscriptions needs user table id which will be used as foreign key in subscriptions. Please refer to **models** on how its linked.

Please refer swagger for details and usage related to user and subscriptions API.  

![image](https://github.com/Harish-clb/simple-express-postgres/assets/85795846/f8b711de-5210-4ce3-a51c-a9116bd9d4dc)


## Technologies:

- Express - https://expressjs.com/
- Sequelize - https://sequelize.org/
- Swagger UI - Using swagger-ui-express and swagger-jsdoc libraries
- Postgres - PostgreSQL client library

## To run this project

- Install
  ```batch
    npm install
  ```

- Make sure that you update **db.config.js** with your local DB configuration.

- Run the API:
  ```batch
    npm run start
  ```

- Access URL
  ```batch
    http://localhost:3000
  ```

- Swagger
  ```batch
    http://localhost:3000/docs
  ```
## Add initial entries to tables using create API
 - Using any of the API clients like Postman, ThunderClient etc.
  ### Users  
  
  {
    "email": "test@gmail.com",
    "username": "Test"
  }  
  
  ![image](https://github.com/Harish-clb/simple-express-postgres/assets/85795846/b5be00a8-7798-4133-80fe-d04fbd4a9100)  

  ### Subscriptions  
  
  {
 "platform": "Disney+",
 "subscriptionType": "Premium",
 "startDate": "2024-02-14",
 "endDate": "2025-02-14",
 "userId": 1
  }

  ![image](https://github.com/Harish-clb/simple-express-postgres/assets/85795846/b8afc2ef-670f-44b7-8f3a-0a9b3cdf7a8f)

