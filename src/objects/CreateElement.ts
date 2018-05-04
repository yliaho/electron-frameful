interface CreateElementOptions {
  classList: string[]
  style: object
  children: CreateElement[]
}

export default class CreateElement {
  private options: CreateElementOptions = null
  public element: HTMLElement = null

  constructor(tagName: string, options: CreateElementOptions) {
    this.element = document.createElement(tagName)
    this.options = { ...options }

    this.init()
  }

  init() {
    this.addClasses(this.options.classList)
  }

  addClasses(classList: CreateElementOptions['classList']) {
    for (let className of classList) {
      const elementClassList = Array.from(this.element.classList)

      !elementClassList.includes(className)
        ? this.element.classList.add(className)
        : null
    }
  }

  addStyles(styleOptions) {
    this.element.style.boxSizing = 'border-box'
    //@ts-ignore
    for (let [key, value] of Object.entries(styleOptions)) {
      this.element.style[key] = value
    }
  }

  get el() {
    return this.element
  }
}
