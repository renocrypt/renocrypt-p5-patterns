import p5 from 'p5'

class Flower {
    private p: p5;
    private x: number[] = [];
    private y: number[] = [];
    private pts: number = 100;
    private r: number = 100;
    private r_var: number | undefined;
    private period: number = 8;
    private rotate: number = 0;

    constructor(p: p5) {
        this.p = p;
    }

    setup(): void {
        this.p.createCanvas(400, 400);
        this.p.angleMode(this.p.DEGREES);
    }

    draw(): void {
        this.p.background(230);
        this.p.translate(this.p.width / 2, this.p.height / 2);

        this.p.stroke(255, 0, 255);
        this.p.noFill();
        this.p.beginShape();
        for (let i = 0; i <= this.pts; i++) {
            let angle = (i / this.pts) * 360;
            this.r_var = 10 * this.p.cos(angle * this.period);
            this.x[i] = (this.r + this.r_var) * this.p.cos(angle + this.rotate);
            this.y[i] = (this.r + this.r_var) * this.p.sin(angle + this.rotate);
            this.p.vertex(this.x[i], this.y[i]);
        }
        this.p.endShape(this.p.CLOSE);
        this.rotate += 1;
    }
}

export const project2 = {
    name: 'Flowers',
    sketch: (p: p5) => {
        let flower: Flower;

        p.setup = () => {
            flower = new Flower(p);
            flower.setup();
        }

        p.draw = () => {
            flower.draw();
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
