import Validator from "../src/Validator/Validator";

describe("Test Validator languages settings", () => {

    const enVal = new Validator({lang: "en"}); // Default
    const esVal = new Validator({lang: "es"});
    const brVal = new Validator({lang: "br"});
    const frVal = new Validator({lang: "fr"});
    const deVal = new Validator({lang: "de"});

    test("Test spanish", () => {

        const string = "Tú asumes que es un puñado de gente tomada al azar quienes estaban en forma física en la presentación";

        expect(esVal.str(string, null, "field")).toBe(true);
        expect(enVal.str(string, null, "field")).toBe(false);

    });

    test("Test portuguese", () => {

        const string = "Isso não está relacionado com o uso de Questões Aleatórias mas sim à ordem de visualização das questões na tela";

        expect(brVal.str(string, null, "field")).toBe(true);
        expect(enVal.str(string, null, "field")).toBe(false);
        expect(esVal.str(string, null, "field")).toBe(false);

    });

    test("Test french", () => {

        const string = "Reste à savoir si cette expression aléatoire des gènes est un bruit de fond ou un paramètre biologique";

        expect(frVal.str(string, null, "field")).toBe(true);
        expect(enVal.str(string, null, "field")).toBe(false);
        expect(esVal.str(string, null, "field")).toBe(false);

    });

    test("Test german", () => {

        const string = "Die Zufallsstichprobe wird gemäß der Methode der ganzzahligen Zufallszahlen gebildet";

        expect(deVal.str(string, null, "field")).toBe(true);
        expect(enVal.str(string, null, "field")).toBe(false);
        expect(esVal.str(string, null, "field")).toBe(false);

    });

});