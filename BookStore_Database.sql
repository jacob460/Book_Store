create database bookstore COLLATE utf8_bin; 
use bookstore;

CREATE TABLE BookData  (isbn10 char(10) NOT NULL, isbn13 CHAR(13) NOT NULL, title varchar(255) NOT NULL, publicationDate DATE NOT NULL, numOfPages INT NOT NULL, Stock INT NOT NULL, Price DOUBLE(65,2) NOT NULL, PRIMARY KEY(isbn13));  

CREATE TABLE Authors (author varchar(255), primary key (author)); 
CREATE TABLE Book_Author (isbn13 CHAR(13), author varchar(255), primary key (isbn13, author), foreign KEY(isbn13) REFERENCES BookData(isbn13), foreign key (author) references Authors(author));  

CREATE TABLE Keywords (keyword varchar(255), primary key (keyword)); 
CREATE TABLE Book_Keyword (isbn13 CHAR (13), keyword varchar(255), primary key(keyword, isbn13), FOREIGN KEY(isbn13) REFERENCES BookData(isbn13), foreign key (keyword) REFERENCES Keywords(keyword));  

CREATE TABLE Genres(genre varchar(255) CHARACTER SET utf8 COLLATE utf8_bin, primary key (genre)); 
CREATE TABLE Book_Genre (isbn13 CHAR(13),genre varchar(255),  primary key (genre, isbn13), FOREIGN KEY(isbn13) REFERENCES BookData(isbn13), FOREIGN KEY (genre) REFERENCES Genres(genre));  

CREATE TABLE Publishers (publishers varchar(255) CHARACTER SET utf8 COLLATE utf8_bin, primary key (publishers)); 
CREATE TABLE Book_Publisher (isbn13 CHAR(13),publisher varchar(255),  primary key (publisher, isbn13), FOREIGN KEY(isbn13) REFERENCES BookData(isbn13), foreign key (publisher) references Publishers(publishers));

CREATE TABLE Languages (languages varchar(255), primary key (languages)); 
CREATE TABLE Book_Language (isbn13 CHAR(13),languages varchar(255),  primary key (languages, isbn13), FOREIGN KEY(isbn13) REFERENCES BookData(isbn13), foreign key (languages) references Languages(languages)); 

CREATE TABLE Customers (customerID BIGINT AUTO_INCREMENT NOT NULL, username varchar(255) NOT NULL, fname varchar(255) NOT NULL, lname varchar(255) NOT NULL, password varchar(255) NOT NULL, address varchar(255) NOT NULL, phoneNumber varchar(15) NOT NULL, PRIMARY KEY(customerID)); 

CREATE TABLE Orders (customerID BIGINT NOT NULL, orderID BIGINT AUTO_INCREMENT NOT NULL, total DOUBLE(65,2) NOT NULL, dateOrdered DATE NOT NULL, PRIMARY KEY(orderID, customerID), FOREIGN KEY (customerID) REFERENCES Customers (customerID)); 

CREATE TABLE OrderContents (orderID BIGINT, isbn13 char(13), amount int, primary key (orderID, isbn13),FOREIGN KEY (orderID) REFERENCES Orders(orderID), FOREIGN KEY (isbn13) REFERENCES BookData(isbn13)); 

CREATE TABLE Reviews (customerID BIGINT NOT NULL, reviewID BIGINT unique NOT NULL auto_increment, commentText varchar(255), rating INT not null, isbn13 CHAR(13) NOT NULL, PRIMARY KEY(customerID, reviewID, isbn13), FOREIGN KEY (customerID) REFERENCES Customers(customerID), FOREIGN KEY(isbn13) REFERENCES BookData(isbn13)); 

CREATE TABLE UserTrust (customerID BIGINT NOT NULL, trustedID BIGINT NOT NULL, isTrusted BOOLEAN NOT NULL, PRIMARY KEY (customerID, trustedID), FOREIGN KEY (trustedID) REFERENCES Customers(customerID), FOREIGN KEY (customerID) REFERENCES Customers(customerID));

create table CommentUsefulness (customerID BIGINT NOT NULL, reviewID BIGINT NOT NULL, usefulness ENUM ("useless", "useful", "very useful") NOT NULL, primary key(customerID, reviewID), foreign key (reviewID) references Reviews(reviewID), foreign key (customerID) references Customers(customerID));

create table Managers (managerID BIGINT AUTO_INCREMENT, username varchar(255) NOT NULL, fname varchar(255) NOT NULL, lname varchar(255) NOT NULL, password varchar(255)NOT NULL, address varchar(255) NOT NULL, phoneNumber varchar(15) NOT NULL, PRIMARY KEY(managerID));

create table Cart (customerID BIGINT, isbn13 char(13), amount int, primary key(isbn13, customerID, amount), foreign key (customerID) REFERENCES Customers(customerID), foreign key (isbn13) REFERENCES BookData(isbn13));

insert into customers (username, fname, lname, password, address, phoneNumber)values ("username", "fname", "lname","password", "addr", "4129600050");
insert into managers (username, fname, lname, password, address, phoneNumber)values ("supermanager", "fname", "lname", "password", "addr", "4129600050");
#CREATE USER 'supermanager'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
#GRANT  UPDATE, DELETE,  INSERT, SELECT ON bookstore.* TO 'supermanager'@'localhost';

#CREATE USER 'customers'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
#GRANT SELECT ON bookstore.* TO 'supermanager'@'localhost';

#GRANT CREATE USER, GRANT OPTION ON bookstore.* TO 'supermanager'@'localhost' WITH GRANT OPTION;