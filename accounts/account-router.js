const express = require("express");

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const accounts = await db('accounts');
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: "error getting accounts" });
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const [account] = await db.select("*").from("accounts").where({id});
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: `could not find account with id ${id}` });
        }
    } catch (error) {
        res.status(500).json({ message: "error getting that account" });
    }
})

router.post('/', async (req, res) => {
    const accountData = req.body;
    try {
        const account = await db('accounts').insert(accountData);
        res.status(201).json(account);
    } catch (error) {
        res.status(500).json({ message: 'error creating the account' });
    }
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    try {
        const count = await db("accounts").where({id}).update(changes);
        if (count) {
            res.status(200).json({ updated: count });
        } else {
            res.status(404).json({ message: `account ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: "could not update the account" });
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    
    try {
        const count = await db("accounts").where({id}).del();
        if (count) {
            res.status(200).json({ deleted: count });
        } else {
            res.status(404).json({ message: `account ${id} could not be removed` });
        }
    } catch (error) {
        res.status(500).json({ message: "error deleting account" });
    }
});

module.exports = router;