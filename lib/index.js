var request = require('request'),
    parseString = require('xml2js').parseString,
    _ = require('underscore'),
    sutil = require('util');

var MATH_STANDARD_URL = "http://corestandards.org/Math.xml",
    ELA_STANDARD_URL = "http://www.corestandards.org/ELA-Literacy.xml";


var CCSLib = function() {
};

/**
 * Get the Math standards from the common core site
 * @param cb a callback that's called when the math standards have finished downloading.
 *          Has a method signature of (err, standards) where err is an error and standards
 *          is a string representing the XML of the standards.
 **/
CCSLib.getMathStandards = function(cb) {
    request(MATH_STANDARD_URL, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          cb(null, body);
      } else {
          cb(error);
      }
    });
};

/**
 * Get the English Language Arts standards from the common core site
 * @param cb a callback that's called when the ela standards have finished downloading.
 *          Has a method signature of (err, standards) where err is an error and standards
 *          is a string representing the XML of the standards.
 **/
CCSLib.getELAStandards = function(cb) {
    request(ELA_STANDARD_URL, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          cb(null, body);
      } else {
          cb(error);
      }
    });
};

/**
 * Convert the XML from the standards site to a JavaScript Object.
 * @param standardsXml an xml file representing the common core standards
 * @param cb a callback that's called when the parsing is complete.  Has a method signature of
 *          (err, result) where err is an error and result is a parsed javascript object.
 **/
CCSLib.XmlToJS = function(standardsXml, cb) {
    parseString(standardsXml, function (err, result) {
        // console.log(util.inspect(result, false, null))
        // console.log(sutil.inspect(result.LearningStandards.LearningStandardItem[100]), false, null);
        cb(err, result);
    });
};

/**
 * Gets the heirarchy of standard content from a reference URI. Breaks down a
 * math-based standard refURI.
 * @param refURI the reference URI from the standards site.
 * @param cb a callback that's called when the math heirarchy is parsed.
 *          Has a method signature of (err, object) where err is an error
 *          and object is an object with the broken-down standards reference.
 **/
CCSLib.getMathHeirarchyFromRefURI = function(refURI, cb) {
    //[0] Initiative	CCSS	(Common Core State Standards)
    //[1] Framework	Math	
    //[2] Set	Content	(Options are 'Content' and 'Practice')
    //[3] Grade	HSA	(High School Algebra)
    //-[3] Domain	SSE	(Seeing Structure in Expressions)
    //[4]Cluster	A	
    //[5]Standard	1	
    //[6]Component	b	
    
    var components = refURI.split('/'),
        initiative = components[2] == "corestandards.org" ? "CCSS" : null,
        framework  = components[3],
        set         = components[4],
        grade       = components[5],
        domain      = components[6],
        cluster     = components[7],
        standard    = components[8],
        component   = components[9];
    cb(null, {
        "initiative": initiative,
        "framework": framework,
        "set": set,
        "grade": grade,
        "domain": domain,
        "cluster": cluster,
        "standard": standard,
        "component": component
    });
}

/**
 * Gets the heirarchy of standard content from a reference URI. Breaks down an
 * ela-based standard refURI.
 * @param refURI the reference URI from the standards site.
 * @param cb a callback that's called when the math heirarchy is parsed.
 *          Has a method signature of (err, object) where err is an error
 *          and object is an object with the broken-down standards reference.
 **/
CCSLib.elaGetHeirarchyFromRefURI = function(refURI, cb) {
    // [0] Initiative	CCSS	(Common Core State Standards)
    // [1] Framework	ELA-Literacy	
    // [2] Strand+Domain	W	(Writing)
    // [3] Grade	9-10	
    // [4] Standard	3	
    // [5] Component	d	    
    // With optional set
    // http://corestandards.org/ELA-Literacy/CCRA/L/5/
    // Without optional set
    // http://corestandards.org/ELA-Literacy/L/K/2/b/ 
    var components = refURI.split('/'),
        initiative = components[2] == "corestandards.org" ? "CCSS" : null,
        framework  = components[3],
        set,
        domain,
        grade,
        standard,
        component;
    if (components[4] == "CCRA") {
        set         = components[4],
        domain      = components[5],
        grade       = components[6],
        standard    = components[7],
        component   = components[8];
    } else {
        domain = components[4],
        grade = components[5],
        standard = components[6],
        component = components[7]
    }
    
    cb(null, {
        "initiative": initiative,
        "framework": framework,
        "grade": grade,
        "domain": domain,
        "standard": standard,
        "component": component
    });
};

module.exports = CCSLib;