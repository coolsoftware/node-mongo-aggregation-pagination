const Db = require('../_helpers/db');

module.exports = {
    getPage,
}

const page_size = 3;

async function getPage({page}) {
    return await Db.exec(async (db) => {
        const firstRow = (page > 0 ? ((page-1) * page_size) : 0) + 1;
        const cursor = db.collection('users').aggregate([
            {"$unwind":"$contacts"},
            {"$facet":{
                "meta":[
                    {"$count": "totalCount"}
                ],
                "data":[
                    {"$sort":{'contacts.name':1,'username':1}},
                    {"$skip":firstRow-1},
                    {"$limit":page_size},
                    {"$replaceRoot":
                        {"newRoot":{
                            "$mergeObjects":[
                                {
                                    "username":"$username",
                                },
                                "$contacts"
                            ]
                        }}
                    },
                ],
            }},
        ]);
        let result = {
            meta: [],  
            data: []
        }
        if (await cursor.hasNext()) {
            result = await cursor.next();
        }
        const totalCount = (result.meta[0] || {totalCount: 0}).totalCount;
        const pageCount = Math.floor((totalCount + page_size-1) / page_size);
        const lastRow = firstRow + result.data.length - 1;
        return {
            page,
            pageCount,
            totalCount,
            firstRow,
            lastRow,
            data: result.data,
        };
    });
}