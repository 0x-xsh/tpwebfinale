const express = require("express")
const { produits } = require("../models/produit")
const router = express.Router()
const vendeurs = require("../models/vendeur").vendeurs


router.get("/all", async function(req, res){
    let all = await vendeurs.find().populate("produits", "titre ", produits).select("nom adresse numero produits").exec()
   res.send(all)
})


router.post("/create", async function(req, res){
    let vend = vendeurs({
    nom : req.body.nom,
    adresse : req.body.adresse,
    numero : req.body.numero
        
    })
        await vend.save()

        res.send(vend)

})

router.delete("/delete/:id", async function(req, res){
    let vendid = req.params.id
    await produits.findByIdAndDelete(req.params.id)
    await produits.updateMany({
        vendeurs : vendid
    },
    {
        $pull:{
            vendeurs : vendid
        }
    })
    res.send("done")

})

router.put("/update/:id", async function(req, res){

await vendeurs.findByIdAndUpdate(req.params.id, {
    name : req.body.name,
   

}, function(err, doc){
    if(err){
        res.status(400).send('err')
    }
    res.send(doc)
})

})



exports.router = router