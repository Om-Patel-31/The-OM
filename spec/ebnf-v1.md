# Robot Language v1 - Formal Grammar (EBNF)

# 1. Lexical Rules (Tokens)

$ 1.1 Whitespace
whitespace ::= " " | "\t" | "\n" | "\r"
-> Whitespace is ignored except as a separator
$

$ 1.2 Comments
comments ::= "(" { any-character-except-")"} ")"
-> Comments may appear:
    - Own their own line
    - At the end of a line
    - Between tokens
-> They are ignored by the professor
$

$ 1.3 Identifiers
identifier ::= lowercase-lettter {lowercase-letter | "-" }
-> Rules:
    - Lowercase only
    - No spaces
    - No digits
    - Dashes allowed
$

$ 1.4 Numbers
integer :: = digit { digit }
decimal ::= digit { digit } "." digit { digit }
fraction ::= inetger "/" integer
number ::= integer | decimal | fraction
$

$ 1.5 Units
unit ::= "in" | "cm" | "mm" | "m" | "ft"
$

# 2. Program Structure

program ::= { comment | whitespace }
            