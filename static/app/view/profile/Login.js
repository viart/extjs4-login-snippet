/*global Ext: true*/
Ext.define('AM.view.profile.Login', {
    extend: 'Ext.Window',
    alias: 'widget.logindialog',

    title: 'Please login',
    width: 400,
    autoHeight: true,
    closable: false,
    resizable: false,
    draggable: false,
    layout: 'fit',
    border: false,
    modal: true,

    autoShow: true,

    defaultFocus: 'userName',

    initComponent: function () {

        // helper for the Form submitting by Enter click
        function onSpecialkey(field, e) {
            if (e.getKey() === e.ENTER) {
                this.process();
            }
        }

        Ext.apply(this, {
            items: [{
                xtype: 'form',
                plain: true,
                frame: true,
                border: 0,
                bodyPadding: 5,
                url: this.url || '/login',
                items: [{
                    itemId: 'userName',
                    xtype: 'textfield',
                    fieldLabel: 'Username',
                    name: 'username',
                    allowBlank: false,
                    anchor: '100%',
                    selectOnFocus: true,
                    listeners: {
                        scope: this,
                        specialkey: onSpecialkey
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Password',
                    name: 'password',
                    inputType: 'password',
                    allowBlank: false,
                    anchor: '100%',
                    selectOnFocus: true,
                    listeners: {
                        scope: this,
                        specialkey: onSpecialkey
                    }
                }],
                listeners: {
                    scope: this,
                    validitychange: function (form, isValid) {
                        this.down('#submit')[isValid ? 'enable' : 'disable']();
                    }
                }
            }],
            buttons: [{
                itemId: 'submit',
                text: 'Login',
                disabled: true,
                scope: this,
                handler: function () {
                    this.process();
                }
            }]
        });

        this.callParent(arguments);
    },

    process: function () {
        var form = this.down('form').getForm();
        form.submit({
            method: 'POST',
            waitTitle: 'Connecting',
            waitMsg: 'Sending data...',
            scope: this,
            success: function(form, data) {
                this.close();
                this.fireEvent('success', data.result);
            },
            failure: function(form, data) {
                var title,
                    body;

                this.fireEvent('fail', data);

                if (data.failureType === 'server') {
                    title = 'Login Failed!';
                    body = data.result.errors.msg;
                } else {
                    title = 'Warning!';
                    //XSS?
                    body = 'Authentication server is unreachable: ' + data.response.responseText;
                }
                Ext.Msg.alert(title, body);
            }
        });
    }
});
