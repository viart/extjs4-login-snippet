/*global Ext: true*/
Ext.define('AM.view.ip.List' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.iplist',
    store: 'Ips',

    title: 'IPs info',

    initComponent: function() {

        // lazy-load for the Store (see details inside of a Store file)
        Ext.getStore(this.getStore()).load();

        this.columns = [
            {header: 'IP',  dataIndex: 'ip',  flex: 1},
            {header: 'Last seen', dataIndex: 'lastHitAt', flex: 1, renderer: Ext.util.Format.dateRenderer('d/m/Y')},
            {header: 'Num of hits', dataIndex: 'hits', flex: 1}
        ];

        this.callParent(arguments);
    }
});
