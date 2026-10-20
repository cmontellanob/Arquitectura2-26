CREATE TABLE item (
	id int(11) NOT NULL AUTO_INCREMENT,
	categoryid int(11) NOT NULL,
	userid varchar(100) NOT NULL,
	name varchar(100) NOT NULL,
	description varchar(512) NULL,
	price decimal(10, 2) NULL,
	photo varchar(100) NULL,
	publicationdate datetime NOT NULL,
	state int(1) DEFAULT 1 NOT null,
	PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci ;
