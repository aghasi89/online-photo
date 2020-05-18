import I18n from 'react-native-i18n';
import en  from '../localization/en';
import hy from '../localization/hy';
import ru from '../localization/ru';


I18n.fallbacks = true;
I18n.translations = {
	en:ru,
	hy:ru,
	'en-US':ru,
	ru
  };
export default I18n;