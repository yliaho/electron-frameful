interface TitlebarResources {
  style: () => Promise<any>
  controlButtons: { [key: string]: () => Promise<any> }
}

interface TitlebarOptions {
  platform?: string
  baseTheme?: string
  align?: 'left' | 'right'
}

interface Titlebar {
  name: string
  resources: TitlebarResources
  options: TitlebarOptions
}
