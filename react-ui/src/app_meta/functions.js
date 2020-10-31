export default {
    FORMAT_DATE_A: (date) => {
        const dt = new Date(date);
        let dd = dt.getDate();
        let MM = dt.getMonth() + 1;
        if (dd < 10) dd = '0' + dd;
        if (MM < 10) MM = '0' + MM;
        return `${dd}.${MM}`;
    },
    FORMAT_DATE_B: (date) => {
        const dt = new Date(date);
        let dd = dt.getDate();
        let MM = dt.getMonth() + 1;
        let yy = dt.getFullYear();
        if (dd < 10) dd = '0' + dd;
        if (MM < 10) MM = '0' + MM;
        return `${yy}-${MM}-${dd}`;
    },
    FORMAT_TIME: (date) => {
        const dt = new Date(date);
        let HH = dt.getHours();
        let mm = dt.getMinutes();
        if (HH < 12) HH = '0' + HH;
        if (mm < 12) mm = '0' + mm;
        return `${HH}:${mm}`;
    },
    NEXT_STATION: (array, current) => {
        if ((array.indexOf(current) + 1) === array.length)
            return array[array.indexOf(current)]
        else
            return array[(array.indexOf(current) + 1)]
    }
}