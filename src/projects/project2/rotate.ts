import p5 from 'p5'

export class Flower {
    private x: number[];
    private y: number[];
    private pts: number;
    private r: number;
    private r_var: number;
    private period: number;
    private speed: number;
    private rot: number;
    private p: p5;

    constructor(p: p5, r: number, pts: number, r_var: number, period: number, speed: number) {
        this.p = p;
        this.x = [];
        this.y = [];
        this.pts = pts;
        this.r = r;
        this.r_var = r_var;
        this.period = period;
        this.speed = speed;
        this.rot = 0;
    }

    display(): void {
        this.p.push();
        this.p.blendMode(this.p.DIFFERENCE);
        this.p.noStroke();
        this.p.fill(255);
        this.p.beginShape();
        for (let i = 0; i <= this.pts; i++) {
            let angle = (i / this.pts) * 360;
            let pedal = this.r_var * Math.cos(this.p.radians(angle * this.period));
            this.x[i] = (this.r + pedal) * Math.cos(this.p.radians(angle + this.rot));
            this.y[i] = (this.r + pedal) * Math.sin(this.p.radians(angle + this.rot));
            this.p.vertex(this.x[i], this.y[i]);
        }
        this.p.endShape(this.p.CLOSE);
        this.p.pop();
        this.rot += this.speed;
    }
}

export const project2 = {
    name: 'Flowers',
    sketch: (p: p5) => {
        let flowers: Flower[] = [];
        let num: number = 7;

        p.setup = () => {
            p.createCanvas(400, 400);
            p.angleMode(p.DEGREES)
            for (let i = 0; i < num; i++) {
                flowers[i] = new Flower(p, 160 - i * 18, 100, 15, 7, i * 0.5);
            }
        }

        p.draw = () => {
            p.background(220)
            p.translate(p.height / 2, p.width / 2)
            for (let i = 0; i < num; i++) {
                flowers[i].display()
            }
        }
    },
    controls: () => {
        const container = document.createElement('div')
        container.innerHTML = `
      <div>
        <label for="size-slider" class="block text-sm font-medium text-gray-700">Circle Size</label>
        <input type="range" id="size-slider" min="10" max="200" value="100" class="w-full">
      </div>
      <div>
        <label for="color-picker" class="block text-sm font-medium text-gray-700">Circle Color</label>
        <input type="color" id="color-picker" value="#ff0000" class="w-full">
      </div>
    `

        const sizeSlider = container.querySelector(
            '#size-slider'
        ) as HTMLInputElement
        const colorPicker = container.querySelector(
            '#color-picker'
        ) as HTMLInputElement

        sizeSlider.addEventListener('input', (e) => {
            const p5Instance = (window as any).p5Instance
            if (p5Instance && p5Instance.updateCircleSize) {
                p5Instance.updateCircleSize(
                    parseInt((e.target as HTMLInputElement).value)
                )
            }
        })

        colorPicker.addEventListener('input', (e) => {
            const p5Instance = (window as any).p5Instance
            if (p5Instance && p5Instance.updateCircleColor) {
                p5Instance.updateCircleColor(
                    (e.target as HTMLInputElement).value
                )
            }
        })

        return container
    },
}
