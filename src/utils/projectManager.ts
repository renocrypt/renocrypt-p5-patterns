import p5 from 'p5'

interface Project {
    name: string
    sketch: (p: p5) => void
    controls: () => HTMLElement
}

export class ProjectManager {
    private projects: Project[] = []
    private currentProject: Project | null = null
    private p5Instance: p5 | null = null

    constructor(
        private sketchHolder: HTMLElement,
        private controlsHolder: HTMLElement
    ) { }

    addProject(project: Project) {
        this.projects.push(project)
        this.updateNavigation()
    }

    private updateNavigation() {
        const nav = document.getElementById('project-nav')
        if (nav) {
            nav.innerHTML = ''
            this.projects.forEach((project, index) => {
                const button = document.createElement('button')
                button.textContent = project.name
                button.className =
                    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                button.onclick = () => this.loadProject(index)
                nav.appendChild(button)
            })
        }
    }

    loadProject(index: number) {
        if (this.p5Instance) {
            this.p5Instance.remove()
        }
        this.currentProject = this.projects[index]
        this.p5Instance = new p5(this.currentProject.sketch, this.sketchHolder)
        this.updateControls()
    }

    private updateControls() {
        if (this.currentProject) {
            this.controlsHolder.innerHTML = ''
            this.controlsHolder.appendChild(this.currentProject.controls())
        }
    }
}
