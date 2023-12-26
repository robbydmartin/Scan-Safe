# ScanSafe

# Team Members
Jackson Astraikis, Robby Martin, Caleb Youngdahl

# Description
ScanSafe is an application that allows people to scan the barcode of a food item
and discover if that item has any potentially harmful ingredients. The purpose of
the app is to help people make healthy choices when grocery shopping all while
allowing people to shop at the grocery store of their choice. A great feature of
the app is the ability for users to create a list of ingredients they personally
want to avoid. The application will also have a special superuser called an
“influencer” who can propose to add ingredients to the harmful list as well as 
allow them to make curated lists of products for other users to enjoy.

![UML diagram](https://github.com/ccYoungdahl/ScanSafe/blob/main/uml.jpg)

# Grading

We've included a .sql file to use with the project called STARTING_POINT.sql. 
There's already a user of each type in the database to help with testing.

Base user:
  - username: jackson
  - password: 123

Influencer:
  - username: robby
  - password: 123

Admin:
  - username: caleb
  - password: 123

The results for any UPC are at "localhost:3000/product/:upc".

There's only one alternative product recommendation in the database and it can be
seen at "localhost:3000/product/0070462098358" (the React project is running on
localhost:3000 on my machine).
