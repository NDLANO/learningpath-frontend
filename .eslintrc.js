module.exports = {
  'rules': {
    // enforce or disallow variable initializations at definition
   'init-declarations': 0,

   // disallow the catch clause parameter name being the same as a variable in the outer scope
   'no-catch-shadow': 0,

   // disallow deletion of variables
   'no-delete-var': 2,

   // disallow labels that share a name with a variable
   'no-label-var': 0,

   // disallow specific globals
   'no-restricted-globals': 0,

   // disallow declaration of variables already declared in the outer scope
   'no-shadow': 2,

   // disallow shadowing of names such as arguments
   'no-shadow-restricted-names': 2,

   // disallow use of undeclared variables unless mentioned in a /*global */ block
   'no-undef': 2,

   // disallow use of undefined when initializing variables
   'no-undef-init': 0,

   // disallow use of undefined variable
   'no-undefined': 0,

   // disallow declaration of variables that are not used in the code
   'no-unused-vars': [2, { vars: 'local', args: 'after-used' }],

   // disallow use of variables before they are defined
   'no-use-before-define': 2,
    // 'indent': [ 2, 2 ],
    'quotes': [ 2, 'single' ],
    'linebreak-style': [ 2, 'unix' ],
    'semi': [ 2, 'always' ],
    'no-unused-vars': [ 1 ],

    // enforce spacing inside array brackets
   'array-bracket-spacing': [1, 'never'],

   // enforce spacing inside single-line blocks
   // http://eslint.org/docs/rules/block-spacing
   'block-spacing': [1, 'always'],

   // enforce one true brace style
   'brace-style': [1, '1tbs', { allowSingleLine: true }],

   // require camel case names
   camelcase: [2, { properties: 'never' }],

   // enforce spacing before and after comma
   'comma-spacing': [1, { before: false, after: true }],

   // enforce one true comma style
   'comma-style': [2, 'last'],

   // disallow padding inside computed properties
   'computed-property-spacing': [2, 'never'],

   // enforces consistent naming when capturing the current execution context
   'consistent-this': 0,

   // enforce newline at the end of file, with no multiple empty lines
   'eol-last': 1,

   // require function expressions to have a name
   'func-names': 1,

   // enforces use of function declarations or expressions
   'func-style': 0,

   // Blacklist certain identifiers to prevent them being used
   // http://eslint.org/docs/rules/id-blacklist
   'id-blacklist': 0,

   // this option enforces minimum and maximum identifier lengths
   // (variable names, property names etc.)
   'id-length': 0,

   // require identifiers to match the provided regular expression
   'id-match': 0,

   // this option sets a specific tab width for your code
   // http://eslint.org/docs/rules/indent
   indent: [1, 2, { SwitchCase: 1, VariableDeclarator: 1 }],

   // specify whether double or single quotes should be used in JSX attributes
   // http://eslint.org/docs/rules/jsx-quotes
   'jsx-quotes': 0,

   // enforces spacing between keys and values in object literal properties
   'key-spacing': [1, { beforeColon: false, afterColon: true }],

   // require a space before & after certain keywords
   'keyword-spacing': [1, {
     before: true,
     after: true,
     overrides: {
       return: { after: true },
       throw: { after: true },
       case: { after: true }
     }
   }],

   // disallow mixed 'LF' and 'CRLF' as linebreaks
   'linebreak-style': 0,

   // enforces empty lines around comments
   'lines-around-comment': 0,

   // specify the maximum depth that blocks can be nested
   'max-depth': [0, 4],

   // specify the maximum length of a line in your program
   // http://eslint.org/docs/rules/max-len
   'max-len': [1, 100, 2, {
     ignoreUrls: true,
     ignoreComments: false
   }],

   // specify the maximum depth callbacks can be nested
   'max-nested-callbacks': 0,

   // limits the number of parameters that can be used in the function declaration.
   'max-params': [0, 3],

   // specify the maximum number of statement allowed in a function
   'max-statements': [0, 10],

   // restrict the number of statements per line
   // http://eslint.org/docs/rules/max-statements-per-line
   'max-statements-per-line': [0, { max: 1 }],

   // require a capital letter for constructors
   'new-cap': [1, { newIsCap: true }],

   // disallow the omission of parentheses when invoking a constructor with no arguments
   'new-parens': 0,

   // allow/disallow an empty newline after var statement
   'newline-after-var': 0,

   // http://eslint.org/docs/rules/newline-before-return
   'newline-before-return': 0,

   // enforces new line after each method call in the chain to make it
   // more readable and easy to maintain
   // http://eslint.org/docs/rules/newline-per-chained-call
   'newline-per-chained-call': [1, { ignoreChainWithDepth: 3 }],

   // disallow use of the Array constructor
   'no-array-constructor': 2,

   // disallow use of bitwise operators
   'no-bitwise': 0,

   // disallow use of the continue statement
   'no-continue': 0,

   // disallow comments inline after code
   'no-inline-comments': 0,

   // disallow if as the only statement in an else block
   'no-lonely-if': 0,

   // disallow mixed spaces and tabs for indentation
   'no-mixed-spaces-and-tabs': 2,

   // disallow multiple empty lines and only one newline at the end
   'no-multiple-empty-lines': [1, { max: 2, maxEOF: 1 }],

   // disallow negated conditions
   // http://eslint.org/docs/rules/no-negated-condition
   'no-negated-condition': 0,

   // disallow nested ternary expressions
   'no-nested-ternary': 1,

   // disallow use of the Object constructor
   'no-new-object': 2,

   // disallow use of unary operators, ++ and --
   'no-plusplus': 0,

   // disallow certain syntax forms
   // http://eslint.org/docs/rules/no-restricted-syntax
   'no-restricted-syntax': [
     2,
     'DebuggerStatement',
     'ForInStatement',
     'LabeledStatement',
     'WithStatement',
   ],

   // disallow space between function identifier and application
   'no-spaced-func': 2,

   // disallow the use of ternary operators
   'no-ternary': 0,

   // disallow trailing whitespace at the end of lines
   'no-trailing-spaces': 1,

   // disallow dangling underscores in identifiers
   'no-underscore-dangle': [1, { allowAfterThis: false }],

   // disallow the use of Boolean literals in conditional expressions
   // also, prefer `a || b` over `a ? a : b`
   // http://eslint.org/docs/rules/no-unneeded-ternary
   'no-unneeded-ternary': [2, { defaultAssignment: false }],

   // disallow whitespace before properties
   // http://eslint.org/docs/rules/no-whitespace-before-property
   'no-whitespace-before-property': 2,

   // require padding inside curly braces
  //  'object-curly-spacing': [2, 'always'],

   // enforce "same line" or "multiple line" on object properties.
   // http://eslint.org/docs/rules/object-property-newline
   // TODO: enable when https://github.com/eslint/eslint/issues/5667#issuecomment-219334864 is resolved
   'object-property-newline': [0, {
     allowMultiplePropertiesPerLine: true,
   }],

   // allow just one var statement per function
   'one-var': [2, 'never'],

   // require a newline around variable declaration
   // http://eslint.org/docs/rules/one-var-declaration-per-line
   'one-var-declaration-per-line': [1, 'always'],

   // require assignment operator shorthand where possible or prohibit it entirely
   'operator-assignment': 0,

   // enforce operators to be placed before or after line breaks
   'operator-linebreak': 0,

   // enforce padding within blocks
   'padded-blocks': [1, 'never'],

   // require quotes around object literal property names
   // http://eslint.org/docs/rules/quote-props.html
   'quote-props': [1, 'as-needed', { keywords: false, unnecessary: true, numbers: false }],

   // specify whether double or single quotes should be used
   quotes: [2, 'single', { avoidEscape: true }],

   // do not require jsdoc
   // http://eslint.org/docs/rules/require-jsdoc
   'require-jsdoc': 0,

   // require or disallow use of semicolons instead of ASI
   semi: [2, 'always'],

   // enforce spacing before and after semicolons
   'semi-spacing': [2, { before: false, after: true }],

   // sort variables within the same declaration block
   'sort-vars': 0,

   // require or disallow space before blocks
   'space-before-blocks': 1,

   // require or disallow space before function opening parenthesis
   // http://eslint.org/docs/rules/space-before-function-paren
   'space-before-function-paren': [1, { anonymous: 'always', named: 'never' }],

   // require or disallow spaces inside parentheses
   'space-in-parens': [1, 'never'],

   // require spaces around operators
   'space-infix-ops': 1,

   // Require or disallow spaces before/after unary operators
   'space-unary-ops': 0,

   // require or disallow a space immediately following the // or /* in a comment
   'spaced-comment': [2, 'always', {
     exceptions: ['-', '+'],
     markers: ['=', '!']           // space here to support sprockets directives
   }],

   // require regex literals to be wrapped in parentheses
   'wrap-regex': 0,


    // enforces getter/setter pairs in objects
    'accessor-pairs': 0,

    // enforces return statements in callbacks of array's methods
    // http://eslint.org/docs/rules/array-callback-return
    'array-callback-return': 2,

    // treat var statements as if they were block scoped
    'block-scoped-var': 2,

    // specify the maximum cyclomatic complexity allowed in a program
    complexity: [0, 11],

    // require return statements to either always or never specify values
    'consistent-return': 1,

    // specify curly brace conventions for all control statements
    curly: [2, 'multi-line'],

    // require default case in switch statements
    'default-case': [1, { commentPattern: '^no default$' }],

    // encourages use of dot notation whenever possible
    'dot-notation': [2, { allowKeywords: true }],

    // enforces consistent newlines before or after dots
    'dot-location': 0,

    // require the use of === and !==
    // http://eslint.org/docs/rules/eqeqeq
    eqeqeq: [1, 'allow-null'],

    // make sure for-in loops have an if statement
    'guard-for-in': 2,

    // disallow the use of alert, confirm, and prompt
    'no-alert': 1,

    // disallow use of arguments.caller or arguments.callee
    'no-caller': 2,

    // disallow lexical declarations in case/default clauses
    // http://eslint.org/docs/rules/no-case-declarations.html
    'no-case-declarations': 2,

    // disallow division operators explicitly at beginning of regular expression
    'no-div-regex': 0,

    // disallow else after a return in an if
    'no-else-return': 1,

    // disallow empty functions, except for standalone funcs/arrows
    // http://eslint.org/docs/rules/no-empty-function
    'no-empty-function': [2, {
      allow: [
        'arrowFunctions',
        'functions',
        'methods',
      ]
    }],

    // disallow empty destructuring patterns
    // http://eslint.org/docs/rules/no-empty-pattern
    'no-empty-pattern': 2,

    // disallow comparisons to null without a type-checking operator
    'no-eq-null': 0,

    // disallow use of eval()
    'no-eval': 2,

    // disallow adding to native types
    'no-extend-native': 2,

    // disallow unnecessary function binding
    'no-extra-bind': 2,

    // disallow Unnecessary Labels
    // http://eslint.org/docs/rules/no-extra-label
    'no-extra-label': 2,

    // disallow fallthrough of case statements
    'no-fallthrough': 2,

    // disallow the use of leading or trailing decimal points in numeric literals
    'no-floating-decimal': 2,

    // disallow the type conversions with shorter notations
    'no-implicit-coercion': 0,

    // disallow var and named functions in global scope
    // http://eslint.org/docs/rules/no-implicit-globals
    'no-implicit-globals': 0,

    // disallow use of eval()-like methods
    'no-implied-eval': 2,

    // disallow this keywords outside of classes or class-like objects
    'no-invalid-this': 0,

    // disallow usage of __iterator__ property
    'no-iterator': 2,

    // disallow use of labels for anything other then loops and switches
    'no-labels': [2, { allowLoop: false, allowSwitch: false }],

    // disallow unnecessary nested blocks
    'no-lone-blocks': 2,

    // disallow creation of functions within loops
    'no-loop-func': 2,

    // disallow magic numbers
    // http://eslint.org/docs/rules/no-magic-numbers
    'no-magic-numbers': [0, {
      ignore: [],
      ignoreArrayIndexes: true,
      enforceConst: true,
      detectObjects: false,
    }],

    // disallow use of multiple spaces
    'no-multi-spaces': 1,

    // disallow use of multiline strings
    'no-multi-str': 2,

    // disallow reassignments of native objects
    'no-native-reassign': 2,

    // disallow use of new operator when not part of the assignment or comparison
    'no-new': 2,

    // disallow use of new operator for Function object
    'no-new-func': 2,

    // disallows creating new instances of String, Number, and Boolean
    'no-new-wrappers': 2,

    // disallow use of (old style) octal literals
    'no-octal': 2,

    // disallow use of octal escape sequences in string literals, such as
    // var foo = 'Copyright \251';
    'no-octal-escape': 2,

    // disallow reassignment of function parameters
    // disallow parameter object manipulation
    // rule: http://eslint.org/docs/rules/no-param-reassign.html
    'no-param-reassign': [1, { props: true }],

    // disallow usage of __proto__ property
    'no-proto': 2,

    // disallow declaring the same variable more then once
    'no-redeclare': 2,

    // disallow use of assignment in return statement
    'no-return-assign': 2,

    // disallow use of `javascript:` urls.
    'no-script-url': 2,

    // disallow self assignment
    // http://eslint.org/docs/rules/no-self-assign
    'no-self-assign': 2,

    // disallow comparisons where both sides are exactly the same
    'no-self-compare': 2,

    // disallow use of comma operator
    'no-sequences': 2,

    // restrict what can be thrown as an exception
    'no-throw-literal': 2,

    // disallow unmodified conditions of loops
    // http://eslint.org/docs/rules/no-unmodified-loop-condition
    'no-unmodified-loop-condition': 0,

    // disallow usage of expressions in statement position
    'no-unused-expressions': 1,

    // disallow unused labels
    // http://eslint.org/docs/rules/no-unused-labels
    'no-unused-labels': 2,

    // disallow unnecessary .call() and .apply()
    'no-useless-call': 0,

    // disallow useless string concatenation
    // http://eslint.org/docs/rules/no-useless-concat
    'no-useless-concat': 2,

    // disallow unnecessary string escaping
    // http://eslint.org/docs/rules/no-useless-escape
    'no-useless-escape': 2,

    // disallow use of void operator
    'no-void': 0,

    // disallow usage of configurable warning terms in comments: e.g. todo
    'no-warning-comments': [0, { terms: ['todo', 'fixme', 'xxx'], location: 'start' }],

    // disallow use of the with statement
    'no-with': 2,

    // require use of the second argument for parseInt()
    radix: 1,

    // requires to declare all vars on top of their containing scope
    'vars-on-top': 2,

    // require immediate function invocation to be wrapped in parentheses
    // http://eslint.org/docs/rules/wrap-iife.html
    'wrap-iife': [2, 'outside'],

    // require or disallow Yoda conditions
    yoda: 2,

    // require trailing commas in multiline object literals
    // 'comma-dangle': [2, 'always-multiline'],

    // disallow assignment in conditional expressions
    'no-cond-assign': [2, 'always'],

    // disallow use of console
    'no-console': 1,

    // disallow use of constant expressions in conditions
    'no-constant-condition': 1,

    // disallow control characters in regular expressions
    'no-control-regex': 2,

    // disallow use of debugger
    'no-debugger': 2,

    // disallow duplicate arguments in functions
    'no-dupe-args': 2,

    // disallow duplicate keys when creating object literals
    'no-dupe-keys': 2,

    // disallow a duplicate case label.
    'no-duplicate-case': 2,

    // disallow empty statements
    'no-empty': 2,

    // disallow the use of empty character classes in regular expressions
    'no-empty-character-class': 2,

    // disallow assigning to the exception in a catch block
    'no-ex-assign': 2,

    // disallow double-negation boolean casts in a boolean context
    'no-extra-boolean-cast': 0,

    // disallow unnecessary parentheses
    // http://eslint.org/docs/rules/no-extra-parens
    // 'no-extra-parens': [0, 'all', {
    //   conditionalAssign: true,
    //   nestedBinaryExpressions: false,
    //   returnAssign: false,
    // }],

    // disallow unnecessary semicolons
    'no-extra-semi': 2,

    // disallow overwriting functions written as function declarations
    'no-func-assign': 2,

    // disallow function or variable declarations in nested blocks
    'no-inner-declarations': 2,

    // disallow invalid regular expression strings in the RegExp constructor
    'no-invalid-regexp': 2,

    // disallow irregular whitespace outside of strings and comments
    'no-irregular-whitespace': 2,

    // disallow negation of the left operand of an in expression
    'no-negated-in-lhs': 2,

    // disallow the use of object properties of the global object (Math and JSON) as functions
    'no-obj-calls': 2,

    // disallow multiple spaces in a regular expression literal
    'no-regex-spaces': 2,

    // disallow sparse arrays
    'no-sparse-arrays': 2,

    // Avoid code that looks like two expressions but is actually one
    'no-unexpected-multiline': 0,

    // disallow unreachable statements after a return, throw, continue, or break statement
    'no-unreachable': 2,

    // disallow return/throw/break/continue inside finally blocks
    // http://eslint.org/docs/rules/no-unsafe-finally
    'no-unsafe-finally': 2,

    // disallow comparisons with the value NaN
    'use-isnan': 2,

    // ensure JSDoc comments are valid
    // http://eslint.org/docs/rules/valid-jsdoc
    'valid-jsdoc': 0,

    // ensure that the results of typeof are compared against a valid string
    'valid-typeof': 2,

    // enforces no braces where they can be omitted
    // http://eslint.org/docs/rules/arrow-body-style
    'arrow-body-style': [1, 'as-needed'],

    // require parens in arrow function arguments
    'arrow-parens': 0,

    // require space before/after arrow function's arrow
    // http://eslint.org/docs/rules/arrow-spacing
    'arrow-spacing': [1, { before: true, after: true }],

    // verify super() callings in constructors
    'constructor-super': 0,

    // enforce the spacing around the * in generator functions
    // http://eslint.org/docs/rules/generator-star-spacing
    'generator-star-spacing': [2, { before: false, after: true }],

    // disallow modifying variables of class declarations
    // http://eslint.org/docs/rules/no-class-assign
    'no-class-assign': 2,

    // disallow arrow functions where they could be confused with comparisons
    // http://eslint.org/docs/rules/no-confusing-arrow
    'no-confusing-arrow': [1, {
      allowParens: true,
    }],

    // disallow modifying variables that are declared using const
    'no-const-assign': 2,

    // disallow duplicate class members
    // http://eslint.org/docs/rules/no-dupe-class-members
    'no-dupe-class-members': 2,

    // disallow importing from the same path more than once
    // http://eslint.org/docs/rules/no-duplicate-imports
    'no-duplicate-imports': 2,

    // disallow symbol constructor
    // http://eslint.org/docs/rules/no-new-symbol
    'no-new-symbol': 2,

    // disallow specific imports
    // http://eslint.org/docs/rules/no-restricted-imports
    'no-restricted-imports': 0,

    // disallow to use this/super before super() calling in constructors.
    'no-this-before-super': 0,

    // disallow useless computed property keys
    // http://eslint.org/docs/rules/no-useless-computed-key
    'no-useless-computed-key': 2,

    // disallow unnecessary constructor
    // http://eslint.org/docs/rules/no-useless-constructor
    'no-useless-constructor': 2,

    // require let or const instead of var
    'no-var': 1,

    // require method and property shorthand syntax for object literals
    // http://eslint.org/docs/rules/object-shorthand
    // 'object-shorthand': [2, 'always', {
    //   ignoreConstructors: false,
    //   avoidQuotes: true,
    // }],

    // suggest using arrow functions as callbacks
    'prefer-arrow-callback': [1, {
      allowNamedFunctions: false,
      allowUnboundThis: true,
    }],

    // suggest using of const declaration for variables that are never modified after declared
    // 'prefer-const': [2, {
    //   destructuring: 'any',
    //   ignoreReadBeforeAssign: true,
    // }],

    // suggest using Reflect methods where applicable
    'prefer-reflect': 0,

    // use rest parameters instead of arguments
    // http://eslint.org/docs/rules/prefer-rest-params
    'prefer-rest-params': 2,

    // suggest using the spread operator instead of .apply()
    'prefer-spread': 0,

    // suggest using template literals instead of string concatenation
    // http://eslint.org/docs/rules/prefer-template
    'prefer-template': 1,

    // disallow generator functions that do not have yield
    'require-yield': 0,

    // import sorting
    // http://eslint.org/docs/rules/sort-imports
    'sort-imports': 0,

    // enforce usage of spacing in template strings
    // http://eslint.org/docs/rules/template-curly-spacing
    'template-curly-spacing': 2,

    // enforce spacing around the * in yield* expressions
    // http://eslint.org/docs/rules/yield-star-spacing
    'yield-star-spacing': [2, 'after'],
    'react/display-name': [ 0 ],
    'react/no-danger': [ 1 ],
    'react/prop-types': [ 2, {'ignore': ['children','className'] }],

    // specify whether double or single quotes should be used in JSX attributes
    // http://eslint.org/docs/rules/jsx-quotes
    'jsx-quotes': [1, 'prefer-double'],

    // Prevent missing displayName in a React component definition
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md
    'react/display-name': [0, { ignoreTranspilerName: false }],

    // Forbid certain propTypes (any, array, object)
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md
    'react/forbid-prop-types': [0, { forbid: ['any', 'array', 'object'] }],

    // Enforce boolean attributes notation in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
    'react/jsx-boolean-value': [1, 'never'],

    // Validate closing bracket location in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
    'react/jsx-closing-bracket-location': [1, 'line-aligned'],

    // Enforce or disallow spaces inside of curly braces in JSX attributes
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
    'react/jsx-curly-spacing': [1, 'never', { allowMultiline: true }],

    // Enforce event handler naming conventions in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
    'react/jsx-handler-names': [0, {
      eventHandlerPrefix: 'handle',
      eventHandlerPropPrefix: 'on',
    }],

    // Validate props indentation in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
    'react/jsx-indent-props': [1, 2],

    // Validate JSX has key prop when in array or iterator
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
    'react/jsx-key': 0,

    // Limit maximum of props on a single line in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
    'react/jsx-max-props-per-line': [0, { maximum: 1 }],

    // Prevent usage of .bind() in JSX props
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
    'react/jsx-no-bind': [1, {
      ignoreRefs: true,
      allowArrowFunctions: true,
      allowBind: false,
    }],

    // Prevent duplicate props in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
    'react/jsx-no-duplicate-props': [0, { ignoreCase: false }],

    // Prevent usage of unwrapped JSX strings
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md
    'react/jsx-no-literals': 0,

    // Disallow undeclared variables in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md
    'react/jsx-no-undef': 2,

    // Enforce PascalCase for user-defined JSX components
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
    'react/jsx-pascal-case': [2, {
      allowAllCaps: true,
      ignore: [],
    }],

    // Enforce propTypes declarations alphabetical sorting
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-prop-types.md
    'react/sort-prop-types': [0, {
      ignoreCase: false,
      callbacksLast: false,
    }],

    // deprecated in favor of react/jsx-sort-props
    'react/jsx-sort-prop-types': 0,

    // Enforce props alphabetical sorting
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
    'react/jsx-sort-props': [0, {
      ignoreCase: false,
      callbacksLast: false,
    }],

    // Prevent React to be incorrectly marked as unused
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
    'react/jsx-uses-react': [2, { pragma: 'React' }],

    // Prevent variables used in JSX to be incorrectly marked as unused
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md
    'react/jsx-uses-vars': 2,

    // Prevent usage of dangerous JSX properties
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md
    'react/no-danger': 0,

    // Prevent usage of deprecated methods
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md
    'react/no-deprecated': [1, { react: '0.14.0' }],

    // Prevent usage of setState in componentDidMount
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
    'react/no-did-mount-set-state': [2, 'allow-in-func'],

    // Prevent usage of setState in componentDidUpdate
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
    'react/no-did-update-set-state': [2, 'allow-in-func'],

    // Prevent direct mutation of this.state
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
    'react/no-direct-mutation-state': 0,

    // Prevent usage of isMounted
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md
    'react/no-is-mounted': 2,

    // Prevent multiple component definition per file
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md
    'react/no-multi-comp': [1, { ignoreStateless: true }],

    // Prevent usage of setState
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-set-state.md
    'react/no-set-state': 0,

    // Prevent using string references
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
    'react/no-string-refs': 0,

    // Prevent usage of unknown DOM property
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
    'react/no-unknown-property': 2,

    // Require ES6 class declarations over React.createClass
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md
    'react/prefer-es6-class': [2, 'always'],

    // Require stateless functions when not using lifecycle methods, setState or ref
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    'react/prefer-stateless-function': 2,

    // Prevent missing props validation in a React component definition
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
    // 'react/prop-types': [2, { ignore: [], customValidators: [] }],

    // Prevent missing React when using JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
    'react/react-in-jsx-scope': 2,

    // Restrict file extensions that may be required
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-extension.md
    'react/require-extension': [0, { extensions: ['.jsx'] }],

    // Require render() methods to return something
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md
    'react/require-render-return': 2,

    // Prevent extra closing tags for components without children
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
    'react/self-closing-comp': 2,

    // Enforce spaces before the closing bracket of self-closing JSX elements
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-space-before-closing.md
    'react/jsx-space-before-closing': [1, 'always'],

    // Enforce component methods order
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
    'react/sort-comp': [1, {
      order: [
        'static-methods',
        'lifecycle',
        '/^on.+$/',
        '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
        'everything-else',
        '/^render.+$/',
        'render'
      ],
    }],

    // Prevent missing parentheses around multilines JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/wrap-multilines.md
    'react/wrap-multilines': [1, {
      declaration: true,
      assignment: true,
      return: true
    }],

    // Require that the first prop in a JSX element be on a new line when the element is multiline
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
    'react/jsx-first-prop-new-line': [1, 'multiline'],

    // enforce spacing around jsx equals signs
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
    'react/jsx-equals-spacing': [1, 'never'],

    // enforce JSX indentation
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
    'react/jsx-indent': [1, 2],
    //
    // disallow target="_blank" on links
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
    // TODO: enable
    'react/jsx-no-target-blank': 0

  },
  'env': {
    'es6': true,
    'node': true,
    'browser': true
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended'],
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 6,
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'plugins': [
    'react'
  ]
};
