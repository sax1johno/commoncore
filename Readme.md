# node-CommonCore

node-CommonCore is a node.js library for downloading and interacting with the Common Core State Standards in the United States.  It contains utilites for getting the latest standards from the Common Core site and parsing them into JSON for easier use in Javascript and Node.

### Installation
You can install this library through npm
```sh
npm install commoncore
```

### Usage
```javascript
var CommonCore = require('commoncore');

/** Download the Math Common Core Standards from the Common Core website **/
CommonCore.getMathStandards(function(err, body) {
    // if there's an error, err will return a non-null
    // body contains a XML string of all of the math standards.
}

/** Download the ELA Common Core Standards from the Common Core website.
 *
**/
CommonCore.getELAStandards(function(err, body) {
    // if there's an error, err will be a non-null
    // body contains a XML string of all of the ELA standards.
}

/**
 * Convert the XML from the standards site to a JavaScript Object.
 * @param standardsXml an xml file representing the common core standards
 * @param cb a callback that's called when the parsing is complete.  Has a method signature of
 *          (err, result) where err is an error and result is a parsed javascript object.
 **/
CommonCore.XmlToJS(standardsString, function(err, standardObj) {
    // If there's an error, err is non-null
    // standardObj is a Javascript object representing the standards parsed from the standard XML string.
});

/**
 * Gets the heirarchy of standard content from a reference URI. Breaks down a
 * math-based standard refURI.
 * @param refURI the reference URI from the standards site.
 * @param cb a callback that's called when the math heirarchy is parsed.
 *          Has a method signature of (err, object) where err is an error
 *          and object is an object with the broken-down standards reference.
 **/
CCSLib.getMathHeirarchyFromRefURI(referenceURI, function(err, heriarchy) {
    // If there's an error, err is non-null
    // returns an object broken down into the following components:
    /* {
        "initiative": initiative,
        "framework": framework,
        "set": set,
        "grade": grade,
        "domain": domain,
        "cluster": cluster,
        "standard": standard,
        "component": component
    }
    */
}

/**
 * Gets the heirarchy of standard content from a reference URI. Breaks down an
 * ela-based standard refURI.
 * @param refURI the reference URI from the standards site.
 * @param cb a callback that's called when the math heirarchy is parsed.
 *          Has a method signature of (err, object) where err is an error
 *          and object is an object with the broken-down standards reference.
 **/
CCSLib.elaGetHeirarchyFromRefURI(refURI, function(err, heirarchy) {
    // If there's an error, err is non-null
    // returns an object broken down into the following components:
    /* {
        "initiative": initiative,
        "framework": framework,
        "grade": grade,
        "domain": domain,
        "standard": standard,
        "component": component
    }
    */
}

```

### Version
3.0.2

### author
John O'Connor (sax1johno@gmail.com)

License
----

MIT