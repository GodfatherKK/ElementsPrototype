
sap.ui.controller("Prototype_AdoptCoA.ext.controller.ListReportExt", {



	onInit: function() {
		
		this.getOwnerComponent().getAppComponent().setExtensionAPI(this.extensionAPI);
	},

	onDownload: function (oEvent) {

		this.onClickActionAdoptCoA1();

	},
	
	
	onUpload: function (oEvent) {
		
         this._openSecondDialog();

	},
	
	_openSecondDialog: function ()
	{
		// create dialog lazily
		if (!this._oDialog) 
		{
			// create dialog via fragment factory
			this._oDialog = sap.ui.xmlfragment(this.getView().getId(), "myview", this);
			
			// connect dialog to view (models, lifecycle)
			this.getView().addDependent(this._oDialog);
		}
		this._getDialog().open();
		
	},
	
	handleUploadComplete: function(oEvent) 
	{
			var sResponse = oEvent.getParameter("response");
			if (sResponse) {
			

				sap.m.MessageToast.show(sResponse.toString());
			}
	},

	onFileChange: function(e)
	{
        sap.ui.getCore()._file = e.getParameter("files") && e.getParameter("files")[0];
 

 
		var reader = new FileReader();
		
		  reader.onload = function () {
		    sap.m.MessageBox.show(reader.result);
		    
	
		    
		var url1 = "/sap/opu/odata/SAP/ZKK_UPLOAD_01_SRV/FileSet('hallo4.txt')/$value";
 
		var aData = jQuery.ajax
		(
		{

          url : url1,

          headers: 
          { 
            "X-Requested-With": "XMLHttpRequest",
            "DataServiceVersion": "2.0" 
          },    

          type: "PUT",
          data: reader.result,
          contentType : sap.ui.getCore()._file.fileType,
          //dataType : "json",

		success : function(data, textStatus, jqXHR) 
		{

		  sap.m.MessageBox.show("success");

           var a = 1;
          
         },

          error: function(XMLHttpRequest, textStatus, errorThrown) 
          {
				sap.m.MessageBox.show("ERROR!!!");
          }

        });
		    
		  };
		
		  reader.readAsBinaryString(sap.ui.getCore()._file);
 
 
 	
 
 
 
 
 
	},

	handleUploadPress: function() 
	{
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
		
		var aData = jQuery.ajax
		(
		{

          url : url1,

          headers: 
          { 
          	"X-CSRF-Token": "Fetch" ,
            "X-Requested-With": "XMLHttpRequest",
            "DataServiceVersion": "2.0" 
          },    

          type: "GET",
          //contentType : "image/jpeg",
          //dataType : "json",

		success : function(data, textStatus, jqXHR) 
		{
          //this.csrfToken = jqXHR.getResponseHeader("x-csrf-token");
          //oFileUploader.setCsrf(this.csrfToken);
          //oFileUploader.setSlug('200000664_MOB15');
          //oFileUploader.setUploadUrl();
          //oFileUploader.upload();
          
	      //var oImage = new Image();
		  //oImage.src = data.toString();

		  
		  sap.m.MessageBox.show(data);
		  

           
           var a = 1;
          
         },

          error: function(XMLHttpRequest, textStatus, errorThrown) 
          {
				sap.m.MessageBox.show("ERROR!!!");
          }

        });


	},
		
	
		
	handleDownloadPress: function() 
	{
		  var oFileUploader = this.byId('fileUploader');
		  var file = sap.ui.getCore()._file;
		  var file2 = sap.ui.getCore()._file;
		  var raw = "";
		  var raw2 = "";
		  
	var reader = new FileReader();
		
		  reader.onload = function () {
		    sap.m.MessageBox.show(reader.result);
		  };
		
		  reader.readAsBinaryString(sap.ui.getCore()._file);
	
	
		// var domRef = oFileUploader.getFocusDomRef();
		// var file = domRef.files[0];
		// var that = this;
		// this.fileName = file.name;
		// this.fileType = file.type;
		

			//oFileUploader.setProperty("uploadUrl", "/sap/opu/odata/SAP/ZKK_UPLOAD_01_SRV/FileSet('1337.jpg')/$value", true);
			//oFileUploader.upload();
			
		//#####################################################################################################################
		
		//var url2 = "/sap/opu/odata/SAP/ZKK_UPLOAD_01_SRV/FileSet('" + oFileUploader.get 
		
		var url1 = "/sap/opu/odata/SAP/ZKK_UPLOAD_01_SRV/FileSet('hallo3.txt')/$value";
		
		var aData = jQuery.ajax
		(
		{

          url : url1,

          headers: 
          { 
            "X-Requested-With": "XMLHttpRequest",
            "DataServiceVersion": "2.0" 
          },    

          type: "PUT",
          data: reader.result,
          contentType : sap.ui.getCore()._file.fileType,
          //dataType : "json",

		success : function(data, textStatus, jqXHR) 
		{
          //this.csrfToken = jqXHR.getResponseHeader("x-csrf-token");
          //oFileUploader.setCsrf(this.csrfToken);
          //oFileUploader.setSlug('200000664_MOB15');
          //oFileUploader.setUploadUrl();
          //oFileUploader.upload();
          
	      //var oImage = new Image();
		  //oImage.src = data.toString();

		  
		  sap.m.MessageBox.show("success");
		  

           
           var a = 1;
          
         },

          error: function(XMLHttpRequest, textStatus, errorThrown) 
          {
				sap.m.MessageBox.show("ERROR!!!");
          }

        });


	},	


	_getDialog: function () 
	{
		// create dialog lazily
		if (!this._oDialog) 
		{
			// create dialog via fragment factory
			this._oDialog = sap.ui.xmlfragment("dlgUpload", "myview", this);
			
			// connect dialog to view (models, lifecycle)
			this.getView().addDependent(this._oDialog);
		}
		return this._oDialog;
    },

	onOpenDialog: function () 
	{
		this._getDialog().open();
	},
	
	onCloseDialog: function () {
	this._getDialog().close();
	},

	onRenumber: function (oEvent) {
	
	},
	onActivate: function (oEvent) {},
	onDiscard: function (oEvent) {},


    onClickActionAdoptCoA1: function (oEvent) 
    {
    	var oComponent = this.getOwnerComponent();
		var aComponent = oComponent.getAppComponent();
		var oExtensionAPI = aComponent.getExtensionAPI();
		var oTable = this.byId("responsiveTable");
		var oContext = this.extensionAPI.getSelectedContexts(oTable);
	
		var oPromise = oExtensionAPI.invokeActions("/activate", oContext, []);
		var that = this;
	
		oPromise.then(function (aResponse) {
			
			var oSuccessMessage = "SUCCESS";
			sap.m.MessageBox.information(oSuccessMessage);
		}).catch(function (ex)  {
			
			var oJsonError = JSON.parse(ex[0].error.response.responseText);
			var oMessage = oJsonError.error.message;
			var oResolution = oJsonError.error.innererror.Error_Resolution;
			sap.m.MessageBox.information(oMessage.value);
			
		});
	
   },
    
	onClickActionAdoptCoA2: function (oEvent) {},
	onClickActionAdoptCoA3: function (oEvent) {},
	onClickActionAdoptCoA4: function (oEvent) {},
	onClickActionAdoptCoA5: function (oEvent) {}
});