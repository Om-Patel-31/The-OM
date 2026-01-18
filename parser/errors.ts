export type SourceLocation = {
    line: number
    column: number
}

export type SourceRange = {
    start: SourceLocation
    end: SourceLocation
}

export type DiagnosticSeverity = 'error' | 'warning'

export class ParserSyntaxError extends Error {
    range: SourceRange
    severity: DiagnosticSeverity = 'error'
    code?: string

    constructor(
        message: string,
        range: SourceRange,
        code?: string
    ) {
        super(message)
        this.name = 'ParserSyntaxError'
        this.range = range
        this.code = code
    }
}

export class SemanticError extends Error {
    range?: SourceRange
    severity: DiagnosticSeverity = 'error'
    code?: string

    constructor(
        message: string,
        range?: SourceRange,
        code?: string
    ) {
        super(message)
        this.name = 'SemanticError'
        this.range = range
        this.code = code
    }
}