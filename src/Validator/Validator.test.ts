import { strVal } from "../types/types";
import Validator from "./Validator";

const easyVal = new Validator({mode: "easy"});

const throwErrorSpy = jest.spyOn(Validator.prototype as any, "throwError");
const testLengthSpy = jest.spyOn(Validator.prototype as any, "testLength");
const testStringSpy = jest.spyOn(Validator.prototype as any, "testString");
const _strEasyModeSpy = jest.spyOn(Validator.prototype as any, "_strEasyMode");

describe("Validator tests in easy mode", () => {

    /**
     * MAIN CLASS METHODS TESTS IN EASY MODE
     * -------------------------------------
     */
    test("Test str() method generic use and inner calls", () => {

        const string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas euismod dui bibendum, iaculis turpis nec, facilisis libero.";
        const length = { min: 0, max: 1000 };
        const type = "any";

        expect(easyVal.str(string, length, type)).toBe(true);
        expect(_strEasyModeSpy).toHaveBeenCalled();
        expect(testLengthSpy).toHaveBeenCalled();
        expect(testStringSpy).toHaveBeenCalled();

    });

    test("Test str() with no length options and match type", () => {

        const string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas euismod dui bibendum, iaculis turpis nec, facilisis libero.";

        expect(easyVal.str(string)).toBe(true);
        expect(_strEasyModeSpy).toHaveBeenCalled();
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

    });

});