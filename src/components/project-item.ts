/**
 * Project item class
 */

import { Autobinding } from '../decoratos/autobind';
import { Dragable } from '../models/drag-drop';
import { Project } from '../models/project';
import { Component } from './base-component';

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Dragable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return '1 person';
    }
    return `${this.project.people} persons`;
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @Autobinding
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_: DragEvent) {
    console.log('drag end');
  }

  configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }
  renderContent(): void {
    (this.element.querySelector('h2')! as HTMLElement).textContent =
      this.project.title;

    (this.element.querySelector('h3')! as HTMLElement).textContent =
      this.persons + ' assigned';

    (this.element.querySelector('p')! as HTMLElement).textContent =
      this.project.description;
  }
}
