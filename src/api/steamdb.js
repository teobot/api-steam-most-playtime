const axios = require('axios');

// calculate the different in seconds between 2 dates
const getTimeDifference = (date1, date2) => {
    const diff = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(diff / 1000);
};

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
                language: "english",
            }
        })
        return req.data;
    } catch (error) {
        console.log("THROWING A ERROR HERE");
        console.log(error);
        return null;
    }
}

const getAllSteamGames = async () => {
    let start = new Date();

    try {
        const req = await axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v2');
        return {games: req.data, time: getTimeDifference(start, new Date())};
    } catch (error) {
        console.log(error);
    }
}

// export the getAppReviews function
module.exports = {
    getAppReviews,
}
