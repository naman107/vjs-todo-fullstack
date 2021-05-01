function getPostData(req){
    return new Promise(function(resolve,reject){
        let body = "";
        req.on("data",function(chunk){
            body += chunk.toString();
        });
        req.on("end", function(){
            resolve(body);
        });
    });
}

module.exports = {
    getPostData
}