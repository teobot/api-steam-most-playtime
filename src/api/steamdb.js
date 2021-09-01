const axios = require('axios');

const steamDB = axios.create({
    baseURL: 'https://store.steampowered.com/',
});

const getAppReviews = async (id, cursor) => {
    try {
        const req = await steamDB.request({
            url: `/appreviews/${id}`, method: "get", params: {
                json: "1",
                filter: "recent",
                cursor: encodeURI(cursor),
                num_per_page: "100",
                language: "all",
                purchase_type: "all",
                review_type: "all",
            }
        })
        return req.data;
    } catch (error) {
        // TODO: throw a error
        console.log(error);
        return null;
    }
}

// export the getAppReviews function
module.exports = {
    getAppReviews
}
