export async function fetcher(url, option = {}, setAlert = {}){
    let response;
    try {
        if(!option){
            response = await fetch(url);
        }else{
            response = await fetch(url, option);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        setAlert({
            message: 'Ocurrio un error en la consulta',
            tipo: 1
        });
    }    
    
}
