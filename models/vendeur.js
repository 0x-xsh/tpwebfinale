const db = require("../db/dbconfig").db

let Schema_Vendeur = db.Schema({
    nom: String,
    adresse: String,
    numero: String,
    produits:[
        {  
            type : db.Schema.Types.ObjectId,
            ref : 'produits'
    
        },
    ]
  });


 let vendeurs =  db.model("vendeurs", Schema_Vendeur) 

 exports.vendeurs = vendeurs