# z-prefix-crud
z-prefix-crud
This is a web application for managing an inventory of items. As an inventory manager, you can create an account, log in to view and manage your inventory, create new items, edit existing items, and delete unwanted items. Authenticated and unauthenticated users can also browse and view items created by all inventory managers.

How to Run the Application
Clone the repository from GitHub:
git clone https://github.com/puddleimages/z-prefix-crud
Navigate to the project directory in your terminal:
cd <path/to/z-prefix-crud>
Install the required dependencies:
npm install
Run a PostgreSQL database container using Docker:
docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
Access the PostgreSQL database container:
docker exec -it pg-docker bash
Access the PostgreSQL shell:
psql -U postgres
Create a new database named z_inventory:
CREATE DATABASE z_inventory;
Exit the PostgreSQL shell:
\q
Exit the PostgreSQL container:
exit
Apply database migrations for the backend:
cd <path/to/z-prefix-crud/back-end>
knex migrate:latest
Start the backend server:
npm start
Open another terminal window and navigate to the front-end directory:
cd <path/to/z-prefix-crud/front-end>
Start the front-end development server:
npm start
Now, the application should be up and running. You can access it by visiting http://localhost:3000 in your web browser.