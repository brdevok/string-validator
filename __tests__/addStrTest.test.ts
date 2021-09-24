import { strVal } from "../src/types/types";
import Validator from "../src/Validator/Validator";

describe("Test the addStrTest() function", () => {

    const validate = new Validator();

    test("Test adding new validation types", () => {

        expect(validate.addStrTest("strict-abc", /^abc$/m)).toBeUndefined();
        expect(validate.addStrTest("strict-123", "^123$")).toBeUndefined();

        expect(validate.str("abc", null, "strict-abc" as strVal.StrValTypes)).toBe(true);
        expect(validate.str("cba", null, "strict-abc" as strVal.StrValTypes)).toBe(false);

        expect(validate.str("123", null, "strict-123" as strVal.StrValTypes)).toBe(true);
        expect(validate.str("321", null, "strict-123" as strVal.StrValTypes)).toBe(false);

        expect(validate.str("abc", null, "abc")).toBe(true);
        expect(validate.str("cba", null, "email")).toBe(false);

        expect(() => validate.addStrTest("bad-value1", 123 as never)).toThrow();
        expect(() => validate.addStrTest("bad-value2", null as never)).toThrow();
        expect(() => validate.addStrTest("bad-value3", false as never)).toThrow();
        expect(() => validate.addStrTest("@badkey", /^abc$/m)).toThrow();
        expect(() => validate.addStrTest("123badkey", /^abc$/m)).toThrow();
        expect(() => validate.addStrTest(124 as never, /^abc$/m)).toThrow();

    });

});