
export namespace strVal {

    interface ConfigOptions {
        mode: Mode
    }

    type Mode = "easy"|"complete"

    type ValTypes = "any"|"abc"|"text"|"num"

    interface LengthOptions {
        min?: number
        max?: number
    }

}