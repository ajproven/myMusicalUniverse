CREATE DATABASE mymusicaluniverse;

USE mymusicaluniverse;

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

--
-- Dumping data for table `users`
--
INSERT INTO `users` (`id`, `username`, `password`, `name`, `surname1`, `surname2`, `type_user`, `email`, `address`, `bank_account`, `phone`, `image`) VALUES 
(1, 'alex_admin', 'adminadmin', 'Alex', 'Sales', 'Fabregat', 0, 'alexsalesfa@gmail.com', 'C/ Font del Vidal nº3 4 2', NULL, 620666865, 'images/usersImages/alex_1.jpg'),
(2, 'jose_admin', 'adminadmin', 'Jose', 'Pavon', 'Torres', 0, 'jpavon@gmail.com', 'C/ Sant Cristin nº35', NULL, 600006005, 'images/usersImages/alex_1.jpg');

	
	CREATE TABLE subforums(
	id INT(5) AUTO_INCREMENT,
	name VARCHAR(10),
	description VARCHAR(30),
	image VARCHAR(30),
	type INT(1),
	CONSTRAINT id_subforum_pk PRIMARY KEY (id))
	ENGINE = InnoDB;

CREATE TABLE thread(
	id INT(5) AUTO_INCREMENT,
	id_user INT(5),
	title VARCHAR(50),
	entry_date TIMESTAMP,
	content VARCHAR(4000),
	total_replies INT(5),
	id_subforum INT(5),
	CONSTRAINT id_thread_pk PRIMARY KEY (id),
	CONSTRAINT threadCreator_idUser FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE,
	CONSTRAINT id_subforums_fk FOREIGN KEY(id_subforum) REFERENCES subforums(id) ON DELETE CASCADE)
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
	image VARCHAR(100),
	CONSTRAINT id_article_pk PRIMARY KEY (id),
	CONSTRAINT articleCreator_idUser FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE)
	ENGINE = InnoDB;
	
INSERT INTO `article` (`id`, `id_user`, `title`, `entry_date`, `content`, `theme`, `image`) VALUES
(1, 1, 'Obstructive sleep apnea (OSA)', '2015-05-08','Obstructive sleep apnea is a chronic condition characterized by frequent episodes of upper airway collapse during sleep. Its effect on nocturnal sleep quality and ensuing daytime fatigue and sleepiness are widely acknowledged. Increasingly, obstructive sleep apnea is also being recognized as an independent risk factor for several clinical consequences, including systemic hypertension, cardiovascular disease, stroke, and abnormalglucose metabolism.','Deadly diseases','images/articleImages/DSCF4802.jpg'),
(2, 1, 'Asthma', '2015-05-08','Cough,Wheezing,Secretions (mucus),Dyspnea or fatigue','Deadly diseases','images/articleImages/shadow-wifi.jpg'),
(3, 1, 'Depression', '2015-05-08','Depression is a disorder of mood where feelings of grief, anger, frustration and loneliness appear to prevent the person to continue with their ordinary lives as normal for a long time. It is important to note that one of the most harmful symptoms of depression is decreasing feelings of self-esteem, which triggers other complications such as problems with social interaction.','Deadly diseases','images/articleImages/FDRGermanwings.jpg'),
(4, 1, 'Tonsillitis', '2015-05-08','It is the inflammation of one or both tonsils (tissue masses oval, fleshy, large who are on the side wall of the oropharynx on each side of the throat). These glands contain cells that produce antibodies useful in the fight against infection.','Deadly diseases','images/articleImages/juego-sanke.jpg');

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

CREATE TABLE sellings(
id_user INT(5),
id_product INT(5),
amount INT(5),
total_money FLOAT(10),
CONSTRAINT id_SUB_pk PRIMARY KEY (id_user,id_product),
CONSTRAINT id_user_buy_reply_fk FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE,
CONSTRAINT id_product_fk FOREIGN KEY(id_product) REFERENCES product(id) ON DELETE CASCADE)
ENGINE = InnoDB;

INSERT INTO `subforums` (`id`, `name`, `description`, `image`,`type`) VALUES
(1, 'Pop', 'Pop music subforum', 'lala.jpg',0),
(2, 'Rock', 'Rock music subforum', 'lala.jpg',0),
(3, 'Classical', 'Classical music subforum', 'lala.jpg',0),
(4, 'Hip Hop', 'Hip hop music subforum', 'lala.jpg',0),
(5, 'Latin', 'Latin music subforum', 'lala.jpg',0),
(6, 'Indie', 'Indie music subforum', 'lala.jpg',0),
(7, 'Travelling', 'Travelling subforum', 'lala.jpg',1),
(8, 'Sports', 'Sports subforum', 'lala.jpg',1),
(9, 'Videogames', 'Videogames subforum', 'lala.jpg',1),
(10, 'TV', 'TV subforum', 'lala.jpg',1);

