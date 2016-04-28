CREATE  TABLE users (
  username VARCHAR(45) NOT NULL ,
  password VARCHAR(45) NOT NULL ,
  enabled TINYINT NOT NULL DEFAULT 1 ,
  PRIMARY KEY (username));
  
CREATE TABLE user_roles (
  user_role_id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(45) NOT NULL,
  role varchar(45) NOT NULL,
  PRIMARY KEY (user_role_id));
  
INSERT INTO users(username,password,enabled)
VALUES ('huu','huu', true);
INSERT INTO users(username,password,enabled)
VALUES ('tam','tam', true);
INSERT INTO user_roles (username, role)
VALUES ('huu', 'ROLE_USER');
INSERT INTO user_roles (username, role)
VALUES ('huu', 'ROLE_ADMIN');
INSERT INTO user_roles (username, role)
VALUES ('tam', 'ROLE_USER');