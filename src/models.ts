export interface INotes{
    id: number
    layoutId: number
    title: string
    content: string
    x: number
    y: number
    width: number
    height: number
}

export interface ILayouts{
    id: number
    userId: number
    color: string
    title: string
}