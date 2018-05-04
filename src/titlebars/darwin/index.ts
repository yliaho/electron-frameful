export const darwinTitlebar: Titlebar = {
  name: 'darwin',
  resources: {
    style: () => import('./darwin-style.scss'),
    controlButtons: {
      default: () => import('./svg/control-button-default.svg')
    }
  },
  options: {
    align: 'left'
  }
}
