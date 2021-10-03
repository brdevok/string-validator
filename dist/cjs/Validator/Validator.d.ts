import { strVal } from "../types/types";
/**
 * Core validator class, contains all the testing methods for strings and numbers
 * and must be initialized as an new instance.
 */
declare class Validator {
    /** Language setting for RegExp tests */
    private lang;
    /** Current mode of the validator instance. */
    private mode;
    /** Remove white spaces at the beginning and the end of the string */
    private trim;
    /** RegExp collection to test strings. */
    private testRegExp;
    /** Collection of methods to validate different number types */
    private numberTests;
    /** Manage the "rich" mode results data to display on each validation */
    private richResults;
    /**
     * Create a new instance of the validator class, a set of settings can be passed as an object
     * argument to define the mode and other general settings.
     * By default the validator runs in "easy" mode that only return booleans as a validation result,
     * the "rich" mode returns an object with additional data of the validation process.
     */
    constructor(settings?: strVal.ConfigSettings);
    /**
     * Add a new test type for strings, you can make use of the added tests
     * with the main validator string function passing the defined key name as a test type argument.
     */
    addStrTest(key: string, regexp: RegExp | string): void;
    private removeUnwantedResults;
    /**
     * Throw an error if something in the validation process does not meet the requirements to work
     * properly.
     * The error displayed depends on the error code passed ass an argument.
     */
    private throwError;
    /**
     * Run a string length test, this function is called when the length range options are passed to the
     * main validator function and return a boolean if mode is equal to "easy" or an object with the
     * test results data if it's on "rich".
     */
    private testLength;
    /**
     * Run a number range test, this function is called when the range options are passed to the
     * main validator function and return a boolean if mode is equal to "easy" or an object with the
     * test results data if it's on "rich".
     */
    private testRange;
    /**
     * Test a string against a regular expression defined by the test type argument.
     * If the validator is running on "easy" mode, this will return a single boolean,
     * a rich object with the results data will be returned instead if mode is "rich".
     */
    private testString;
    /**
     * Test a number with some math expressions to define the current number type if test type has
     * been passed to the core validator function.
     * If the validator is running on "easy" mode, this will return a single boolean,
     * a rich object with the results data will be returned instead if mode is "rich".
     */
    private testNumber;
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
    str(subject: string, limits?: strVal.LimitsOptions | null, test?: strVal.StrValTypes): boolean | strVal.StrValRichResults;
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
    num(subject: number, limits?: strVal.LimitsOptions | null, test?: strVal.NumValTypes): boolean | strVal.NumValRichResults;
}
export default Validator;
