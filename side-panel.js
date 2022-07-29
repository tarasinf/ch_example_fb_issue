chrome.runtime.onMessage.addListener(function(msg, sender){
    if(msg == "toggle"){
        toggle();
    }
})

function toggle(){
    let iframe = document.getElementById('sidePanelId');
    if (iframe) {
        iframe.remove();
    } else {
        iframe = document.createElement('iframe'); 
        iframe.setAttribute('id', 'sidePanelId');
        iframe.style.height = "calc(100% - 14px)";
        iframe.style.maxHeight = "calc(100% - 14px)";
        iframe.style.width = "470px";
        iframe.style.position = "fixed";
        iframe.style.top = "7px";
        iframe.style.right = "0px";
        iframe.style.zIndex = "9000000000000000000";
        iframe.style.border = "0px"; 
        iframe.src = chrome.runtime.getURL("popup.html")

        document.body.appendChild(iframe);
    }
}
