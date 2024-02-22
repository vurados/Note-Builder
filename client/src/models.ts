export interface INotes{
    id?: number
    layoutId?: number
    title?: string
    content?: string
    x?: number
    y?: number
    width?: number
    height?: number
}

export interface ICollection{
    id?: number
    userId?: number
    width?: number | null
    color?: string
    title?: string
    Note?:{
        [title: string]: any
    } 
}

export interface IUser{
    id?: number
    username: string
    email?: string
    password?: string
    isAuthentificated?: boolean
    salt?: string
}

export interface SVGIconProps{
    className?: string | undefined
}