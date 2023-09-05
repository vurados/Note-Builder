export interface INotes{
    id: number
    color: string
    heading: string
    main: string
    location:{
        x: number
        y: number
        width: number
        height: number
    }
}