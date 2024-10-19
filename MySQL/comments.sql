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