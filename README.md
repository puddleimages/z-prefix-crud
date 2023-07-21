# z-prefix-crud

git clone https://github.com/puddleimages/z-prefix-crud
open a terminal
Run: cd <path/to/z-prefix-crud>
Run: npm install
Run: docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
Run: docker exec -it pg-docker bash
Run: psql -U postgres
Run: CREATE DATABASE z_inventory;
Run: \q
Run: exit
Run: cd <path/to/z-prefix-crud/back-end>
Run: knex migrate:latest
Run: npm start
open another terminal
Run: cd <path/to/z-prefix-crud/front-end>
Run: npm start
