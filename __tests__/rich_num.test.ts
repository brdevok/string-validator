import { strVal } from "../src/types/types";
import Validator from "../src/Validator/Validator";
import failures from "../src/Validator/failures";

describe("Validator.num() tests in rich mode", () => {

    const easyVal = new Validator({mode: "rich"});

    test("Test num() possible values in rich mode", () => {

        const number1 = 10;
        const number2 = 0.99;

        const okResult1 = easyVal.num(number1, { min: 0, max: 1000 }, "int");
        const okResult2 = easyVal.num(number2, null, "float");
        const okResult3 = easyVal.num(number1);
        const okResult4 = easyVal.num(number2);
        const wrongResult1 = easyVal.num(number1, null, "float");
        const wrongResult2 = easyVal.num(number2, null, "int");
        const wrongResult3 = easyVal.num(number1, { min: -10, max: 0 });
        const wrongResult4 = easyVal.num(number2, { min: 1 });

        expect(okResult1).toStrictEqual({
            result: true,
            test: "int",
            number: number1,
            testRange: { min: 0, max: 1000 }
        } as strVal.NumValRichResults);
        expect(okResult2).toStrictEqual({
            result: true,
            number: number2,
            test: "float"
        } as strVal.NumValRichResults);
        expect(okResult3).toStrictEqual({
            result: true,
            number: number1,
        } as strVal.NumValRichResults);
        expect(okResult4).toStrictEqual({
            result: true,
            number: number2,
        } as strVal.NumValRichResults);
        expect(wrongResult1).toStrictEqual({
            result: false,
            failure: "NONUMMATCH",
            description: failures["NONUMMATCH"],
            number: number1,
            test: "float"
        } as strVal.NumValRichResults);
        expect(wrongResult2).toStrictEqual({
            result: false,
            failure: "NONUMMATCH",
            description: failures["NONUMMATCH"],
            number: number2,
            test: "int"
        } as strVal.NumValRichResults);
        expect(wrongResult3).toStrictEqual({
            result: false,
            failure: "MAXRANGE",
            description: failures["MAXRANGE"],
            number: number1,
            testRange: { min: -10, max: 0}
        } as strVal.NumValRichResults);
        expect(wrongResult4).toStrictEqual({
            result: false,
            failure: "MINRANGE",
            description: failures["MINRANGE"],
            number: number2,
            testRange: { min: 1}
        } as strVal.NumValRichResults);


    });

})