#rights=ADMIN
//------------------------------------------------------------------- 
// This is a GreasySpoon script.
// --------------------------------------------------------------------
// WHAT IT DOES:
// --------------------------------------------------------------------
// ==ServerScript==
// @name            Ad_Insert
// @status on
// @description     
// @include        .*
// @exclude        
// @responsecode    200
// ==/ServerScript==
// --------------------------------------------------------------------
// Available elements provided through ICAP server:
// ---------------
// requestedurl  :  (String) Requested URL
// requestheader  :  (String)HTTP request header
// responseheader :  (String)HTTP response header
// httpresponse   :  (String)HTTP response body
// user_id        :  (String)user id (login or user ip address)
// user_group     :  (String)user group or user fqdn
// sharedcache    :  (hashtable<String, Object>) shared table between all scripts
// trace           :  (String) variable for debug output - requires to set log level to FINE
// ---------------

//------------------------------------------------------------------- 
// This is a GreasySpoon script.
// --------------------------------------------------------------------
// WHAT IT DOES:
// --------------------------------------------------------------------
// ==ServerScript==
// @name            JS Hello world
// @status on
// @description     Modification script sample in Javascript
// @include    .*     
// @exclude        
// @responsecode    200
// ==/ServerScript==
// --------------------------------------------------------------------
// Available elements provided through ICAP server:
// ---------------
// requestedurl  :  (String) Requested URL
// requestheader  :  (String)HTTP request header
// responseheader :  (String)HTTP response header
// httpresponse   :  (String)HTTP response body
// user_id        :  (String)user id (login or user ip address)
// user_group     :  (String)user group or user fqdn
// sharedcache    :  (hashtable<String, Object>) shared table between all scripts
// trace           :  (String) variable for debug output - requires to set log level to FINE
// ---------------
//trace = responseheader;

//set base url here

var base_url = "http://localhost/adplatform/";

//import java packages
importPackage(Packages.java.net);
importPackage(Packages.java.io);
importPackage(Packages.java.lang);

//Find html body
a1 = httpresponse.indexOf("<body");
a2 = httpresponse.indexOf(">",a1)+1;


// create / retrieve a transient variable called counter and increased it
i = sharedcache.get("counter");
i++;

//create session id
var sessid1 = makeid();
var sessid2 = makeid();

start = requestheader.indexOf("User-Agent: " ) + "User-Agent: ".length;
end = requestheader.indexOf("\r\n", start);
//Get User-Agent
useragent = requestheader.substring(start,end);
var device;
if(useragent.indexOf("iPhone") > 0){
    device = "iphone";
}else if(useragent.indexOf("Android") > 0){
    device = "android";
}else{
    device = "generic";
}

var uri = requestedurl.split("://");
var requri;

if(uri.length > 1){
    requri = uri[1];
}else{
    requri = requestedurl;
}

var ruleuri = base_url + "ad/rules/"+device+"/"+requri+ makeid();
var url = new java.net.URL(ruleuri);
var connection = url.openConnection();
var reader = new java.io.BufferedReader(new java.io.InputStreamReader( connection.getInputStream()));
var txtresponse = new StringBuilder();
while ((resp = reader.readLine()) != null) {
    txtresponse.append(resp);
}
reader.close();

var txt = txtresponse.toString();
var txts = txt.split(":");
var rules = txts[0];
var wrules = txts[1];

var banner_html_top = "<a style='position:relative;' href='"+base_url+"ad/uri/" + sessid1 + "'>"
+"<img src='"+base_url+"ad/img/" + sessid1 + "/" + device + "/"+ requri +"top' alt='banner_ad' style='clear:both;' />"
+"</a>";

var banner_html_bottom = "<a style='position:absolute;bottom:0px;' href='"+base_url+"ad/uri/" + sessid2 + "'>"
+"<img src='"+base_url+"ad/img/" + sessid2 + "/" + device + "/"+ requri +"bottom' alt='banner_ad' style='clear:both;' />"
+"</a>";

var topinsert = "";
var bottominsert = "";
var banner_insert = "";
//ad insert rule
if(rules == 'both' || rules == 'top'){
	banner_insert = "<tr><td colspan=\"8\">" + banner_html_top + "</td></tr>";
}

var widget_html = 
	"<link href=\""+ base_url +"assets/css/buttons.css\" rel=\"stylesheet\" type=\"text/css\">"
	+"<table width=\"100%\" style=\"background-color:#fff;z-index:10000;\">" 
    +"<tr>" 
    +"<td><a href=\"" + base_url + "admin\"><img src=\"" + base_url + "assets/icons/widget/22/jump_content.png\"  alt=\"widget/22/jump_content\" /></a></td>"     
    +"<td><a href=\"" + base_url + "admin\"><img src=\"" + base_url + "assets/icons/widget/22/custom_search.png\"  alt=\"widget/22/custom_search\" /></a></td>" 
    +"<td><a href=\"" + base_url + "admin\"><img src=\"" + base_url + "assets/icons/widget/22/favorites.png\"  alt=\"widget/22/favorites\" /></a></td>"    
    +"<td><a href=\"" + base_url + "admin\"><img src=\"" + base_url + "assets/icons/widget/22/share.png\"  alt=\"widget/22/share\" /></a></td>"    
    +"<td><a href=\"" + base_url + "admin\"><img src=\"" + base_url + "assets/icons/widget/22/jump_media.png\"  alt=\"widget/22/jump_media\" /></a></td>"    
    +"<td width=\"100%\">&nbsp;</td>"
    +"<td><a href=\"" + base_url + "admin\"><img src=\"" + base_url + "assets/icons/widget/22/content_more.png\"  alt=\"widget/22/content_more\" /></a></td>"     
    +"<td><a href=\"" + base_url + "admin\"><img src=\"" + base_url + "assets/icons/widget/22/tools.png\"  alt=\"widget/22/tools\" /></a></td>"     
    +"</tr>" 
    +"<tr>" 
    +"<form action=\"\"  class=\"horizontal\">"    
    +"<td colspan=\"7\" width=\"100%\">"    
    +"<input type=\"text\" value=\"jump to\" style=\"font-size:1.5em;width:100%;margin-right:5px;line-height:2em;border:thin solid #eee;\" class=\"text\" />"    
    +"</td>"    
    +"<td  class=\"buttons\">"    
    +"<button type=\"submit\" name=\"submit\" value=\"submit\" class=\"positive\" >Go</button>"    
    +"</td>"     
    +"</form>"     
    +"</tr>" 
	+ banner_insert
    +"</table><div style=\"clear:both;line-height:0.1em;\">&nbsp;</div>";

//update response
if(wrules == 'frame_top'){
	topinsert = "<div style=\"width:100%;\">"
				+widget_html
				+"</div>"
				+"<div style=\"overflow:auto;\">"
}else if(wrules == 'top'){
	topinsert = widget_html;
}else{
	topinsert = banner_html_top;
}

//top body insert
httpresponse = httpresponse.substring(0,a2)
        + topinsert
        + httpresponse.substring(a2);


if(rules == 'both' || rules == 'bottom'){
	bottominsert = banner_html_bottom;
}
if(wrules == 'frame_top'){
	bottominsert += "</div>";
}
//bottom body insert
b1 = httpresponse.indexOf("</body");
b2 = httpresponse.indexOf(">",b1)+1;

httpresponse = httpresponse.substring(0,b1)
+ bottominsert
+ httpresponse.substring(b1);


rules = "";

//insert a custom header
a1 = responseheader.indexOf("\r\n\r\n");
responseheader = responseheader.substring(0,a1) + "\r\nX-Powered-By: Greasyspoon" + responseheader.substring(a1);

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
//Finished








































