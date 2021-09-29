import { strVal } from "../src/types/types";
import Validator from "../src/Validator/Validator";

describe("Test the removeUnwantedResults()", () => {

    test("Test the removeUnwantedResults() private method with unwanted results settings", () => {

        /** Must prevent the "string" key-value pair in results object */
        const test1 = new Validator({
            mode: "rich",
            results: {
                subject: false,
                lang: false
            }
        });
        const removeUnwantedResultsSpy1 = jest.spyOn(test1 as any, "removeUnwantedResults");

        /** Must prevent the "number" key-value pair in results object */
        const test2 = new Validator({
            mode: "rich",
            results: {
                subject: false
            }
        });
        const removeUnwantedResultsSpy2 = jest.spyOn(test1 as any, "removeUnwantedResults");

        /** Must prevent the "failure" and "description" key-value pairs in results object */
        const test3 = new Validator({
            mode: "rich",
            results: {
                failure: false,
                description: false
            }
        });
        const removeUnwantedResultsSpy3 = jest.spyOn(test1 as any, "removeUnwantedResults");

        /** Must return only the "result" key-value pair in results object */
        const test4 = new Validator({
            mode: "rich",
            results: {
                failure: false,
                description: false,
                subject: false,
                test: false,
                length: false,
                limits: false,
                lang: false
            }
        });
        const removeUnwantedResultsSpy4 = jest.spyOn(test1 as any, "removeUnwantedResults");

        const string = "Lorem ipsum";
        const number = 100;

        expect(test1.str(string, null, "any")).toStrictEqual({
            result: true,
            test: "any",
            length: string.length
        } as strVal.StrValRichResults);
        expect(removeUnwantedResultsSpy1).toHaveBeenCalled();

        expect(test2.num(number, null, "int")).toStrictEqual({
            result: true,
            test: "int"
        } as strVal.StrValRichResults);
        expect(removeUnwantedResultsSpy2).toHaveBeenCalled();

        expect(test3.str(string, null, "num")).toStrictEqual({
            result: false,
            lang: "en",
            test: "num",
            subject: string,
            length: string.length
        } as strVal.StrValRichResults);
        expect(removeUnwantedResultsSpy3).toHaveBeenCalled();

        expect(test4.str(string, { min: 0, max: 1000 }, "email")).toStrictEqual({
            result: false,
        } as strVal.StrValRichResults);
        expect(removeUnwantedResultsSpy4).toHaveBeenCalled();

    })

});