import axios from "axios"
import {useQuery} from '@tanstack/react-query'

export const useFetch = (url: string) => {
    const {isPending, error, data} = useQuery({
        queryKey: ['collectionData'],
        queryFn: () => axios.get(url)
            .then((res) => res.data.json())
    })

    if (isPending) return 'Loading...'

    if (error) return error.message

    return data
}
