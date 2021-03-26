// user seeds


const { User } = require("../models");

const userData = [
    {
        username: "DustyBunsen",
        email: "dustybunsen@email.com",
        password: "soDusty!"
    },
    {
        username: "RustyBunsen",
        email: "rustybunsen@email.com",
        password: "soRusty!"
    },
    {
        username: "MustyBunsen",
        email: "mustybunsen@email.com",
        password: "soMusty!"
    },
    {
        username: "GustyBunsen",
        email: "gustybunsen@email.com",
        password: "soGusty!"
    },
    {
        username: "CrustyBunsen",
        email: "crustybunsen@email.com",
        password: "soCrusty!"
    },
    {
        username: "TrustyBunsen",
        email: "trustybunsen@email.com",
        password: "soTrusty!"
    },
    {
        username: "FustyBunsen",
        email: "fustybunsen@email.com",
        password: "soFusty!"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;