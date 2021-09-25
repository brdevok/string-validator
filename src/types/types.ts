/**
 * Namespace for string validator types
 */
export declare namespace strVal {

    /**
     *  + ----------------------- +
     *  |  Validator class types  |
     *  + ----------------------- +
     * 
     *  1. Class properties
     *  2. Constructor arguments
     *  3. str() & num() arguments
     *  4. str() & nnum() results
     */ 

    /**
     *  1. CLASS PROPERTIES
     */

    /** Languages property of Validator class. */
    type Lang = "en"|"es"|"br"|"fr"|"de"

    /** Instance mode property of Validator class. */
    type Mode = "easy"|"rich"

    /** Rich results settings for string validator instance. */
    interface RichResults {
        [key: string]: any
        failure?: boolean
        description?: boolean
        subject?: boolean
        test?: boolean
        length?: boolean
        limits?: boolean
    }

    /** String regexp tests property of Validator class. */
    interface StrTestTypes {
        [key: string]: RegExp
        any: RegExp
        abc: RegExp
        text: RegExp
        num: RegExp
        field: RegExp
        email: RegExp
        mix: RegExp
        float: RegExp
        password: RegExp
        lowpassword: RegExp
        url: RegExp
        http: RegExp
        https: RegExp
        base64: RegExp
        binary: RegExp
    }

    /** Number tests property of Validator class. */
    interface NumTestTypes {
        [key: string]: (n:number) => boolean
        int: (n:number) => boolean
        float: (n:number) => boolean
    }

    /**
     *   2. CONSTRUCTOR ARGUMENTS
     */

    /** Settings object for instance a new Validator class. */
    interface ConfigSettings {
        mode?: Mode
        lang?: Lang
        results?: RichResults
    }

    /**
     *  3. src() & num() ARGUMENTS
     */

    /** Range options. */
    interface LimitsOptions {
        min?: number
        max?: number
    }

    /** String test types. */
    type StrValTypes = "any"|"abc"|"text"|"num"|"field"|"email"|"mix"|"float"|"password"

    /** Number test types. */
    type NumValTypes = "int"|"float"

    /**
     *  4. src() & num() RESULTS
     */

    /** Results from test string/number length/range and types. */
    interface ValRichResults {
        result: boolean
        failure?: string
        description?: string
    }
    
    /** Results for str() method */
    interface StrValRichResults extends ValRichResults {
        [key: string]: any
        subject: string
        test?: string
        length: number
        limits?: LimitsOptions
    }

    /** Results for num() method */
    interface NumValRichResults extends ValRichResults {
        [key: string]: any
        subject: number
        test?: string
        limits?: LimitsOptions
    }

}