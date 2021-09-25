# String Validator Library

This little library written in Typescript was made to serve as a faster and reliable easy-to-use tool for strings validations that come **specially** from UI forms, but can be used to test any string type no matter the source or enviroment.

## Index

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

## How it works

### Instance settings

To start using the validator you must create a new instance of the `Validator` class, the constructor accepts one argument called `settings` where you can define the behavior of the validator.

By default the validator has three properties that can be managed in `settings` with an object with the following keys: `mode`, `lang`, `results`.

 * `mode` is how the results of the validations should return.
 * `lang` adds support for different languages when testing strings.
 * `results`, when `mode` is set to `"rich"` you can choose wich data won't be returned from the validations.

Argument | Data-type | Value
-------- | --------- | -----
`mode` | `string` | `"easy"|"rich"`
`lang` | `string` | `"en"|"es"|"br"|"fr"|"de"`
`results` | `object` | Example: `{string: false, length: false}`

#### Modes

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
`limits` | `object|null` | `{min?: number, max?: number}` Example: `{min: 0, max:100}`
`test` | `string|undefined` | `"any"|"abc"|"text"|"num"|"field"|"email"|"mix"|"float"|"password"`

#### `num()`:

Argument | Data-type | Values
--------- | --------- | -------
`subject` | `number` | Example: `123`
`limits` | `object|null` | `{min?: number, max?: number}` Example: `{min: -100, max:100}`
`test` | `string|undefined` | `"int"|"float"`




