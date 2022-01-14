const Db = require('./db');

module.exports = createTestUsers;

async function createTestUsers() {

    const test_users = [
        {
            username: "john.doe",
            roles: ["user"],
            contacts: [
                {
                    name: "John Doe",
                    email: "johndoe@gmail.com"
                },
                {
                    name: "J.D.",
                    email: "jd@gmail.com",
                    phone: "+11111111111"
                }
            ]
        },
        {
            username: "jack.sparrow",
            roles: ["manager"],
            contacts: [
                {
                    name: "Jack Sparrow (gmail)",
                    email: "jack.sparrow@gmail.com",
                },
                {
                    name: "Jack Sparrow (hotmail)",
                    email: "jack.sparrow@hotmail.com",
                }
            ]
        }
    ]

    await Db.exec(async (db) => {
        const count = await db.collection('users').count();
        if (!count) {
            await db.collection('users').insertMany(test_users);
        }
    });
}