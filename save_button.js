define([
	'taoTests/runner/plugin'
], function (pluginFactory){
	'use strict';

	return pluginFactory({

	name: 'saveButton',

	init: function init() {
		var self = this;
		var areaBroker = this.getAreaBroker();

		this.button = areaBroker.getToolbox().createEntry({
			control: 'saveQuestion',
			text: 'Save Question',
			title: 'Save Question',
			icon: 'Save'
		});

		this.button.on('click', function(e){
			e.preventDefault();
			let testData = self.getTestRunner().getTestContext();
			self.getTestRunner().jump(testData['itemPosition']);

		});

		this.getTestRunner().on('enabletools renderitem', function(){
			var testContext = self.getTestRunner().getTestContext();
			var testPartId = testContext.testPartId;
			var sectionId = testContext.sectionId;
			var itemIdentifier = testContext.itemIdentifier;


			var testMap = self.getTestRunner().getTestMap();
			var categories = testMap.parts[testPartId].sections[sectionId].items[itemIdentifier].categories;

			if(categories.includes('saveButton')){
				self.show();
			}
			else{
				self.hide();
			}
				})
				.on('disable tools unloaditem', function(){
				self.hide();
		});
	},

	render: function render() {
	},

	destroy: function destroy() {
		if(this.button && this.button.length){
			this.button.off('click');
		}
	},

	enable: function enable() {
		this.button.enable();
	},

	disable: function disable() {
		this.button.disable();
	},

	show : function show() {
		this.button.show();
	},

	hide: function hide() {
		this.button.hide();
	}

	});
});
