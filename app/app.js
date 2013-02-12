Ext.Loader.setConfig({
    enabled:true
});
Ext.Loader.setPath('Framework', 'framework');
Ext.require(
    'Framework.Main'
);

Ext.application({

    name:'AliveTracker',

    autoCreateViewport:false,

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
                    xtype:'container',
                    items:[
                        {
                            xtype:'label',
                            text:'Hello World'
                        },
                        {
                            xtype:'button',
                            text:Locales.TEST_LABEL,
                            listeners:{
                                scope:this,
                                click:function () {
                                    Framework.core.LocalizationManager.setLanguageByAbbreviation("en");
                                }
                            }
                        }
                    ]
                }
            ]
        });
    }


});
