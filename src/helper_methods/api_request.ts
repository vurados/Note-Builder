export async function apiRequest(path:string, data=null, method='GET'){
    const input = 'http://localhost:3001/api' + path
    let req = new Request(input, {
            method: method,
            mode: 'cors', 
            credentials: 'include',
            body: JSON.stringify(data),
        });
    const response = await fetch(req).then((res) => { return res.json()})
        .then((data) => {
            return data
        }
    )
    return response
}