create database bookstore; 
use bookstore; 

CREATE TABLE BookData  (isbn10 char(10), isbn13 CHAR(13), title VARCHAR(255), publicationDate DATE, numOfPages INT, Stock INT, Price DOUBLE(65,2), PRIMARY KEY(isbn13));  

CREATE TABLE Authors (author VARCHAR(255), primary key (author)); 
CREATE TABLE Book_Author (isbn13 CHAR(13), author VARCHAR(255), primary key (isbn13, author), foreign KEY(isbn13) REFERENCES BookData(isbn13), foreign key (author) references Authors(author));  

CREATE TABLE Keywords (keyword VARCHAR(255), primary key (keyword)); 
CREATE TABLE Book_Keyword (keyword VARCHAR(255), isbn13 CHAR (13), primary key(keyword, isbn13), FOREIGN KEY(isbn13) REFERENCES BookData(isbn13), foreign key (keyword) REFERENCES Keywords(keyword));  

CREATE TABLE Genres(genre VARCHAR(255), primary key (genre)); 
CREATE TABLE Book_Genre (genre VARCHAR(255), isbn13 CHAR(13), primary key (genre, isbn13), FOREIGN KEY(isbn13) REFERENCES BookData(isbn13), FOREIGN KEY (genre) REFERENCES Genres(genre));  

CREATE TABLE Publishers (publishers VARCHAR(255), primary key (publishers)); 
CREATE TABLE Book_Publisher (publisher VARCHAR(255), isbn13 CHAR(13), primary key (publisher, isbn13), FOREIGN KEY(isbn13) REFERENCES BookData(isbn13), foreign key (publisher) references Publishers(publishers));

CREATE TABLE Languages (languages VARCHAR(255), primary key (languages)); 
CREATE TABLE Book_Language (languages VARCHAR(255), isbn13 CHAR(13), primary key (languages, isbn13), FOREIGN KEY(isbn13) REFERENCES BookData(isbn13), foreign key (languages) references Languages(languages)); 

 
CREATE TABLE Customers (customerID BIGINT, username VARCHAR(255), fname VARCHAR(255), lname VARCHAR(255), password VARCHAR(255), address VARCHAR(255), phoneNumber VARCHAR(15), PRIMARY KEY(customerID)); 

CREATE TABLE Orders (customerID BIGINT, orderID BIGINT, total DOUBLE(65,2), dateOrdered DATE, PRIMARY KEY(orderID, customerID), FOREIGN KEY (customerID) REFERENCES Customers (customerID)); 

CREATE TABLE OrderContents (orderID BIGINT, isbn13 char(13), amount int, primary key (orderID, isbn13),FOREIGN KEY (orderID) REFERENCES Orders(orderID), FOREIGN KEY (isbn13) REFERENCES BookData(isbn13)); 

CREATE TABLE Reviews (customerID BIGINT, reviewID BIGINT unique, commentText VARCHAR(255), rating INT not null, isbn13 CHAR(13), PRIMARY KEY(customerID, reviewID, isbn13), FOREIGN KEY (customerID) REFERENCES Customers(customerID), FOREIGN KEY(isbn13) REFERENCES BookData(isbn13)); 

CREATE TABLE UserTrust (customerID BIGINT, trustedID BIGINT, isTrusted BOOLEAN, PRIMARY KEY (customerID, trustedID), FOREIGN KEY (trustedID) REFERENCES Customers(customerID), FOREIGN KEY (customerID) REFERENCES Customers(customerID));

create table CommentUsefulness (customerID BIGINT, reviewID BIGINT, usefulness ENUM ("useless", "useful", "very useful"), primary key(customerID, reviewID), foreign key (reviewID) references Reviews(reviewID), foreign key (customerID) references Customers(customerID));