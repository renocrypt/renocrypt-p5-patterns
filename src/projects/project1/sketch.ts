import p5 from 'p5'

export const project1 = {
    name: 'Interactive Circle',
    sketch: (p: any) => {
        let circleSize = 100
        let circleColor: p5.Color

        p.setup = () => {
            p.createCanvas(400, 400)
            circleColor = p.color(255, 0, 0)

            // Store p5 instance globally for access from controls
            ;(window as any).p5Instance = p
        }

        p.draw = () => {
            p.background(220)
            p.fill(circleColor)
            p.ellipse(p.width / 2, p.height / 2, circleSize, circleSize)
        }

        // Methods to update sketch properties
        p.updateCircleSize = (size: number) => {
            circleSize = size
        }

        p.updateCircleColor = (color: string) => {
            circleColor = p.color(color)
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
