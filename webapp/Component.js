sap.ui.define([
    "sap/ui/core/UIComponent",
    "zsdgrpshipment/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("zsdgrpshipment.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
            this.setModel(new sap.ui.model.json.JSONModel(), "create");
            this.setModel(new sap.ui.model.json.JSONModel(), "item");
            this.setModel(new sap.ui.model.json.JSONModel(), "Header");
            // enable routing
            this.getRouter().initialize();
        }
    });
});