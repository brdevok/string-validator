import Validator from "../src/Validator/Validator";

const testRangeSpy = jest.spyOn(Validator.prototype as any, "testRange");
const testNumberSpy = jest.spyOn(Validator.prototype as any, "testNumber");

describe("Validator.num() tests in easy mode", () => {

    const easyVal = new Validator({mode: "easy"});

    test("Test num() method generic use and inner calls", () => {

        const number = 100;
        const range = { min: 0, max: 1000 };
        const type = "int";

        expect(easyVal.num(number, range, type)).toBe(true);
        expect(testRangeSpy).toHaveBeenCalled();
        expect(testNumberSpy).toHaveBeenCalled();

    });

    test("Test num() with no range options and match type", () => {

        const number = 100;

        expect(easyVal.num(number)).toBe(true);
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
        expect(easyVal.num(number1, rangeOpts9)).toBe(false);
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