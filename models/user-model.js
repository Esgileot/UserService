const USERS_TABLE = "UsersTable";

module.exports = async function () {
    params = {
        TableName: USERS_TABLE,
        Item: {
            userId: '',
            name: '',
            surname: ''
        },
        Key: {
            userId: ''
        }
    };
    return params;
};