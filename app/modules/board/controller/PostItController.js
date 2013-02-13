Ext.define('Brainstorm.modules.board.controller.PostItController', {

    extend: 'Ext.app.Controller',
    
    models: [
    	'Brainstorm.modules.board.model.Category'
    ],
    
    stores: [
        'Brainstorm.modules.board.store.Categories'
    ],
    
    /**
     * Default configuration to be used in post its
     */
    postItsDefaultConfig: undefined,
    
    /**
     * Initializes components listeners
     */
    init: function() {
    	Framework.core.ModelLocator.currentPostIts = [];
    	Framework.core.ModelLocator.selectedPostIts = [];
    	this.initializePostItDefaultConfig();
    	this.control({
    		'boardview': {
    			addPostIt: this.addPostIt,
    			removePostIts: this.closeSelectedPosIts
    		}
    	});
    },
    
    /**
     * Initializes the default configuration of every post-it window
     */
    initializePostItDefaultConfig: function(){
    	var tmpPositionController = this.getController('Brainstorm.modules.board.controller.PostItPositionController');
    	var tmpSelectionController = this.getController('Brainstorm.modules.board.controller.PostItSelectionController');
    	this.postItsDefaultConfig = {
	    	shadow: false,
			listeners: {
				scope: this,
				postItSelected: function(argPostIts){
					tmpSelectionController.updateSelectedPostIts(argPostIts);
				},
				destroy: this.removePostIt,
				move: function(argPostItWindow,argBaseX,argBaseY){
					tmpPositionController.locateWindowOnBoard(argPostItWindow,argBaseX,argBaseY);
				}
			}
	    };
    },
    
    /**
     * Adds a new Post it to the board
     */
    addPostIt: function(argPostItConfig){
    	var tmpConfig = {};
    	Ext.apply(tmpConfig,this.postItsDefaultConfig);
    	if(argPostItConfig){
    		Ext.apply(tmpConfig,argPostItConfig);
    	}
    	var tmpZoomController = this.getController('Brainstorm.modules.board.controller.PostItZoomController');
    	var tmpPositionController = this.getController('Brainstorm.modules.board.controller.PostItPositionController');
    	var tmpResizeController = this.getController('Brainstorm.modules.board.controller.PostItResizeController');
    	var tmpSelectionController = this.getController('Brainstorm.modules.board.controller.PostItSelectionController');
    	var tmpPostIt = Ext.create("Brainstorm.ux.PostItWindow",tmpConfig);
    	tmpPostIt.show();
    	tmpPostIt.el.setStyle('backgroundColor',tmpPostIt.currentBackgroundColor);
    	tmpZoomController.applyZoomToPostItWindow(tmpPostIt);
    	tmpPositionController.locateWindowOnBoard(tmpPostIt);
    	tmpPostIt.resizer.addManagedListener(tmpPostIt.resizer,"resizedrag",tmpResizeController.validateResizeBoxSize,tmpResizeController);
    	Framework.core.ModelLocator.currentPostIts.push(tmpPostIt);
    	tmpSelectionController.updateSelectedPostIts(tmpPostIt);
    },
    
    /**
     * Closes all selected post-its
     */
    closeSelectedPosIts: function(){
    	var tmpSelectedPostIts = Ext.Array.clone(Framework.core.ModelLocator.selectedPostIts);
    	for(var tmpIndex=0;tmpIndex < tmpSelectedPostIts.length;tmpIndex++){
    		var tmpPostItWindow = tmpSelectedPostIts[tmpIndex];
    		tmpPostItWindow.close();
    	}
    	var tmpSelectionController = this.getController('Brainstorm.modules.board.controller.PostItSelectionController');
    	tmpSelectionController.validatePostItsToolbar();
    },
    
    /**
     * Called when a post-it was removed, updates the currentPostIts collection
     */
    removePostIt: function(argPostIt){
    	if(!argPostIt){
    		return;
    	}
    	Framework.core.ModelLocator.currentPostIts = Ext.Array.remove(Framework.core.ModelLocator.currentPostIts,argPostIt);
    	if( Ext.Array.indexOf(Framework.core.ModelLocator.selectedPostIts,argPostIt) != -1 ){
    		Framework.core.ModelLocator.selectedPostIts = Ext.Array.remove(Framework.core.ModelLocator.selectedPostIts,argPostIt);
    	}
    }
    
});