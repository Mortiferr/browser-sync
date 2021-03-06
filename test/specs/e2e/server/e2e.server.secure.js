"use strict";

var browserSync = require("../../../../index");

var request = require("supertest");
var assert = require("chai").assert;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

describe("E2E TLS server options test", function () {

    this.timeout(15000);

    var bs;

    before(function (done) {

        browserSync.reset();

        var config = {
            server:    {
                baseDir: "test/fixtures",
            },
            https: true,
            open: false,
            logLevel: "silent"
        };

        bs = browserSync.init(config, done).instance;
    });

    after(function () {
        bs.cleanup();
    });

    it("serves files with the snippet added", function () {
        assert.include(bs.options.getIn(["urls", "local"]), "https");
    });

    it("serves files with the snippet added", function (done) {

        assert.isString(bs.options.get("snippet"));

        request(bs.server)
            .get("/index.html")
            .set("accept", "text/html")
            .expect(200)
            .end(function (err, res) {
                assert.include(res.text, bs.options.get("snippet"));
                done();
            });
    });
});

describe("E2E TLS server test", function () {

    this.timeout(15000);

    var bs;

    before(function (done) {

        browserSync.reset();

        var config = {
            server:    {
                baseDir: "test/fixtures",
                https: true
            },
            logLevel: "silent",
            open:      false
        };

        bs = browserSync.init(config, done).instance;
    });

    after(function () {
        bs.cleanup();
    });

    it("serves files with the snippet added", function (done) {

        assert.isString(bs.options.get("snippet"));

        request(bs.server)
            .get("/index.html")
            .set("accept", "text/html")
            .expect(200)
            .end(function (err, res) {
                assert.include(res.text, bs.options.get("snippet"));
                done();
            });
    });

    it("serves the client script", function (done) {

        request(bs.server)
            .get(bs.options.getIn(["scriptPaths", "versioned"]))
            .expect(200)
            .end(function (err, res) {
                assert.include(res.text, "Connected to BrowserSync");
                done();
            });
    });
});

describe("E2E TLS server test", function () {

    this.timeout(15000);

    var bs;

    before(function (done) {

        browserSync.reset();

        var config = {
            server:   {
                baseDir: "test/fixtures"
            },
            https:    false,
            logLevel: "silent",
            open:     false
        };

        bs = browserSync(config, done).instance;
    });

    after(function () {
        bs.cleanup();
    });

    it("Does not use HTTPS if false", function () {
        assert.notInclude(bs.options.get(["urls", "local"]), "https");
    });
});
