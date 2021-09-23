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
    }

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
            case "201": throw new Error(`Test type '${arg}' is not a valid key.`);
            // Settings errors
            case "300": throw new Error(`Wrong instance, '${arg}' is not a valid mode.`);

            default: throw new Error(`Error code '${code}' doesn't exist.`) // Debug purposes only

        }

    }

    /** Test the validating string length. */
    private testLength(length:number, lengthOpts:strVal.RangeOptions):boolean|strVal.LengthValRichResults {

        if ((lengthOpts.min && typeof lengthOpts.min !== "number") || (lengthOpts.max && typeof lengthOpts.max !== "number")) this.throwError("002");
        if ((lengthOpts.min && lengthOpts.max) && lengthOpts.min > lengthOpts.max) this.throwError("100");
        if ((lengthOpts.min && lengthOpts.min < 0) || (lengthOpts.max && lengthOpts.max < 0)) this.throwError("102");

        /**
         * CHECK LENGTH IN EASY MODE
         */
        if (this.mode === "easy") {

            if (lengthOpts.min && length < lengthOpts.min) return false;
            if (lengthOpts.max && length > lengthOpts.max) return false;

            return true;

        /**
         * CHECK LENGTH IN RICH MODE
         */
        } else {

            if (lengthOpts.min && length < lengthOpts.min) return {
                result: false,
                failure: "MINLENGTH",
                description: failures["MINLENGTH"]
            } as strVal.LengthValRichResults
            if (lengthOpts.max && length > lengthOpts.max) return {
                result: false,
                failure: "MAXLENGTH",
                description: failures["MAXLENGTH"]
            } as strVal.LengthValRichResults

            return { result: true } as strVal.LengthValRichResults;

        }

    }

    /** Test the value of the number with min and max limits if their are specified. */
    private testRange(number:number, rangeOpts:strVal.RangeOptions):boolean|strVal.RangeValRichResults {

        if ((rangeOpts.min && typeof rangeOpts.min !== "number") || (rangeOpts.max && typeof rangeOpts.max !== "number")) this.throwError("003");
        if ((rangeOpts.min && rangeOpts.max) && rangeOpts.min > rangeOpts.max) this.throwError("101");
    
        if (this.mode === "easy") {

            if (rangeOpts.min && number < rangeOpts.min) return false;
            if (rangeOpts.max && number > rangeOpts.max) return false;

            return true;

        }

        return false; // debug

    }

    /** Test the validating string. */
    private testString(string:string, type:string):boolean|strVal.StringValRichResults|void {
        
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
            } as strVal.StringValRichResults;

            return { result: true } as strVal.StringValRichResults;

        }

        

    }

    /** Test the number type */
    private testNumber(number:number, type:string):boolean|strVal.NumValRichResults|void {

        switch(type) {

            case "int": return number % 1 === 0;
            case "float": return number % 1 !== 0;

            default: this.throwError("201", type);

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
                if (!this.testLength(string.length, lengthOpts)) return false;
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

            if (type) results = {...results, test: type};
            if (lengthOpts) results = {...results, testLength: lengthOpts};

            // Check length of the string
            if (lengthOpts) {
                results = {...results, ...this.testLength(string.length, lengthOpts) as strVal.LengthValRichResults};
                if (!results.result) return results;
            }

            // Test string
            if (type) {
                results = {...results, ...this.testString(string, type) as strVal.StringValRichResults};
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


    }

}

export default Validator;