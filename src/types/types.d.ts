
export namespace strVal {

    interface ConfigOptions {
        mode: Mode
    }

    type Mode = "easy"|"rich"
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
    }

    type StrValTypes = "any"|"abc"|"text"|"num"|"field"|"email"|"mix"|"float"|"password"
    type NumValTypes = "int"|"float"

    interface RangeOptions {
        min?: number
        max?: number
    }

    /*
     * + ------------- +
     * | TESTS RESULTS |
     * + ------------- +
    */

    interface ValRichResults {
        result: boolean
        failure?: string
        description?: string
    }

    interface StringValRichResults extends ValRichResults {
        string: string
    }

    interface NumberValRishResults extends ValRichResults {
        number: number
    }

    interface LengthValRichResults extends ValRichResults {
        length: number
        testLength?: RangeOptions
    }

    interface RangeValRichResults extends ValRichResults {
        testRange?: RangeOptions
    }
    
    interface StrValRichResults extends StringValRichResults, LengthValRichResults {
        test?: string
    }

    interface NumValRichResults extends NumberValRishResults, RangeValRichResults {
        test?: string
    }

}