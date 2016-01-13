;(function(){
    var config = {}; //基础配置

	function Modal(option){
        //处理没有传参的报错
        if (option === undefined) {
            option = {};
        }
        return Modal.prototype.init(option);
	}

    /**
     * init 方法
     * @param  {object} option 基础配置信息
     */
	Modal.prototype.init = function(option){
        config.width = option.width || 600; //宽度
        config.height = option.height || 400; //高度
        config.title = option.title || "title"; //标题
        config.layerbg = option.layerbg || "show"; //遮罩层是否显示
        config.content = option.content || "";
        if (config.content == "") console.warn("内容是空的！！！ (ノ=Д=)ノ┻━┻");
        var m = ModalModel();
        ModalAlert(m);
        ModalRemove();
	}

    function ModalModel(){
        //可视域
        var ViewSize = getViewSizeWithScrollbar();
        //外层框架
        var ModalDiv = document.createElement("div");
            ModalDiv.setAttribute("id", "Modal");
            ModalDiv.setAttribute("style", "z-index:10000;position:fixed;top:0;left:0;height:" + ViewSize.height + "px;width:" + ViewSize.width + "px;");
        //弹出层
        var ModalHtml = '';
        //背景
        var ModalLayerbg = "<div style='width:100%;height:100%;background:rgba(0,0,0,0.3);'></div>";
        if (config.layerbg != "hide") ModalHtml = ModalHtml + ModalLayerbg;
        var Modal = "<div class='Modal-layer Modal-layer-in' id='Modal_layer' style='position:fixed;top:50%;left:50%;height:"+ config.height+"px;width:"+config.width+"px;margin-left:-"+(config.width/2)+"px;margin-top:-"+(config.height/2)+"px;'>"+
                        "<div class='Modal-layer-title'>"+
                            "<h1 class='Modal-layer-title-h1'>" + config.title + "</h1>"+
                            "<i class='Modal-layer-close' id='Modal_layer_close'></i>"+
                        "</div>"+
                        "<div class='Modal-layer-content'>"+config.content+"</div>"+
                    "</div>";
        ModalHtml = ModalHtml + Modal;
        ModalDiv.innerHTML = ModalHtml;
        return ModalDiv;
    }

    //添加代码
    function ModalAlert(m){
        document.body.parentNode.appendChild(m);
    }

    //移除弹窗
    function ModalRemove(){
        var ModalView = document.getElementById("Modal");
        var ModalLayer = document.getElementById("Modal_layer");
        var ModalClose = document.getElementById("Modal_layer_close");
        ModalClose.onclick = function(){
            removeClass(ModalLayer,"Modal-layer-in");
            addClass(ModalLayer,"Modal-layer-out");
            setTimeout(function(){
                ModalView.remove();
            }, 1000);
        }
    }

    //可视域高宽
    function getViewSizeWithScrollbar(){
        if(window.innerWidth){ 
            return { 
                width : window.innerWidth, 
                height: window.innerHeight 
            } 
        }else if(document.documentElement.offsetWidth == document.documentElement.clientWidth){ 
            return { 
                width : document.documentElement.offsetWidth, 
                height: document.documentElement.offsetHeight 
            } 
        }else{ 
            return { 
                width : document.documentElement.clientWidth + getScrollWith(), 
                height: document.documentElement.clientHeight + getScrollWith() 
            } 
        } 
    }

    //原生class处理
    /**
     *是否存在class
     *@param obj element
     *@param cls string
     *@return boolean
     */
    function hasClass(obj, cls) {  
      return Boolean(obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)')));  
    }  
    /********
     *添加class
     *@param obj element
     *@param cls string
     */
    function addClass(obj, cls) {  
        if (!hasClass(obj, cls)) obj.className += " " + cls;  
    }  
    /********
     *删除class
     *@param obj element
     *@param cls string
     */
    function removeClass(obj, cls) {  
        if (hasClass(obj, cls)) {  
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
            obj.className = obj.className.replace(reg, ' ');  
        }  
    }  
    /********
     *toggleclass
     *@param obj element
     *@param cls string
     */
    function toggleClass(obj,cls){  
        if(hasClass(obj,cls)){  
            removeClass(obj, cls);  
        }else{  
            addClass(obj, cls);  
        }  
    } 

	Modal.prototype.init.prototype = Modal.prototype; //覆盖prototype
	window.Modal = Modal; //将方法引入全局
})();