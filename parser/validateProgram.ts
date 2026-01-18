import { ProgramNode, FunctionNode } from './ast'
import { SemanticError } from "./errors"
import { validateFunction } from './validateFunction'

const requiredFunctions = ['pre-auton', 'auton', 'driver']

const ALLOWED_SECTIONS: Record<FunctionNode['name'], string[]> = {
    'pre-auton': ['drive-pid', 'turn-pid', 'controller-settings'],
    'auton': [],
    'driver': ['axis', 'controller-settings']
}

const ALLOWED_STATEMENTS: Record<FunctionNode['name'], string[]> = {
    'pre-auton': ['calibrate-imu'],
    'auton': ['move'],
    'driver': []
}

export function validateProgram(program: ProgramNode): SemanticError[] {
    const errors: SemanticError[] = []
    const seen = new Set<string>()

    const functions = [
        program.preAuton,
        program.auton,
        program.driver
    ]

    for (const fn of functions) {
        if (seen.has(fn.name)) {
            errors.push(
                new SemanticError(
                    `duplicate function '${fn.name}'`,
                    fn.loc
                )
            )
        }
        seen.add(fn.name)
    }

    for (const required of requiredFunctions) {
        if (!seen.has(required)) {
            errors.push(
                new SemanticError(
                    `missing required function '${required}'`
                )
            )
        }
    }

    for (const fn of functions) {
        for (const section of fn.sections) {
            if (!ALLOWED_SECTIONS[fn.name].includes(section.name)) {
                errors.push(
                    new SemanticError(
                        `section '${section.name}' is not allowed in '${fn.name}`,
                        section.loc
                    )
                )
            }
        }

        for (const stmt of fn.statements) {
            const cmdType = stmt.command.type
            if (!ALLOWED_STATEMENTS[fn.name].includes(cmdType)) {
                errors.push(
                    new SemanticError(
                        `statement '${cmdType}' is not allowed in '${fn.name}'`,
                        stmt.loc
                    )
                )
            }
        }

        if (fn.name === 'auton' && fn.statements.length === 0) {
            errors.push(
                new SemanticError(
                    `auton function must contain atleast one statement`,
                    fn.loc
                )
            )
        }

        if (fn.name === 'driver' && fn.sections.length === 0) {
            errors.push(
                new SemanticError(
                    `driver function must contain atleast one section`,
                    fn.loc
                )
            )
        }

        errors.push(...validateFunction(fn))
    }
    
    return errors
}