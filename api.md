# API notes

i followed [this](https://www.youtube.com/watch?v=YVl6M5ztOu8) video very closely for this.
does a good job of explaining pretty much everything but there are a few holes.
tells you to install the MySQL Workbench but doesn't mention that you also need the MySQL
Community Server. used [this](https://www.youtube.com/watch?v=5BQ5GvjiAR4) video to do
that installation.
not sure how different it is for Windows though!

i used Java 17 instead of Java 8 like he used in the video. didn't run into any issues
with that.

im doing everything in IntelliJ right now so i'm not sure what commands it's running when
i click run but i'm sure it wouldn't be hard to figure out how to run it in another
editor if you want!
i've found it super helpful for this project so if you want to use it you can get a free
license for students [here](https://www.jetbrains.com/community/education/#students).

main thing that might not work is the `spring.datasource.url` in
`src/main/resources/application.properties`.
i only setup the Ingredient stuff so the URL i have in there points to the ingredient
table in the database (this is how they did it in the tutorial). not super familiar
with MySQL so haven't really gotten into figuring that out yet.

also the password is very bad for the database, it's just "password5000".

for now, i guess we'll just have each our own local database since there isn't really
any important data we need to be sharing that we couldn't just manually copy over, but
in the future we may need want to figure out a better setup.

hopefully didn't forget anything but text me if you run into anything weird!
after going through the tutorial, Spring Boot is actually a lot easier than i expected
so hopefully it's not too bad!
