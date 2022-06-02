const express = require("express")
const { send } = require("express/lib/response")

const router = express.Router()

const produits = require("../models/produit").produits
const vendeurs = require("../models/vendeur").vendeurs


router.get("/all", async function(req, res){
   let all = await produits.find().populate("vendeurs", "nom", vendeurs).select("titre qte prix vendeurs").exec()
   res.send(all)
})

router.get("/:id", async function(req, res){
    let id = req.params.id
    let prod = await produits.findById(id)
    res.send(prod)
})


router.post("/create", async function(req, res){
    let prod = produits({
        titre : req.body.titre,
        qte : req.body.qte,
        prix : req.body.prix
    })
        await prod.save()

        res.send(prod)

})




router.delete("/delete/:id", async function(req, res){
    prodid = req.params.id
    await produits.findByIdAndDelete(prodid)
    await vendeurs.updateMany({
        produits : prodid
    },{
        $pull: {
            produits:prodid
        }
    })
    res.send("done")

})

router.put("/addVendeur", async function(req, res){
    let vend_id = req.body.vendid
    let prod_id = req.body.prodid
    
    await produits.updateOne(
        {_id:prod_id},
        {$push:{
            vendeurs:vend_id
        }}
        )

    await vendeurs.updateOne({
        _id:vend_id
    },
    {
        $push:{
            produits:prod_id
        }
    })
    res.send("done")

})



router.put("/update/:id", async function(req, res){

await produits.findByIdAndUpdate(req.params.id, {
    titre : req.body.titre,
    prix : req.body.prix,
    qte : req.body.qte

}, function(err, doc){
    if(err){
        res.status(400).send('err')
    }
    res.send(doc)
})

})







exports.router = router
