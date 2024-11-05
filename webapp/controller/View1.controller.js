sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("zfileupload.controller.View1", {
            onInit: function () {

            },
            handleUploadComplete: function () {
                var fileUploader = this.getView().byId("itemlist");
                fileUploader.getModel().refresh(true)
                sap.m.MessageToast.show("Refreshed")
            },
            handleUploadPress: function () {
                var oModel = this.getView().getModel();
                var oTable = this.getView().byId("idTable");
                var oBinding = oTable.getBinding("items");

                var fileUploader = this.getView().byId("fileUploader");

                if (fileUploader.getValue() == "") {
                    alert("Please Choose any File")
                }

                fileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                    name: "SLUG",
                    value: fileUploader.getValue()
                }))
                fileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                    name: "po",
                    value: "12345"
                }))
                fileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                    name: "x-csrf-token",
                    value: oModel.getSecurityToken()
                }))

                fileUploader.setSendXHR(true);

                fileUploader.upload();
                fileUploader.clear();

                oBinding.refresh()
            },
            showImage: function (oEvent) {
                var sFileName = oEvent.getSource().getText();

                var sServiceURL = "/sap/opu/odata/sap/ZIMAGE_PRO_SRV";
                var EntityPath = "/imageSet('" + sFileName + "')/$value";
                var sImageURL = sServiceURL + EntityPath;

                var oDialog = new sap.m.Dialog({
                    title: "Image Preview",
                    content: new sap.m.Image({
                                    src: sImageURL,
                                    height: "auto",
                                    width: "auto"
                    })
                });

                oDialog.addButton(new sap.m.Button({
                    text: "Close",
                    press: function () {
                        oDialog.close();
                    }
                }));

                oDialog.open();
            }
        });
    });
