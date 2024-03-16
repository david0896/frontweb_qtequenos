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
            if(Object.keys(setAlert).length !== 0){
                setAlert({
                    message: 'Ocurrio un error en la consulta: ' + data.error.message,
                    tipo: 1
                });
            }
            console.log('Ocurrio un error en la consulta: ' + data.error.message);
        } 
        return data;
    } catch (e) {
        if(Object.keys(setAlert).length !== 0){
            setAlert({
                message: 'Ocurrio un error en la consulta: ' + e.message,
                tipo: 1
            });
        }
        console.log('Ocurrio un error en la consulta: ' + e.message);
    }    
}
