interface spinnerProps{
    width: string
    color?: string
    className?: string
}

export const Spinner = (props: spinnerProps) => {
    let color
    let className
    switch (props.color) {
        case 'blue':
            color = "#3498db"
            break
        case 'white':
            color = "#ffffff"
            break
        default:
            color = "#3498db"
            break;
    }
    if(props.className === undefined){
        className = 'animate-spin mx-auto'
    }else{
        className = 'animate-spin ' + props.className  
    }
    
    return (
      <svg className={className} width={props.width} height={props.width} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="20" fill="none" stroke={color} strokeWidth="5" strokeDasharray="90"  strokeLinecap="round" />
      </svg>
    )
  }
  