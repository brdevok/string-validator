import { strVal } from "../types/types";
import Validator from "./Validator";
import failures from "./failures";

const throwErrorSpy = jest.spyOn(Validator.prototype as any, "throwError");
const testLengthSpy = jest.spyOn(Validator.prototype as any, "testLength");
const testStringSpy = jest.spyOn(Validator.prototype as any, "testString");
const testRangeSpy = jest.spyOn(Validator.prototype as any, "testRange");
const testNumberSpy = jest.spyOn(Validator.prototype as any, "testNumber");

describe("Validator.str() tests in easy mode", () => {

    const easyVal = new Validator({mode: "easy"});

    test("Test str() method generic use and inner calls", () => {

        const string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas euismod dui bibendum, iaculis turpis nec, facilisis libero.";
        const length = { min: 0, max: 1000 };
        const type = "any";

        expect(easyVal.str(string, length, type)).toBe(true);
        expect(testLengthSpy).toHaveBeenCalled();
        expect(testStringSpy).toHaveBeenCalled();

    });

    test("Test str() with no length options and match type", () => {

        const string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas euismod dui bibendum, iaculis turpis nec, facilisis libero.";

        expect(easyVal.str(string)).toBe(true);
        expect(testLengthSpy).not.toHaveBeenCalled();
        expect(testStringSpy).not.toHaveBeenCalled();

    });

    test("Test str() with multiple length options config", () => {

        const string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas euismod dui bibendum, iaculis turpis nec, facilisis libero.";

        const lenOpts1 = { min: 0, max: Number.MAX_SAFE_INTEGER };
        const lenOpts2 = { min: 20 };
        const lenOpts3 = { min: 125, max: 125 }; // Exact test string length
        const lenOpts4 = { max: 1000 };
        const lenOpts5 = { min: 0, max: 10 };
        const lenOpts6 = { min: 1000 };
        const lenOpts7 = { max: 1 };
        const lenOpts8 = { min: 100, max: 1 };
        const lenOpts9 = { min: "20", max: "40" };
        const lenOpts10 = { min: 20, max: "40" };
        const lenOpts11 = { min: true, max: false };
        const lenOpts12 = { min: -5, max: -1 };

        expect(easyVal.str(string, lenOpts1)).toBe(true);
        expect(easyVal.str(string, lenOpts2)).toBe(true);
        expect(easyVal.str(string, lenOpts3)).toBe(true);
        expect(easyVal.str(string, lenOpts4)).toBe(true);
        expect(easyVal.str(string, lenOpts5)).toBe(false);
        expect(easyVal.str(string, lenOpts6)).toBe(false);
        expect(easyVal.str(string, lenOpts7)).toBe(false);
        expect(() => easyVal.str(string, lenOpts8)).toThrow();
        expect(() => easyVal.str(string, lenOpts9 as never)).toThrow();
        expect(() => easyVal.str(string, lenOpts10 as never)).toThrow();
        expect(() => easyVal.str(string, lenOpts11 as never)).toThrow();
        expect(() => easyVal.str(string, lenOpts12 as never)).toThrow();

    });

    test("Test src() with all string test types", () => {

        const okStrAny = "aZ4 !\"#$%&'()*+,-.\\/:;<=>?@[]^_`{|}~";
        const okStrAbc = "abcABC";
        const okStrText = "Lorem-ipsum? , dolor: \"sit-amet\"!. Consectetur; 'adipiscing elit'."
        const okStrNum = "0123456789";
        const okStrField = "A Sample Name";
        const okStrEmail = "a-sample.1924@email.com.ok";
        const okStrMix = "T3xt-W1th-Numb3r5, 4nd (ch4r4ct3r5+).";
        const okStrFloat = "123.456";
        const okStrPassword = "#@w350m3_P@SSword!";

        expect(easyVal.str(okStrAny, null, "any")).toBe(true);
        expect(easyVal.str(okStrAbc, null, "abc")).toBe(true);
        expect(easyVal.str(okStrText, null, "text")).toBe(true);
        expect(easyVal.str(okStrNum, null, "num")).toBe(true);
        expect(easyVal.str(okStrField, null, "field")).toBe(true);
        expect(easyVal.str(okStrEmail, null, "email")).toBe(true);
        expect(easyVal.str(okStrMix, null, "mix")).toBe(true);
        expect(easyVal.str(okStrFloat, null, "float")).toBe(true);
        expect(easyVal.str(okStrPassword, null, "password")).toBe(true);

    });

    test("Test src() with all string test types passing wrong strings (must fail)", () => {

        // const wrongStrAny = ""; // "any" test type will always return true no matter the string content.
        const wrongStrAbc = "123";
        const wrongStrText = "numb3rs?"
        const wrongStrNum = "letters";
        const wrongStrField = "*special* characters not allowed";
        const wrongStrEmail = "a-sample-@nd-awesome@email.that.shall.not.pass";
        const wrongStrMix = "is this a quiestion???";
        const wrongStrFloat = "123";
        const wrongStrPassword = "pass123";

        // expect(easyVal.str(wrongStrAny, null, "any")).toBe(true);
        expect(easyVal.str(wrongStrAbc, null, "abc")).toBe(false);
        expect(easyVal.str(wrongStrText, null, "text")).toBe(false);
        expect(easyVal.str(wrongStrNum, null, "num")).toBe(false);
        expect(easyVal.str(wrongStrField, null, "field")).toBe(false);
        expect(easyVal.str(wrongStrEmail, null, "email")).toBe(false);
        expect(easyVal.str(wrongStrMix, null, "mix")).toBe(false);
        expect(easyVal.str(wrongStrFloat, null, "float")).toBe(false);
        expect(easyVal.str(wrongStrPassword, null, "password")).toBe(false);

    });

});

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

describe.skip("Validator.num() tests in easy mode", () => {

    test("Test num() method generic use and inner calls", () => {

        const number = 100;
        const range = { min: 0, max: 1000 };
        const type = "int";

        expect(easyVal.num(number, range, type)).toBe(true);
        expect(_numEasyModeSpy).toHaveBeenCalled();
        expect(testRangeSpy).toHaveBeenCalled();
        expect(testNumberSpy).toHaveBeenCalled();

    });

    test("Test num() with no range options and match type", () => {

        const number = 100;

        expect(easyVal.num(number)).toBe(true);
        expect(_numEasyModeSpy).toHaveBeenCalled();
        expect(testRangeSpy).not.toHaveBeenCalled();
        expect(testNumberSpy).not.toHaveBeenCalled();

    });

    test("Test num() with multiple range options config", () => {

        const number1 = 100;
        const number2 = -100;

        const rangeOpts1 = { min: 0, max: Number.MAX_SAFE_INTEGER };
        const rangeOpts2 = { min: -200, max: -1 }
        const rangeOpts3 = { min: 10 };
        const rangeOpts4 = { min: 100, max: 100 }; // Exact number value
        const rangeOpts5 = { max: 1000 };
        const rangeOpts6 = { min: 0, max: 10 };
        const rangeOpts7 = { min: 1000 };
        const rangeOpts8 = { max: 1 };
        const rangeOpts9 = { min: 100, max: 1 };
        const rangeOpts10 = { min: "20", max: "40" };
        const rangeOpts11 = { min: 20, max: "40" };
        const rangeOpts12 = { min: true, max: false };

        expect(easyVal.num(number1, rangeOpts1)).toBe(true);
        expect(easyVal.num(number2, rangeOpts2)).toBe(true);
        expect(easyVal.num(number1, rangeOpts3)).toBe(true);
        expect(easyVal.num(number1, rangeOpts4)).toBe(true);
        expect(easyVal.num(number1, rangeOpts5)).toBe(true);
        expect(easyVal.num(number1, rangeOpts6)).toBe(false);
        expect(easyVal.num(number1, rangeOpts7)).toBe(false);
        expect(easyVal.num(number1, rangeOpts8)).toBe(false);
        expect(() => easyVal.num(number1, rangeOpts9)).toThrow();
        expect(() => easyVal.num(number1, rangeOpts10 as never)).toThrow();
        expect(() => easyVal.num(number1, rangeOpts11 as never)).toThrow();
        expect(() => easyVal.num(number1, rangeOpts12 as never)).toThrow();

    });

    test("Test num() with all test types", () => {

        const integer = 10;
        const float = 1.456;

        expect(easyVal.num(integer, null, "int")).toBe(true);
        expect(easyVal.num(float, null, "float")).toBe(true);
        expect(easyVal.num(float, null, "int")).toBe(false);
        expect(easyVal.num(integer, null, "float")).toBe(false);

    });

});