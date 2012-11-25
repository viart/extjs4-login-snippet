/*global Ext: true*/
Ext.define('AM.view.UserViewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'AM.view.ip.List'
    ],

    layout: 'fit',

    initComponent: function() {
        var tabs = {
                xtype: 'tabpanel',
                width: '100%',
                padding: 5,
                items: [{
                    itemId: 'info',
                    title: 'Info',
                    bodyPadding: 10,
                    html: [
                        '<h1>Features:</h1>',
                        '<ul>',
                            '<li>User-friendly Login Dialog</li>',
                            '<li>Different layouts for the Guest and Authorized user</li>',
                            '<li>Proper single-page (without redirects) Login/Logout flow</li>',
                        '</ul>',
                        '<br>',
                        '<h2>Todo:</h2>',
                        '<ul>',
                            '<li>Encapsulate a Login/Logout transport\'s logic inside of the Store</li>',
                            '<li>Figure out: tests, i18n, build ...</li>',
                        '</ul>'
                    ].join('')
                }, {
                    itemId: 'iplist',
                    xtype: 'iplist'
                }]
            };

        this.items = {
            xtype: 'panel',
            width: '100%',
            height: '100%',

            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    xtype: 'component',
                    flex: 1
                }, {
                    xtype: 'button',
                    text: 'logout',
                    action: 'logout'
                }]
            }],

            items: [tabs]
        };

        this.callParent(arguments);
    }

});
