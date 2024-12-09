# BookStore
 
Needed software
	MySQL
	Node.JS

Creating database .sql execution order located in the root directory of Book_Store
    BookStore_Database
    bookdata_data
    Author
    Languages
    Publishers
    Book_Author
    Book_Languages
    Book_Publisher
The Backend relies on the root user to use
	username: root
	password: password
You can execute this command to allow login with password and change the password
	ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';


Running Backend Node.JS Server
	open cmd and navigate to Book_Store\BookStoreBackend
	run server using
		node .\app.js
	
	
Running Front End Website
	open cmd and navigate to Book_Store\Front
	execute
		npm install expo
	start application with
		npx expo start
	Once the program is bundled the w key
	This should open the webpage in your browser


The database starts without a customer account in order to create an account click create an account
The database starts with a manager account
	username: supermanager
	password: password