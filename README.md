# String Validator Library :heavy_check_mark:

This little library written in Typescript was made to serve as a faster and reliable easy-to-use tool for strings validations that come **specially** from UI forms, but can be used to test any string type no matter the source.

## [Click me to check the demo!](https://braiandev.github.io/string-validator-demo/)

## Index

 * [Installation](#installation)
 * [Quick usage](#quick-usage)
 * [Properly explanation of use](#properly-explanation-of-use)
    * [Validation methods](#validation-methods)
    * [Test strings](#test-strings)
    * [Test numbers](#test-numbers)
    * [Test limits](#test-limits)
    * [Results](#results)
 * [Settings](#settings)
    * [Modes](#modes)
    * [Languages](#languages)
    * [Prevent results](#prevent-results)
 * [Add custom tests](#add-custom-tests)

## Installation

Run the command `npm i --save-dev @braiandev/string-validator` to include the library directly into your proyect.

## Quick usage

You can start using this library really quick in a few steps with minimal configuration.

1. First import it.
```javascript
import Validator from "@braiandev/string-validator";
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

#### `str(subject, limits, test)`:

Argument | Data-type | Values
--------- | --------- | -------
`subject` | `string` | Example: `"Lorem ipsum"`
`limits` | `object\|null` | `{min?: number, max?: number}` Example: `{min: 0, max:100}`
`test` | `string\|undefined` | `"any"\|"abc"\|"text"\|"num"\|"field"\|"email"\|"mix"\|"float"\|"password"`

#### `num(subject, limits, test)`:

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
`"password"` | :eyes: | Checks if a string contains at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character
`"lowpassword"` | `/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-z]).*$/m` | Same as `"password"` but special characters are not strict required
`"url"` | `/^(http(s)?):\/\/(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/m` | Detects if string has URL format
`"http"` | `^(http):\/\/(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/m` | Same as `"url"` but only accept HTTP URLs
`"https"` | `^(https):\/\/(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/m` | Same as `"url"` but only accept HTTPS URLs
`"base64"` | `/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/m` | Checks if string has base 64 format
`"binary"` | `/^[01]+$/m` | Check if string is numeric binary format, i.e: `"0100101"`

By default, no match test is ran if you don't specify one.

Examples:
```javascript
// "easy" mode ON

const good = validate.str("#Str0nGP@55worD!", null, "password");
const bad = validate.str("pass123", null, "password");

console.log(good) // true
console.log(bad)  // false
```

```javascript
// "rich" mode ON

const good = validate.str("#Str0nGP@55worD!", null, "password");
const bad = validate.str("pass123", null, "password");

console.log(good) /* {
    result: true,
    subject: "#Str0nGP@55worD!",
    lang: "en",
    length: 16,
    test: "password"
} */
console.log(bad) /* {
    result: false,
    subject: "#Str0nGP@55worD!",
    lang: "en",
    length: 16,
    test: "password",
    failure: "NOSTRMATCH",
    description: "String doesn't match with the specified test type."
} */
```

### Test numbers

The validator comes with some testing for numbers to, this is experimental and there's not much to show, but there we go.

You can test if a number is an int or a float with the `"int"` and `"float"` test types, see below:

```javascript
// "easy" mode ON

const isInteger = validate.num(10, null, "int");
const isFloat = validate.num(1.50, null, "float");

console.log(isInteger) // true
console.log(isFloat)   // true
```

### Test limits

You can check if a string length is between a set of limits that can define yourself in the `limits` argument object.

By default, there's no predefined limits, if you pass `null` o leave the argument empty, no length test will run.

Examples on easy mode:

 * Checks if a string is at least 20 characters long.
```javascript
validate.str("some string with more than twenty chars", { min: 20 }, "field") // true
```
 * Checks if a string length is less than 10 characters long.
```javascript
validate.str("some string with more than ten chars", { max: 10 }, "field") // false
```
 * Checks if a string length is between 1 and 1000.
```javascript
validate.str("this string fits correctly", { min: 1 max: 1000 }, "field") // true
```
 * Checks if a string length is exactly 4 characters.
```javascript
validate.str("four", { min: 4 max: 4 }, "field") // true
```

**Note**: Testing strings, `min` will always be 0 and cannot be less than that.

This works same with numbers, the diference here is that you can play with negative values.
```javascript
validate.num(20, { min: 0 max: 100 })    // true
validate.num(-5, { min: -100 max: 100 }) // true
validate.num(1, { max: 0.99 })           // false
```

### Results

When testing strings or numbers on `"easy"` mode, the results can be only one of two values: `true` or `false`. But on `"rich"` mode, validations throws an object with a set of data that can help you to understand what fails if it does, or have a bit more info in the bag.

The contained data of the object is described in the table below:

Key | Value | Success | Failure | Description
--- | ----- | ------- | ------- | -----------
`result`| `boolean` | :heavy_check_mark: | :heavy_check_mark: | Final result of the validation
`failure`| `string` | :x: | :heavy_check_mark: | Failure code
`description` | `string` | :x: | :heavy_check_mark: | Failure description
`subject` | `string\|number` | :heavy_check_mark: | :heavy_check_mark: | Tested subject
`lang`| `string` | :heavy_check_mark: | :heavy_check_mark: | Tested language (only when testing strings)
`test` | `string` | :heavy_check_mark: | :heavy_check_mark: | Test type used (only if defined)
`length` | `number` | :heavy_check_mark: | :heavy_check_mark: | Length of the subject (if defined and if it's a string)
`limits` | `object` | :heavy_check_mark: | :heavy_check_mark: | Limits tested (if defined)

When a test returns failure, the `failure` and `description` can help you to understand where was the problem with the subject, the possible failure codes and descriptions are below:

Failure | Description
------- | -----------
`"MINLENGTH"` | `"String length doesn't fill the minimum required value."`
`"MAXLENGTH"` | `"String length is over the maximum specified value."`
`"NOSTRMATCH"` | `"String doesn't match with the specified test type."`
`"MINRANGE"` | `"Number value is less than the minumum required value."`
`"MAXRANGE"` | `"Number value is greater than the maximum specified value."`
`"NONUMMATCH"` | `"Number type doesn't match with the specified test type."`
`"WRONGSTRLIMITS"` | `"Limits can't be negative values while testing strings."`



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
        lang: true
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
    lang: "en",
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

Data that can be hidden:

Key | Value | Default | Description
--- | ----- | ------- | -----------
`failure` | `boolean` | `true` | Return the failure error code, i.e: `"NOSTRMATCH"`
`description` | `boolean` | `true` | Return the description of the failure, i.e: `"Number value is less than the minumum required value."`
`subject` | `boolean` | `true` | Return the test subject, i.e: `"Lorem ipsum"`
`test` | `boolean` | `true` | Return the test type, i.e: `"email"`
`lang` | `boolean` | `true` | Return the test language, i.e: `"en"`
`length` | `boolean` | `true` | Return the length of a string subject, i.e: `20`
`limits` | `boolean` | `true` | Return the limits if setted, i.e: `{min: 0, max: 100}`

## Add custom tests

Validator has a lot of [pre-built tests](#test-strings), but you can add (overwrite) your owns if you want something more specific with the `addStrTest` method.

#### `addStrTest(key, regexp)`

To add a new test you must pass two arguments, the `key` and the `regexp`.

 * `key` is a string with the name of your test and must follow the object keys naming conventions to be valid (be careful with overwrite the existing ones).
 * `regexp` is a regular expression that will be used to accomplish the test, it can be a `RegExp` or a valid RegExp `string`.

If the added test is correct, you can make use of it just calling the validation methods with your custom test type:

```javascript
validate.addStrTest("apple", /^apple$/m);

validate.str("apple", null, "apple"); // true
validate.str("banana", null, "apple"); // false
```
