Ext.require([
    'Brainstorm.util.ZoomDefaults'
]);

Ext.define('Brainstorm.modules.board.controller.PostItZoomController', {

    extend:'Ext.app.Controller',

    refs:[
        {
            ref:'boardview',
            selector:'boardview'
        },
        {
            ref:'zoomSlider',
            selector:'slider[name=zoomSlider]'
        }
    ],

    /**
     * Initializes components listeners
     */
    init:function () {
        this.control({
            'boardview':{
                zoomChange:this.executeZoom
            }
        });
    },

    /**
     * Executes the zoom to the board and every post-it window
     */
    executeZoom:function (argZoomValue) {
        var tmpBoardView = this.getBoardview();
        var tmpZoomValues = Brainstorm.util.ZoomDefaults[argZoomValue];
        tmpBoardView.el.setStyle("background-size", tmpZoomValues.backgroundSize);
        var tmpPositionController = this.getController('Brainstorm.modules.board.controller.PostItPositionController');
        for (var tmpIndex = 0; tmpIndex < Framework.core.ModelLocator.currentPostIts.length; tmpIndex++) {
            var tmpPostItWindow = Framework.core.ModelLocator.currentPostIts[tmpIndex];
            this.applyZoomToPostItWindow(tmpPostItWindow, tmpZoomValues);
            var tmpPostItWindowX = tmpPostItWindow.el.getStyle('left').replace("px", "");
            var tmpPostItWindowY = tmpPostItWindow.el.getStyle('top').replace("px", "");
            tmpPositionController.locateWindowOnBoard(tmpPostItWindow, tmpPostItWindowX, tmpPostItWindowY);
        }
    },

    /**
     * Applies a zoom value to a specific post-it window
     */
    applyZoomToPostItWindow:function (argPostItWindow, argZoomValues) {
        if (!argPostItWindow) {
            return;
        }
        if (!argZoomValues) {
            var tmpSliderValue = this.getZoomSlider().getValue();
            argZoomValues = Brainstorm.util.ZoomDefaults[tmpSliderValue];
        }
        argPostItWindow.zoomValue = argZoomValues.zoom;
        Framework.util.StylesUtil.setZoomStyle(argPostItWindow, argZoomValues.zoom);

    }

});