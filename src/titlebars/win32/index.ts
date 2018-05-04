export const win32Titlebar: Titlebar = {
  name: 'win32',
  resources: {
    style: () => import('./win32-style.scss'),
    controlButtons: {
      default: () => import('./svg/control-button-default.svg')
    }
  },
  options: {
    align: 'right'
  }
}
