# TEST-HIGO-SURVEY-APP
***Install Front End Step***
1.go to the file
2.npm install 

***Install Back End***
1.Create File ENV
2.***DB_USERNAME=XXX
PASSWORD=XXX    
DATABASE=XXX
HOST=localhost
PORT=3000
JWT_SECRETKEY=XXX**
3.npx sequelize-cli db:create
4.npx sequelize-cli db:migrate
5.npx sequelize-cli db:seed:all (note: jika ingin menambagkan 1 get data pada db)
