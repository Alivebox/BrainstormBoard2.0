Ext.Loader.setConfig({
    enabled:true,
    paths: {
        'Framework': 'framework'
    }
});

Ext.application({

    requires: [
        'Framework.Main'
    ],
    name:'Brainstorm',
    autoCreateViewport:false,

    controllers: [
        'Brainstorm.modules.board.controller.PostItZoomController',
        'Brainstorm.modules.board.controller.PostItSelectionController',
        'Brainstorm.modules.board.controller.PostItResizeController',
        'Brainstorm.modules.board.controller.PostItPositionController',
        'Brainstorm.modules.board.controller.PostItCopyPasteController',
        'Brainstorm.modules.board.controller.PostItController',
        'Brainstorm.modules.board.controller.BoardViewController'
    ],

    launch:function () {
        this.loadConfigurationFile();
    },

    loadConfigurationFile: function(){
        var tmpParams = {
            fileUrl: "config/configFile.json"
        };
        Framework.util.FileLoader.loadAndDecodeJsonFile('resources/fileLoader.php',tmpParams,this.onConfigLoaded,this.onConfigFail,this);
    },

    onConfigLoaded: function(argConfigFileObject){
        Framework.Main.init({
            scope:this,
            configFileObject: argConfigFileObject,
            callback:this.onFrameworkInitialized
        });
    },

    onConfigFail:function () {
        Framework.core.ErrorsManager.handleFatalError(Framework.core.Defaults.FATAL_ERROR_CONFIG_FILE_LOADER_NOT_FOUND_OR_INVALID);
    },

    onFrameworkInitialized:function () {
        Ext.create('Ext.container.Viewport', {
            items:[
                {
                    xtype: 'boardview'
                }
            ]
        });
    }


});
