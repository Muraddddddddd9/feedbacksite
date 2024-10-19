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