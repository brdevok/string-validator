import { strVal } from "../types/types";
import failures from "./failures";

class Validator {

    /** Current mode of the validator instance. */
    private mode:strVal.Mode;

    /** RegExp collection to test strings. */
    private testRegExp:strVal.StrTestTypes = {
        any: /^[\w\W]{0,}$/m,
        abc: /^[a-zA-Z]{0,}$/m,
        text: /^[a-zA-Z.,\-"':;¡!¿? ]{0,}$/m,
        num: /^[0-9]{0,}$/m,
        field: /^[a-zA-Z ]{0,}$/m,
        email: /^[^@]+@[a-zA-Z0-9\-]+(\.[a-zA-Z]+){1,3}$/m,
        mix: /^[a-zA-Z0-9 ,.\-()+]{0,}$/m,
        float: /^[0-9]+\.[0-9]+$/m,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ ¡!"#$%&'()*+,\-.\\/:;<=>¿?@[\]^_`{|}~]).*$/m
    };

    /** Collection of methods to validate different number types */
    private numberTests:strVal.NumTestTypes = {
        int: (n:number) => n % 1 === 0,
        float: (n:number) => n % 1 !== 0
    };

    /** Initialize a new instance of the validator with the config options. */
    constructor(options:strVal.ConfigOptions) {
        
        if (options.mode && (options.mode !== "easy" && options.mode !== "rich")) this.throwError("300", options.mode);

        this.mode = options.mode ? options.mode : "easy";

    }

    /** Throw an error with a suitable message identified by a code ID, additional data can be provided. */
    private throwError(code:string, arg?:string):void {

        switch (code) {

            // Datatypes errors
            case "000": throw new Error(`Expected a string datatype to validate, instead received: '${arg}'`);
            case "001": throw new Error(`Expected a number datatype to validate, instead received: '${arg}'`);
            case "002": throw new Error("Unexpected datatype on length options, expected all values to be a number.");
            case "003": throw new Error("Unexpected datatype on range options, expected all values to be a number.");
            // Range errors
            case "100": throw new Error("Wrong length options configuration, 'min' value must be minor than or equal to 'max' value.");
            case "101": throw new Error("Wrong range options configuration, 'min' value must be minor than or equal to 'max' value.");
            case "102": throw new Error("Wrong length options configuration, 'min' and 'max' must be positive integers.");
            // Test types errors
            case "201": throw new Error(`Test type '${arg}' is not a valid string test key.`);
            case "202": throw new Error(`Test type '${arg}' is not a valid number test key.`);
            // Settings errors
            case "300": throw new Error(`Wrong instance, '${arg}' is not a valid mode.`);

            default: throw new Error(`Error code '${code}' doesn't exist.`) // Debug purposes only

        }

    }

    /** Test the validating string length. */
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

    /** Test the value of the number with min and max limits if their are specified. */
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

    /** Test the validating string. */
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

    /** Test the number type */
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

    /** Test a string, the validation result depends on the mode that the validator is currently running. */
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
            let results = {
                string: string,
                length: string.length
            } as strVal.StrValRichResults;

            if (lengthOpts) results = {...results, testLength: lengthOpts};
            if (type) results = {...results, test: type};

            // Check length of the string
            if (lengthOpts) {
                results = {...results, ...this.testLength(string.length, lengthOpts) as strVal.ValRichResults};
                if (!results.result) return results;
            }

            // Test string
            if (type) {
                results = {...results, ...this.testString(string, type) as strVal.ValRichResults};
                return results;
            }

            // Default return
            results = {...results, result: true};
            return results;

        }

    }

    /** Test a number, the validation result depends on the mode that the validator is currently running. */
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
            let results = {
                number: number
            } as strVal.NumValRichResults;

            if (rangeOpts) results = {...results, testRange: rangeOpts};
            if (type) results = {...results, test: type};

            // Check if number is inside specified range
            if (rangeOpts) {
                results = {...results, ...this.testRange(number, rangeOpts) as strVal.ValRichResults};
                if (!results.result) return results;
            }

            // Test number type
            if (type) {
                results = {...results, ...this.testNumber(number, type) as strVal.ValRichResults};
                return results;
            }

            // Default return
            results = {...results, result: true};
            return results;

        }


    }

}

export default Validator;