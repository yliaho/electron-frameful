import { createTitlebar } from './frameful'
import { darwinTitlebar } from './titlebars/darwin/index'
import { win32Titlebar } from './titlebars/win32/index'
import { ControlButton } from './objects/ControlButton'

let w
try {
  w = require('electron').remote.getCurrentWindow()
} catch (error) {
  w = null
}

type PlatformName = 'darwin' | 'win32' | 'linux'
type ControlButtonType = 'close' | 'minimize' | 'expand'

function createOptions(options: TitlebarOptions) {
  const baseTheme = options.baseTheme
    ? options.baseTheme
    : options.platform
      ? options.platform
      : 'darwin'
  const align = options.align || 'left'

  return { baseTheme, align }
}

function appendButtons(
  buttonCollection: { [key: string]: ControlButton },
  target: HTMLElement
) {
  return Object.entries(buttonCollection).forEach(([type, button]) => {
    target.appendChild(button.element)
  })
}

async function prepareResources({
  style,
  controlButtons,
  ..._titlebar
}: TitlebarResources) {
  const resources = []

  resources.push(await style())
  await Object.entries(controlButtons).forEach(async ([name, value]) => {
    resources.push({ [name]: await value() })
  })

  return resources
}

async function installTitlebar(opts = {}) {
  if (!w) {
    console.error(`Couldn't resolve electron`)
    return
  }

  const { baseTheme, align } = createOptions(opts)

  const titlebar: HTMLElement = document.querySelector('.frameful-titlebar')
  if (!titlebar) return

  // Container for control buttons
  const controlButtonGroup = document.createElement('div')
  titlebar.appendChild(controlButtonGroup)

  // Container element for the active window title
  const title = document.createElement('div')
  const titleSpan = document.createElement('span')
  titleSpan.textContent = w.getTitle()
  title.appendChild(titleSpan)
  titlebar.appendChild(title)

  prepareResources(darwinTitlebar.resources).then(([style, buttons]) => {
    const styleHead = document.createElement('style')
    styleHead.textContent = style
    document.head.appendChild(styleHead)

    const controlButtons = {
      close: new ControlButton('close', buttons.default, event => {
        console.log(event)
      }),
      minimize: new ControlButton('minimize', buttons.default, event => {
        console.log(event)
      }),
      expand: new ControlButton('expand', buttons.default, event => {
        console.log(event)
      })
    }

    appendButtons(controlButtons, controlButtonGroup)
  })
}

export default installTitlebar
