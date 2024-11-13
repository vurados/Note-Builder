import { SVGIconProps } from "../models"

const MenuIcon = (props: SVGIconProps) => {
    const menuIconCN = 'w-6 h-6' + props.className
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={menuIconCN}>
            <path fillRule="evenodd" d="M10.5 6a2 2 0 113 0 2 2 0 01-3 0zm0 6a2 2 0 113 0 2 2 0 01-3 0zm0 6a2 2 0 113 0 2 2 0 01-3 0z" clipRule="evenodd" />
        </svg>
      
    )
}

export {MenuIcon}