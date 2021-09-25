# String Validator Library

This little library written in Typescript was made to serve as a faster and reliable easy-to-use tool for strings validations that come **specially** from UI forms, but can be used to test any string type no matter the source.

## Index

 * [Installation](#installation)
 * [Quick usage](#quick-usage)
 * [Properly explanation of use](#properly-explanation-of-use)
    * [Validation methods](#validation-methods)
    * [Test strings](#test-strings)
    * [Test string length](#test-length)
    * [Test numbers](#test-numbers)
    * [Test number range](#test-range)
    * [Results](#results)
 * [Settings](#settings)
    * [Modes](#modes)
    * [Languages](#languages)
    * [Prevent results](#prevent-results)
 * [Add custom tests](#add-custom-tests)

## Installation

Run the command `npm i --save-dev @brdev/string-validator` to include the library directly into your proyect.

## Quick usage

You can start using this library really quick in a few steps with minimal configuration.

1. First import it.
```javascript
import Validator from "@brdev/string-validator";
```

2. Then create a new instance of the Validator class with some settings.
```javascript
const validate = new Validator({
    mode: "easy", 
    lang: "en"
});
```

3. And finally run as many tests you want with the `str()` and `num()` methods.
```javascript
validate.str("this-is-a-valid@email.com", null, "email");   // true
validate.str("exactly20characters!", { min: 20, max: 20});  // true
validate.str("too short string", { min: 100 });             // false
validate.str("123", null, "abc");                           // false

validate.num(123, null, "int");                             // true
validate.num(0.99, null, "float");                          // true
validate.num(999, { min: 1000 });                           // false
validate.num(1, { max: 0.99 });                             // false
```

## Properly explanation of use

Now that you have a clear idea of what the validator does and how to use it, let's explain it a bit more deeper.

### Validation methods

You have two options to test anything, the `str()` and `num()` methods. Both of them accepts the same arguments with a minimal difference on the data-type they accept.

The arguments logic follow this simple pattern for both methods: `function(subject, limits, test) {...}`

 * `subject` is the `string` or `number` to test.
 * `limits` are the delimeter ranges that a `string` length or `number` value must have to return a success result.
 * `test` it the test type that the `subject` will face to return a success result.

#### `str()`:

Argument | Data-type | Values
--------- | --------- | -------
`subject` | `string` | Example: `"Lorem ipsum"`
`limits` | `object\|null` | `{min?: number, max?: number}` Example: `{min: 0, max:100}`
`test` | `string\|undefined` | `"any"\|"abc"\|"text"\|"num"\|"field"\|"email"\|"mix"\|"float"\|"password"`

#### `num()`:

Argument | Data-type | Values
--------- | --------- | -------
`subject` | `number` | Example: `123`
`limits` | `object\|null` | `{min?: number, max?: number}` Example: `{min: -100, max:100}`
`test` | `string\|undefined` | `"int"\|"float"`

### Test strings

You have a large set of tests to run for strings (and you can [add your owns](#add-custom-tests)), all of them are a collection of regular expressions wich match different situations that a string can represent. Let's see all of them.

Key | RegExp | Description
--- | ------ | ------------
`"any"` | `/^[\w\W]{0,}$/m` | Allow any character, no matter what is inside the string, it'll be ok
`"abc"` | `/^[a-zA-Z]{0,}$/m` | Allow strict alphabet characters only
`"text"` | `/^[a-zA-Z.,\-"'():;!? ]{0,}$/m` | Validates a simple text, like books paragraphs
`"num"` | `/^[0-9]{0,}$/m` | Allow scrict numerical characters only
`"field"` | `/^[a-zA-Z ]{0,}$/m` | Validates a single input, like a name from a form input
`"email"` | `/^[^@]+@[a-zA-Z0-9\-]+(\.[a-zA-Z]+){1,3}$/m` | Validates an email-like string
`"mix"` | `/^[a-zA-Z0-9 ,.\-()+]{0,}$/m` | Allow the use of letters and numbers and some special characters, can be used for addresses.
`"float"` | `/^[0-9]+\.[0-9]+$/m` | Checks if the string is in a float-like format
`"password"` | :eyes: | Checks if a string contains at least 1 minuscule, 1 minuscule, 1 number and 1 special character

By default, no match test is ran if you don't specify one.

Examples:
```javascript
// "easy" mode ON

const good = validate.str("#Str0nGP@55worD!", null, "password");
const bad = validate.str("pass123", null, "password");

console.log(good) // true
console.log(bad)  // false
```

Examples:
```javascript
// "rich" mode ON

const good = validate.str("#Str0nGP@55worD!", null, "password");
const bad = validate.str("pass123", null, "password");

console.log(good) /* {
    result: true,
    subject: "#Str0nGP@55worD!",
    length: 16,
    test: "password"
} */
console.log(bad) /* {
    result: false,
    subject: "#Str0nGP@55worD!",
    length: 16,
    test: "password",
    failure: "NOSTRMATCH",
    description: "String doesn't match with the specified test type."
} */
```

## Settings

To start using the validator you must create a new instance of the `Validator` class, the constructor accepts one argument called `settings` where you can define the behavior of the validator.

By default the validator has three properties that can be managed in `settings` with an object with the following keys: `mode`, `lang`, `results`.

 * `mode` is how the results of the validations should return.
 * `lang` adds support for different languages when testing strings.
 * `results`, when `mode` is set to `"rich"` you can choose wich data won't be returned from the validations.

Example:
```javascript
const validate = Validator({
    mode: "rich",
    lang: "es",
    results: {
        failure: true,
        description: true,
        subject: true,
        test: true,
        length: true,
        limits: true,
    }
});
```

Argument | Data-type | Value
-------- | --------- | -----
`mode` | `string` | `"easy"\|"rich"`
`lang` | `string` | `"en"\|"es"\|"br"\|"fr"\|"de"`
`results` | `object` | Example: `{string: false, length: false}`

### Modes

You have two modes to choose when creating a new instance of `Validator`, the `"easy"` or `"rich"` modes, both will change the format of the results that the validation methods return.

In the `"easy"` format, the validation methods return `booleans`, `true` for success, `false` for failure. There is no extra information about the test, no matter the result, i.e:
```javascript
// Test "string" against numerical-only string test in "easy" mode.

validate.str("string", null, "num");

// Return: false
```

While in the `"rich"` mode, additional data will be displayed, like test type, length, limits, the string. In case of failure, it will announce the error and description, i.e:
```javascript
// Do the same test as above in "rich" mode.

validate.str("string", null, "num");

/* 
Return: {
    result: false,
    failure: "NOSTRMATCH",
    description: "String doesn't match with the specified test type.",
    subject: "string",
    length: 6,
    test: "num"
}; 
*/
```

The `"easy"` mode is set by default in case you don't specify it. 

### Languages

When testing strings you main need support for specific characters and accents that doesn't exist on english orthography, for that reason the `lang` setting can be setted with a language shorthand to add support for those elusive characters.

By default, every instance is created with `"en"` (english) support.

Language | Shorthand | Extra valid characters
-------- | --------- | ----------------------
English | `"en"` | `none`
Spanish | `"es"` | `áéíóúÁÉÍÓÚñÑüÜ`
Portuguese | `"br"` | `áàãâéêóôõüçÁÀÃÂÉÊÓÔÕÜÇ`
French | `"fr"` | `àáâéèêëîïôûÿçÀÁÂÉÈÊËÎÏÔÛÇ`
German | `"de"` | `äöüßÄÖÜẞ`

### Prevent results

If validator is running in `"rich"` mode, every validation will return an object with rich information about the result. In some cases you may not want some of the default data values that the object contains, so you can pass an object to `results` setting with the result data key name you don't want to see and `false` as the value, i.e:
```javascript
// Prevent return the subject and failure description

const validate = new Validator({
    results: {
        subject: false,
        description: false
    }
})
```

Key | Value | Default | Description
--- | ----- | ------- | -----------
`failure` | `boolean` | `true` | Return the failure error code, i.e: `"NOSTRMATCH"`
`description` | `boolean` | `true` | Return the description of the failure, i.e: `"Number value is less than the minumum required value."`
`subject` | `boolean` | `true` | Return the test subject, i.e: `"Lorem ipsum"`
`test` | `boolean` | `true` | Return the test type, i.e: `"email"`
`length` | `boolean` | `true` | Return the length of a string subject, i.e: `20`
`limits` | `boolean` | `true` | Return the limits if setted, i.e: `{min: 0, max: 100}`





