sap.ui.define([
    "sap/base/util/UriParameters",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "sap/f/library",
    "project2/model/models",
    "sap/f/FlexibleColumnLayoutSemanticHelper"
], function (UriParameters,UIComponent,JSONModel, Device,library, models,FlexibleColumnLayoutSemanticHelper) {
	"use strict";
	var LayoutType = library.LayoutType;
	return UIComponent.extend("project2.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
	var oModel = new JSONModel();
			this.setModel(oModel);

			// set products demo model on this sample
            var oProductsModel = new JSONModel(jQuery.sap.getModulePath("project2", "./json/products.json"));
			oProductsModel.setSizeLimit(1000);
			this.setModel(oProductsModel, "products");

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
        },
        getHelper: function () {
			var oFCL = this.getRootControl().byId("fcl"),
				oParams = UriParameters.fromQuery(location.search),
				oSettings = {
					defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
					defaultThreeColumnLayoutType: LayoutType.ThreeColumnsMidExpanded,
					mode: oParams.get("mode"),
					maxColumnsCount: oParams.get("max")
				};

			return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings);
		}
	});
});
