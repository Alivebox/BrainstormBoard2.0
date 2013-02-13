Ext.define('Brainstorm.modules.board.controller.PostItSelectionController', {

    extend: 'Ext.app.Controller',
    
    refs: [
    	{
    		ref: 'mainPostItsToolbar',
    		selector: 'postittoolbar[name=mainPostItsToolbar]'
    	}
    ],
    
    /**
     * Initializes components listeners
     */
    init: function() {
    	this.control({
    		'boardview': {
    			dragSelectionEnd: this.validateDragSelection
    		}
    	});
    },
    
    /**
     * Validates after a drag selection which post-its should be selected
     */
    validateDragSelection: function(argSelectionRegion){
    	if(!argSelectionRegion){
    		return;
    	}
    	var tmpSelectedPostIts = [];
    	for(var tmpIndex=0;tmpIndex < Framework.core.ModelLocator.currentPostIts.length;tmpIndex++){
    		var tmpPostItWindow = Framework.core.ModelLocator.currentPostIts[tmpIndex];
    		var tmpPostItRegion = tmpPostItWindow.el.getRegion();
    		var tmpIntersect = argSelectionRegion.intersect(tmpPostItRegion);
    		if(tmpIntersect){
    			tmpSelectedPostIts.push(tmpPostItWindow);
    		}
    	}
    	this.updateSelectedPostIts(tmpSelectedPostIts);
    },
    
    /**
     * Called when a new set of post-its was selected, updates the selectedPostIts variable
     *  and sets the selection style for every selected post-it
     */
    updateSelectedPostIts: function(argPostIts){
    	if( !Ext.isArray(argPostIts) ){
    		argPostIts = [argPostIts];
    	}
    	this.clearSelectedPostIts();
    	Framework.core.ModelLocator.selectedPostIts = argPostIts;
    	for(var tmpIndex=0;tmpIndex < Framework.core.ModelLocator.selectedPostIts.length;tmpIndex++){
    		var tmpPostItWindow = Framework.core.ModelLocator.selectedPostIts[tmpIndex];
    		tmpPostItWindow.selected = true;
    		tmpPostItWindow.showToolbar();
    	}
    	this.validatePostItsToolbar();
    },
    
    clearSelectedPostIts: function(){
    	for(var tmpIndex=0;tmpIndex < Framework.core.ModelLocator.selectedPostIts.length;tmpIndex++){
    		var tmpPostItWindow = Framework.core.ModelLocator.selectedPostIts[tmpIndex];
    		tmpPostItWindow.selected = false;
    		tmpPostItWindow.hideToolbar();
    	}
    	Framework.core.ModelLocator.selectedPostIts = [];
    	this.validatePostItsToolbar();
    },
    
    /**
     * If we have more than one post-it selected we will hide the toolbar of each post-it
     *  and we will show the main post-it toolbar that will be used by all selected post-its
     */
    validatePostItsToolbar: function(){
    	var tmpMainPostItsToolbar = this.getMainPostItsToolbar();
    	if( !Framework.core.ModelLocator.selectedPostIts || Framework.core.ModelLocator.selectedPostIts.length <= 1 ){
    		tmpMainPostItsToolbar.removeCls('boardViewPostItToolbarVisible');
    		return;
    	}
    	this.hideSelectedPostItsToolbars();
    	tmpMainPostItsToolbar.addCls('boardViewPostItToolbarVisible');
    	tmpMainPostItsToolbar.postIts = Framework.core.ModelLocator.selectedPostIts;
    },
    
    hideSelectedPostItsToolbars: function(){
    	for(var tmpIndex=0;tmpIndex < Framework.core.ModelLocator.selectedPostIts.length;tmpIndex++){
    		var tmpPostItWindow = Framework.core.ModelLocator.selectedPostIts[tmpIndex];
    		tmpPostItWindow.hideToolbar();
    	}
    }
    
});