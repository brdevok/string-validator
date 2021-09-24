import { strVal } from "../src/types/types";
import Validator from "../src/Validator/Validator";
import failures from "../src/Validator/failures";

describe("Validator.str() tests in rich mode", () => {

    const easyVal = new Validator({mode: "rich"});

    test("Test str() possible values in rich mode", () => {

        const string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas euismod dui bibendum, iaculis turpis nec, facilisis libero.";

        const okResult1 = easyVal.str(string, { min: 0, max: 1000 }, "any");
        const okResult2 = easyVal.str(string);
        const okResult3 = easyVal.str(string, {min: 20});
        const wrongResult1 = easyVal.str(string, {max: 10});
        const wrongResult2 = easyVal.str(string, {min: 0}, "email");
        const wrongResult3 = easyVal.str(string, {min: 1000});

        expect(okResult1).toStrictEqual({
            result: true,
            test: "any",
            string: string,
            length: string.length,
            testLength: { min: 0, max: 1000 }
        } as strVal.StrValRichResults);
        expect(okResult2).toStrictEqual({
            result: true,
            string: string,
            length: string.length
        } as strVal.StrValRichResults);
        expect(okResult3).toStrictEqual({
            result: true,
            string: string,
            length: string.length,
            testLength: { min: 20 }
        } as strVal.StrValRichResults);
        expect(wrongResult1).toStrictEqual({
            result: false,
            failure: "MAXLENGTH",
            description: failures["MAXLENGTH"],
            string: string,
            length: string.length,
            testLength: { max: 10 }
        } as strVal.StrValRichResults);
        expect(wrongResult2).toStrictEqual({
            result: false,
            failure: "NOSTRMATCH",
            description: failures["NOSTRMATCH"],
            string: string,
            test: "email",
            length: string.length,
            testLength: { min: 0 }
        } as strVal.StrValRichResults);
        expect(wrongResult3).toStrictEqual({
            result: false,
            failure: "MINLENGTH",
            description: failures["MINLENGTH"],
            string: string,
            length: string.length,
            testLength: { min: 1000 }
        } as strVal.StrValRichResults);


    });

});