import { Autobinding } from '../decoratos/autobind';
import { projectState } from '../state/project-state';
import { Validatable, validate } from '../util/validation';
import { Component } from './base-component';

/**
 * user input tuple
 */
export type UserInput = [string, string, number] | void;

/**
 * render and validation user input class
 */

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleInput = this.element.querySelector('#title')! as HTMLInputElement;
    this.descriptionInput = this.element.querySelector(
      '#description'
    )! as HTMLInputElement;
    this.peopleInput = this.element.querySelector(
      '#people'
    )! as HTMLInputElement;

    this.renderContent();
    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent(): void {}

  private getUserInput(): UserInput {
    const title = this.titleInput.value;
    const description = this.descriptionInput.value;
    const people = Number(this.peopleInput.value);

    const isTitleValid: Validatable = {
      value: title,
      required: true,
      minLength: 5
    };

    const isDescriptionValid: Validatable = {
      value: description,
      required: true,
      minLength: 10
    };

    const isPeopleValid: Validatable = {
      value: people,
      required: true,
      min: 1,
      max: 5
    };

    if (
      !validate(isTitleValid) ||
      !validate(isDescriptionValid) ||
      !validate(isPeopleValid)
    ) {
      alert('Invalid input, please try again with valid input');
      return;
    }
    return [title, description, people];
  }

  @Autobinding
  private submitHandler(e: Event) {
    e.preventDefault();

    const userEnteredValues = this.getUserInput();

    if (Array.isArray(userEnteredValues)) {
      const [title, description, people] = userEnteredValues;
      projectState.addProject(title, description, people);
      this.resetForm();
    }
  }

  private resetForm() {
    this.titleInput.value = '';
    this.descriptionInput.value = '';
    this.peopleInput.value = '';
  }
}
