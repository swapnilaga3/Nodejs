const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');
const dboper=require('./operations');

const url='mongodb://localhost:27017/';

MongoClient.connect(url,(err,db)=>{
    assert.equal(err,null);

    console.log('Connected correctly to server');

    const dbo =db.db("conFusion");
    dbo.collection("dishes").insertOne({"name":"Uthappizza","description":"test"},
    (err,result)=>{
        assert.equal(err,null);

        console.log("After Insert:\n");
        console.log(result.ops);

        collection.find({}).toArray((err,docs)=>{
            assert.equal(err,null);

            console.log("Found:\n");
            console.log(docs);

            db.dropCollection("dishes",(err,result)=>{
                assert.equal(err,null);

                db.close();
                });
            });
        });

    dboper.insertDocument(db,{name:"Vadonut",description:"Test"},
    "dishes",(result)=>{
        console.log("Insert Document:\n",result.ops);

        dboper.findDocuments(db,"dishes",(docs)=>{
            console.log("Found Documents:\n",docs);

            dboper.updateDocument(db,{name:"Vadonut"},
            {description:"Updated Test"},"dishes",
            (result)=>{
                console.log("Updated Document:\n",result.result);
                dboper.findDocuments(db,"dihses",(docs)=>{
                    console.log("Found updated document:\n",docs);
                
                    db.dropCollection("dishes",(result)=>{
                        console.log("Droppped Collection: ",result);

                        db.close();
                    });
                });
            });  
        });

    });

});