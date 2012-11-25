/*global Ext: true*/
Ext.define('AM.model.IP', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'ip', type: 'string'},
        {name: 'lastHitAt', type: 'date', dateFormat: 'U'},
        {name: 'hits', type: 'int'}
    ],
    idProperty: 'ip',

    proxy: {
        type: 'rest',
        url: '/ips',
        reader: {
            type: 'json',
            root: 'ips',
            successProperty: 'success'
        }
    }
});
