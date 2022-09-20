const dynamoDbClient = require('../dynamoDB');
const userModel = require('../models/user-model');
const uniqid = require('uniqid'); 

class UserController {

    async create(req, res, next) {
        try {
            const { name, surname } = req.body;

            if (!name) {
                res.status(400).json({ error: '"name" not specified!' });
            };
            if (!surname) {
                res.status(400).json({ error: '"surname" not specified!' });
            };
            const params = await userModel();
            const userId = uniqid();
            const createTime = new Date().toLocaleString();
            
            params.Item = { userId: userId, name: name, surname: surname, createTime: createTime };
            await dynamoDbClient.put(params).promise();

            res.json({ userId: userId, name: name, surname: surname, createTime: createTime });
        } catch (error) { 
            console.log(error);
            res.status(500).json({ error: "Could not create user!" });
        }
    }

    async update(req, res, next) {
        try {
            const { userId, name, surname } = req.body;
            if (!userId) {
                res.status(400).json({ error: '"userId" not specified!' });
            }
            const params = await userModel();
            const createTime = new Date().toLocaleString();
            
            params.Item = { userId: userId, name: name, surname: surname, createTime: createTime };
            await dynamoDbClient.put(params).promise();
            
            res.json({message: "Updated", user: { userId: userId, name: name, surname: surname, createTime: createTime}});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Could not update user"});
        }
    }

    async delete(req, res, next) {
        try {
            const { userId } = req.body;
            
            if (!userId) {
                res.status(400).json({ error: 'Missing "userId"' });
            };
            const params = await userModel();
            params.Key = { userId: userId };

            await dynamoDbClient.delete(params).promise();

            res.status(200).json({message: "delte successfull"});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Could not delete user" });
        }
    }

    async getAll(req, res, next) {
        try {
            const params = await userModel();
            const { Items } = await dynamoDbClient.scan(params).promise();

            res.json(Items);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Could not get all users" });
        }
    }

    async getOne(req, res, next) {
        try {
            const userId = req.params.userId;
            const params = await userModel();
            params.Key = { userId: userId };

            const { Item } = await dynamoDbClient.get(params).promise();
            if (!Item) {
                res.status(404).json({ error: 'Could not get user' });
            }

            res.json(Item);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Could not get user" });
        };
    };
};

module.exports = new UserController();