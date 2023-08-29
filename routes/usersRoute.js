const express = require("express");
const fs = require("fs");

const users = JSON.parse(fs.readFileSync(`${__dirname}/nft-data/data/nft-sample.json`));


// USERS

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: "success",
        message: "Internal server error"
    });
};

const createUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
};

const getSingleUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
};

const updateUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
};

const deleteUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
};

const router = express.Router();

// ROUTERS USERS

router
    .route("/")
    .get(getAllUsers)
    .post(createUser);

router
    .route("/:id")
    .get(getSingleUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;