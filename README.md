# Visioncraft

### Guide
```bash
run docker command first to set up db
then setup api and frontend
```

### Database
```bash
$ docker run --name visioncraft -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=visioncraft -d mysql
```
Tables generated automatically by orm

### Api
```bash
$ cd api
$ npm install
$ npm run start:dev
```
http://localhost:5000

### Front
```bash
$ cd front
$ npm install
$ npm run start
```
http://localhost:3000/

### Explanation
- I used nestjs because this is the framework im most familiar with + its well organized with solid architecture.
- I also like modularity and nestjs provides that
- rest api for familiarity
- Typeorm for db communication. No need for migrations
- React material for its popularity, although it's my 2nd time using it. 
- Using minimum 8 chars for password since its standard i guess? For secure system i'd rather implement at least 12 chars. (https://specopssoft.com/blog/password-length-best-practices/)
- User registration is done under user controller since its related to user entity creation
- user login is done under auth controller, because authorization related endpoints deserve separate module (refresh token etc)
- im aware of losing points on the the testing part
- Time spent ~ 6h
