# url-shortener

## Install Instructions

Clone the repo to your terminal

```bash
git clone https://github.com/ehk9000/url-shortener.git
```

`Cd` into url-shortener directory

```bash
cd url-shortener
```

Run `make setup` in terminal

```bash
make setup
```

`make setup` utilizes the included MakeFile to compose a docker container that instantiates a MongoDb database at port 27017.

It then runs the server-setup script, which installs all packages for both the frontend and the backend servers at the same time.

```bash
npm start || make server
```

`npm start` or `make server` will spin up both the frontend and backend servers simultaneously. The frontend server is run on http://localhost:3000/ and backend server is run on http://localhost:8080/

```bash
npm test || make test
```

`npm test` or `make test` will run the server-side tests using Jest
