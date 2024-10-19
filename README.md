# FEEDBACK SITE
-----------

## PORTS FOR THE PROJECT

Port for the frontend: ***3000***

Port for the backend: ***4000*** <br />
Redact ports for the backend: <br />

&emsp;1 Step. ***src\components\data.js*** -> **mainLink** -> **http://localhost:YOUR_PORTS** <br />
&emsp;2 Step. ***src\server.js*** -> **server.listen(...)** -> **server.listen(YOUR_PORTS, ...)**


## CONNECT TO THE DATABASE

Open ***src\server.js*** and add your data

```js
const conn = db.createConnection({
    host: "YOUR_HOST",
    database: "YOUR_DATABASE",
    user: "YOUR_USER",
    password: "YOUR_PASSWORD",
});
```

## CREATE A TABLE FOR THE DATABASE

There are only three tables **user**, **comments**, **article**

### Create **users**
```sql
CREATE TABLE `users` (
    `id` varchar(45) NOT NULL,
    `name` varchar(45) NOT NULL,
    `email` varchar(45) NOT NULL,
    `pass` varchar(45) NOT NULL,
    `cookieKey` varchar(45) NOT NULL,
    `status` varchar(45) NOT NULL,
    `img` longblob,
    PRIMARY KEY (`id`,`cookieKey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1
```

### Add the main user **Admin**
```sql
INSERT INTO users (id, name, email, pass, cookieKey, status, img)
VALUES ('mlUM2iy', 'Admin', 'Admin', 'Admin', 'dg4WLkq6HmnSBBu783mBWOC7NWQ1cL54JC0FAoxS', 'admin', NULL);
```

### Create **comments**
```sql
CREATE TABLE `comments` (
    `id` varchar(45) NOT NULL,
    `idusers` varchar(45) NOT NULL,
    `nameusers` varchar(45) NOT NULL,
    `idpost` varchar(45) NOT NULL,
    `idusersauthor` varchar(45) NOT NULL,
    `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `date` varchar(45) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1
```

### Create **article**
```sql
CREATE TABLE `article` (
    `id` varchar(45) CHARACTER SET latin1 NOT NULL,
    `title` varchar(45) NOT NULL,
    `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `star` int(11) NOT NULL,
    `author` varchar(45) CHARACTER SET latin1 NOT NULL,
    `authorId` varchar(45) CHARACTER SET latin1 NOT NULL,
    `date` varchar(45) CHARACTER SET latin1 NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
```

## START PROJECT 

Start the FRONTEND:
```
npm start
```

Start the BACKEND:
```
cd src
node server
```