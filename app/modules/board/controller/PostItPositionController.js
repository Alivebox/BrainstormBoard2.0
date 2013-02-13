Ext.define('Brainstorm.modules.board.controller.PostItPositionController', {

    extend: 'Ext.app.Controller',
    
    refs: [
    	{
    		ref: 'boardview',
    		selector: 'boardview'
    	}
    ],
    
    init: function() {
    },
    
    /**
     * Makes sure that the just added window will be added in a xy position
     *  that is inside the current board size
     */
    locateWindowOnBoard: function(argPostItWindow,argBaseX,argBaseY){
    	if(!argPostItWindow){
    		return;
    	}
    	var tmpBoardView = this.getBoardview();
    	argBaseX = this.getPostItWindowPostionX(argBaseX,argPostItWindow);
    	argBaseY = this.getPostItWindowPostionY(argBaseY,argPostItWindow);
    	argPostItWindow.el.setStyle('left',argBaseX + "px");
    	argPostItWindow.el.setStyle('top',argBaseY + "px");
    },
    
    /**
     * Returns a valida x position inside the board view
     */
    getPostItWindowPostionX: function(argBaseX,argPostItWindow){
    	argBaseX = (argBaseX !== undefined) ? argBaseX : this.getBoardview().currentMouseX;
    	argBaseX = parseFloat(argBaseX);
    	if(argBaseX < 0){
    		return 5;
    	}
    	var tmpWidth = argPostItWindow.getWidth() * argPostItWindow.zoomValue;
    	if( ( argBaseX + tmpWidth ) >= this.getBoardview().getWidth() ){
    		argBaseX = this.getBoardview().getWidth() - tmpWidth - 5;
    	}
    	return argBaseX;
    },
    
    /**
     * Returns a valida y position inside the board view
     */
    getPostItWindowPostionY: function(argBaseY,argPostItWindow){
    	argBaseY = (argBaseY !== undefined) ? argBaseY : this.getBoardview().currentMouseY;
    	argBaseY = parseFloat(argBaseY);
    	if(argBaseY < 0){
    		return 5;
    	}
    	var tmpHeight = argPostItWindow.getHeight() * argPostItWindow.zoomValue;
    	if( ( argBaseY + tmpHeight ) >= this.getBoardview().getHeight() ){
    		argBaseY = this.getBoardview().getHeight() - tmpHeight - 5;
    	}
    	return argBaseY;
    }
    
});