import { strVal } from "../types/types"

class Validator {

    /** Current mode of the validator instance. */
    private mode:strVal.Mode;

    /** RegExp collection to test strings. */
    private testRegExp:{[key: string]: RegExp} = {
        any: /^[\w\W]{0,}$/g,
    }

    /** Initialize a new instance of the validator with the config options. */
    constructor(options:strVal.ConfigOptions) {

        this.mode = options.mode ? options.mode : "easy";

    }

    /** Throw an error with a suitable message identified by a code ID, additional data can be provided. */
    private throwError(code:string, arg?:string):void {

        switch (code) {

            case "000": throw new Error(`Expected a string datatype to validate, instead received: '${arg}'`);
            case "002": throw new Error("Unexpected datatype on length options, expected all values to be a number.");
            case "100": throw new Error("Wrong length options configuration, 'min' value must be minor than 'max' value.");
            case "201": throw new Error(`Test type '${arg}' is not a valid key.`);

            default: throw new Error(`Error code '${code}' doesn't exist.`) // Debug purposes only

        }

    }

    /** Test the validating string length. */
    private testLength(length:number, lengthOpts:strVal.LengthOptions):boolean {

        if ((lengthOpts.min && typeof lengthOpts.min !== "number") || (lengthOpts.max && typeof lengthOpts.max !== "number")) this.throwError("002");
        if ((lengthOpts.min && lengthOpts.max) && lengthOpts.min > lengthOpts.max) this.throwError("100");

        if (this.mode == "easy") {

            if (lengthOpts.min && length < lengthOpts.min) return false;
            if (lengthOpts.max && length > lengthOpts.max) return false;

            return true;

        }

        return false; // debug

    }

    /** Test the validating string. */
    private testString(string:string, type:string):boolean|void {

        if (type in this.testRegExp) {

            return this.testRegExp[type].test(string);

        } else {

            this.throwError("201", type);

        }

    }

    /** Run a string validation in easy mode. */
    private _strEasyMode(string:string, lengthOpts?:strVal.LengthOptions, type?:strVal.ValTypes):boolean|void {
        
        if (lengthOpts) {

            if (!this.testLength(string.length, lengthOpts)) return false;

        }

        if (type) return this.testString(string, type);

        return true;

    }

    /** Test a string, the validation result depends on the mode that the validator is currently running. */
    public str(string:string, lengthOpts?:strVal.LengthOptions, type?:strVal.ValTypes):boolean|void {
        
        if (typeof string !== "string") this.throwError("000", typeof string);

        if (this.mode === "easy") return this._strEasyMode(string, lengthOpts, type);
        
        return true;

    }

}

export default Validator;