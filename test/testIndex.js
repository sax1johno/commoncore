var CCSLib = require('../lib/index'),
    lib = new CCSLib(),
    expect = require('chai').expect;

describe("CCSLib", function() {
    describe("#getMathStandards", function() {
        it("Should get the math standards", function(done) {
            // Sometimes downloading the xml can take a while.
            this.timeout = 6000;
             CCSLib.getMathStandards(function(err, math) {
                 expect(math).to.not.be.a('null');
                 expect(err).to.be.a('null');
                //  console.log(math);
                 done(err);
             });
        });
    });
    describe("#getElaStandards", function() {
        it("Should get the ELA standards", function(done) {
            // Sometimes downloading the xml can take a while.
            this.timeout = 6000;
             CCSLib.getELAStandards(function(err, ela) {
                 expect(ela).to.not.be.a('null');
                 expect(err).to.be.a('null');
                //  console.log(math);
                 done(err);
             });
        });
    });
    describe("#XmlToJS", function() {
        it("Should convert xml standards to JS Object", function(done) {
            // Sometimes downloading the xml can take a while.
            this.timeout = 6000;
             CCSLib.getMathStandards(function(err, math) {
                 if (!err) {
                     CCSLib.XmlToJS(math, function(err, mathJs) {
                        expect(mathJs).to.be.a("Object");
                        expect(err).to.be.a('null');
                        done(err);
                     });
                 } else {
                     done(err);
                 }
             });
        });
    });
    
    describe("#getMathHeirarchyFromRefURI", function() {
        it("Should return the math heirarchy from a Ref URI", function(done) {
            // Sometimes downloading the xml can take a while.
            this.timeout = 6000;
            var EXAMPLE_URI = "http://corestandards.org/Math/Content/K/CC/B/4/b/"
             CCSLib.getMathHeirarchyFromRefURI(EXAMPLE_URI, function(err, math) {
                 expect(err).to.be.a('null');
                 console.log(math);
                 done(err);
             });
        });
    });

    describe("#elaGetHeirarchyFromRefURI", function() {
        it("Should return the ELA heirarchy from a Ref URI that does not have component", function(done) {
            // Sometimes downloading the xml can take a while.
            this.timeout = 6000;
            var EXAMPLE_URI = "http://corestandards.org/ELA-Literacy/CCRA/L/5/"
             CCSLib.elaGetHeirarchyFromRefURI(EXAMPLE_URI, function(err, math) {
                 expect(err).to.be.a('null');
                 console.log(math);
                 done(err);
             });
        });
        it("Should return the ELA heirarchy from a Ref URI that does have component", function(done) {
            // Sometimes downloading the xml can take a while.
            this.timeout = 6000;
            var EXAMPLE_URI = "http://corestandards.org/ELA-Literacy/L/K/2/b/"
             CCSLib.elaGetHeirarchyFromRefURI(EXAMPLE_URI, function(err, math) {
                 expect(err).to.be.a('null');
                 console.log(math);
                 done(err);
             });
        });
        
    });
    
});