/*global Ext: true*/
Ext.application({

    name: 'AM',
    appFolder: 'static/app',

    stores: ['Ips', 'CurrentUser'],
    controllers: ['Profile'],

    launch: function() {
        this.on({
            authchange: this.onAuthChange
        });

        // Check the current Auth state
        // 'authchange' event will be triggered as result
        this.getController('Profile').checkAuthState();
    },

    onAuthChange: function (isAuthorized) {
        // do cleanup before the new Viewport showing
        if (this.viewport) {
            this.viewport.destroy();
        }
        this.viewport = Ext.create(isAuthorized ? 'AM.view.UserViewport' : 'AM.view.GuestViewport');
    }
});
