export const dateFormatDbToView = date => {
    console.log(date)
    return new Date(date).toLocaleDateString();
}