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
    id?: number
    userId?: number
    color?: string
    title: string
}

export interface IUser{
    id?: number
    username: string
    email?: string
    password?: string
    isAuthentificated?: boolean
    hashedPassword?: string
    salt?: string
}