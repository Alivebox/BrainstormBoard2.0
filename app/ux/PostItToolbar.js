Ext.define('Brainstorm.ux.PostItToolbar',{
	
	extend: 'Ext.container.Container',
	alias: 'widget.postittoolbar',
	layout: 'absolute',
	
	/**
	 * Collection of post-its that this toolbar will handle
	 */
	postIts: undefined,
	settingsButtonCls: 'postItSettingsButtonSmall',
	deleteButtonCls: 'postItDeleteButtonSmall', 
	
    /**
     * Initializes the component childs and listeners
     */
    initComponent: function(){
    	this.items = [
	    	{
	    		xtype: 'button',
	        	cls: this.deleteButtonCls,
	        	scope: this,
	        	handler: this.onCloseClick
	    	},
	    	{
	    		xtype: 'button',
	    		cls: this.settingsButtonCls,
	    		scope: this,
	    		handler: this.onSettingsClick
	    	}
	    ];
	    this.callParent(arguments);
    },
    
    /**
	 * Called on settings button click event, shows the settings window,
	 *  if we are handling multiple postits, the values that we set in the 
	 *  settings window will be applied to every post-it
	 */
	onSettingsClick: function(){
		return;
		var tmpSettingsWindow = Ext.create('Board.ux.PostItSettingsWindow',{
			postIts: this.postIts
		});
		tmpSettingsWindow.show();
	},
    
	/**
	 * Called on close button click event, for every post-it that we are handling
	 *  we call its close function
	 */
	onCloseClick: function(){
    	if( !this.postIts ){
    		return;
    	}
    	if(this.postIts.length == 1){
    		var tmpPostIt = this.postIts[0];
    		tmpPostIt.close();
    		return;
    	}
    	for(var tmpIndex=0;tmpIndex < this.postIts.length;tmpIndex++){
    		var tmpPostIt = this.postIts[tmpIndex];
    		tmpPostIt.close();
    		tmpIndex--;
    	}
	}
	
});