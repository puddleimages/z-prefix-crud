# z-prefix-crud
This is a web application for managing an inventory of items. As an inventory manager, you can create an account, log in to view and manage your inventory, create new items, edit existing items, and delete unwanted items. Authenticated and unauthenticated users can also browse and view items created by all inventory managers.

## How to Run the Application

1. Clone the repository from GitHub:

    ```bash
    git clone https://github.com/puddleimages/z-prefix-crud
    ```

2. Navigate to the project directory in your terminal:

    ```bash
    cd <path/to/z-prefix-crud>
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Run a PostgreSQL database container using Docker:

    ```bash
    docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
    ```

5. Access the PostgreSQL database container:

    ```bash
    docker exec -it pg-docker bash
    ```

6. Access the PostgreSQL shell:

    ```bash
    psql -U postgres
    ```

7. Create a new database named z_inventory:

    ```sql
    CREATE DATABASE z_inventory;
    ```

8. Exit the PostgreSQL shell:

    ```sql
    \q
    ```

9. Exit the PostgreSQL container:

    ```bash
    exit
    ```

10. Apply database migrations for the backend:

    ```bash
    cd <path/to/z-prefix-crud/back-end>
    knex migrate:latest
    ```

11. Start the backend server:

    ```bash
    npm start
    ```

12. Open another terminal window and navigate to the front-end directory:

    ```bash 
    cd <path/to/z-prefix-crud/front-end>
    ```

13. Start the front-end development server:

    ```bash
    npm start
    ```

Now, the application should be up and running. You can access it by visiting http://localhost:3000 in your web browser.