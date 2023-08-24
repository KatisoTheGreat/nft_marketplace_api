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

        const newId = nfts[nfts.length - 1] +1;
        const newNFTs = Object.assign({id: newId}, req.body);

        nfts.push(newNFTs);

        fs.writeFileSync(`${__dirname}/nft-data/data/nft-sample.json`, JSON.stringify(nfts), (err) => {
            res.status(201).json({
                status: "success",
                nft: newNFTs
            });
        });
});

const port = 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}.....`);
});