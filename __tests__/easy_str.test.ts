import Validator from "../src/Validator/Validator";

const testLengthSpy = jest.spyOn(Validator.prototype as any, "testLength");
const testStringSpy = jest.spyOn(Validator.prototype as any, "testString");

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
        expect(easyVal.str(string, lenOpts12)).toBe(false);
        expect(() => easyVal.str(string, lenOpts8)).toThrow();
        expect(() => easyVal.str(string, lenOpts9 as never)).toThrow();
        expect(() => easyVal.str(string, lenOpts10 as never)).toThrow();
        expect(() => easyVal.str(string, lenOpts11 as never)).toThrow();

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