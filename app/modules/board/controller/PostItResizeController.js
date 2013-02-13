Ext.define('Brainstorm.modules.board.controller.PostItResizeController', {

    extend: 'Ext.app.Controller',
    
    /**
     * Initializes components listeners
     */
    init: function() {
    },
    
    /**
     * Validates that the resize box fits the current zoom value
     */
    validateResizeBoxSize: function(argResizer,argWidth,argHeight,argEvent){
		var tmpResizableBox = this.getVisibleResizeBox();
		var tmpPostItWindow = argResizer.target;
		var tmpCurrentWidth = tmpResizableBox.style.width.replace("px","");
		tmpResizableBox.style.width = tmpCurrentWidth * tmpPostItWindow.zoomValue + "px";
		var tmpCurrentHeight = tmpResizableBox.style.height.replace("px","");
		tmpResizableBox.style.height = tmpCurrentHeight * tmpPostItWindow.zoomValue + "px";
	},
	
	/**
	 * Returns the current visible resize box
	 */
	getVisibleResizeBox: function(){
		var tmpResizableBoxes = Ext.query('.x-resizable-proxy');
		for(var tmpIndex=0;tmpIndex < tmpResizableBoxes.length;tmpIndex++){
			var tmpResizableBox = tmpResizableBoxes[tmpIndex];
			if( tmpResizableBox.style.display !== "none" ){
				return tmpResizableBox
			}
		}
		return undefined;
	}
    
});