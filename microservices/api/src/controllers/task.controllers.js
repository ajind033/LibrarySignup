var fetch= require('node-fetch');

exports.createUser=(req,res)=>{var fetchAction =  require('node-fetch');

var url = "https://auth.colostomy71.hasura-app.io/v1/signup";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

var body = {
    "provider": "username",
    "data": {
        "username": req.body.username,
        "password": req.body.password
    }
};

requestOptions.body = JSON.stringify(body);

fetchAction(url, requestOptions)
.then(function(response) {
	return response.json();
})
.then(function(result) {
    var link = ',{"link": "https://drive.google.com/open?id=1gmHfhXuv-prVzLoBSz0UBTkR03XbEgX3YXpGIHdGrWg"}]'
   
    //start the data insertion

var url = "https://data.colostomy71.hasura-app.io/v1/query";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer 700c43a43a9757c8cf2b08fb34ea8b7de9dcc0f565af55bc"
    }
};

var body = {
    "type": "insert",
    "args": {
        "table": "users",
        "objects": [
            {
                "username": req.body.username,
                "name": req.body.name,
                "phone": req.body.phone,
                "DOB": req.body.DOB,
                "city": req.body.city,
                "email": req.body.email,
                "password": req.body.password
            }
        ]
    }
};

requestOptions.body = JSON.stringify(body);

fetchAction(url, requestOptions)
.then(function(response) {
	return response.json();
})
.then(function(result) {
  console.log(JSON.stringify(result));
    // start webhook
   var data = {
    "username": req.body.username,
    "name": req.body.name,
    "phone": req.body.phone,
    "DOB": req.body.DOB,
    "city": req.body.city,
    "email": req.body.email
                
              };
    // to invoke the webhook 
    var webHook = "https://hooks.zapier.com/hooks/catch/2957893/ziape9/";
   fetch(webHook, { method: 'POST', body: JSON.stringify(data) })
    .then(function(res) {
       return res.json();
    }).then(function(json) {
       console.log(json);
    });

})
.catch(function(error) {
	console.log('Request Failed:' + error);
});

//end with data insertion
res.send("["+JSON.stringify(result)+link);
})
.catch(function(error) {
	res.send('Request Failed:' + error);
});
       }
