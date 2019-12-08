
const program = [3, 8, 1001, 8, 10, 8, 105, 1, 0, 0, 21, 46, 63, 76, 97, 118, 199, 280, 361, 442, 99999, 3, 9, 102, 4, 9, 9, 101, 2, 9, 9, 1002, 9, 5, 9, 101, 4, 9, 9, 102, 2, 9, 9, 4, 9, 99, 3, 9, 101, 5, 9, 9, 102, 3, 9, 9, 101, 3, 9, 9, 4, 9, 99, 3, 9, 1001, 9, 2, 9, 102, 3, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 5, 9, 101, 4, 9, 9, 1002, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 5, 9, 101, 3, 9, 9, 1002, 9, 5, 9, 1001, 9, 5, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99
]
//const program = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0]

interface AssemblyCode {
    operation: string
    length: number
}

const assembly: Map<number, AssemblyCode> = new Map([
    [1, { operation: "add", length: 3 }],
    [2, { operation: "mul", length: 3 }],
    [3, { operation: "read", length: 1 }],
    [4, { operation: "write", length: 1 }],
    [5, { operation: "jump_if", length: 2 }],
    [6, { operation: "jump_zero", length: 2 }],
    [7, { operation: "lt", length: 3 }],
    [8, { operation: "eq", length: 3 }],
    [99, { operation: "halt", length: 0 }]
])

enum AddressMode {
    Position = "pos", Immediate = "imm"
}
class OpCode {
    operation: AssemblyCode
    modes: AddressMode[] = []

    constructor(intCode: number) {
        this.operation = assembly.get(intCode % 100)
        intCode = Math.floor(intCode / 100)

        for (let i = 0; i < this.operation.length; ++i) {
            switch (intCode % 10) {
                case 0:
                    this.modes.push(AddressMode.Position)
                    break
                case 1:
                    this.modes.push(AddressMode.Immediate)
                    break
            }
            intCode = Math.floor(intCode / 10)
        }
    }
}

class ExecutionContext {
    code: OpCode
    address: number[] = []

    constructor(pc: number, code: OpCode, nextProgram: number[]) {
        this.code = code

        for (let i = 0; i < this.code.operation.length; ++i) {
            switch (this.code.modes[i]) {
                case AddressMode.Position:
                    this.address.push(nextProgram[i])
                    break;
                case AddressMode.Immediate:
                    this.address.push(pc + i)
                    break;
            }
        }
    }
}

class Executor {
    program: number[]
    input: number[]
    output: number[] = []

    private pc: number = 0
    done: boolean = false

    constructor(data: number[], input: number[]) {
        this.program = [...data]
        this.input = [...input]
    }

    private op_add(ctx: ExecutionContext) {
        this.program[ctx.address[2]] = this.program[ctx.address[0]] + this.program[ctx.address[1]]
    }
    private op_mul(ctx: ExecutionContext) {
        this.program[ctx.address[2]] = this.program[ctx.address[0]] * this.program[ctx.address[1]]
    }
    private op_read(ctx: ExecutionContext) {
        this.program[ctx.address[0]] = this.input.shift()
    }
    private op_write(ctx: ExecutionContext) {
        this.output.push(this.program[ctx.address[0]])
    }
    private op_halt(ctx: ExecutionContext) {
        this.done = true
    }
    private op_jump_if(ctx: ExecutionContext) {
        if (this.program[ctx.address[0]] > 0)
            this.pc = this.program[ctx.address[1]] - ctx.code.operation.length
    }
    private op_jump_zero(ctx: ExecutionContext) {
        if (this.program[ctx.address[0]] == 0)
            this.pc = this.program[ctx.address[1]] - ctx.code.operation.length
    }
    private op_lt(ctx: ExecutionContext) {
        this.program[ctx.address[2]] = (this.program[ctx.address[0]] < this.program[ctx.address[1]]) ? 1 : 0
    }
    private op_eq(ctx: ExecutionContext) {
        this.program[ctx.address[2]] = (this.program[ctx.address[0]] == this.program[ctx.address[1]]) ? 1 : 0
    }

    executeOne(until?: string): boolean {
        const code = new OpCode(this.program[this.pc])
        this.pc += 1

        const ctx = new ExecutionContext(this.pc, code, this.program.slice(this.pc))
        //console.log(ctx)
        this['op_' + code.operation.operation](ctx)
        this.pc += code.operation.length

        if (code.operation.operation == until || this.done)
            return true

        return false
    }

    executeAll(until?: string) {
        while (!this.executeOne(until)) { }
    }
}

function allPhases(): number[][] {
    const minPhase = 5
    const maxPhase = 9
    let result: number[][] = [[minPhase]]

    for (let phase = minPhase + 1; phase <= maxPhase; ++phase) {
        let base: number[][] = [...result]
        result = []

        for (let i = minPhase; i <= phase; ++i) {
            for (let perm of base) {
                let newPerm: number[] = [...perm.slice(0, i - minPhase), phase, ...perm.slice(i - minPhase)]
                result.push(newPerm)
            }
        }
    }

    return result
}

const numAmplifiers = 5
let maxAmplification = 0
for (let phases of allPhases()) {
    let amplifier: Executor[] = phases.map((phase: number) => new Executor(program, [phase]))
    amplifier[0].input.push(0)

    while (!amplifier[numAmplifiers - 1].done) {
        for (let i = 0; i < numAmplifiers; ++i) {
            amplifier[i].executeAll("write")
            amplifier[(i + 1) % 5].input.push(amplifier[i].output.shift())
        }
    }
    maxAmplification = Math.max(maxAmplification, amplifier[0].input.shift())
}

console.log(maxAmplification)