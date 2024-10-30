import { http, HttpResponse } from 'msw'
import { ICollection } from '../models'

interface INote {
    title: string
}

interface IColl {
    id: number
    title: string
    color: string
    width: number
    Note: INote[]
}


export const collectionHandlers = [
    http.get('http://localhost:3000/NoteBuilder/api/collections/getCollections', async ({cookies}) => {

        const strListCollections = localStorage.getItem('DBcollections') || '[]'
        const listOfCollections = JSON.parse(strListCollections) as IColl[]
        console.log('msw.listCollection', listOfCollections)

        if (cookies.jwtExist){
            return HttpResponse.json(listOfCollections,{status: 200})
        }
    }),

    http.post('http://localhost:3000/NoteBuilder/api/collections/createCollection', async ({request, cookies}) => {
        
        const collection = (await request.json()) as IColl
        
        collection.Note = []
        const dbCollections = localStorage.getItem('DBCollection') || '[]'
        collection.id = JSON.parse(dbCollections).length
        
        console.log('collection sent to mock server', collection)
        
        if (cookies.jwtExist){
            const listOfCollections = JSON.parse(dbCollections) as IColl[]
            const newListOfCollections = listOfCollections.concat(collection)
            localStorage.setItem(`DBcollections`, JSON.stringify(newListOfCollections))
            return HttpResponse.json(
                newListOfCollections,
                {status: 200}
            )
        }
    }),

    http.post('http://localhost:3000/NoteBuilder/api/collections/changeCollection', async ({request, cookies}) => {

        const url = new URL(request.url)
        const cId = url.searchParams.get('cId')

        if(cookies.jwtExist && cId){
            const strListCollections = localStorage.getItem('DBcollections') || '[]'
            const listOfCollections = JSON.parse(strListCollections) as ICollection[]
            listOfCollections.forEach((collection: ICollection) => {
                if(collection.id === +cId){
                    collection = request.json() as ICollection
                }
            })

            return HttpResponse.json(
                listOfCollections,
                {status: 200}
            )
        }
    }),

    http.post('http://localhost:3000/NoteBuilder/api/collections/deleteCollection', async ({request, cookies}) => {

        const url = new URL(request.url)
        const cId = url.searchParams.get('cId')

        if(cookies.jwtExist && cId){
            const strListCollections = localStorage.getItem('DBcollections') || '[]'
            const listOfCollections = JSON.parse(strListCollections) as ICollection[]
            listOfCollections.filter((collection: ICollection) => collection.id !== +cId)

            return HttpResponse.json({
                username: localStorage.getItem('DBusername'),
                email: localStorage.getItem('DBemail')
                },
            {status: 200}
        )}
    })
]