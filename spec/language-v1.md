# Robot Language Specification v1.0

Status: Locked
Breaking changes require a new major version

• Instead of #include, use use
• Have exactly 3 functions:
    ○ pre-auton
    ○ auton
    ○ driver
• Each specific header or configuration must appear only inside its related function to avoid clutter
• PID must be tuned for both:
    ○ drive
    ○ turn
• Everything is color-coded, simple, and lowercase
• Dashes replace spaces
• Anything written inside parentheses is treated as a comment (like this)
• Single standalone statements must end with a full stop (.)
• Any statement that appears under a section (indicated by a name ending with a colon :) belongs to that section
• Only a function may use curly braces {}; anything with curly braces is a function
• The user does not need to declare object types; types are auto-detected based on how the statement ends
• Any statement containing an equals sign (=):
    ○ Has the variable on the left-hand side
    ○ Has the value on the right-hand side
Does not require a full stop