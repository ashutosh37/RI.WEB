export function GetThumbnailUrl(url){
    var filename = url.replace(/^.*[\\\/]/, '');
   
    return url.replace(filename , '_w/'+filename.split('.')[0]+'_'+filename.split('.')[1] + '.jpg')

}

export function GetParameterByName(name,url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}