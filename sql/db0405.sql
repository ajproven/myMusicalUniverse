CREATE DATABASE myMusicalUniverse;

USE myMusicalUniverse;

CREATE TABLE users(
	id INT(5) AUTO_INCREMENT, 
	username VARCHAR(10),
	password VARCHAR(30),
	name VARCHAR(15),
	surname1 VARCHAR(15),
	surname2 VARCHAR(15),
	type_user INT(1),
	email VARCHAR(50),
	address VARCHAR(50),
	bank_account VARCHAR(50),
	phone INT(9),
	image VARCHAR(50),
	CONSTRAINT id_user_pk PRIMARY KEY (id))
	ENGINE = InnoDB;

CREATE TABLE thread(
	id INT(5) AUTO_INCREMENT,
	id_user INT(5),
	title VARCHAR(50),
	entry_date TIMESTAMP,
	content VARCHAR(2000),
	total_replies INT(5),
	CONSTRAINT id_thread_pk PRIMARY KEY (id),
	CONSTRAINT threadCreator_idUser FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE)
	ENGINE = InnoDB;

CREATE TABLE product(
	id INT(5) AUTO_INCREMENT,
	type VARCHAR(10),
	description VARCHAR(50),
	price FLOAT(10),
	image VARCHAR(50),
	stock INT(5),
	inSale INT(2),
	CONSTRAINT id_product_pk PRIMARY KEY (id))
	ENGINE = InnoDB;

CREATE TABLE event(
	id INT(5) AUTO_INCREMENT,
	id_user INT(5),
	entry_date TIMESTAMP,
	drop_date TIMESTAMP,
	event_name VARCHAR(20),
	artist VARCHAR(20),
	company VARCHAR(20),
	CONSTRAINT id_event_pk PRIMARY KEY (id),
	CONSTRAINT eventCreator_idUser FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE)	
	ENGINE = InnoDB;

CREATE TABLE article(
	id INT(5) AUTO_INCREMENT,
	id_user INT(5),
	title VARCHAR(50),
	entry_date TIMESTAMP,
	content VARCHAR(2000),
	theme VARCHAR(10),
	CONSTRAINT id_article_pk PRIMARY KEY (id),
	CONSTRAINT articleCreator_idUser FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE)
	ENGINE = InnoDB;

CREATE TABLE song(
id INT(5) AUTO_INCREMENT,
name VARCHAR(20),
song_url VARCHAR(20),
CONSTRAINT id_song_pk PRIMARY KEY (id))
ENGINE = InnoDB;

CREATE TABLE article_reply(
id INT(5) AUTO_INCREMENT,
id_user INT(5),
id_article INT(5),
content VARCHAR(2000),
entry_date TIMESTAMP,
CONSTRAINT id_article_reply_pk PRIMARY KEY (id),
CONSTRAINT id_user_reply_fk FOREIGN KEY(id_user) REFERENCES users(id),
CONSTRAINT id_article_reply_fk FOREIGN KEY(id_article) REFERENCES article(id))
ENGINE = InnoDB;

CREATE TABLE thread_reply(
id INT(5) AUTO_INCREMENT,
id_user INT(5),
id_thread INT(5),
content VARCHAR(2000),
entry_date TIMESTAMP,
number_reply INT(5),
CONSTRAINT id_article_reply_pk PRIMARY KEY (id),
CONSTRAINT id_user_thread_reply_fk FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE,
CONSTRAINT id_thread_reply_fk FOREIGN KEY(id_thread) REFERENCES thread(id) ON DELETE CASCADE)
ENGINE = InnoDB;


CREATE TABLE event_members(
id_event INT(5),
id_user INT(5),
CONSTRAINT members_id_pk PRIMARY KEY (id_event, id_user),
CONSTRAINT members_idEvent_fk FOREIGN KEY (id_event) REFERENCES event(id) ON DELETE CASCADE,
CONSTRAINT members_idUser_fk2 FOREIGN KEY (id_user) REFERENCES users(id)
ON DELETE CASCADE)
ENGINE = InnoDB;

CREATE TABLE subscription(
id_user INT(5),
id_thread INT(5),
last_reply INT(10),
CONSTRAINT id_subs_pk PRIMARY KEY (id_user,id_thread),
CONSTRAINT id_user_sub_fk FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE,
CONSTRAINT id_subthread_fk FOREIGN KEY(id_thread) REFERENCES thread(id) ON DELETE CASCADE)
ENGINE = InnoDB;


CREATE TABLE subforums(
id INT(5) AUTO_INCREMENT,
name VARCHAR(10),
description VARCHAR(15),
CONSTRAINT id_subforum_pk PRIMARY KEY (id))
ENGINE = InnoDB;

CREATE TABLE sellings(
id_user INT(5),
id_product INT(5),
amount INT(5),
total_money FLOAT(10),
CONSTRAINT id_SUB_pk PRIMARY KEY (id_user,id_product),
CONSTRAINT id_user_buy_reply_fk FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE,
CONSTRAINT id_product_fk FOREIGN KEY(id_product) REFERENCES product(id) ON DELETE CASCADE)
ENGINE = InnoDB;