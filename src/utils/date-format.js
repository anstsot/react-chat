import moment from 'moment';

export default function dateFormat(string) {
  try {
    return moment(string).fromNow();
  } catch (e) {
    console.error(e);
    return 'error';
  }
}
