import { FunctionNode } from "./ast";
import { SemanticError } from "./errors";

const ALLOWED_SECTIONS: Record<FunctionNode['name'], string[]> = {
    'pre-auton': ['drive-pid', 'turn-pid', 'controller-settings'],
    'auton': [],
    'driver': ['axis', 'controller-settings']
}

const ALLOWED_STATEMENTS: Record<Function['name'], string[]> = {
    'pre-auton': ['calibrate-imu'],
    'auton': ['move'],
    'drive': []
}

export function validateFunction(fn: FunctionNode): SemanticError[] {
    const errors: SemanticError[] = []

    for (const section of fn.sections) {
        if (!ALLOWED_SECTIONS[fn.name].includes(section.name)) {
            errors.push(
                new SemanticError(
                    `section '${section.name}' is not allowed in '${fn.name}'`,
                    section.loc
            ))
        }
    }

    for (const stmt of fn.statements) {
        const cmdType = stmt.command.type
        if (!ALLOWED_STATEMENTS[fn.name].includes(cmdType)) {
            errors.push(
                new SemanticError(
                    `statement '${cmdType}' is not allowd in '${fn.name}'`,
                    stmt.loc
                )
            )
        }
    }
    
    return errors
}