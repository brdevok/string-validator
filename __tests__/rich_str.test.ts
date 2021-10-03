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
            lang: "en",
            test: "any",
            subject: string,
            length: string.length,
            limits: { min: 0, max: 1000 },
            trim: false
        } as strVal.StrValRichResults);
        expect(okResult2).toStrictEqual({
            result: true,
            lang: "en",
            subject: string,
            length: string.length,
            trim: false
        } as strVal.StrValRichResults);
        expect(okResult3).toStrictEqual({
            result: true,
            lang: "en",
            subject: string,
            length: string.length,
            limits: { min: 20 },
            trim: false
        } as strVal.StrValRichResults);
        expect(wrongResult1).toStrictEqual({
            result: false,
            lang: "en",
            failure: "MAXLENGTH",
            description: failures["MAXLENGTH"],
            subject: string,
            length: string.length,
            limits: { max: 10 },
            trim: false
        } as strVal.StrValRichResults);
        expect(wrongResult2).toStrictEqual({
            result: false,
            lang: "en",
            failure: "NOSTRMATCH",
            description: failures["NOSTRMATCH"],
            subject: string,
            test: "email",
            length: string.length,
            limits: { min: 0 },
            trim: false
        } as strVal.StrValRichResults);
        expect(wrongResult3).toStrictEqual({
            result: false,
            lang: "en",
            failure: "MINLENGTH",
            description: failures["MINLENGTH"],
            subject: string,
            length: string.length,
            limits: { min: 1000 },
            trim: false
        } as strVal.StrValRichResults);


    });

});