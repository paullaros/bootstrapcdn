'use strict';

const assert = require('assert').strict;
const helpers = require('./test_helpers');

describe('404', () => {
    const uri = helpers.getURI('404');
    let response = {};

    before((done) => {
        helpers.startServer();
        helpers.prefetch(uri, (res) => {
            response = res;
            done();
        });
    });

    it('works', (done) => {
        assert.equal(response.statusCode, 404);
        done();
    });

    it('valid html', (done) => {
        helpers.assert.validHTML(response)
            .then(() => done());
    });

    it('contains canonical URL', (done) => {
        helpers.assert.canonicalUrl('/404/', response, done);
    });

    it('contains authors', (done) => {
        helpers.assert.authors(response, done);
    });

    it('has page header', (done) => {
        helpers.assert.pageHeader('Page Not Found', response, done);
    });

    it('has body class', (done) => {
        helpers.assert.bodyClass('page-404', response, done);
    });
});
