/*global Ext: true*/
Ext.define('AM.model.User', {
    extend: 'Ext.data.Model',

    fields: [
        'id',
        'username'
    ],

    proxy: {
        type: 'rest',
        appendId: false,
        api: {
            read: '/login/check',
            destroy: '/logout'
        },
        reader: {
            type: 'json',
            root: 'user'
        }
    }
});
