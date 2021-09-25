import { strVal } from "../types/types";
import failures from "./failures";

/**
 * Core validator class, contains all the testing methods for strings and numbers
 * and must be initialized as an new instance.
 */
class Validator {

    /** Language setting for RegExp tests */
    private lang:strVal.Lang = "en";

    /** Current mode of the validator instance. */
    private mode:strVal.Mode = "easy";

    /** RegExp collection to test strings. */
    private testRegExp:strVal.StrTestTypes;

    /** Collection of methods to validate different number types */
    private numberTests:strVal.NumTestTypes = {
        int: (n:number) => n % 1 === 0,
        float: (n:number) => n % 1 !== 0
    };

    /** Manage the "rich" mode results data to display on each validation */
    private richResults:strVal.RichResults = {
        failure: true,
        description: true,
        string: true,
        test: true,
        length: true,
        testLength: true,
        number: true,
        testRange: true,
    }

    /**
     * Create a new instance of the validator class, a set of settings can be passed as an object
     * argument to define the mode and other general options.
     * By default the validator runs in "easy" mode that only return booleans as a validation result,
     * the "rich" mode returns an object with additional data of the validation process.
     */
    constructor(options?:strVal.ConfigOptions) {
        
        if (options && options.mode && (options.mode !== "easy" && options.mode !== "rich")) this.throwError("300", options.mode);

        // Set props
        if (options && options.mode) this.mode = options.mode;
        if (options && options.results) this.richResults = {...this.richResults, ...options.results};
        if (options && options.lang) this.lang = options.lang;

        // Set string regex tests values
        this.testRegExp = require("./testRegExp")[this.lang]

    }

    /**
     * Add a new test type for strings, you can make use of the added tests
     * with the main validator string function passing the defined key name as a test type argument.
     */
    public addStrTest(key:string, regexp:RegExp|string):void {

        if (typeof key !== "string") this.throwError("005");
        if (!/^[a-zA-Z]+[a-zA-Z0-9\-_]+$/m.test(key)) this.throwError("203");
        if (!(regexp instanceof RegExp) && typeof regexp !== "string") this.throwError("004");

        let newRegExp:RegExp;

        try { 

            newRegExp = new RegExp(regexp, "m"); 

        } catch(e) { 

            newRegExp = this.testRegExp.any;
            this.throwError("200"); 

        }

        this.testRegExp = {...this.testRegExp, [key]: newRegExp};

    }

    private removeUnwantedResults = (results:strVal.StrValRichResults|strVal.NumValRichResults):strVal.StrValRichResults|strVal.NumValRichResults => {
        
        for (let data in results) {
            
            if (data in this.richResults && !this.richResults[data]) delete results[data];

        }

        return results;

    }

    /**
     * Throw an error if something in the validation process does not meet the requirements to work
     * properly.
     * The error displayed depends on the error code passed ass an argument, in addition, some extra
     * argument can be passed to display dynamic error messages.
     */
    private throwError(code:string, arg?:string):void {

        switch (code) {

            // Datatypes errors
            case "000": throw new Error(`Expected a string datatype to validate, instead received: '${arg}'`);
            case "001": throw new Error(`Expected a number datatype to validate, instead received: '${arg}'`);
            case "002": throw new Error("Unexpected datatype on length options, expected all values to be a number.");
            case "003": throw new Error("Unexpected datatype on range options, expected all values to be a number.");
            case "004": throw new Error("Wrong regular expression value on argument, expected a valid string/RegExp pattern.");
            case "005": throw new Error("Wrong key value on argument, expected a valid object-key string.");
            // Range errors
            case "100": throw new Error("Wrong length options configuration, 'min' value must be minor than or equal to 'max' value.");
            case "101": throw new Error("Wrong range options configuration, 'min' value must be minor than or equal to 'max' value.");
            case "102": throw new Error("Wrong length options configuration, 'min' and 'max' must be positive integers.");
            // Test types errors
            case "200": throw new Error("The test value you are trying to create has an invalid string/RegExp format.");
            case "201": throw new Error(`Test type '${arg}' is not a valid string test key.`);
            case "202": throw new Error(`Test type '${arg}' is not a valid number test key.`);
            case "203": throw new Error(`Test type key argument is not a valid object-key string.`);
            // Settings errors
            case "300": throw new Error(`Wrong instance, '${arg}' is not a valid mode.`);

            default: throw new Error(`Error code '${code}' doesn't exist.`) // Debug purposes only

        }

    }

    /** 
     * Run a string length test, this function is called when the length range options are passed to the
     * main validator function and return a boolean if mode is equal to "easy" or an object with the
     * test results data if it's on "rich".
     */
    private testLength(length:number, lengthOpts:strVal.RangeOptions):boolean|strVal.ValRichResults {

        if (("min" in lengthOpts && typeof lengthOpts.min !== "number") || ("max" in lengthOpts && typeof lengthOpts.max !== "number")) this.throwError("002");
        if (("min" in lengthOpts && "max" in lengthOpts) && (lengthOpts.min as number) > (lengthOpts.max as number)) this.throwError("100");
        if (("min" in lengthOpts && lengthOpts.min as number < 0) || ("max" in lengthOpts && lengthOpts.max as number < 0)) this.throwError("102");

        /**
         * CHECK LENGTH IN EASY MODE
         */
        if (this.mode === "easy") {

            if ("min" in lengthOpts && length < (lengthOpts.min as number)) return false;
            if ("max" in lengthOpts && length > (lengthOpts.max as number)) return false;

            return true;

        /**
         * CHECK LENGTH IN RICH MODE
         */
        } else {

            if ("min" in lengthOpts && length < (lengthOpts.min as number)) return {
                result: false,
                failure: "MINLENGTH",
                description: failures["MINLENGTH"]
            }
            if ("max" in lengthOpts && length > (lengthOpts.max as number)) return {
                result: false,
                failure: "MAXLENGTH",
                description: failures["MAXLENGTH"]
            }

            return { result: true };

        }

    }

    /** 
     * Run a number range test, this function is called when the range options are passed to the
     * main validator function and return a boolean if mode is equal to "easy" or an object with the
     * test results data if it's on "rich".
     */
    private testRange(number:number, rangeOpts:strVal.RangeOptions):boolean|strVal.ValRichResults {

        if (("min" in rangeOpts && typeof rangeOpts.min !== "number") || ("max" in rangeOpts && typeof rangeOpts.max !== "number")) this.throwError("003");
        if (("min" in rangeOpts && "max" in rangeOpts) && (rangeOpts.min as number) > (rangeOpts.max as number)) this.throwError("101");
    
        /**
         * CHECK RANGE IN EASY MODE
         */
        if (this.mode === "easy") {

            if ("min" in rangeOpts && number < (rangeOpts.min as number)) return false;
            if ("max" in rangeOpts && number > (rangeOpts.max as number)) return false;

            return true;

        /**
         * CHECK RANGE IN RICH MODE
         */
        } else {

            if ("min" in rangeOpts && number < (rangeOpts.min as number)) return {
                result: false,
                failure: "MINRANGE",
                description: failures["MINRANGE"]
            }
            if ("max" in rangeOpts && number > (rangeOpts.max as number)) return {
                result: false,
                failure: "MAXRANGE",
                description: failures["MAXRANGE"]
            }

            return { result: true };

        }

    }

    /**
     * Test a string against a regular expression defined by the test type argument.
     * If the validator is running on "easy" mode, this will return a single boolean,
     * a rich object with the results data will be returned instead if mode is "rich".
     */
    private testString(string:string, type:string):boolean|strVal.ValRichResults|void {
        
        let test:boolean;

        if (type in this.testRegExp) test = this.testRegExp[type].test(string);
        else {
            test = false;
            this.throwError("201", type);
        }

        /**
         * TEST STRING IN EASY MODE
         */
        if (this.mode === "easy") {

            return test;
        
        /**
         * TEST STRING IN RICH MODE
         */
        } else {

            if (!test) return {
                result: false,
                failure: "NOSTRMATCH",
                description: failures["NOSTRMATCH"]
            } as strVal.ValRichResults;

            return { result: true } as strVal.ValRichResults;

        }    

    }

    /**
     * Test a number with some math expressions to define the current number type if test type has
     * been passed to the core validator function.
     * If the validator is running on "easy" mode, this will return a single boolean,
     * a rich object with the results data will be returned instead if mode is "rich".
     */
    private testNumber(number:number, type:string):boolean|strVal.ValRichResults|void {

        let test:boolean;

        if (type in this.numberTests) test = this.numberTests[type](number);
        else {
            test = false;
            this.throwError("202", type);
        }

        /**
         * TEST NUMBER IN EASY MODE
         */
        if (this.mode === "easy") {

            return test;
        
        /**
         * TEST NUMBER IN RICH MODE
         */
        } else {

            if (!test) return {
                result: false,
                failure: "NONUMMATCH",
                description: failures["NONUMMATCH"]
            } as strVal.ValRichResults;

            return { result: true } as strVal.ValRichResults;

        }

    }

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
    public str(string:string, lengthOpts?:strVal.RangeOptions|null, type?:strVal.StrValTypes):boolean|strVal.StrValRichResults|void {

        if (typeof string !== "string") this.throwError("000", typeof string);

        /**
         * --------------
         * EASY MODE TEST
         * --------------
         */
        if (this.mode === "easy") {

            // Check length of the string
            if (lengthOpts) {
                if (!this.testLength(string.length, lengthOpts) as boolean) return false;
            }

            // Test string
            if (type) {
                return this.testString(string, type) as boolean;
            }

            // Default return
            return true;

        /**
         * --------------
         * RICH MODE TEST
         * --------------
         */
        } else {

            // Default results values in rich mode
            let results = {} as strVal.StrValRichResults;

            results.string = string;
            results.length = string.length;
            if (lengthOpts) results.testLength = lengthOpts;
            if (type) results.test = type;

            // Check length of the string
            if (lengthOpts) {
                results = {...results, ...this.testLength(string.length, lengthOpts) as strVal.ValRichResults};
                if (!results.result) return this.removeUnwantedResults(results) as strVal.StrValRichResults;
            }

            // Test string
            if (type) {
                results = {...results, ...this.testString(string, type) as strVal.ValRichResults};
                return this.removeUnwantedResults(results) as strVal.StrValRichResults;
            }

            // Default return
            results.result = true;
            return this.removeUnwantedResults(results) as strVal.StrValRichResults;

        }

    }

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
    public num(number:number, rangeOpts?:strVal.RangeOptions|null, type?:strVal.NumValTypes):boolean|strVal.NumValRichResults|void {

        if (typeof number !== "number") this.throwError("001", typeof number);
        
        /**
         * --------------
         * EASY MODE TEST
         * --------------
         */
        if (this.mode === "easy") {

            // Check if number is inside specified range
            if (rangeOpts) {
                if (!this.testRange(number, rangeOpts) as boolean) return false;
            }

            // Test number type
            if (type) {
                return this.testNumber(number, type) as boolean;
            }

            // Default return
            return true;

        /**
         * --------------
         * RICH MODE TEST
         * --------------
         */
        } else {

            // Default results values in rich mode
            let results = {} as strVal.NumValRichResults;

            results.number = number;
            if (rangeOpts) results.testRange = rangeOpts;
            if (type) results.test = type;

            // Check if number is inside specified range
            if (rangeOpts) {
                results = {...results, ...this.testRange(number, rangeOpts) as strVal.ValRichResults};
                if (!results.result) return this.removeUnwantedResults(results) as strVal.NumValRichResults;
            }

            // Test number type
            if (type) {
                results = {...results, ...this.testNumber(number, type) as strVal.ValRichResults};
                return this.removeUnwantedResults(results) as strVal.NumValRichResults;
            }

            // Default return
            results.result = true;
            return this.removeUnwantedResults(results) as strVal.NumValRichResults;

        }

    }

}

export default Validator;