/*global Ext: true*/
Ext.define('AM.view.GuestViewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'AM.view.profile.Login'
    ],

    layout: 'fit',

    initComponent: function() {
        this.items = {
            xtype: 'logindialog'
        };

        this.callParent(arguments);
    }

});
