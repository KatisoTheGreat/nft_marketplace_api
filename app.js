const fs = require("fs");
const express = require("express");


const app =express();
app.use(express.json());

// CUSTOM MIDDLEWARE


const nfts = JSON.parse(fs.readFileSync(`${__dirname}/nft-data/data/nft-sample.json`));



//GET METHOD
const getAllNfts = (req, res) => {
    res.status(200).json({
        status: "success",
        result: nfts.length,
        data: {
            nfts
        }
    });
};

//POST METHOD
const createNft = (req, res) => {

    const newId = nfts[nfts.length - 1].id + 1;
    const newNFTs = Object.assign({id: newId}, req.body);

    nfts.push(newNFTs);

    fs.writeFileSync(`${__dirname}/nft-data/data/nft-sample.json`, JSON.stringify(nfts), (err) => {
            res.status(201).json({
                status: "success",
                nft: newNFTs
        });
    });
}

// GET SINGLE NFT
const getSingleNft = (req, res) =>{

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
}

// PATCH METHOD
const patchNft = (req, res) => {

    if (req.params.id * 1 > nfts.length) {
        res.status(404).json({
            status: "failed",
            message: "Invalied ID"
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            nft: "Updating NFT"
        }
    });
}

// DELETE METHOD
const deleteNft = (req, res) => {

    if (req.params.id * 1 > nfts.length) {
        res.status(404).json({
            status: "failed",
            message: "Invalied ID"
        });
    }

    res.status(204).json({
        status: "success",
        data: null
    });
}


app.get("/api/v1/nfts", getAllNfts);
app.post("/api/v1/nfts", createNft);
app.get("/api/v1/nfts/:id", getSingleNft);
app.patch("/api/v1/nfts/:id", patchNft);
app.delete("/api/v1/nfts/:id", deleteNft);

const port = 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}.....`);
});