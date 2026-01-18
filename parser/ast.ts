// ==============================
// Source location support
// ==============================

export type SourceLocation = {
    line: number
    column: number
}

export type SourceRange = {
    start: SourceLocation
    end: SourceLocation
}

export type BaseNode = {
    loc?: SourceRange
}

// ==============================
// Program structure
// ==============================

export type ProgramNode = BaseNode & {
    type: 'program'
    preAuton: FunctionNode
    auton: FunctionNode
    driver: FunctionNode
}

export type FunctionNode = BaseNode & {
    type: 'function'
    name: 'pre-auton' | 'auton' | 'driver'
    sections: SectionNode[]
    statements: StatementNode[]
}

// ==============================
// Sections
// ==============================

export type SectionNode = BaseNode & {
    type: 'section'
    name: string
    assignments: AssignmentNode[]
    statements: StatementNode[]
}

// ==============================
// Statements & Commands
// ==============================

export type StatementNode = BaseNode & {
    type: 'statement'
    command: CommandNode
}

export type CommandNode =
    | CalibrateCommand
    | MoveCommand

export type CalibrateCommand = BaseNode & {
    type: 'calibrate-imu'
}

export type MoveCommand = BaseNode & {
    type: 'move'
    direction: 'fwd' | 'bwd'
    distance?: NumberNode
    unit?: UnitNode
    forever: boolean
}

// ==============================
// Assignments & Values
// ==============================

export type AssignmentNode = BaseNode & {
    type: 'assignment'
    name: string
    value: ValueNode
}

export type ValueNode =
    | NumberNode
    | StringNode
// ValueNode intentionally extensible (v2+)

// ==============================
// Literals
// ==============================

export type NumberNode = BaseNode & {
    type: 'number'
    value: number
    raw: string
}

export type StringNode = BaseNode & {
    type: 'string'
    value: string
}

export type UnitNode = BaseNode & {
    type: 'unit'
    value: 'in' | 'cm' | 'mm' | 'm' | 'ft'
}