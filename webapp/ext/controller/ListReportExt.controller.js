sap.ui.controller("Prototype_AdoptCoA.ext.controller.ListReportExt", {

	//******************
	/*  onInit        */
	//******************
	onInit: function () {

		this.getOwnerComponent().getAppComponent().setExtensionAPI(this.extensionAPI);

		var oView = this.getView();
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({
			oStatusButtonUpload: false,
			oStatusButtonDownload: false,
			oStatusButtonRenumber: false, //must be checked
			oStatusButtonActivate: false,
			oStatusButtonDiscard: false
		});

		oView.setModel(oModel, "MODELSTATUSACTION");
		//	this.getView().addDependent(oModel);
	},

	//********************
	/*  Template Events */
	//********************
	onBeforeRebindTableExtension: function () {
		//var oView = this.getView();
		// var oRespTab = this.byId("responsiveTable");
		this._setButtons();
	},
	onBeforeRendering: function () {
		//var oView = this.getView();
		// var oRespTab = this.byId("responsiveTable");
		this._setButtons();
	},
	BeforeRendering: function () {
		//var oView = this.getView();
		// var oRespTab = this.byId("responsiveTable");
		this._setButtons();
	},
	onAfterRendering: function () {
		this._setButtons();
	},

	//********************
	/*  Download        */
	//********************
	onClickActionAdoptCoA1: function (oEvent) {
		//Download

		//get the Extension API (for backend call)
		var oComponent = this.getOwnerComponent();
		var aComponent = oComponent.getAppComponent();
		var oExtensionAPI = aComponent.getExtensionAPI();

		// //get the values from the smart filter bar
		// var oView = this.getView();
		// var oSmartFilter = oView.byId(
		// 	"Prototype_AdoptCoA::sap.suite.ui.generic.template.ListReport.view.ListReport::AdoptCoA--listReportFilter");
		// var oFilterData = oSmartFilter.getFilterData();
		// var oCoA = oFilterData.ChartOfAccounts;
		// var CoA = oCoA.value;
		// var FSV = oFilterData.FinancialStatementVariant.value;

		// // fill the parameters
		// var mParameters = {
		// 	"versn": FSV,
		// 	"ktopl": CoA
		// };
		// var oPromise = oExtensionAPI.invokeActions("/download", [], mParameters); //oContext
		// var that = this;

		// oPromise.then(function (aResponse) {
		// 	that._setButtons();
		// }).catch(function (ex) {
		// 	var oJsonError = JSON.parse(ex[0].error.response.responseText);
		// 	var oMessage = oJsonError.error.message;
		// 	sap.m.MessageBox.information(oMessage.value);

		// 	that._setButtons();
		// });
		//var oNavigationController = this.extensionAPI.getNavigationController();
		//get Row Binding (here are all informations for spreadsheet export)
		var oRespTab = this.byId("responsiveTable");
		var oRowBinding = oRespTab.getBinding('items');

		var oExportLibLoadPromise = sap.ui.getCore().loadLibrary("sap.ui.export", true);
		//var oComponent = this.getOwnerComponent();
		// var oSmartTable = this.getView().byId(
		// 	"Prototype_AdoptCoA::sap.suite.ui.generic.template.ListReport.view.ListReport::AdoptCoA--listReport");
		// var oRowBinding = oSmartTable._oTable.getBinding('items');

		// define which columns are downloaded
		var aCols = this.createColumnConfig();

		var oSettings = {
			workbook: {
				columns: aCols,
				hierarchyLevel: 'Level'
			},
			dataSource: {
				type: 'odata',
				dataUrl: oRowBinding.getDownloadUrl ? oRowBinding.getDownloadUrl() : null,
				serviceUrl: oRowBinding.getModel().sServiceUrl,
				headers: oRowBinding.getModel().getHeaders ? oRowBinding.getModel().getHeaders() : null,
				count: oRowBinding.getLength ? oRowBinding.getLength() : null,
				useBatch: true // Default for ODataModel V2
			},
			fileName: 'Adopt_CoA.xlsx',
			worker: false // We need to disable worker because we are using a MockServer as OData Service
		};

		oExportLibLoadPromise.then(function () {
			sap.ui.require(["sap/ui/export/Spreadsheet"], function (Spreadsheet) {
				var oSheet = new Spreadsheet(oSettings);

				oSheet.build().finally(function () {
					oSheet.destroy();
				});
			});
		});

		//now set activity of actions
		var oStatusButtonUpload = true;
		var oStatusButtonDownload = true;
		var oStatusButtonRenumber = false;
		var oStatusButtonActivate = false;
		var oStatusButtonDiscard = false;
		this._setModelStatusAction(oStatusButtonUpload, oStatusButtonDownload, oStatusButtonRenumber, oStatusButtonActivate,
			oStatusButtonDiscard);
		this._setButtons();
	},

	// onDownload: function (oEvent) {

	// 	this.onClickActionAdoptCoA1();

	// },
	// 	handleDownloadPress: function() 
	// {
	// 	  var oFileUploader = this.byId('fileUploader');
	// 	  var file = sap.ui.getCore()._file;
	// 	  var file2 = sap.ui.getCore()._file;
	// 	  var raw = "";
	// 	  var raw2 = "";

	// var reader = new FileReader();

	// 	  reader.onload = function () {
	// 	    sap.m.MessageBox.show(reader.result);
	// 	  };

	// 	  reader.readAsBinaryString(sap.ui.getCore()._file);

	// 	// var domRef = oFileUploader.getFocusDomRef();
	// 	// var file = domRef.files[0];
	// 	// var that = this;
	// 	// this.fileName = file.name;
	// 	// this.fileType = file.type;

	// 		//oFileUploader.setProperty("uploadUrl", "/sap/opu/odata/SAP/ZKK_UPLOAD_01_SRV/FileSet('1337.jpg')/$value", true);
	// 		//oFileUploader.upload();

	// 	//#####################################################################################################################

	// 	//var url2 = "/sap/opu/odata/SAP/ZKK_UPLOAD_01_SRV/FileSet('" + oFileUploader.get 

	// 	var url1 = "/sap/opu/odata/SAP/ZKK_UPLOAD_01_SRV/FileSet('hallo3.txt')/$value";

	// 	var aData = jQuery.ajax
	// 	(
	// 	{

	//         url : url1,

	//         headers: 
	//         { 
	//           "X-Requested-With": "XMLHttpRequest",
	//           "DataServiceVersion": "2.0" 
	//         },    

	//         type: "PUT",
	//         data: reader.result,
	//         contentType : sap.ui.getCore()._file.fileType,
	//         //dataType : "json",

	// 	success : function(data, textStatus, jqXHR) 
	// 	{
	//         //this.csrfToken = jqXHR.getResponseHeader("x-csrf-token");
	//         //oFileUploader.setCsrf(this.csrfToken);
	//         //oFileUploader.setSlug('200000664_MOB15');
	//         //oFileUploader.setUploadUrl();
	//         //oFileUploader.upload();

	//       //var oImage = new Image();
	// 	  //oImage.src = data.toString();

	// 	  sap.m.MessageBox.show("success");

	//          var a = 1;

	//        },

	//         error: function(XMLHttpRequest, textStatus, errorThrown) 
	//         {
	// 			sap.m.MessageBox.show("ERROR!!!");
	//         }

	//       });

	// },	

	// handleDownloadComplete: function (oEvent) {
	// 	var sResponse = oEvent.getParameter("response");
	// 	if (sResponse) {
	// 		var sMsg = "";
	// 		var m = /^\[(\d\d\d)\]:(.*)$/.exec(sResponse);
	// 		if (m[1] === "200") {
	// 			sMsg = "Return Code: " + m[1] + "\n" + m[2] + "(Download Success)";
	// 			oEvent.getSource().setValue("");
	// 		} else {
	// 			sMsg = "Return Code: " + m[1] + "\n" + m[2] + "(Download Error)";
	// 		}

	// 		sap.m.MessageToast.show(sMsg);
	// 	}
	// },

	//********************
	/*  Upload          */
	//********************	
	//  Jörg's Upload stuff
	// onClickActionAdoptCoA2: function (oEvent) {

	// 	//sap.m.MessageBox.error("test",{});

	// 	//Upload
	// 	this.onOpenDialog();
	// 	var oComponent = this.getOwnerComponent();
	// 	var aComponent = oComponent.getAppComponent();
	// 	var oExtensionAPI = aComponent.getExtensionAPI();

	// 	//get the values from the smart filter bar
	// 	var oView = this.getView();
	// 	var oSmartFilter = oView.byId("Adopt2::sap.suite.ui.generic.template.ListReport.view.ListReport::AdoptCoA--listReportFilter");
	// 	var oFilterData = oSmartFilter.getFilterData();
	// 	var oCoA = oFilterData.ChartOfAccounts;
	// 	var CoA = oCoA.value;
	// 	var FSV = oFilterData.FinancialStatementVariant.value;

	// 	// fill the parameters
	//		var mParameters = {
	// 		"impnumber": 4711,
	// 		"url": "C:\Users\d023489\Downloads\Adopt_CoA (2).xlsx",
	// 		"versn": FSV,
	// 		"ktopl": CoA
	// 	};

	// 	var oPromise = oExtensionAPI.invokeActions("/upload", [], mParameters); //oContext
	// 	var that = this;

	// 	oPromise.then(function (aResponse) {
	// 		//			var oResouceBundle = that.oController.getView().getModel("i18n").getResourceBundle();
	// 		//var oSuccessMessage = "SUCCESS";
	// 		// sap.m.MessageBox.information(oSuccessMessage);
	// 		that._setButtons();
	// 		// that.oController.getView().setBusy(false);
	// 	}).catch(function (ex) {
	// 			var oJsonError = JSON.parse(ex[0].error.response.responseText);
	// 			var oMessage = oJsonError.error.message;
	// 			// var oResolution = oJsonError.error.innererror.Error_Resolution;
	// 			sap.m.MessageBox.information(oMessage.value);

	// 			// var oConfirmMessage = [];
	// 			// //	oConfirmMessageExists = false;
	// 			//  for (var i = 0; i < oMessage.length; i++) {
	// 			// // 	// if (oMessage[i].code === "FCLM_BAM_MAINT2/023") {
	// 			//  	oConfirmMessage.push(oMessage[i]);
	// 			// // 	// 	oConfirmMessageExists = true;
	// 			//  }
	// 			that._setButtons();
	// 		}
	// 		// if (oConfirmMessageExists) {
	// 		// 	that.reportWarningMessages(oConfirmMessage);
	// 		// } else {
	// 		// 	for (var j = 0; j < oMessage.length; j++) {
	// 		// 		if (oMessage[j].code !== "/IWBEP/CX_MGW_BUSI_EXCEPTION") {
	// 		// 			sap.m.MessageBox.error(oMessage[j].message);
	// 		// 		}
	// 		// 	}
	// 		// 	that.oController.getView().setBusy(false);
	// 		// }
	// 	);
	// 	var oStatusButtonUpload = false;
	// 	var oStatusButtonDownload = false;
	// 	var oStatusButtonRenumber = true; //must be checked
	// 	var oStatusButtonActivate = true;
	// 	var oStatusButtonDiscard = true;

	// 	this._setModelStatusAction(oStatusButtonUpload, oStatusButtonDownload, oStatusButtonRenumber, oStatusButtonActivate,
	// 		oStatusButtonDiscard);
	// 	this._setButtons();
	// },

	onClickActionAdoptCoA2: function (oEvent) {
//      @Kubi: wollte den Status erst mal prüfen - bin aber nicht über das Popup hinweggekommen
//		this._openSecondDialog();
		
		var oStatusButtonUpload = false;
		var oStatusButtonDownload = false;
		var oStatusButtonRenumber = true; //must be checked
		var oStatusButtonActivate = true;
		var oStatusButtonDiscard = true;

		this._setModelStatusAction(oStatusButtonUpload, oStatusButtonDownload, oStatusButtonRenumber, oStatusButtonActivate,
			oStatusButtonDiscard);
		this._setButtons();
	},

	_openSecondDialog: function () {
		// create dialog lazily
		if (!this._oDialog) {
			// create dialog via fragment factory
			this._oDialog = sap.ui.xmlfragment(this.getView().getId(), "myview", this);

			// connect dialog to view (models, lifecycle)
			this.getView().addDependent(this._oDialog);
		}
		this._getDialog().open();

	},

	handleUploadComplete: function (oEvent) {
		var sResponse = oEvent.getParameter("response");
		if (sResponse) {

			sap.m.MessageToast.show(sResponse.toString());
		}
	},

	onFileChange: function (e) {
		sap.ui.getCore()._file = e.getParameter("files") && e.getParameter("files")[0];

		var reader = new FileReader();

		reader.onload = function () {
			sap.m.MessageBox.show(reader.result);

			var url1 = "/sap/opu/odata/SAP/ZKK_UPLOAD_01_SRV/FileSet('hallo4.txt')/$value";

			var aData = jQuery.ajax({

				url: url1,

				headers: {
					"X-Requested-With": "XMLHttpRequest",
					"DataServiceVersion": "2.0"
				},

				type: "PUT",
				data: reader.result,
				contentType: sap.ui.getCore()._file.fileType,
				//dataType : "json",

				success: function (data, textStatus, jqXHR) {

					sap.m.MessageBox.show("success");

					var a = 1;

				},

				error: function (XMLHttpRequest, textStatus, errorThrown) {
					sap.m.MessageBox.show("ERROR!!!");
				}

			});

		};

		reader.readAsBinaryString(sap.ui.getCore()._file);
	},

	handleUploadPress: function () {
		var oFileUploader = this.byId('fileUploader');
		var imageBox = this.byId('imageBox');

		if (oFileUploader.getValue() === "") {
			sap.m.MessageToast.show("Please choose a file first!");
		}

		//oFileUploader.setProperty("uploadUrl", "/sap/opu/odata/SAP/ZKK_UPLOAD_01_SRV/FileSet('1337.jpg')/$value", true);
		//oFileUploader.upload();

		//#####################################################################################################################

		//var url2 = "/sap/opu/odata/SAP/ZKK_UPLOAD_01_SRV/FileSet('" + oFileUploader.get 

		var url1 = "/sap/opu/odata/SAP/ZKK_UPLOAD_01_SRV/FileSet('hallo2.txt')/$value";

		var aData = jQuery.ajax({

			url: url1,

			headers: {
				"X-CSRF-Token": "Fetch",
				"X-Requested-With": "XMLHttpRequest",
				"DataServiceVersion": "2.0"
			},

			type: "GET",
			//contentType : "image/jpeg",
			//dataType : "json",

			success: function (data, textStatus, jqXHR) {
				//this.csrfToken = jqXHR.getResponseHeader("x-csrf-token");
				//oFileUploader.setCsrf(this.csrfToken);
				//oFileUploader.setSlug('200000664_MOB15');
				//oFileUploader.setUploadUrl();
				//oFileUploader.upload();

				//var oImage = new Image();
				//oImage.src = data.toString();

				//joerg 1

				sap.m.MessageBox.show(data);

				var a = 1;

			},

			error: function (XMLHttpRequest, textStatus, errorThrown) {
				sap.m.MessageBox.show("ERROR!!!");
			}

		});
	},

	_getDialog: function () {
		// create dialog lazily
		if (!this._oDialog) {
			// create dialog via fragment factory
			this._oDialog = sap.ui.xmlfragment("dlgUpload", "myview", this);

			// connect dialog to view (models, lifecycle)
			this.getView().addDependent(this._oDialog);
		}
		return this._oDialog;
	},

	onOpenDialog: function () {
		this._getDialog().open();
	},

	onCloseDialog: function () {
		this._getDialog().close();
	},

	//********************
	/*  Renumber        */
	//********************
	onClickActionAdoptCoA3: function (oEvent) {
		//Renumber

		//get the values from the smart filter bar
		var oFilterData = this.getView().byId(
			"Prototype_AdoptCoA::sap.suite.ui.generic.template.ListReport.view.ListReport::AdoptCoA--listReportFilter").getFilterData();
		var CoA = oFilterData.ChartOfAccounts.value;
		var FSV = oFilterData.FinancialStatementVariant.value;

		// fill the parameters
		var mParameters = {
			"versn": FSV,
			"ktopl": CoA
		};

		var oComponent = this.getOwnerComponent();
		var aComponent = oComponent.getAppComponent();
		var oExtensionAPI = aComponent.getExtensionAPI();

		var oPromise = oExtensionAPI.invokeActions("/renumber", [], mParameters); //oContext
		var that = this;
		oPromise.then(function (aResponse) {
			that._setButtons();
		}).catch(function (ex) {
			var oJsonError = JSON.parse(ex[0].error.response.responseText);
			var oMessage = oJsonError.error.message;
			sap.m.MessageBox.information(oMessage.value);

			that._setButtons();
		});

		var oStatusButtonUpload = false;
		var oStatusButtonDownload = false;
		var oStatusButtonRenumber = false; //must be checked
		var oStatusButtonActivate = true;
		var oStatusButtonDiscard = true;

		this._setModelStatusAction(oStatusButtonUpload, oStatusButtonDownload, oStatusButtonRenumber, oStatusButtonActivate,
			oStatusButtonDiscard);
		this._setButtons();
	},

	//********************
	/*  Activate/Save          */
	//********************
	onClickActionAdoptCoA4: function (oEvent) {
		//Activate
		var oComponent = this.getOwnerComponent();
		var aComponent = oComponent.getAppComponent();
		var oExtensionAPI = aComponent.getExtensionAPI();

		//get the values from the smart filter bar
		var oFilterData = this.getView().byId(
			"Prototype_AdoptCoA::sap.suite.ui.generic.template.ListReport.view.ListReport::AdoptCoA--listReportFilter").getFilterData();
		var CoA = oFilterData.ChartOfAccounts.value;
		var FSV = oFilterData.FinancialStatementVariant.value;

		// fill the parameters
		var mParameters = {
			"versn": FSV,
			"ktopl": CoA
		};

		var oPromise = oExtensionAPI.invokeActions("/activate", [], mParameters); //oContext
		var that = this;
		oPromise.then(function (aResponse) {
			that._setButtons();
		}).catch(function (ex) {
			var oJsonError = JSON.parse(ex[0].error.response.responseText);
			var oMessage = oJsonError.error.message;
			sap.m.MessageBox.information(oMessage.value);

			that._setButtons();
		});
		var oStatusButtonUpload = true;
		var oStatusButtonDownload = true;
		var oStatusButtonRenumber = false; //must be checked
		var oStatusButtonActivate = false;
		var oStatusButtonDiscard = false;

		this._setModelStatusAction(oStatusButtonUpload, oStatusButtonDownload, oStatusButtonRenumber, oStatusButtonActivate,
			oStatusButtonDiscard);
		this._setButtons();

	},

	//********************
	/*  Discard         */
	//********************
	onClickActionAdoptCoA5: function (oEvent) {
		//Discard
		var oComponent = this.getOwnerComponent();
		var aComponent = oComponent.getAppComponent();
		var oExtensionAPI = aComponent.getExtensionAPI();

		//get the values from the smart filter bar
		var oFilterData = this.getView().byId(
			"Prototype_AdoptCoA::sap.suite.ui.generic.template.ListReport.view.ListReport::AdoptCoA--listReportFilter").getFilterData();
		var CoA = oFilterData.ChartOfAccounts.value;
		var FSV = oFilterData.FinancialStatementVariant.value;

		// fill the parameters
		var mParameters = {
			"versn": FSV,
			"ktopl": CoA
		};

		var oPromise = oExtensionAPI.invokeActions("/discard", [], mParameters);
		var that = this;
		oPromise.then(function (aResponse) {

			that._setButtons();
		}).catch(function (ex) {

			that._setButtons();
		});

		var oStatusButtonUpload = true;
		var oStatusButtonDownload = true;
		var oStatusButtonRenumber = false;
		var oStatusButtonActivate = false;
		var oStatusButtonDiscard = false;
		this._setModelStatusAction(oStatusButtonUpload, oStatusButtonDownload, oStatusButtonRenumber, oStatusButtonActivate,
			oStatusButtonDiscard);
		this._setButtons();
	},

	// _decodeFromBase64: function (input) {
	// 	var input = input.replace(/\s/g, '');
	// 	return atob(input);
	// },
	_setModelStatusAction: function (oStatusUpload, oStatusDownload, oStatusRenumber, oStatusActivate, oStatusDiscard) {
		var oView = this.getView();
		var oModel = oView.getModel("MODELSTATUSACTION");
		oModel.setData({
			oStatusButtonUpload: oStatusUpload,
			oStatusButtonDownload: oStatusDownload,
			oStatusButtonRenumber: oStatusRenumber, //must be checked
			oStatusButtonActivate: oStatusActivate,
			oStatusButtonDiscard: oStatusDiscard
		});

	},

	_setButtons: function () {
		//Buttons
		//Download
		var oButtonDownload = sap.ui.getCore().byId(
			"Prototype_AdoptCoA::sap.suite.ui.generic.template.ListReport.view.ListReport::AdoptCoA--ActionAdoptCoA1button");
		//Upload
		var oButtonUpload = sap.ui.getCore().byId(
			"Prototype_AdoptCoA::sap.suite.ui.generic.template.ListReport.view.ListReport::AdoptCoA--ActionAdoptCoA2button");
		//Renumber	
		var oButtonRenumber = sap.ui.getCore().byId(
			"Prototype_AdoptCoA::sap.suite.ui.generic.template.ListReport.view.ListReport::AdoptCoA--ActionAdoptCoA3button");
		//Activate	
		//	var oButtonActive = this.byId("ActionAdoptCoA4button");
		var oButtonActivate = sap.ui.getCore().byId(
			"Prototype_AdoptCoA::sap.suite.ui.generic.template.ListReport.view.ListReport::AdoptCoA--ActionAdoptCoA4button");
		//Discard
		var oButtonDiscard = sap.ui.getCore().byId(
			"Prototype_AdoptCoA::sap.suite.ui.generic.template.ListReport.view.ListReport::AdoptCoA--ActionAdoptCoA5button");

		var oModel = this.getView().getModel("MODELSTATUSACTION");

		var oStatDownload = oModel.getProperty("/oStatusButtonDownload");
		var oStatUpload = oModel.getProperty("/oStatusButtonUpload");
		var oStatRenumber = oModel.getProperty("/oStatusButtonRenumber");
		var oStatActivate = oModel.getProperty("/oStatusButtonActivate");
		var oStatDiscard = oModel.getProperty("/oStatusButtonDiscard");

		//		oButtonDownload.setEnabled(this.oModel.oData.oStatusButtonDownload);
		oButtonDownload.setEnabled(oStatDownload);
		oButtonUpload.setEnabled(oStatUpload);
		oButtonRenumber.setEnabled(oStatRenumber);
		oButtonActivate.setEnabled(oStatActivate);
		oButtonDiscard.setEnabled(oStatDiscard);
	},

	createColumnConfig: function () {
		var aCols = [];
		// var EdmTypeLibLoadPromise = sap.ui.getCore().loadLibrary("sap.ui.export", false);
		//		oExportLibLoadPromise.then(function () {
		//		sap.ui.require(["sap/ui/export/EdmType"], function (EdmType) {		
		aCols.push({
			label: 'FinancialStatementVariant',
			property: 'FinancialStatementVariant'
				//			type: sap.ui.export.EdmType.String
		});
		aCols.push({
			label: 'FinStatementItemDescription',
			property: 'FinStatementItemDescription'
				//type: sap.ui.export.EdmType.String
		});

		aCols.push({
			label: 'GLAccount',
			property: 'GLAccount'
				//type: sap.ui.export.EdmType.String
		});

		aCols.push({
			property: 'GLAccountLongName'
				//type: sap.ui.export.EdmType.String
		});
		aCols.push({
			property: 'AccountIsMarkedForDeletion'
				//type: sap.ui.export.EdmType.String
		});
		aCols.push({
			property: 'action'
				//type: sap.ui.export.EdmType.String
		});
		aCols.push({
			property: 'check_result'
				//type: sap.ui.export.EdmType.String
		});
		aCols.push({
			property: 'GLAccount_new'
				//type: sap.ui.export.EdmType.String
		});
		aCols.push({
			property: 'AccountIsMarkedForDeletion_new'
				//type: sap.ui.export.EdmType.String
		});
		aCols.push({
			property: 'ChartOfAccounts'
				//type: sap.ui.export.EdmType.String
		});
		aCols.push({
			property: 'FinStatementItemDescription'
				//type: sap.ui.export.EdmType.String
		});
		aCols.push({
			property: 'IsDebitBalanceRelevant'
		});
		aCols.push({
			property: 'IsCreditBalanceRelevant'
		});
		aCols.push({
			property: 'FunctionalArea'
		});
		aCols.push({
			property: 'FinancialStatementItem'
		});
		aCols.push({
			property: 'FinStatementHierarchyLevelVal'
		});

		// 	property: 'HierarchyNode',
		// 	property: 'HierarchyNodeUniqueID',
		// 18: "NodeType"
		// 19: "SemanticTag"
		return aCols;
	}

	// handleDownloadPress: function (oEvent) {
	// 	var sResponse = oEvent.getParameter("fileDownloader");
	// 	sap.m.MessageBox.show("Download not implemented yet =)");
	// }

});