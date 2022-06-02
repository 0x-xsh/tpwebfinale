const db = require("../db/dbconfig").db

let Schema_Produit = db.Schema({
    titre: String,
    qte : Number,
    prix: Number,
    vendeurs:[
        {  
            type : db.Schema.Types.ObjectId,
            ref : 'vendeurs'
    
        },
    ]
  });


 let produits =  db.model("produits", Schema_Produit) 

 exports.produits = produits