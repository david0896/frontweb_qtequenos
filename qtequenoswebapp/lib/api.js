export async function fetcher(url, option = {}, setAlert = {}){
    let response;
    try {
        if(!option){
            response = await fetch(url);
        }else{
            response = await fetch(url, option);
        }
        const data = await response.json();
        if(data.data === null){
            setAlert({
                message: 'Ocurrio un error en la consulta: ' + data.error.message,
                tipo: 1
            });
        } 
        return data;
    } catch (e) {
        setAlert({
            message: 'Ocurrio un error en la consulta: ' + e.message,
            tipo: 1
        });
    }    
}
