const dayjs = require("dayjs");

const CONSTANT = {
    EARTHQUAKE_API:
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
    SUCCESS_CODE: 200,
    EMPTY_STRING: "N/A",
    YESTERDAY_DATE: dayjs()
        .subtract(1, "day")
        .toDate()
};

module.exports = CONSTANT;
