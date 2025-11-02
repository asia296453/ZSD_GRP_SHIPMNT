var html2pdf; 
sap.ui.define([
   "zsdgrpshipment/controller/BaseController",
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History", "sap/m/MessageBox", 'sap/ui/model/Filter',
    "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel",
     "sap/ui/core/Fragment", "sap/m/UploadCollectionParameter",
     "zsdgrpshipment/js/html2pdf.bundle.min"
], (BaseController, Controller,History ,MessageBox, Filter, FilterOperator, JSONModel, Fragment, r,html2pdf1) => {
    "use strict";

    return BaseController.extend("zsdgrpshipment.controller.main", {
        onInit() {
        this.setEditable(true);
        this.setButtons(false,false,true,false);//edit,cancel,submit,print
        
           this.getOdata("/HeaderSet(Grpshpmno='0')","create",null).then(() => { 
            
           });
        },
        onEdit:function(e){
            this.setEditable(true);
            this.setButtons(false,true,true,false);//edit,cancel,submit,print
        },
         onCancel:function(e){
            this.setEditable(false);
            this.setButtons(true,false,false,true);//edit,cancel,submit,print
        },
       
         onPressAddRow:function(){
            this.showBusy(true);
            this.getOdata("/ShipmentSet(Grpshpmno='0',Deliveryno='0',Zlineno='0')",'',null).then((res) => { 
                    res.Deliveryqty = '';
                    var oarray = this.getOwnerComponent().getModel("item").getData().results;
                    oarray.push(res);
                    this.getOwnerComponent().getModel("item").setProperty("/results", oarray);
                    this.getOwnerComponent().getModel("item").refresh(true);
           });
        },
       

        deleteRow: function (oEvent) {
            
            var ideleteRecord = oEvent.getSource().getParent().getId().split("-");
            ideleteRecord=ideleteRecord[ideleteRecord.length - 1];
            var sdelno = this.getView().byId("itemtable").getItems()[ideleteRecord].getCells()[1].getText();

            var odata = this.getView().getModel("item").getProperty("/results");
            var oindex = [];
            odata.forEach(function (item, index) {
                if(item.Deliveryno !== sdelno){
                   oindex.push(item);
                }
            });

            debugger;            
            this.getView().getModel("item").setProperty("/results",oindex);
            this.getView().getModel("item").refresh(true);
        },
        onNavBack: function () {
         
        },
         onSubmit: function (oEvent) {
            var bflag = this.onValidation(this.getOwnerComponent().getModel("create").getData().results);
            if(bflag)
                {sap.m.MessageBox.confirm("Please confirm to Submit?", {
                initialFocus: sap.m.MessageBox.Action.CANCEL,
                onClose: function (sButton) {
                    if (sButton == "OK") {  

                        var oPayload = this.getOwnerComponent().getModel("create").getData().results;
                        oPayload.header = this.getOwnerComponent().getModel("item").getData().results;
                        this.showBusy(true);  
                       
                        this.getModel().create("/HeaderSet", oPayload, {
                            method: "POST",
                            success: function (oData,res) {
                                debugger;
                                this.showBusy(false); 
                                if(oData.Comments.indexOf("Error") !==  -1){
                                    MessageBox.error(oData.Comments.split(":")[1]);
                                    oData.Comments="";
                                    this.getOwnerComponent().getModel("create").setProperty("/results", oData);
                                }else{
                                    this.getOwnerComponent().getModel("create").setProperty("/results", oData);
                                var sMsg = "Group Shipment No "+this.updateSerialNo(oData.Grpshpmno)+" Submitted Successfully ";
                                MessageBox.success(sMsg, {
                                    actions: ["OK"],
                                    onClose: (sAction) => {
                                        if (sAction === "OK") {                                            
                                            var sstr1 = {
                                                "editable": false
                                            }
                                            this.getOwnerComponent().getModel("Header").setProperty("/data", sstr1);
                                            this.setEditable(false);
                                             this.setButtons(true,false,false,true);//edit,cancel,submit,print
                                        }
                                    },
                                });
                            }
                            }.bind(this),
                            error: function (oError) {
                                
                                this.showBusy(false);
                                var msg = JSON.parse(oError.responseText).error.message.value;
                                    MessageBox.error(msg); 
                            }.bind(this)
                        });
                    }
                    if (sButton == "CANCEL") {
                        return;
                    }
                }.bind(this)
            });
        }
        },
        formateDate: function (sInput) {
            var d = new Date(sInput);
            var formatter = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "dd-MM-yyyy"
            });

            var sVal = formatter.format(sInput);

            return sVal;
        },
        formatDate: function (e) {
            if (e === undefined || e === null || e === "") {
                return
            }
            var t = new Date(e),
                i = "" + (e.getMonth() + 1),
                a = "" + e.getDate(),
                r = e.getFullYear();
            if (i.length < 2) i = "0" + i;
            if (a.length < 2) a = "0" + a;
            return [a, i, r].join(".")
        },

        onPrint:function(e){
           
            var sshipno = this.getModel("create").getData().results.Grpshpmno;
            var sfilename = "Group Shipment No. "+this.updateSerialNo(sshipno)+".pdf";
            const oOptions = {
            margin: [0.3,0,0.5,0],
            filename:     sfilename,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'l' },
            pagebreak: { avoid: 'tr' }
        };
        const element1 = this.getView().byId("ship1").getDomRef();
        debugger;
        html2pdf().set(oOptions).from(element1).save();
       
        },
          onRefresh: function (e) {
            location.reload();
        },
     });
});