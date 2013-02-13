Ext.define('Brainstorm.ux.PostItWindow',{

	extend: 'Ext.window.Window',
	alias: 'widget.postitwindow',
	minWidth: 190,
	width: 190,
	maxWidth: 400, 
	height: 160,
	maxHeight: 400,
	autoScroll: true,
	selected: false,
	preventHeader: true,
	resizeHandles: 'se',
	layout: 'absolute',
	
	toolbarContainer: undefined,
	textArea: undefined, 
	
	postItText: "",
	currentBackgroundColor: undefined,
	zoomValue: 1,
	category: undefined,
	
	//**************************
	//OVERRIDED METHODS - START
	//**************************
	

	//**************************
	//OVERRIDED METHODS - END
	//**************************

	initComponent: function(){
		this.initializeItems();
		this.callParent(arguments);
	},
	
	/**
	 * Initializes component items
	 */
	initializeItems: function(){
		this.toolbarContainer = this.getToolbarContainer();
		this.items = [
			this.getMainContainer(),
			this.getTapeContainer(),
			this.toolbarContainer
		];
	},
	
	getMainContainer: function(){
		this.textArea = this.getTextArea();
		var tmpMainContainer = {
			xtype: 'container',
			layout: 'fit',
			items: [
				this.textArea
			]
		};
		return tmpMainContainer;
	},
	
	getTextArea: function(){
		var tmpTextArea = Ext.create('Ext.form.field.TextArea',{
			value: this.postItText,
			enableKeyEvents: true,
			listeners: {
				keydown: this.onTextAreaKeyDown
			}
		});
		return tmpTextArea;
	},
	
	getToolbarContainer: function(){
		var tmpToolbarContainer = Ext.create('Brainstorm.ux.PostItToolbar',{
			postIts: [this],
			layout: undefined
		});
		return tmpToolbarContainer;
	},
	
	getTapeContainer: function(){
		var tmpTapeContainer = {
			xtype: 'component'
		};
		return tmpTapeContainer;
	},
	
	/**
	 * Called on text area down event, stops propagation of shortcut events used in the application
	 *  sucha as +, -, ctrl c and ctrl v
	 */
	onTextAreaKeyDown: function(argTextArea,argEventObject){
		if( argEventObject.ctrlKey && (argEventObject.keyCode === Ext.EventObject.C || argEventObject.keyCode === Ext.EventObject.V) ){
			argEventObject.stopPropagation();
		}
		if( argEventObject.keyCode === Ext.EventObject.NUM_PLUS || argEventObject.keyCode === Ext.EventObject.NUM_MINUS ){
			argEventObject.stopPropagation();
		}
	},
	
	/**
	 * We override onMouseDown function to handle some weird copy-paste behaviours,
	 *  here we also fire the postItSelected event
	 */
	onMouseDown: function(argEvent){
		this.focus();
		this.callParent(arguments);
		if( !this.selected ){
			this.fireEvent("postItSelected",this);
		}
	},
	
	hideToolbar: function(){
		this.toolbarContainer.addCls('hiddenToolbar');
	},
	
	showToolbar: function(){
		this.toolbarContainer.removeCls('hiddenToolbar');
	},
	
	/**
	 * Returns the postItText that corresponds to the textarea value
	 */
	getValue: function(){
		this.postItText = this.textArea.getValue();
		return this.postItText;
	}
	
});