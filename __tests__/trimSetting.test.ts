import { strVal } from "../src/types/types";
import Validator from "../src/Validator/Validator";

describe("Test validator trim settings", () => {

    test("Test if string is trimmed", () => {

        const validate = new Validator({
            mode: "rich",
            trim: true
        })

        const results = validate.str(" trimmed string ") as strVal.StrValRichResults;

        expect(results.subject).toBe("trimmed string");

    });

});