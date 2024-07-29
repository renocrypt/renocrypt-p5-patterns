import './style.css'
import { ProjectManager } from './utils/projectManager'
import { project1 } from './projects/project1/sketch'
import { project2 } from './projects/project2/rotate'
// Import other projects as they are added
// import { project2 } from './projects/project2/sketch'

document.addEventListener('DOMContentLoaded', () => {
    const sketchHolder = document.getElementById('sketch-holder') as HTMLElement
    const controlsHolder = document.getElementById(
        'controls-holder'
    ) as HTMLElement

    const projectManager = new ProjectManager(sketchHolder, controlsHolder)

    projectManager.addProject(project1)
    projectManager.addProject(project2)
    // Add other projects as they are created
    // projectManager.addProject(project2);

    // Load the first project by default
    projectManager.loadProject(0)
})
