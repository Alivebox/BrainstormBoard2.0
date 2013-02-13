Ext.define('Brainstorm.modules.board.controller.BoardViewController', {

    extend: 'Ext.app.Controller',
    
    views: [
    	'Brainstorm.modules.board.view.BoardView'
    ],
    
    init: function() {
    	this.control({
    		'boardview': {
    			boardClicked: this.onBoardClicked
    		}
    	});
    },
    
    /**
     * Clears all selected post-its removing the selected style and setting selected flag to false 
     */
    onBoardClicked: function(){
    	var tmpSelectionController = this.getController('Brainstorm.modules.board.controller.PostItSelectionController');
    	tmpSelectionController.clearSelectedPostIts();
    }
    
});