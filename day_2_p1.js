let program = [1, 0, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 10, 1, 19, 1, 19, 9, 23, 1, 23, 13, 27, 1, 10, 27, 31, 2, 31, 13, 35, 1, 10, 35, 39, 2, 9, 39, 43, 2, 43, 9, 47, 1, 6, 47, 51, 1, 10, 51, 55, 2, 55, 13, 59, 1, 59, 10, 63, 2, 63, 13, 67, 2, 67, 9, 71, 1, 6, 71, 75, 2, 75, 9, 79, 1, 79, 5, 83, 2, 83, 13, 87, 1, 9, 87, 91, 1, 13, 91, 95, 1, 2, 95, 99, 1, 99, 6, 0, 99, 2, 14, 0, 0]

function Executor() {
    this.pc = 0

    this.indirect = function (n) {
        return program[program[this.pc + n]]
    }
    this.op_add = function () {
        program[program[this.pc + 3]] = this.indirect(1) + this.indirect(2)
        this.pc += 4
    }
    this.op_mul = function () {
        program[program[this.pc + 3]] = this.indirect(1) * this.indirect(2)
        this.pc += 4
    }
    this.op_fin = function () {
    }

    this.execute_one = function () {
        switch (program[this.pc]) {
            case 1:
                this.op_add()
                break;
            case 2:
                this.op_mul()
                break;
            case 99:
                this.op_fin()
                break;
        }
    }

    this.done = function () {
        return program[this.pc] == 99
    }
};

program[1] = 12
program[2] = 2
let executor = new Executor()
while (!executor.done()) {
    executor.execute_one()
}

console.log(program[0])