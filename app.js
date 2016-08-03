

var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp(); //el tutorial indicaba exp.createServer()

app.use(app.router);
app.use('/',exp.static(__dirname));



if(process.env.VCAP_SERVICES){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongo = env['mongodb-1.8'][0]['credentials'];
}
else{
    var mongo = {
        "hostname":"localhost",
        "port":27017,
        "username":"",
        "password":"",
        "name":"",
        "db":"encuesta"
    }
}
var generate_mongo_url = function(obj){
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'test');
    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
}
var mongourl = generate_mongo_url(mongo);



app.get("/",function(request,response){
	var contenido=fs.readFileSync("./quest-mobile.html");
	response.setHeader("Content-type","text/html");
	response.send(contenido);
});

app.get("/respuestas", function(request,response){
  var contenido;
  //response.setHeader('Content-Type', 'application/json');
  usuarioCol.find().toArray(function(err, docs){
    //console.log("retrieved records:");
    contenido=docs;
    response.send(contenido);
  });
});

app.post("/peticion",function(request,response){
	var body='';
    var resultado;//=JSON.parse(body);
	//console.log("petición post recibida");
	request.on('data', function(chunk) {
		
    body+=chunk;//chunk.toString();      
    resultado=JSON.parse(body);
    //console.log(resultado);
    usuarioCol.insert(resultado,function(error){
            if(error){
              console.log("Hubo un error");
            }
            else{
              console.log("Elemento insertado");
            }
          });

    });
    
    request.on('end', function() {
      // empty 200 OK response for now    
      response.writeHead(200, "OK", {'Content-Type': 'text/html'});     
      response.end();

      console.log(resultado);
    });
});



console.log("servidor iniciado...");
//app.listen(port,host);
app.listen(process.env.VCAP_APP_PORT || 80);//3000
var mongoDB=require("mongodb");
var host=mongo.hostname;
var port=mongo.port; //Connection.DEFAULT_PORT;
var dbname=mongo.db;
console.log("host"+host);

var db=new mongoDB.Db(dbname,new mongoDB.Server(host,port));

var usuarioCol;

db.open(function(error){
  console.log("Conectado a la base de datos "+host+" "+port);

  db.collection("respuestas2",function(error,col){
    console.log("Tenemos la colección");
    usuarioCol=col;
  });
});
