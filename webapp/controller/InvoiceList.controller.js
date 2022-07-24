sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator,) {
	"use strict";


	return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {

		onInit: function () {
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");

			var oViewModel = new JSONModel({
				Integer: "KG"
			});
			this.getView().setModel(oViewModel, "vieww");
		},
		onFilterInvoices: function (oEvent) {

			// build filter array
			let aFilter = [];
			let sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			let oList = this.byId("invoiceList");
			let oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);


		},



		onPress: function (oEvent) {
			let oItem = oEvent.getSource();
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
			}
			);
		},




	});
});