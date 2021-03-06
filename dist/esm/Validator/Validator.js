var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import failures from "./failures";
import errors from "./errors";
/**
 * Core validator class, contains all the testing methods for strings and numbers
 * and must be initialized as an new instance.
 */
var Validator = /** @class */ (function () {
    /**
     * Create a new instance of the validator class, a set of settings can be passed as an object
     * argument to define the mode and other general settings.
     * By default the validator runs in "easy" mode that only return booleans as a validation result,
     * the "rich" mode returns an object with additional data of the validation process.
     */
    function Validator(settings) {
        var _this = this;
        /** Language setting for RegExp tests */
        this.lang = "en";
        /** Current mode of the validator instance. */
        this.mode = "easy";
        /** Remove white spaces at the beginning and the end of the string */
        this.trim = false;
        /** Collection of methods to validate different number types */
        this.numberTests = {
            int: function (n) { return n % 1 === 0; },
            float: function (n) { return n % 1 !== 0; }
        };
        /** Manage the "rich" mode results data to display on each validation */
        this.richResults = {
            failure: true,
            description: true,
            subject: true,
            test: true,
            length: true,
            limits: true,
            lang: true,
            trim: true
        };
        this.removeUnwantedResults = function (results) {
            for (var data in results) {
                if (data in _this.richResults && !_this.richResults[data])
                    delete results[data];
            }
            return results;
        };
        if (settings && settings.mode && (settings.mode !== "easy" && settings.mode !== "rich"))
            this.throwError("300");
        // Set props
        if (settings && settings.mode)
            this.mode = settings.mode;
        if (settings && settings.results)
            this.richResults = __assign(__assign({}, this.richResults), settings.results);
        if (settings && settings.lang)
            this.lang = settings.lang;
        if (settings && settings.trim)
            this.trim = settings.trim;
        // Set string regex tests values
        this.testRegExp = require("./testRegExp")[this.lang];
    }
    /**
     * Add a new test type for strings, you can make use of the added tests
     * with the main validator string function passing the defined key name as a test type argument.
     */
    Validator.prototype.addStrTest = function (key, regexp) {
        var _a;
        if (typeof key !== "string")
            this.throwError("005");
        if (!/^[a-zA-Z]+[a-zA-Z0-9\-_]+$/m.test(key))
            this.throwError("203");
        if (!(regexp instanceof RegExp) && typeof regexp !== "string")
            this.throwError("004");
        var newRegExp;
        try {
            newRegExp = new RegExp(regexp, "m");
        }
        catch (e) {
            newRegExp = this.testRegExp.any;
            this.throwError("200");
        }
        this.testRegExp = __assign(__assign({}, this.testRegExp), (_a = {}, _a[key] = newRegExp, _a));
    };
    /**
     * Throw an error if something in the validation process does not meet the requirements to work
     * properly.
     * The error displayed depends on the error code passed ass an argument.
     */
    Validator.prototype.throwError = function (code) {
        throw new Error(errors[code]);
    };
    /**
     * Run a string length test, this function is called when the length range options are passed to the
     * main validator function and return a boolean if mode is equal to "easy" or an object with the
     * test results data if it's on "rich".
     */
    Validator.prototype.testLength = function (length, limits) {
        if (("min" in limits && typeof limits.min !== "number") || ("max" in limits && typeof limits.max !== "number"))
            this.throwError("002");
        /**
         * CHECK LENGTH IN EASY MODE
         */
        if (this.mode === "easy") {
            /** Prevent throw error max is minor than min, instead return failure */
            if (("min" in limits && "max" in limits) && limits.min > limits.max) {
                return false;
            }
            ;
            /** Prevent throw error if limits are negative, instead return failure */
            if (("min" in limits && limits.min < 0) || ("max" in limits && limits.max < 0)) {
                return false;
            }
            if ("min" in limits && length < limits.min)
                return false;
            if ("max" in limits && length > limits.max)
                return false;
            return true;
            /**
             * CHECK LENGTH IN RICH MODE
             */
        }
        else {
            /** Prevent throw error max is minor than min, instead return failure */
            if (("min" in limits && "max" in limits) && limits.min > limits.max) {
                return {
                    result: false,
                    failure: "WRONGLIMITS",
                    description: failures["WRONGLIMITS"]
                };
            }
            ;
            /** Prevent throw error if limits are negative, instead return failure */
            if (("min" in limits && limits.min < 0) || ("max" in limits && limits.max < 0)) {
                return {
                    result: false,
                    failure: "WRONGSTRLIMITS",
                    description: failures["WRONGSTRLIMITS"]
                };
            }
            if ("min" in limits && length < limits.min)
                return {
                    result: false,
                    failure: "MINLENGTH",
                    description: failures["MINLENGTH"]
                };
            if ("max" in limits && length > limits.max)
                return {
                    result: false,
                    failure: "MAXLENGTH",
                    description: failures["MAXLENGTH"]
                };
            return { result: true };
        }
    };
    /**
     * Run a number range test, this function is called when the range options are passed to the
     * main validator function and return a boolean if mode is equal to "easy" or an object with the
     * test results data if it's on "rich".
     */
    Validator.prototype.testRange = function (number, limits) {
        if (("min" in limits && typeof limits.min !== "number") || ("max" in limits && typeof limits.max !== "number"))
            this.throwError("003");
        /**
         * CHECK RANGE IN EASY MODE
         */
        if (this.mode === "easy") {
            /** Prevent throw error max is minor than min, instead return failure */
            if (("min" in limits && "max" in limits) && limits.min > limits.max) {
                return false;
            }
            ;
            if ("min" in limits && number < limits.min)
                return false;
            if ("max" in limits && number > limits.max)
                return false;
            return true;
            /**
             * CHECK RANGE IN RICH MODE
             */
        }
        else {
            /** Prevent throw error max is minor than min, instead return failure */
            if (("min" in limits && "max" in limits) && limits.min > limits.max) {
                return {
                    result: false,
                    failure: "WRONGLIMITS",
                    description: failures["WRONGLIMITS"]
                };
            }
            ;
            if ("min" in limits && number < limits.min)
                return {
                    result: false,
                    failure: "MINRANGE",
                    description: failures["MINRANGE"]
                };
            if ("max" in limits && number > limits.max)
                return {
                    result: false,
                    failure: "MAXRANGE",
                    description: failures["MAXRANGE"]
                };
            return { result: true };
        }
    };
    /**
     * Test a string against a regular expression defined by the test type argument.
     * If the validator is running on "easy" mode, this will return a single boolean,
     * a rich object with the results data will be returned instead if mode is "rich".
     */
    Validator.prototype.testString = function (string, type) {
        var test;
        if (type in this.testRegExp)
            test = this.testRegExp[type].test(string);
        else {
            test = false;
            this.throwError("201");
        }
        /**
         * TEST STRING IN EASY MODE
         */
        if (this.mode === "easy") {
            return test;
            /**
             * TEST STRING IN RICH MODE
             */
        }
        else {
            if (!test)
                return {
                    result: false,
                    failure: "NOSTRMATCH",
                    description: failures["NOSTRMATCH"]
                };
            return { result: true };
        }
    };
    /**
     * Test a number with some math expressions to define the current number type if test type has
     * been passed to the core validator function.
     * If the validator is running on "easy" mode, this will return a single boolean,
     * a rich object with the results data will be returned instead if mode is "rich".
     */
    Validator.prototype.testNumber = function (number, type) {
        var test;
        if (type in this.numberTests)
            test = this.numberTests[type](number);
        else {
            test = false;
            this.throwError("202");
        }
        /**
         * TEST NUMBER IN EASY MODE
         */
        if (this.mode === "easy") {
            return test;
            /**
             * TEST NUMBER IN RICH MODE
             */
        }
        else {
            if (!test)
                return {
                    result: false,
                    failure: "NONUMMATCH",
                    description: failures["NONUMMATCH"]
                };
            return { result: true };
        }
    };
    /**
     * Run a string test to define if the passed string match the specified requeriments
     * of length and validation type.
     * When "easy" mode is enabled, this function will return always a boolean, *true* for
     * success *false* for failure, if "rich" mode is active, then the result will be a
     * rich object that displays all the validation results data, you can manage wich data
     * to display inside the object with the constructor settings.
     *
     * If no requeriments are passed, then this function will always return *true* on
     * "easy" mode or *{ result: true }* on "rich" mode.
     */
    Validator.prototype.str = function (subject, limits, test) {
        if (typeof subject !== "string")
            this.throwError("000");
        var testSubject = subject;
        if (this.trim)
            testSubject = subject.trim();
        /**
         * --------------
         * EASY MODE TEST
         * --------------
         */
        if (this.mode === "easy") {
            // Check length of the string
            if (limits) {
                if (!this.testLength(testSubject.length, limits))
                    return false;
            }
            // Test string
            if (test) {
                return this.testString(testSubject, test.toLowerCase());
            }
            // Default return
            return true;
            /**
             * --------------
             * RICH MODE TEST
             * --------------
             */
        }
        else {
            // Default results values in rich mode
            var results = {};
            results.subject = testSubject;
            results.length = testSubject.length;
            results.lang = this.lang;
            results.trim = this.trim;
            if (limits)
                results.limits = limits;
            if (test)
                results.test = test;
            // Check length of the string
            if (limits) {
                results = __assign(__assign({}, results), this.testLength(testSubject.length, limits));
                if (!results.result)
                    return this.removeUnwantedResults(results);
            }
            // Test string
            if (test) {
                results = __assign(__assign({}, results), this.testString(testSubject, test.toLowerCase()));
                return this.removeUnwantedResults(results);
            }
            // Default return
            results.result = true;
            return this.removeUnwantedResults(results);
        }
    };
    /**
     * Run a number test to define if the passed number match the specified requeriments
     * of range and validation type.
     * When "easy" mode is enabled, this function will return always a boolean, *true* for
     * success *false* for failure, if "rich" mode is active, then the result will be a
     * rich object that displays all the validation results data, you can manage wich data
     * to display inside the object with the constructor settings.
     *
     * If no requeriments are passed, then this function will always return *true* on
     * "easy" mode or *{ result: true }* on "rich" mode.
     */
    Validator.prototype.num = function (subject, limits, test) {
        if (typeof subject !== "number")
            this.throwError("001");
        /**
         * --------------
         * EASY MODE TEST
         * --------------
         */
        if (this.mode === "easy") {
            // Check if number is inside specified range
            if (limits) {
                if (!this.testRange(subject, limits))
                    return false;
            }
            // Test number type
            if (test) {
                return this.testNumber(subject, test.toLowerCase());
            }
            // Default return
            return true;
            /**
             * --------------
             * RICH MODE TEST
             * --------------
             */
        }
        else {
            // Default results values in rich mode
            var results = {};
            results.subject = subject;
            if (limits)
                results.limits = limits;
            if (test)
                results.test = test;
            // Check if number is inside specified range
            if (limits) {
                results = __assign(__assign({}, results), this.testRange(subject, limits));
                if (!results.result)
                    return this.removeUnwantedResults(results);
            }
            // Test number type
            if (test) {
                results = __assign(__assign({}, results), this.testNumber(subject, test.toLowerCase()));
                return this.removeUnwantedResults(results);
            }
            // Default return
            results.result = true;
            return this.removeUnwantedResults(results);
        }
    };
    return Validator;
}());
export default Validator;
