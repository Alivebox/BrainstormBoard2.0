Ext.require([
	'Ext.util.KeyMap',
    'Brainstorm.ux.PostItWindow',
    'Brainstorm.ux.PostItToolbar'
]);

Ext.define('Brainstorm.modules.board.view.BoardView',{
	
	extend: 'Ext.container.Container',
	alias: 'widget.boardview',
	layout: 'absolute',
	
	currentMouseX: 0,
	currentMouseY: 0,
	
	initComponent: function(){
		this.addCls('boardView');
		this.initListeners();
		this.createItems();
		this.callParent(arguments);
	},
	
	initListeners: function(){
		this.listeners = {
			scope: this,
			afterrender: this.onAfterRender
		};
	},
	
	createItems: function(){
		this.focusButton = this.getFocusField();
		this.items = [
			this.getPostItToolbar(),
			this.focusButton,
			this.getZoomSlider()
		];
	},
	
	/**
	 * When we click on the board, we focus this hidden component. 
	 *  This is needed in case focus is on a post-it textArea, doing this the textArea
	 *  will loss its focus and user will be able to use hot keys
	 */
	getFocusField: function(){
		var tmpFocusField = Ext.create("Ext.form.field.Text",{
			width: 5,
			height: 5,
			x: -10,
			y: -10
		});
		return tmpFocusField;
	},
	
	getPostItToolbar: function(){
		var tmpToolbar = {
			xtype: 'postittoolbar',
			cls: 'boardViewPostItToolbar',
			name: 'mainPostItsToolbar',
			settingsButtonCls: 'postItSettingsButtonBig',
			deleteButtonCls: 'postItDeleteButtonBig'
		};
		return tmpToolbar;
	},
	
	getZoomSlider: function(){
		var tmpSlider = {
			xtype: 'slider', name: 'zoomSlider',
			hideLabel: true, useTips: false,
			height: 100, vertical: true,
		    minValue: 0, maxValue: 9,
		    increment: 1, value: 10,
		    x: 10, y: 10,
		    listeners: {
		    	scope: this,
		    	change: this.onZoomChange
		    }
		};
		return tmpSlider;
	},
	
	onAfterRender: function(){
		this.initializeHotKeyEvents();
		this.initializeMultipleSelection();
		this.el.addListener('click',this.onBoardClicked,this);
		this.el.addListener('mousemove',this.onMouseMove,this);
	},
	
	initializeHotKeyEvents: function(){
		var tmpKeyMap = new Framework.util.HotkeysUtil({
			scope: this,
			numPlusFunction: function(argKey,argEvent){
				this.fireEvent('addPostIt');
			},
			numMinusFunction: function(argKey,argEvent){
				this.fireEvent('removePostIts');
			},
			ctrlcFunction: function(argKey,argEvent){
				this.fireEvent('copyPostIts');
			},
			ctrlvFunction: function(argKey,argEvent){
				this.fireEvent('pastePostIts');
			}
		});
	},
	
	initializeMultipleSelection: function(){
		this.dragSelectionUtil = Ext.create('Framework.util.DragSelectionUtil',{
			scope: this,
			constrainTo: this
		});
	},
	
	/**
	 * Called when user clicks on the board, fires the boardClicked event
	 *  and here we set the focus on the focusButton so if we had a post-it selected
	 *  we will force it to lose the focus
	 */
	onBoardClicked: function(argEvent,argElement){
		if(this.dragSelectionUtil.isDragging){
			return;
		}
		this.focusButton.focus();
		this.fireEvent('boardClicked');
	},
	
	/**
	 * Here we update the currentMouseX and currentMouseY position, we need this
	 *  variables to let user add a post-it in the position of the mouse cursor
	 */
	onMouseMove: function(argEvent,argElement){
		this.currentMouseX = argEvent.getX();
		this.currentMouseY = argEvent.getY();
	},
	
	onZoomChange: function(argSlider,argNewValue){
		this.fireEvent('zoomChange',argNewValue);
	}
	
});