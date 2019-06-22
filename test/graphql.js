const url = "http://127.0.0.1:3000";
const request = require("supertest")(url);
const expect = require("chai").expect;
const { SUCCESS_CODE } = require("../utils/constants.js");
const dayjs = require("dayjs");

const CURRENT_TIME = new Date();
describe("GraphQL", () => {
    it("Fetch 10 top earthquakes within 24 hours", done => {
        //Assumes that there is already data in the database
        request
            .post("/graphql")
            .send({
                operationName: "earthquakes",
                query:
                    "query earthquakes { biggestEarthquakes { id mag createdAt updatedAt }}"
            })
            .expect(SUCCESS_CODE)
            .end((err, res) => {
                if (err) return done(err);
                //Have 10 earthquakes
                expect(res.body.data.biggestEarthquakes).to.have.lengthOf(10);
                for (const item of res.body.data.biggestEarthquakes) {
                    expect(item).to.have.all.keys(
                        "id",
                        "mag",
                        "createdAt",
                        "updatedAt"
                    );

                    //Time should be less than current day
                    expect(dayjs(item.createdAt).toDate()).to.be.below(
                        CURRENT_TIME
                    );
                }
                done();
            });
    });
    it("Create a new earthquake", done => {
        request
            .post("/graphql")
            .send({
                operationName: "createEarthquake",
                query:
                    'mutation createEarthquake { createEarthquake(input: { mag: 1.1, name: "test" }) { id name mag createdAt updatedAt }}'
            })
            .expect(SUCCESS_CODE)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.data.createEarthquake).to.have.all.keys(
                    "id",
                    "name",
                    "mag",
                    "createdAt",
                    "updatedAt"
                );
                expect(res.body.data.createEarthquake.name).to.equal("test");
                expect(res.body.data.createEarthquake.mag).to.equal(1.1);
                done();
            });
    });
    it("Fetch 100 earthquakes", done => {
        request
            .post("/graphql")
            .send({
                operationName: "fetchEarthquake",
                query:
                    "mutation fetchEarthquake { fetchEarthquakes { id name mag createdAt updatedAt }}"
            })
            .expect(SUCCESS_CODE)
            .end((err, res) => {
                if (err) return done(err);
                //Have 100 earthquakes
                expect(res.body.data.fetchEarthquakes).to.have.lengthOf(100);
                for (const item of res.body.data.fetchEarthquakes) {
                    expect(item).to.have.all.keys(
                        "id",
                        "name",
                        "mag",
                        "createdAt",
                        "updatedAt"
                    );
                }
                done();
            });
    });
});
