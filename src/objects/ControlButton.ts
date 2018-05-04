// function createControlButton(type: ControlButtonType, svgString: any): any {
//   const container = document.createElement('div')
//   container.insertAdjacentHTML('afterbegin', svgString)

//   const { classList, firstElementChild } = container
//   classList.add(`${type}`)
//   classList.add('control-button-container')

//   firstElementChild.classList.add('control-button')

//   firstElementChild.addEventListener('mouseenter', event => {
//     //@ts-ignore
//     console.log(firstElementChild.children)
//   })

//   return container
// }

type PlatformName = 'darwin' | 'win32' | 'linux'
type ControlButtonType = 'close' | 'minimize' | 'expand'

export class ControlButton {
  public container: HTMLElement

  constructor(
    private type: ControlButtonType,
    private svgString: string,
    public eventCallback: (event) => void
  ) {
    this.createButton()
    this.createEventListeners()
  }

  private createButton() {
    this.container = document.createElement('div')
    this.container.insertAdjacentHTML('afterbegin', this.svgString)

    const { classList, firstElementChild } = this.container

    classList.add('control-button-container')

    firstElementChild.classList.add('control-button')
    firstElementChild.classList.add(`${this.type}`)
  }

  private createEventListeners() {
    const { firstElementChild } = this.container

    firstElementChild.addEventListener('mouseenter', event => {
      this.eventCallback(event)
    })

    firstElementChild.addEventListener('mouseleave', event => {
      this.eventCallback(event)
    })
  }
  //@ts-ignore
  get element() {
    return this.container
  }
}
