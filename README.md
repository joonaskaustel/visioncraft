# visioncraft

todo add env files

### DB
```bash
$ docker run --name visioncraft -p 3306:3306 -e POSTGRES_PASSWORD=hv -e MYSQL_ROOT_PASSWORD=password -d mysql
```

### API
```bash
$ cd api
$ npm install
$ npm run start:dev
```

### FRONT
```bash
$ cd front
$ npm install
$ npm run start
```
