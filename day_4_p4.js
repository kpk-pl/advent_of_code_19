const lowerBound = '128392'
const upperBound = '643281'

function Possibility() {
    this.number = ''

    this.valid = function () {
        if (this.number.length != 6)
            return false
        if (this.number.localeCompare(lowerBound) < 0 || this.number.localeCompare(upperBound) > 0)
            return false

        let count = {}
        for (let i = 0; i < 6; ++i) {
            if (count[this.number[i]] == undefined)
                count[this.number[i]] = 1
            else
                count[this.number[i]] += 1
        }
        for (let c in count)
            if (count[c] == 2) return true

        return false
    }

    this.possibilities = function () {
        if (this.number.length == 6)
            return this.valid() ? 1 : 0

        let result = 0
        for (let i = this.number.slice(-1)[0]; i <= 9; ++i) {
            let anotherPossibility = new Possibility()
            anotherPossibility.number = this.number + i.toString()
            result += anotherPossibility.possibilities()
        }
        return result
    }
}

let result = 0
for (let i = 0; i <= 9; ++i) {
    let start = new Possibility()
    start.number = i.toString()
    result += start.possibilities()
}
alert(result)