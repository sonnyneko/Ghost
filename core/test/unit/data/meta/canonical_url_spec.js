var should = require('should'),
    getCanonicalUrl = require('../../../../server/data/meta/canonical_url'),
    markdownToMobiledoc = require('../../../utils/fixtures/data-generator').markdownToMobiledoc;

describe('getCanonicalUrl', function () {
    it('should return absolute canonical url for post', function () {
        var canonicalUrl = getCanonicalUrl({
            url: '/this-is-a-test-post/',
            html: '<h1>Test 123</h1>',
            mobiledoc: markdownToMobiledoc('# Test 123'),
            title: 'This is a test post',
            slug: 'this-is-a-test-post',
            secure: true
        });
        canonicalUrl.should.not.equal('/this-is-a-test-post/');
        canonicalUrl.should.match(/\/this-is-a-test-post\/$/);
        canonicalUrl.should.not.match(/^https:/);
    });

    it('should return absolute canonical url for amp post without /amp/ in url', function () {
        var canonicalUrl = getCanonicalUrl({
            url: '/this-is-a-test-post/amp/',
            html: '<h1>Test 123</h1>',
            mobiledoc: markdownToMobiledoc('# Test 123'),
            title: 'This is a test post',
            slug: 'this-is-a-test-post',
            secure: true
        });
        canonicalUrl.should.not.equal('/this-is-a-test-post/amp/');
        canonicalUrl.should.match(/\/this-is-a-test-post\/$/);
        canonicalUrl.should.not.match(/^https:/);
    });

    it('should return absolute canonical url for tag', function () {
        var canonicalUrl = getCanonicalUrl({
            parent: null,
            name: 'testing',
            slug: 'testing',
            description: 'We need testing',
            secure: true
        });
        canonicalUrl.should.not.equal('/tag/testing/');
        canonicalUrl.should.match(/\/tag\/testing\/$/);
        canonicalUrl.should.not.match(/^https:/);
    });

    it('should return absolute canonical url for author', function () {
        var canonicalUrl = getCanonicalUrl({
            name: 'Test User',
            bio: 'This is all about testing',
            website: 'http://my-testing-site.com',
            profile_image: null,
            location: 'Wounderland',
            slug: 'test-user',
            secure: true
        });
        canonicalUrl.should.not.equal('/author/test-user/');
        canonicalUrl.should.match(/\/author\/test-user\/$/);
        canonicalUrl.should.not.match(/^https:/);
    });

    it('should return home if empty secure data', function () {
        var canonicalUrl = getCanonicalUrl({
            secure: true
        });
        canonicalUrl.should.not.equal('/');
        canonicalUrl.should.match(/\/$/);
        canonicalUrl.should.not.match(/^https:/);
    });
});
