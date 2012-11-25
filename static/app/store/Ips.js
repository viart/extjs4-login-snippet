/*global Ext: true*/
Ext.define('AM.store.Ips', {
    extend: 'Ext.data.Store',
    model: 'AM.model.IP',

    // will not work, because (server) Authorization required to get access to this data,
    // that is why `.load()` is manually called from the `view:iplist`
    //autoLoad: true,

    sorters: [{
        property : 'lastHitAt',
        direction: 'DESC'
    }, {
        property : 'hits',
        direction: 'DESC'
    }]
});
