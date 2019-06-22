const expect = require("chai").expect;
const { YESTERDAY_DATE } = require("../utils/constants");
describe("Utils", function() {
    it("yesterday's date should be less than today's date", function() {
        expect(YESTERDAY_DATE).to.be.below(new Date());
    });
});
