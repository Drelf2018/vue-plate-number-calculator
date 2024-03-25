class Solution {
    qnF: number
    qnD: number
    qnW: number
    xF: number
    xD: number
    xW: number
    alpha: number
    q: number
    beta: number

    xe: number
    ye: number
    Rmin: number
    R: number

    x: number[]
    y: number[]

    constructor(qnF: number, xF: number, xD: number, xW: number, alpha: number, beta: number, q: number) {
        this.qnF = qnF
        this.xF = xF
        this.xD = xD
        this.xW = xW
        this.alpha = alpha
        this.q = q
        this.beta = beta
        this.qnD = this.qnF * (this.xF - this.xW) / (this.xD - this.xW)
        this.qnW = this.qnF - this.qnD
        this.xe = this.calc_xe()
        this.ye = this.alpha * this.xe / (1 + (this.alpha - 1) * this.xe)
        this.Rmin = (this.xD - this.ye) / (this.ye - this.xe)
        this.R = this.beta * this.Rmin
        this.x = [1]
        this.y = [1, this.xD]
        this.get_plate_number()
    }

    calc_xe(): number {
        if (this.q == 1) {
            return this.xF
        } else {
            let k = this.q / (this.q - 1)
            let b = -this.xF / (this.q - 1)
            let A = k * (this.alpha - 1)
            let B = b * this.alpha - b - this.alpha + k
            return (-B - Math.sqrt(B**2 - 4 * A * b)) / (2 * A)
        }
    }

    get_x(y: number): number {
        return y / (this.alpha - (this.alpha - 1) * y)
    }

    get_y_before(x: number): number {
        return (this.R * x + this.xD) / (this.R + 1)
    }

    get_y_after(x: number): number {
         return ((this.R * this.qnD + this.q * this.qnF) * x - this.qnW * this.xW) / (this.R * this.qnD + this.q * this.qnF - this.qnW)
    }

    get_plate_number() {
        while (this.x[this.x.length-1] > this.xW) {
            this.x.push(this.get_x(this.y[this.y.length-1]))
            if (this.x[this.x.length-1] > this.xe) {
                this.y.push(this.get_y_before(this.x[this.x.length-1]))
            } else {
                this.y.push(this.get_y_after(this.x[this.x.length-1]))
            }
        }          
    }       
}

export default Solution