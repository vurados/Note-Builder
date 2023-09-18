export interface INotes{
    id: number
    color: string
    title: string
    content: string
    location:{
        x: number
        y: number
        width: number
        height: number
    }
}

export interface ILayouts{
    id: number
    color: string
    title: string
}