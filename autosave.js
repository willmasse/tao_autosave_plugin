define([
	'taoTests/runner/plugin'
], function (pluginFactory){
	'use strict';
	
	return pluginFactory({

	name: 'autoSave',
	
	init: function init() {;
		var self = this;
		var areaBroker = this.getAreaBroker();

		this.button = areaBroker.getToolbox().createEntry({
			control: 'autoSave',
			text: 'Auto Save',
			title: 'Auto Save',
			icon: 'clock'
		});


		this.getTestRunner().on('loaditem', function(){
				var testContext = self.getTestRunner().getTestContext();
				var testPartId = testContext.testPartId;
				var sectionId = testContext.sectionId;
				var itemIdentifier = testContext.itemIdentifier;


				var testMap = self.getTestRunner().getTestMap();

				var categories = testMap.parts[testPartId].sections[sectionId].items[itemIdentifier].categories;

				var endTime = new Date().getTime() + 300000;
				
				if(categories.includes('autoSave')){
				self.show();

				window.timer = setInterval(function(){ 
					var now = new Date().getTime();
					var distance = endTime-now;
					
					var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
					var seconds = Math.floor((distance % (1000 * 60)) /1000);

					document.querySelector('li[data-control="autoSave"]').innerHTML = "Autosave in " + minutes+"m "+seconds+"s";

					console.log(distance);

					if(distance<0){
					document.querySelector('li[data-control="autoSave"]').innerHTML = "Autosaving..";
					window.clearInterval(window.timer);
					self.getTestRunner().jump(self.getTestRunner().getTestContext()['itemPosition']);
					}
				

				});
				}
				else{self.hide();}


				})
				.on('unloaditem move skip next previous jump', function(){
					window.clearInterval(window.timer);
					self.disable();
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

