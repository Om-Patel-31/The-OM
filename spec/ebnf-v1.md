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
            pre_auton_function
            auton_function
            driver_function
            { comment | whitespace }

-> Order does not matter implementation, but all three must exist exactly once

# 3. Functions

$
pre_auton_function ::= "pre-auton" function_body
auton_function ::= "auton" function_body
driver_function ::= "driver" function_body
$

$ 3.1 Function Body
function_body ::= "{" { function_element } "}"
$

$ 3.2 Function Elements
function_element ::= comment
                   | statement
                   | section
                   | whitespace
$

# 4. Sections
$
section ::= section_name ":" { section_element }
section_name ::= identifier
section_element ::= comment
                  | assignment
                  | whitespace
$

# 5. Statements
$ 5.1 Standalone Statements
statement ::= command "."
$

$ 5.2 Commands
command ::= calibrate_command
          | move_command
$

$ 5.3 Calibrate
calibrate_command ::= "calibrate-imu"
$

$ 5.4 Move
move_command ::= "move" direction move_target
direction ::= "fwd" | "bwd"
move_target ::= distance
              | "forever"
move_target ::= number unit
$

# 6. Assignments
$
assignment ::= identifier "=" value
value ::= number
        | fraction
        | string
$

$ 6.1 Strings
string ::= "" { any-character-except-"" } ""
$

# 7. Driver-Specific Sections (Semantic Constraint)
$
- Grammar allows sections anyhwere inside a function
- Semantic rules enforces meaning

Examples of valid section names:
drive-pid
turn-pid
axis
controller-settings

These are enforced after parsing, not in the grammar.
$

# 8. Semantic Constrains (Not Grammar, But Mandatory)
$
These must be checked after parsing:
1. Exactly three functions must exist
2. Each function must appear only once
3. drive-pid and turn-pid must appear in pre-auton
4. drive-pid and turn-pid must define:
    - p
    - i
    - d
5. Assignments must not end with "."
6. Statements must end with "."
7. Sections may not be nested
8. Curly braces may only apperar in functions
$

# 9. Minimal Valid Program (Grammar-Test Case)
$
pre-auton {
    calibrate-imu.

    drive-pid:
        p = 0.8
        i = 0
        d = 2.1
    
    turn-pid:
        p = 1.2
        i = 0
        d = 3.0
}

auton {
    move fwd 24 in.
}

driver {
    axis:
        drive = 3
        turn = 1
}
$