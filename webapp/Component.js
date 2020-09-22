jQuery.sap.declare("Prototype_AdoptCoA.Component");
sap.ui.getCore().loadLibrary("sap.ui.generic.app");
jQuery.sap.require("sap.ui.generic.app.AppComponent");
sap.ui.generic.app.AppComponent.extend("Prototype_AdoptCoA.Component", {
		metadata: {
			"manifest": "json"
		},
		
		
		setExtensionAPI: function (oExtensionAPI) {
			this._oExtensionAPI = oExtensionAPI;
		},
		
		getExtensionAPI: function () {
			return this._oExtensionAPI;
		}
		
		

});