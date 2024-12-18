import IndexField from './components/IndexField';
import DetailField from './components/DetailField';
import FormField from './components/FormField';

Nova.booting((app, router, store) => {
    app.component('index-nova-locale-field', IndexField);
    app.component('detail-nova-locale-field', DetailField);
    app.component('form-nova-locale-field', FormField);
});