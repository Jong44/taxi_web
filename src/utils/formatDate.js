import moment from 'moment-timezone';
import 'moment/locale/id'; // Import locale bahasa Indonesia

moment.locale('id'); // Set locale ke bahasa Indonesia

export default function formatDate(date) {
    date = date.toDate();
    const dateObj = moment(date);
    const dateInJakarta = dateObj.tz("Asia/Jakarta");
    const formattedDate = dateInJakarta.format('dddd, DD MMMM YYYY  hh.mm A ');
    const amPm = dateInJakarta.format('A');
    const changeAmPm = amPm === 'pagi' ? 'AM' : 'PM';
    const finalFormattedDate = formattedDate.replace(amPm, changeAmPm);
    return finalFormattedDate;
}
