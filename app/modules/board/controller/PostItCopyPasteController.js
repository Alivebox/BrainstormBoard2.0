Ext.define('Brainstorm.modules.board.controller.PostItCopyPasteController', {

    extend: 'Ext.app.Controller',
    
    copiedPostIts: [],
    
    /**
     * Initializes components listeners
     */
    init: function() {
    	this.control({
    		'boardview': {
    			copyPostIts: this.copyPostIts,
    			pastePostIts: this.pastePostIts
    		}
    	});
    },
    
    /**
     * Copies the all selected post-its and saves them in case a paste action is required
     */
    copyPostIts: function(){
    	this.copiedPostIts = Framework.core.ModelLocator.selectedPostIts;
    },
    
    /**
     * Pastes the current copied post-its creating a new set of Post-it windows with the same data
     */
    pastePostIts: function(){
    	var tmpPostItController = this.getController('Brainstorm.modules.board.controller.PostItController');
    	for(var tmpIndex=0;tmpIndex < this.copiedPostIts.length;tmpIndex++){
    		var tmpCopiedPostItWindow = this.copiedPostIts[tmpIndex];
    		var tmpConfig = {
	    		width: tmpCopiedPostItWindow.width,
	    		height: tmpCopiedPostItWindow.height,
	    		postItText: tmpCopiedPostItWindow.getValue(),
	    		currentBackgroundColor: tmpCopiedPostItWindow.currentBackgroundColor
	    	};
	    	tmpPostItController.addPostIt(tmpConfig);
    	}
    }
    
});