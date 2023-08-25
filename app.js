const fs = require("fs");
const express = require("express");


const app =express();
app.use(express.json());

const nfts = JSON.parse(fs.readFileSync(`${__dirname}/nft-data/data/nft-sample.json`));

//GET METHOD

app.get("/api/v1/nfts", (req, res) => {
    res.status(200).json({
        status: "success",
        result: nfts.length,
        data: {
            nfts
        }
    });
});

//POST METHOD

app.post("/api/v1/nfts", (req, res) => {
    // console.log(req.body);
    // res.send("Done posting");

    const newId = nfts[nfts.length - 1].id + 1;
    const newNFTs = Object.assign({id: newId}, req.body);

    nfts.push(newNFTs);

    fs.writeFileSync(`${__dirname}/nft-data/data/nft-sample.json`, JSON.stringify(nfts), (err) => {
            res.status(201).json({
                status: "success",
                nft: newNFTs
        });
    });
});

// GET SINGLE NFT

app.get("/api/v1/nfts/:id", (req, res) =>{

    const id = req.params.id * 1;
    const nft = nfts.find(element => element.id === id);

    if (!nft) {
        res.status(404).json({
            status: "failed",
            message: "Invalied ID"
        });
    }
    
    res.status(200).json({
        status: "success",
        data: {
            nft: nft
        }
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}.....`);
});