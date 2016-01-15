var transMatrix = [1, 0, 0, 1, 0, 0];
var mapMatrix;
var width;
var height;
var svgDoc;
var tooltip;
var svgPosition;
var svgElement;
var dfLayers = 1;
var selected = null;
var hovered = null;


$(document).ready(function () {
    createLayers();
        
    if (dfLayers > 0) {
        var layerKeys = new Array();
        var layerData = new Object();
        var nav = document.getElementById("nav");
        var layers = $("v\\:layer");
        for (i = 0; i < layers.length; i++) {
            var chkid = layers[i].getAttribute("v:name");
            var chkindex = layers[i].getAttribute("v:index");

            if (chkid) {
                layerKeys.push(chkid);
                layerData[chkid] = chkindex;
            }
        }

        var sortedKeys = layerKeys.sort();
        for (ix = dfLayers; ix < layers.length; ix++) {
            var cid = sortedKeys[ix];
            var cindex = layerData[cid];
            toggleLayer(cindex, cid);
        }
    }
    $("#label")[0].innerText == "Layers  -->";
    show();
});


function handleCustProps() {
    svgElement = document.getElementsByTagName("svg")[0];
    svgPosition = getPosition(svgElement);
    var svg = document.getElementById("svg");
    var data = document.getElementById("data");
    var allcps = $("v\\:custprops");
    for (i = 0; i < allcps.length; i++) {
        var cps = allcps[i].childNodes;
        var text1 = null;
        for (j = 0; j < cps.length; j++) {
            if (cps[j].attributes != null && cps[j].attributes["v:val"] != null && cps[j].attributes["v:lbl"].nodeValue != "" && cps[j].attributes["v:val"].nodeValue != "VT4()") {
                if (text1 == null) {
                    var group = allcps[i].parentNode;

                    text1 = document.createElement("div");
                    text1.setAttribute("id", "txt" + group.id + "1");
                    text1.style.display="none";

                    group.onmousemove = function (evt) { hover(evt) };
                    group.onclick = function (evt) { ShowTooltip(evt) };                    
                }
                
                //if (cps[j].attributes["v:lbl"].nodeValue != "Hyperlink" && cps[j].attributes["v:lbl"].nodeValue != "Notes") {
                var data1 = cps[j].attributes["v:lbl"].nodeValue + ": ";
                if (cps[j].attributes["v:lbl"].nodeValue == "Hyperlink") {
                    data1 = "";
                    var data2 = "<a target='_blank' href='"+ cps[j].attributes["v:val"].nodeValue.substring(4, cps[j].attributes["v:val"].nodeValue.length - 1) +"'>More information</a>";
                }else{
                    var data2 = cps[j].attributes["v:val"].nodeValue.substring(4, cps[j].attributes["v:val"].nodeValue.length - 1);
                }
                text1.innerHTML = text1.innerHTML + "<b>" + data1 + "</b>" + data2 + "<br/>";
                //}
            }
        }
        data.appendChild(text1);
    }
}

function hover(evt) {
    if (hovered != null && hovered != evt.currentTarget && hovered != selected) {
        hovered.setAttribute("class", "");
    }
    if (hovered != evt.currentTarget){
        hovered = evt.currentTarget;
        hovered.setAttribute("class", "hover");
    }
}

function ShowTooltip(evt) {
    if (tooltip != null) {
        tooltip.style.display = "none";
        if (selected != null) {
            selected.setAttribute("class", "");
            HideTooltip(selected);
        }
    }
    var tooltip1 = document.getElementById("txt" + evt.currentTarget.id + "1");
    tooltip1.style.display = "block";
    tooltip = tooltip1;
    selected = evt.currentTarget;
    selected.setAttribute("class", "click");
}

function HideTooltip(evt) {
    var tooltip1 = document.getElementById("txt" + evt.id + "1");
    tooltip1.style.display = "none";
}

function createLayers() {
    var layerKeys = new Array();
    var layerData = new Object();
    var nav = document.getElementById("nav");
    var layers = $("v\\:layer");
    for (i = 0; i < layers.length; i++) {
        var chkid = layers[i].getAttribute("v:name");
        var chkindex = layers[i].getAttribute("v:index");

        if (chkid) {
            layerKeys.push(chkid);
            layerData[chkid] = chkindex;
        }
    }

    var sortedKeys = layerKeys.sort();

    for (i = 0; i < sortedKeys.length; i++) {
        var cid = sortedKeys[i];
        var cindex = layerData[cid];

        var chk = document.createElement("input");
        chk.type = "checkbox";
        chk.id = cid;
        chk.value = cindex;
        if (dfLayers == 0 || dfLayers > i)
            chk.checked = "checked";
        chk.onclick = function () {
            toggleLayer(this.value, this.id);
        }

        var literal = document.createElement("span")
        literal.innerHTML = cid + "<br/>";

        nav.appendChild(chk);
        nav.appendChild(literal);
    }

}

function toggleLayer(layer, c) {

    var nav = document.getElementById("nav");
    var gs = $("g");
    var layers = nav.childNodes;
    var enabledLayers = [];

    for (i = 1; i < layers.length; i++)
        if (layers[i].checked)
            if (layers[i].id === c)
            {
                enabledLayers.push(layers[i].value);
                ///add stuff to change title, one day
            }
            else
                layers[i].checked = false;

    for (i = 0; i < gs.length; i++) {
        var element = gs[i]
        var atts = element.attributes;
        if (atts["v:layermember"]) {
            var objectLayers = atts["v:layermember"].nodeValue;
            var toggle = false;
            for (x = 0; x < enabledLayers.length; x++) {
                var endsWith = ";" + enabledLayers[x];
                if (objectLayers == enabledLayers[x] || objectLayers.indexOf(";" + enabledLayers[x] + ";") !== -1 || objectLayers.indexOf(enabledLayers[x] + ";") === 0 || objectLayers.indexOf(endsWith, objectLayers.length - endsWith.length) !== -1)
                    toggle = true;
            }
            if (toggle)
                element.style.visibility = "visible";
            else
                element.style.visibility = "hidden";
        }
    }            
}

function init(evt) {
    if (window.svgDocument == null) {
        svgDoc = evt.target.ownerDocument;
    }
    mapMatrix = svgDoc.getElementById("all");
    width = evt.target.getAttributeNS(null, "width");
    height = evt.target.getAttributeNS(null, "height");
    svgDoc = evt.target.ownerDocument;
}

function pan(dx, dy) {
    transMatrix[4] += dx;
    transMatrix[5] += dy;

    newMatrix = "matrix(" + transMatrix.join(' ') + ")";
    mapMatrix.setAttributeNS(null, "transform", newMatrix);
}

function zoom(scale) {
    for (var i = 0; i < transMatrix.length; i++) {
        transMatrix[i] *= scale;
    }
    transMatrix[4] += (1 - scale) * width / 2;
    transMatrix[5] += (1 - scale) * height / 2;
    newMatrix = "matrix(" + transMatrix.join(' ') + ")";
    mapMatrix.setAttributeNS(null, "transform", newMatrix);
}

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    if (element) {
        var rect = element.getBoundingClientRect();
        var scrollTop = document.documentElement.scrollTop ?
                document.documentElement.scrollTop : document.body.scrollTop;
        var scrollLeft = document.documentElement.scrollLeft ?
                         document.documentElement.scrollLeft : document.body.scrollLeft;
        yPosition = rect.top + scrollTop;
        xPosition = rect.left + scrollLeft;
    }
    return { x: xPosition, y: yPosition };
}
function show() {
    if ($("#label")[0].innerText == "Layers  -->")
        $("#label")[0].innerText = "Layers  <--";
    else
        $("#label")[0].innerText = "Layers  -->";
    $("#nav").toggle("down");
}
function hide() {
    $("#nav").toggle("up");
    $("#label")[0].innerText = "Layers  -->";
}