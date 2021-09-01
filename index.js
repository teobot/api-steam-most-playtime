// import the function i just made
const { getAppReviews } = require("./src/api/steamdb")

const Main = async () => {
    let cursor = "*"
    let reviewNum = 0;
    let numberOfRuns = 0
    try {

        let empty = false
        while (!empty) {
            numberOfRuns++;
            console.log(`Run ${numberOfRuns}`)
            const r = await getAppReviews(1291340, cursor);
            if (r.reviews.length === 0) {
                empty = true
            } else {
                reviewNum += r.reviews.length
                cursor = r.cursor
            }
        }

        console.log(`There are ${reviewNum} reviews`);
    } catch (error) {
        console.log(error);
    }
}

Main();