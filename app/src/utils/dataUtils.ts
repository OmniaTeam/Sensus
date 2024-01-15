const getFormattedCurrentData = () => {
    const currentDate = new Date()

    const day: number = currentDate.getDate();
    const month: number = currentDate.getMonth() + 1;
    const year: number = currentDate.getFullYear();

    const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;

    return `${formattedDay}.${formattedMonth}.${year}`
}

export {
    getFormattedCurrentData
}