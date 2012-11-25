/*global Ext: true*/
Ext.define('AM.controller.Profile', {
    extend: 'Ext.app.Controller',

    stores: ['CurrentUser'],

    refs: [{
        selector: 'logindialog',
        ref: 'logindialog'
    }],

    init: function() {
        this.control({
            'logindialog': {
                success: this.onLogin
            },
            'button[action=logout]': {
                click: this.onLogout
            }
        });
    },

    // Check authorization state
    checkAuthState: function () {
        this.getCurrentUserStore().load({
            scope: this,
            callback: function(records) {
                this.application.fireEvent('authchange', !!records.length);
            }
        });
    },

    onLogin: function (data) {
        if (data.user) {
            this.getCurrentUserStore().loadRawData(data);
            this.application.fireEvent('authchange', true);
        }
    },

    onLogout: function () {
        var store = this.getCurrentUserStore(),
            currentUser = store.first();

        if (currentUser) {
            currentUser.destroy({
                scope: this,
                success: function (model) {
                    // persist the state
                    model.commit();
                    store.removeAll();
                    this.application.fireEvent('authchange', false);
                }
            });
        }
    }
});
