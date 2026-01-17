import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// プラグインを有効化
dayjs.extend(utc);
dayjs.extend(timezone);

// デフォルトタイムゾーンをAsia/Tokyoに設定
dayjs.tz.setDefault('Asia/Tokyo');

export default dayjs;
