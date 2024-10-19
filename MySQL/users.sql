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

INSERT INTO users (id, name, email, pass, cookieKey, status, img)
VALUES ('mlUM2iy', 'Admin', 'Admin', 'Admin', 'dg4WLkq6HmnSBBu783mBWOC7NWQ1cL54JC0FAoxS', 'admin', NULL);