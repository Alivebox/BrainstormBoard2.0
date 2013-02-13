Ext.define('Brainstorm.board.ux.PostItSettingsWindow',{
	
	extend: 'Ext.window.Window',
	alias: 'widget.postitsettingswindow',
	width: 300,
	height: 150,
	autoScroll: true,
	resizable: false,
	modal: true,
	constrainHeader: true,
	
	categoriesCombobox: undefined,
	
	/**
	 * Collection of post-its that this settings window will handle
	 */
	postIts: undefined,
	
    /**
     * Initializes the component childs and listeners
     */
    initComponent: function(){
    	this.categoriesCombobox = this.createCategoriesCombobox();
    	this.items = [
    		this.categoriesCombobox
    	];
    	this.initializeDockedItems();
	    this.callParent(arguments);
    },
    
    /**
     * Creates the categories comboBox component
     */
    createCategoriesCombobox: function(){
    	var tmpCombobox = Ext.create('Ext.form.field.ComboBox',{
    		fieldLabel: Locales.Board.POSTIT_SETTINGS_WINDOW_FORM_FIELD_CATEGORY,
			store: 'Categories',
			queryMode: 'local',
			labelWidth: 80
    	});
    	return tmpCombobox;
    },
    
    /**
	 * Initializes component docked items
	 */
	initializeDockedItems: function(){
		this.dockedItems = [
			{
				xtype: 'toolbar',
				dock: 'bottom',
				items: [
					'->',
					{
						text: Locales.Board.BUTTONS_ACCEPT,
						scope: this,
						handler: this.onAcceptSettings
					}
				]
			}
		];
	},
	
	/**
	 * Called on accept button click event, applies the current settings
	 *  to all the post-its we are handling
	 */
	onAcceptSettings: function(){
		if( !this.postIts ){
    		return;
    	}
    	for(var tmpIndex=0;tmpIndex < this.postIts.length;tmpIndex++){
    		var tmpPostIt = this.postIts[tmpIndex];
    		tmpPostIt.category = this.categoriesCombobox.getValue();
    	}
    	this.close();
	}
});