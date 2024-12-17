import IndexField from './components/IndexField';
import DetailField from './components/DetailField';
import FormField from './components/FormField';

Nova.booting((Vue, router, store) => {
  Vue.component('index-nova-locale-field', IndexField);
  Vue.component('detail-nova-locale-field', DetailField);
  Vue.component('form-nova-locale-field', FormField);
});
