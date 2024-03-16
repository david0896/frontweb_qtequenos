export function mydateFormat(date){
    const newDate = new Date(date);
    const optionDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const newFormatDate = newDate.toLocaleDateString('es-ES', optionDate);

    return newFormatDate;
}