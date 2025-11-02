sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/m/MessageBox", 'sap/ui/model/Filter',
    "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "sap/ui/core/Fragment", "sap/m/UploadCollectionParameter",
    "sap/m/MessageToast", "sap/m/UploadCollectionParameter",
], function (e, t, MessageBox, Filter, FilterOperator, JSONModel, Fragment, r, MessageToast, UploadCollectionParameter) {
    "use strict";
    return e.extend("zsdgrpshipment.controller.BaseController", {
        onInit() {

        },
        getRouter: function () {
            return this.getOwnerComponent().getRouter()
        },
        getModel: function (e) {
            return this.getView().getModel(e)
        },
        setModel: function (e, t) {
            return this.getView().setModel(e, t)
        },
        showBusy: function (bBusy) {
            if (bBusy) {
                sap.ui.core.BusyIndicator.show(0);
            } else {
                sap.ui.core.BusyIndicator.hide();
            }
        },
        getText: function (sProperty, aArgs) {
            if (!this._oResourceBundle) {
                this._oResourceBundle = this.getModel("i18n").getResourceBundle();
            }
            return this._oResourceBundle.getText(sProperty, aArgs);
        },

        getResourceBundle: function (sText) {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle()
        },
         updateSerialNo: function (sText) {
            var sTxt = "";
            if (sText !== undefined && sText !== "" && sText !== "0") {
                sTxt = sText.replace(/^0+/, '');
            }
            return sTxt;
        },

        hidedelete: function (sText) {
            var sTxt = "";
            var bflag = true;
            if (sText !== undefined && sText !== "" && sText !== "0" && sText !== null) {
                sTxt = sText.replace(/^0+/, '');
            }
            if(sTxt !== '10'){
                bflag = false;
            }
        },

        onCloseDeliveryNo: function (oEvent) {
            this.FCTEXT.close();
        },
         onOpenShipNo: function (oEvent) {
            // var irow = oEvent.getParameter("id").split("-");
            // var irowindex = irow[irow.length - 1];
            // this.irowindex = irowindex;
            if (!this.Shipno) {
                this.Shipno = sap.ui.xmlfragment("zsdgrpshipment.fragment.Shipno", this);
                this.getView().addDependent(this.Shipno);
            };           
            this.Shipno.open();
        },
        
        onOpenDeliveryNo: function (oEvent) {
            // var irow = oEvent.getParameter("id").split("-");
            // var irowindex = irow[irow.length - 1];
            // this.irowindex = irowindex;
            if (!this.CMTEXT) {
                this.CMTEXT = sap.ui.xmlfragment("zsdgrpshipment.fragment.Delivery", this);
                this.getView().addDependent(this.CMTEXT);
            };           
            this.CMTEXT.open();
        },
        onOpenShpmco: function (oEvent) {
            // var irow = oEvent.getParameter("id").split("-");
            // var irowindex = irow[irow.length - 1];
            // this.irowindex = irowindex;
            if (!this.Shpmco1) {
                this.Shpmco1 = sap.ui.xmlfragment("zsdgrpshipment.fragment.Shpmco", this);
                this.getView().addDependent(this.Shpmco1);
            };           
            this.Shpmco1.open();
        },
        onValidation: function (ovalue) {
            var bflag = true;

            if (ovalue.Waybillno === null || ovalue.Waybillno === '') {
                MessageBox.error("Please enter "+this.getText("Waybillno"));
                bflag = false;
            }
            else if (ovalue.Trckplteno === null || ovalue.Trckplteno === '') {
                MessageBox.error("Please enter "+this.getText("Trckplteno"));
                bflag = false;
            }
            else if (ovalue.Shpmco === null || ovalue.Shpmco === '') {
               MessageBox.error("Please enter "+this.getText("Shpmco"));
                bflag = false;
            }

            else if (ovalue.Drivername === null || ovalue.Drivername === '' ) {
                MessageBox.error("Please enter "+this.getText("Drivername"));
                bflag = false;
            }

            else if (ovalue.Drivermobile === null || ovalue.Drivermobile === '' ) {
                MessageBox.error("Please enter "+this.getText("Drivermobile"));
                bflag = false;
            }
           


            else if (this.getView().getModel("item").getData().results !== undefined) {
                this.getView().getModel("item").getData().results.forEach(function (item, index) {
                    if (item.Deliveryno === '') {
                         MessageBox.error("Please enter Delivery No.");
                        bflag = false;
                    }
                    
                });
            }else{
                  MessageBox.error("Please enter Delivery No.");
                        bflag = false;
            }

            return bflag;
        },
       

        onSearchDeliveryNo: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new sap.ui.model.Filter("Deliveryno", sap.ui.model.FilterOperator.EQ, sValue);
            //this.getOdata("/FCTEXTSet", "DeliveryNo", [oFilter]);
            oEvent.getSource().getBinding("items").filter([oFilter]);
        },
          onSearchGrpshpmno: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new sap.ui.model.Filter("Grpshpmno", sap.ui.model.FilterOperator.EQ, sValue);
            //this.getOdata("/FCTEXTSet", "DeliveryNo", [oFilter]);
            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onSearchShpmco: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new sap.ui.model.Filter("Lifnr", sap.ui.model.FilterOperator.EQ, sValue);
            //this.getOdata("/FCTEXTSet", "DeliveryNo", [oFilter]);
            oEvent.getSource().getBinding("items").filter([oFilter]);
        },
       
        onPressDisplay: function (oEvent) {
         

        },

        oncheckbox: function (e) {

        },
        setEditable:function(bflag){
            var sstr1 = {
                "editable": bflag,
                 "editable1": !bflag
            }
            this.getOwnerComponent().getModel("Header").setProperty("/data", sstr1);
            this.getOwnerComponent().getModel("Header").refresh(true);
        },
        setButtons:function(editbtn,cancelbtn,submitbtn,printbtn){
            var sstr1 = {
                "editbtn": editbtn,
                "cancelbtn":cancelbtn,
                "submitbtn":submitbtn,
                "printbtn":printbtn
            }
            this.getOwnerComponent().getModel("Buttons").setProperty("/data", sstr1);
            this.getOwnerComponent().getModel("Buttons").refresh(true);
        },
        handleValueHelpDeliveryNo: function (e) {
            var ssel = e.getParameter("selectedItem").getProperty("title");
            var oF4Data = this.getView().getModel("item").getData().results;
            if (oF4Data && oF4Data.length > 0) {
                var selCurrRow = oF4Data.filter(function (el) {
                    return el.Deliveryno == ssel;
                });
            }
            if (selCurrRow !== undefined && selCurrRow.length > 0) {
                MessageBox.error("Delivery No. is already present in Item table.");
                return;
            }
            else{
            var oFilter = new sap.ui.model.Filter("Deliveryno", sap.ui.model.FilterOperator.EQ, ssel);
            this.getOdata("/ShipmentSet",'',oFilter).then((res) => { 
                debugger;
                   // res[0].Deliveryqty = '';
                    
                    if(this.getOwnerComponent().getModel("item").getData().results === undefined){
                        var oarray = res;
                    }else{
                        var oarray = this.getOwnerComponent().getModel("item").getData().results;
                        oarray = oarray.concat(res);
                        
                    }
                    
                    this.getOwnerComponent().getModel("item").setProperty("/results", oarray);
                    this.getOwnerComponent().getModel("item").refresh(true);
           });
            

            }
        },

        handleValueHelpGrpshpmno: function (e) {
            var ssel = e.getParameter("selectedItem").getProperty("title");
            var oFilter1 = new sap.ui.model.Filter("Grpshpmno", sap.ui.model.FilterOperator.EQ, ssel);
            this.getOdata("/HeaderSet", "create", oFilter1).then((res) => {
                this.getModel("create").setProperty("/results",res[0]);
                this.getModel("create").refresh();      
                var oFilter = new sap.ui.model.Filter("Grpshpmno", sap.ui.model.FilterOperator.EQ, ssel);
                this.getOdata("/ShipmentSet", "item", oFilter);
                this.setEditable(false);
                this.setButtons(true,false,false,true);//edit,cancel,submit,print
            });
        },

         handleValueHelpShpmco: function (e) {
            var ssel = e.getParameter("selectedItem").getProperty("title");
            this.getModel("create").getData().results.Shpmco = ssel;
            this.getModel("create").refresh(); 
        },
      
        timeformat: function (val) {
            if (val !== null) {
                if (typeof val === 'string' || val instanceof String) {
                    val = val.replace(/^PT/, '').replace(/S$/, '');
                    val = val.replace('H', ':').replace('M', ':');

                    var multipler = 60 * 60;
                    var result = 0;
                    val.split(':').forEach(function (token) {
                        result += token * multipler;
                        multipler = multipler / 60;
                    });
                    var timeinmiliseconds = result * 1000;

                    var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
                        pattern: "KK:mm:ss a"
                    });
                    var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
                    return timeFormat.format(new Date(timeinmiliseconds + TZOffsetMs));
                } else {
                    val = val.ms;
                    var ms = val % 1000;
                    val = (val - ms) / 1000;
                    var secs = val % 60;
                    val = (val - secs) / 60;
                    var mins = val % 60;
                    var hrs = (val - mins) / 60;

                    return hrs + ':' + mins + ':' + secs;
                }
            }
        },
        DateFormatStr: function (oVal) {
            if (oVal !== null) {
                if (typeof oVal === 'string' || oVal instanceof String) {
                    return oVal.substr(8, 2) + "-" + oVal.substr(5, 2) + "-" + oVal.substr(0, 4);
                } else if (oVal instanceof Date) {
                    var sDate = oVal.toJSON();
                    return sDate.substr(8, 2) + "-" + sDate.substr(5, 2) + "-" + sDate.substr(0, 4);

                }
            }
        },
        getOdata: function (surl, smodelname, ofilter, sexpand) {

            return new Promise((resolve, reject) => {
                if (ofilter === null) {
                    this.showBusy(true);
                    this.getOwnerComponent().getModel().read(surl, {
                        success: function (oData) {
                            this.showBusy(false);
                            if (smodelname !== '') {
                                if (oData.results !== undefined) {
                                    this.getModel(smodelname).setProperty("/results", oData.results);
                                    resolve(oData.results);
                                } else {
                                    this.getModel(smodelname).setProperty("/results", oData);
                                }
                            }
                            resolve(oData);
                        }.bind(this),
                        error: function (oError) {
                            this.showBusy(false);
                            var msg = JSON.parse(oError.responseText).error.message.value;
                            MessageBox.error(msg);
                            reject();
                        }.bind(this)
                    });
                } else {
                    this.showBusy(true);
                    this.getOwnerComponent().getModel().read(surl, {
                        filters: [ofilter],
                        success: function (oData) {
                            this.showBusy(false);
                            if (smodelname !== '') {
                            if (oData.results !== undefined) {
                                this.getModel(smodelname).setProperty("/results", oData.results);
                                resolve(oData.results);
                            } else {
                                this.getModel(smodelname).setProperty("/results", oData);
                                resolve(oData);
                            }}
                            resolve(oData.results);
                        }.bind(this),
                        error: function (oError) {
                            this.showBusy(false);
                            var msg = JSON.parse(oError.responseText).error.message.value;
                            MessageBox.error(msg);
                            reject();
                        }.bind(this)
                    });
                }
            });
        },
        
        //BOC-EX-GOME
        _getBaseURL: function () {
            var e = this.getOwnerComponent()
                .getManifestEntry("/sap.app/id")
                .replaceAll(".", "/");
            return jQuery.sap.getModulePath(e);
        },

    });
});