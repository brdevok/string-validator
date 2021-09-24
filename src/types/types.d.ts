
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
    interface NumTestTypes {
        [key: string]: (n:number) => boolean
        int: (n:number) => boolean
        float: (n:number) => boolean
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
    
    interface StrValRichResults extends ValRichResults {
        string: string
        test?: string
        length: number
        testLength?: RangeOptions
    }

    interface NumValRichResults extends ValRichResults {
        number: number
        test?: string
        testRange?: RangeOptions
    }

}