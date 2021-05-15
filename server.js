var express = require("express")
var mysql = require('mysql');
var bodyparser = require('body-parser');
var app = express();
//app.set('port', process.env.PORT || 8080);
//app.listen(app.get('port'));
var jsonParser = bodyparser.json()
var lupus=require('lupus')
var async = require("async");
var urlencodedParser = bodyparser.urlencoded({ extended: false })
app.use(bodyparser.urlencoded({extended:false}));
var i=5;


// parse application/json
app.use(bodyparser.json())
app.set("view engine","ejs");
function delay() {
  return new Promise(resolve => setTimeout(resolve, 300));
}
async function delayed() {
  await delay();
}

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Somaanil@64",
  database: "video_rentals",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("DATABASE Connected!");
  });


app.get('/query' , (req, res) => {
con.query('SELECT * FROM store', (err, rows, fields) => {
if (!err)
res.send(rows);
else
console.log(err);
})
} );

app.get("/",function(req,res){
res.render("login.ejs")
});
var name,add,date,ddate;
var mov =[];
app.post("/order",function(req,res){
var arr=Object.values(req.body);
console.log(arr);
name=arr[0][0];
add=arr[0][1];
date =arr[0][2];
ddate=arr[0][3];



if(typeof arr[2] === typeof [])
{
processArray1(arr[2]);
}
else {mov.push(arr[2])};
console.log(mov);

processArray(mov);

res.redirect("/signedin");                    
});
async function processArray1(array){array.forEach(async (ar)=>{
    mov.push(ar);
    await delayed();
})};
async function processArray(array){array.forEach(async (m1)=>{
    
i++;
value="'U0"+i+"','" +name + "', '" + add + "', '" + date+ "', '" + ddate+ "', '" + m1 +"'";
 let query = "INSERT INTO Users(User_id,User_Name,Address,Issued_date,due_date,mv_code) VALUE ("+value+")";
       await delayed();
                        con.query(query, async (err, result) => {
                            if (err) {
                                return console.log(err);
                          redirect('/');
                            }
                            await delayed();

                        });
})};




app.get("/signedin",function(req,res){
res.render("home.ejs")});

app.get("/signedin/new",function(req,res){

    res.render("new.ejs")
});

app.get("/signedin/history",function(req,res){
                let query = "SELECT * FROM `Users`"; // query database to get all the players

        // execute query
        con.query(query, (err, result) => {

            if (err) {
                console.log(err);
                res.redirect('/');
                    return;
            }
    res.render("history.ejs",{Users: result});
});
});
app.get("/delete2/:id",function(req,res){
    var id = req.params.id
    let query="DELETE FROM Users WHERE User_Name ='"+ id+"'";
    con.query(query, (err, result) => {

            if (err) {
                console.log(err);
            res.redirect('/');}
res.redirect("/signedin/history");
            });
});

app.get("/signedin/inventory",function(req,res){
            let query = "SELECT * FROM `Movies`"; // query database to get all the players

        // execute query
        con.query(query, (err, result) => {

            if (err) {
                console.log(err);
                res.redirect('/');
                    return;
            }

    res.render("inventory.ejs",{Movies: result});

});
});

app.post("/add",function(req,res){

var  ID = String(req.body.ID)
var Title =String(req.body.Title)
var Genre =String(req.body.Genre)
var Language =String(req.body.Language)
var Runtime =String(req.body.Runtime)
var Release =Number(req.body.Release)
var Rental_cost =Number(req.body.Rental_cost)
var Rating =Number(req.body.Rating)
var Store_Number=Number(req.body.Store_Number)
var value="'" +ID + "', '" + Title + "', '" + Genre+ "', '" + Language+ "', '" + Runtime + "', " + Release+", "+Rental_cost+ ","+Rating+", "+Store_Number;
    console.log(value);
 let query = "INSERT INTO Movies(Movie_code,Title,Genre,Lang,Runtime,Release_yr,Rental_cost,Rating,Store_num) VALUE ("+value+")";
                        con.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                           res.redirect('/');
                            }
                         res.redirect("/signedin/inventory");

                        });
                    });
                    
app.get("/delete/:id",function(req,res){
    var id = req.params.id
    let query="DELETE FROM Movies WHERE Movie_code ="+ id;
    con.query(query, (err, result) => {

            if (err) {
                console.log(err);
            res.redirect('/');}
res.redirect("/signedin/inventory");
            });
});

app.get("/edit/:id",function(req,res){
    var id = req.params.id
    
    let query="SELECT * FROM Movies WHERE Movie_code ="+ id;
    con.query(query, (err, result) => {

            if (err) {
                console.log(err);
            res.redirect('/');
            return;}
            console.log(result)
   res.render("edit.ejs",{Movies:result});

            });
                


     
   console.log("FREE")
});


app.post("/change/:id",function(req,res){

var  ID = String(req.params.id)
var Title =String(req.body.Title)
var Genre =String(req.body.Genre)
var Language =String(req.body.Language)
var Runtime =String(req.body.Runtime)
var Release =Number(req.body.Release)
var Rental_cost =Number(req.body.Rental_cost)
var Rating =Number(req.body.Rating)
var Store_Number=Number(req.body.Store_Number)
var value="'" +ID + "', '" + Title + "', '" + Genre+ "', '" + Language+ "', '" + Runtime + "', " + Release+", "+Rental_cost+ ","+Rating+", "+Store_Number;
    console.log(value);
    
 let query1="UPDATE MOVIES SET Title='"+Title+"',Genre='"+Genre+"',Lang='"+Language+"',Runtime='"+Runtime+"',Release_yr="+Release+",Rental_cost="+Rental_cost+",Rating="+Rating+",Store_Num="+Store_Number+" WHERE Movie_code ="+ ID;
    con.query(query1, (err, result) => {

            if (err) {
                console.log(err);
            res.redirect('/');
            return;}
res.redirect("/signedin/inventory");
     });
    

});

app.get("/home",function(req,res){
res.render("home1.ejs")});


app.get("/home/Employee",function(req,res){
            let query = "SELECT * FROM `Employee`"; // query database to get all the players

        // execute query
        con.query(query, (err, result) => {

            if (err) {
                console.log(err);
                res.redirect('/');
                    return;
            }

    res.render("employee.ejs",{Employee: result});

});
});


app.post("/add1",function(req,res){

var  Emp_id = String(req.body.Emp_id)
var FName =String(req.body.FName)
var LName =String(req.body.LName)
var Emp_Address =String(req.body.Emp_Address)
var Salary =String(req.body.Salary)
var Gender =String(req.body.Gender)
var Str_no =Number(req.body.Store_Number)
var value="'" +Emp_id + "', '" + FName + "', '" + LName+ "', '" + Emp_Address+ "', '" + Salary + "', '" + Gender+"', "+Str_no;
    console.log(value);
 let query = "INSERT INTO Employee(Emp_id,FName,LName,Emp_Address,Salary,Gender,Str_no) VALUE ("+value+")";
                        con.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                           res.redirect('/');
                            }
                         res.redirect("/home/employee");

                        });
                    });

app.get("/delete1/:id",function(req,res){
    var id = req.params.id
    let query="DELETE FROM Employee WHERE Emp_id ="+ id;
    con.query(query, (err, result) => {

            if (err) {
                console.log(err);
            res.redirect('/');}
res.redirect("/home/Employee");
            });
});

app.get("/edit1/:id",function(req,res){
    var id = req.params.id
    
    let query="SELECT * FROM Employee WHERE Emp_id ="+ id;
    con.query(query, (err, result) => {

            if (err) {
                console.log(err);
            res.redirect('/');
            return;}
            console.log(result)
   res.render("edit1.ejs",{Employee:result});

            });
                


     
   console.log("FREE")
});


app.post("/change1/:id",function(req,res){


    
    
var  Emp_id = String(req.params.id)
var FName =String(req.body.FName)
var LName =String(req.body.LName)
var Emp_Address =String(req.body.Emp_Address)
var Salary =String(req.body.Salary)
var Gender =String(req.body.Gender)
var Str_no =Number(req.body.Store_Number)
var value="'" +Emp_id + "', '" + FName + "', '" + LName+ "', '" + Emp_Address+ "', '" + Salary + "', " + Gender+", "+Str_no;
    console.log(value);
    
 let query1="UPDATE Employee SET FName='"+FName+"',LName='"+LName+"',Emp_Address='"+Emp_Address+"',Salary='"+Salary+"',Gender='"+Gender+"',Str_No="+Str_no+" WHERE Emp_id ="+ Emp_id;
    con.query(query1, (err, result) => {

            if (err) {
                console.log(err);
            res.redirect('/');
            return;}
res.redirect("/home/Employee");
     });
    

});

app.get("/home1",function(req,res){
res.render("home2.ejs")});


app.get("/home1/Employee",function(req,res){
            let query = "SELECT * FROM `Employee`"; // query database to get all the players

        // execute query
        con.query(query, (err, result) => {

            if (err) {
                console.log(err);
                res.redirect('/');
                    return;
            }

    res.render("employee.ejs",{Employee: result});

});
});

app.get("/home1/Store",function(req,res){
            let query = "SELECT * FROM `Store`"; // query database to get all the players

        // execute query
        con.query(query, (err, result) => {

            if (err) {
                console.log(err);
                res.redirect('/');
                    return;
            }

    res.render("store.ejs",{Store: result});

});
});

app.post("/add2",function(req,res){

var  Store_no = Number(req.body.Store_No)
var Sdate =String(req.body.Starting_date)
var Address =String(req.body.Address)
var No_of_Movies =Number(req.body.No_of_Movies)
var value="'" +Store_no+ "', '" +Sdate+ "', '" +Address+ "', '" +No_of_Movies+ "'";
    console.log(value);
 let query = "INSERT INTO Store(Store_no,Starting_date,Address,No_of_Movies) VALUE ("+value+")";
                        con.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                           res.redirect('/');
                            }
                         res.redirect("/home1/Store");

                        });
                    });
                    
                    
app.get("/edit2/:id",function(req,res){
    var id = req.params.id
    
    let query="SELECT * FROM Store WHERE Store_no ="+ id;
    con.query(query, (err, result) => {

            if (err) {
                console.log(err);
            res.redirect('/');
            return;}
            console.log(result)
   res.render("edit2.ejs",{Store:result});

            });
                


     
   console.log("FREE")
});


app.post("/change2/:id",function(req,res){


var  Store_no = String(req.params.id)
var Sdate =String(req.body.Starting_date)
var Address =String(req.body.Address)
var No_of_Movies =String(req.body.No_of_Movies)
var value="'" +Store_no+ "', '" +Address+ "', '" +No_of_Movies+"'";
    console.log(value);
    
 let query1="UPDATE Store SET Store_no='"+Store_no+"',Address='"+Address+"',No_of_Movies='"+No_of_Movies+" 'WHERE Store_no="+ Store_no;
    con.query(query1, (err, result) => {

            if (err) {
                console.log(err);
            res.redirect('/');
            return;}
res.redirect("/home1/Store");
     });
    

});
app.get("/delete3/:id",function(req,res){
var  Store_no = String(req.params.id)
    let query="DELETE FROM Movies WHERE Store_no="+ Store_no;
    con.query(query, (err, result) => {

            if (err) {
                console.log(err);
            res.redirect('/');}
res.redirect("/home1/Store");
            });
});








app.listen(3000,function(){
    console.log("Server started");
});
