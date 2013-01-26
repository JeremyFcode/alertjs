/**
 * @author Benjamin Bellantonio
 * Replace and customize native alert(); javascript function
 */
(function() {
    "use strict";  
    
    // Set up alertjs stylesheet
    var _head = document.getElementsByTagName('head') [0];
    var _link = document.createElement('link');
    _link.setAttribute('href','alertjs.css');
    _link.setAttribute('rel','stylesheet');
    _link.setAttribute('tyoe','text/css');
    _head.appendChild(_link);
    
    /**
     * Create the box and its content
     * 
     * @param data object / Box data
     */
    function createBox(data){
        
        
        var _body = document.getElementsByTagName('body') [0];
        var _layer = document.createElement('div');
        var _box = document.createElement('div');
        var _box_title = document.createElement('h1');
        var _box_text = document.createElement('p');
        var _title = document.createTextNode(data.title);
        var _text = document.createTextNode(data.msg);
        var _btn_text = document.createTextNode('OK');
        var _btn =document.createElement('button');
        var _close_btn = document.createElement('span');
        var _close_icon = document.createTextNode(String.fromCharCode(215));
        
        _close_btn.appendChild(_close_icon);
        _box_title.appendChild(_title);
        _box_title.appendChild(_close_btn);
        _box_text.appendChild(_text);
        _btn.appendChild(_btn_text);
        
        _box.appendChild(_box_title);
        _box.appendChild(_box_text);
        _box.appendChild(_btn);
        _body.appendChild(_box);
        _body.appendChild(_layer);
        
        // Background layer image
        var _bg_layer_img = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAFoEvQfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDY2RDlEMDc2NkU3MTFFMkFBQjJEN0JEQ0M0NjM3Q0IiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDY2RDlEMDg2NkU3MTFFMkFBQjJEN0JEQ0M0NjM3Q0IiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NjZEOUQwNTY2RTcxMUUyQUFCMkQ3QkRDQzQ2MzdDQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NjZEOUQwNjY2RTcxMUUyQUFCMkQ3QkRDQzQ2MzdDQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvElfFoAAAANSURBVHjaY2BgYPAFAABSAE5KPdTrAAAAAElFTkSuQmCC';
        // Set layer style
        _layer.setAttribute('style','z-index:9998;position:fixed;height:100%;width:100%;top:0;left:0;background: url(data:image/png;base64,'+_bg_layer_img+') repeat top left');
        
        // Set box class for style
        _box.className = 'boxjs';
        
        // Set box position
        _box.setAttribute('style', 'position:absolute;z-index:9999;top:'+parseInt((window.innerHeight/2)-_box.offsetHeight)+'px;left:'+parseInt((window.innerWidth/2)-(_box.offsetWidth/2))+'px;');
        
        // Layer on click event
        _layer.addEventListener("click", function(){
            _box.className = _box.className+' boxjs_important';
            setTimeout(function(){
                _box.className = 'boxjs';
            },10);
        }, false);
        
        var urlToGo = null;
        
        if(typeof event != "undefined" && event.type == 'click'){
            urlToGo = event.target.origin;
            event.preventDefault();
        } else if(typeof event != "undefined" && event.type == 'submit'){
            urlToGo = event.target.action;
            event.preventDefault();
        }
        
        // Button on click event
        _btn.addEventListener("click", function(){
            _body.removeChild(_box);
            _body.removeChild(_layer);
            if(typeof urlToGo == 'string'){
                window.location.href = urlToGo;
            }
        }, false);
        
        // Window resize event
        window.onresize = function(event) {
            // Set box position
            _box.setAttribute('style', 'position:absolute;z-index:9999;top:'+parseInt((window.innerHeight/2)-_box.offsetHeight)+'px;left:'+parseInt((window.innerWidth/2)-(_box.offsetWidth/2))+'px;');
        }
        
        // Document keypress event
        document.onkeypress = function(event) {
            if(event.keyCode == 13){
                _body.removeChild(_box);
                _body.removeChild(_layer);
                if(typeof urlToGo == 'string'){
                    window.location.href = urlToGo;
                }
            }
        }
        
    }
        

    /**
     * Override native alert() function
     * 
     * @param string title / Box title
     * @param string msg   / Box message 
     */
    window.alert = function(title,msg) {
        // Put data inside an object
        var data = {
            'title' : title,
            'msg'   : msg
        };
        // Create the new alert box with custom data
        createBox(data);
    }

})();