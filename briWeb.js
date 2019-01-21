var BG_position = 0,
topBar_Menu, topBar_MenuCloseButton, topBar_MenuOpenButton,
allArticles, allPosts = [],
currentFMPsub = "1,1" ,
raAppended = false, raPC_screen, raPCHolder, raM_screen, raMHolder, ra_clonedMobile,
web_ui_menuPosition = 0, webUI, currentWebUI,
fmp_menuPosition =0,
canHoverZoom = true;
var isMobile = false;

window.onload = function(){
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))
	|| (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))){ isMobile = true;}

	topBar_Menu = document.getElementById("topBar");
	topBar_MenuCloseButton = document.getElementById("topBar_MenuCloseButton");
	topBar_MenuOpenButton = document.getElementById("topBar_MenuOpenButton");

	allArticles = document.getElementsByClassName("articleHolder");
	var grabIt;
	for (p = 0; p < allArticles.length; p+=1) { 
		grabIt = allArticles[p].getElementsByTagName('div')[1];
		allPosts.push(grabIt); 
	}

	window.addEventListener('resize', function(){
		// you can put specific size in here to make it faster
		CheckTopBarStatus();
		CheckVS_Status();
		CheckRA_Status(); //700
		CheckWebUI_Status();
	}, true);

	raPCHolder = document.getElementById("raPCHolder");
	raPC_screen = document.getElementById("raPC_screen");
	raPC_AI();
	raM_screen = document.getElementById("raM_screen");
	raMHolder = document.getElementById("raMHolder");
	raM_AI();

	webUI = document.getElementById("webUI");
};
window.onmousemove=function(e){
	CheckZoomStatus(e);

	//IMG ZOOM AI
	if(e.target.tagName == "IMG"){ checkIMG("hover", e.target, "img" , event.clientX, event.clientY); }
	if(e.target.style.backgroundImage.src != ""){ checkIMG("hover", e.target, "bg", event.clientX, event.clientY); }
	if(e.target.tagName == "IMG" || e.target.style.backgroundImage.src != ""){zoomMagicAI(event.clientX, event.clientY);}
};
window.onmouseover=function(e) {
 	if(e.target.id == "articleTitle"){ e.target.className = "articleHolderTitle_hover"; }
};
window.onmouseout=function(e) {
 	if(e.target.id == "articleTitle"){ e.target.className = "articleHolderTitle"; }
};
window.onmousedown=function(e) {
	if(e.which === 1 || e.button == 1){
		if(!isMobile){websiteAI(e);}
	}
};
var touchobj;
function websiteAI (e) {
	if(e.target.id == "articleTitle"){
		var articleName = e.target.firstElementChild.innerHTML;
		console.log(articleName);
		if(articleName != "WebEx"){
			var post;
			if(e.target.nextElementSibling.className == "post pshow"){ 
			 	e.target.nextElementSibling.className = "post phide";
			 	post = e.target.nextElementSibling;
			 	post.lastElementChild.className="miniMenu";
			}else if(e.target.nextElementSibling.className == "post phide"){ 
			 	e.target.nextElementSibling.className = "post pshow";
			 	post = e.target.nextElementSibling;
			 	post.lastElementChild.className="miniMenu miniMenu_show";
			}
		}else{
			window.location.assign("/webX/"); 
		}
	}
	
	if(e.target.id == "sendEmail" 
	||e.target.id == "email_PopupClose"
	||e.target.id == "email_Send"){ emailAI(e.target);}

	//IMG ZOOM AI
	if(e.target.tagName == "IMG"){ checkIMG("click", e.target, "img","",""); }
	if(e.target.style.backgroundImage.src != ""){ checkIMG("click", e.target, "bg","",""); }
}
function touchStart(e){
	touchobj = e.changedTouches[0];
	// var currentElement = e.target;
	if(!isMobile){websiteAI(e);}
}
function moreTouchAI (e) {
	if (isMobile){
		if(e.id == "articleTitle"){
			var post;
			if(e.nextElementSibling.className == "post pshow"){ 
			 	e.nextElementSibling.className = "post phide";
			 	post = e.nextElementSibling;
			 	post.lastElementChild.className="miniMenu";
			}else if(e.nextElementSibling.className == "post phide"){ 
			 	e.nextElementSibling.className = "post pshow";
			 	post = e.nextElementSibling;
			 	post.lastElementChild.className="miniMenu miniMenu_show";
			}
		}
		if(e.id="webEx_Link"){ window.location.href = "brianmclendon.com/webX/2016/1/"; }
		if(e.id == "sendEmail" 
		||e.id == "email_PopupClose"
		||e.id == "email_Send"){ emailAI(e);}

		//IMG ZOOM AI
		if(e.tagName == "IMG"){ checkIMG("click", e, "img","",""); }
		if(e.style.backgroundImage.src != ""){ checkIMG("click", e, "bg","",""); }
	}
}
window.addEventListener("keydown", checkKeyPressed, false);
function checkKeyPressed(e) {
    if (e.keyCode == "27") {
    	// 27 == escape button
    	var pZoom = document.getElementById("photoZoom");
		if(pZoom.className == "photoZoomHolder"){ photoZoomAI('close'); }
    }
}

window.onscroll = function (e) { 
	bodyScroll();
} 
var scrollTimer = -1;
function bodyScroll() {
	// if hover zoom icon is on, turn it off
	var z = document.getElementById("zMagic");
	if(z.className == "zoomHoverMagic"){
		z.className = "zoomHoverMagic zoomHoverMagic_hidden";
	}
    canHoverZoom = false;
    if (scrollTimer != -1){ clearTimeout(scrollTimer);}
    scrollTimer = window.setTimeout("scrollFinished()", 150);
}
function scrollFinished() {canHoverZoom = true;}


function emailAI (e) {
	var popup = document.getElementById('email_Popup');
	if(e.className !="email_popuptext" && popup.className !="email_popuptext showPopup"){ popup.classList.toggle('showPopup'); }
    if(e.id == "email_PopupClose"){ popup.classList.toggle('showPopup'); }
	if(e.id == "email_Send"){ 
		window.location.href = "mailto:mclendon.brian@gmail.com?subject=Hello%20Bri!";
		popup.classList.toggle('showPopup');
	}
}

function fmpAI(menuNumber, el, which){
	if(menuNumber == 1){
		if(el.className != "active"){
			var searchDIV = el.parentNode.children;
			for(i = 0; i < searchDIV.length; i+=1) {
			    if(searchDIV[i].className == 'active'){ searchDIV[i].className = ""; }
			}
			el.className = "active";
			var subNav =  el.parentNode.nextElementSibling;
			if(which == "1" || which == "2" || which == "5"){ 
				var showNumbers = 0;
				if(which == "1"){ showNumbers = 13;}
				if(which == "2"){ showNumbers = 1; }
				if(which == "5"){ showNumbers = 2; }
				var searchSUBDIV = subNav.children;
				for(i = 0; i < searchSUBDIV.length; i+=1) {
					if(i <= showNumbers){ searchSUBDIV[i].className = "fmpSubNAV_div";
					}else{ searchSUBDIV[i].className = "fmpSubNAV_div fmpSubNAV_divHide"; }
				}
				currentFMPsub = "" + which + "," + 1 + "";
				fmpCarousel();

				var currentFMPnums = currentFMPsub.split(",");
				if(currentFMPnums[0] == which) {
					var selectedNum = (parseInt(currentFMPnums[1]) - 1);
					var searchSUBDIV2 = el.parentNode.nextElementSibling.children;
					for(i = 0; i<searchSUBDIV2.length; i+=1) {
						if(selectedNum == i){
							searchSUBDIV2[i].className="fmpSubNAV_div_active";
						}
					}
				}
				subNav.className = "fmpSubNAV";
			}else {
				subNav.className ="fmpSubNAV fmpSubNAV_hide";
				var searchSUBDIV3 = subNav.children;
				for( i = 0; i < searchSUBDIV3.length; i+=1) {
					searchSUBDIV3[i].className = "fmpSubNAV_div fmpSubNAV_divHide";
				}
				currentFMPsub = "" + which + "," + 0 + "";
				fmpCarousel();
			}
		}
	}
	if(menuNumber == 2){
		if(el.className !="fmpSubNAV_div_active"){ 
			var fmp_searchDIV = el.parentNode.children;
			for( i = 0; i < fmp_searchDIV.length; i+=1) {
			    if(fmp_searchDIV[i].className == 'fmpSubNAV_div_active'){ 
			    	fmp_searchDIV[i].className = "fmpSubNAV_div"; 
			    }
			}
			el.className = "fmpSubNAV_div_active";

			var searchDIV1 = el.parentNode.previousElementSibling.children;
			var menu1Number = 0;
			for( i = 0; i < searchDIV1.length; i+=1) {
			    if(searchDIV1[i].className == 'active'){ menu1Number = (i + 1);}
			}
			currentFMPsub = "" + menu1Number + "," + which + "";
			fmpCarousel();
		}
	}
}
function fmpCarousel(){
	var work1 = document.getElementById("fmp_work1"),
	work2 = document.getElementById("fmp_work2"),
	currentFMPnums = currentFMPsub.split(","),
	titleNum = parseInt(currentFMPnums[0]);
	if(fmp_menuPosition == 0){
		fmp_menuPosition += 1;
		work1.className = "fmp_work slideOUT";
		//put new piece into this second menu BEFORE YOU SLIDE IT IN
		work2.parentNode.getElementsByTagName('p')[0].innerHTML = returnFMP_Infotext(titleNum, 0);
		// work2.getElementsByTagName('p')[1].innerHTML = returnWebUI_Infotext(grabThis, 1);
		// console.log(currentFMPsub);
		fmp_AppendWork(work2, currentFMPsub);
		work2.className = "fmp_work fmp_onRight";
		work2.className = "fmp_work slideIN";
	}else if(fmp_menuPosition == 1){
		fmp_menuPosition =0;
		//put new piece into this first menu BEFORE YOU SLIDE IT IN
		work1.parentNode.getElementsByTagName('p')[0].innerHTML = returnFMP_Infotext(titleNum, 0);
		// work1.getElementsByTagName('p')[1].innerHTML = returnWebUI_Infotext(grabThis, 1);
		// console.log(currentFMPsub);
		fmp_AppendWork(work1, currentFMPsub);
		work1.className = "fmp_work slideIN";
		work2.className = "fmp_work slideOUT";
	}
}

function returnFMP_Infotext(whichToGrab, whichPartToReturn){
	var title = "Why is this not a title?";
	var info = "Some info should be here.";
	if(whichToGrab == 1){
		title = "Product Photography"; info = "1";
	}
	if(whichToGrab == 2){
		title = "Layout"; info = "2";
	}
	if(whichToGrab == 3){
		title = "Web Advertisements"; info = "3";
	}
	if(whichToGrab == 4){
		title = "Coding"; info = "4";
	}
	if(whichToGrab == 5){
		title = "Logo Designs"; info = "5";
	}
	if(whichToGrab == 6){
		title = "Sales Contests"; info = "6";
	}
	if(whichToGrab == 7){
		title = "Product Mailer Illustrations"; info = "7";
	}
	returnThis = "";
	if(whichPartToReturn == 0){ returnThis = title; }
	if(whichPartToReturn == 1){ returnThis = info; }
	return returnThis;
}

function fmp_AppendWork(whereToAppend, whichToAppend){
	var searchDIV = whereToAppend.children;
	for( i = 0; i < searchDIV.length; i+=1) {
	    if(searchDIV[i].tagName != 'P'){ searchDIV[i].parentNode.removeChild(searchDIV[i]); }
	}

	// SELECTIONS WITH ONLY 1 STARTS ON ZERO,
	// AND SELECTIONS WITH MULTIPLE PIECES START ON 1
	var holderElement, photo, 
	div1, div2, div3, div4, div5, div6,
	img1, img2, img3, img4;

	if(whichToAppend == "1,1" || whichToAppend == "1,2" || whichToAppend == "1,3"
		||whichToAppend == "1,4" || whichToAppend == "1,5" || whichToAppend == "1,6"
		||whichToAppend == "1,7" || whichToAppend == "1,8" || whichToAppend == "1,9"
		||whichToAppend == "1,10" || whichToAppend == "1,11" || whichToAppend == "1,12"
		||whichToAppend == "1,13" || whichToAppend == "1,14"){
		holderElement = document.createElement('div');
		holderElement.className = 'fmp_productPhoto_holder';
		whereToAppend.appendChild(holderElement);
		div1 = document.createElement('div');
		if(whichToAppend == "1,1"){ div1.className = 'fmp_productPhoto_ONE';}
		else{ div1.className = 'fmp_productPhoto';}
		photo = "p1";
		if(whichToAppend == "1,2"){ photo = "p2";}
		if(whichToAppend == "1,3"){ photo = "p3";}
		if(whichToAppend == "1,4"){ photo = "p4";}
		if(whichToAppend == "1,5"){ photo = "p5";}
		if(whichToAppend == "1,6"){ photo = "p6";}
		if(whichToAppend == "1,7"){ photo = "p7";}
		if(whichToAppend == "1,8"){ photo = "p8";}
		if(whichToAppend == "1,9"){ photo = "p9";}
		if(whichToAppend == "1,10"){ photo = "p10";}
		if(whichToAppend == "1,11"){ photo = "p11";}
		if(whichToAppend == "1,12"){ photo = "p12";}
		if(whichToAppend == "1,13"){ photo = "p13";}
		if(whichToAppend == "1,14"){ photo = "p14";}
		div1.style.backgroundImage = "url('././files/images/posts/fmp/"+photo+".jpg')";
		holderElement.appendChild(div1);
	}
	if(whichToAppend == "2,1"){
		holderElement = document.createElement('div');
		holderElement.className = 'fmp_layouts';
		whereToAppend.appendChild(holderElement);
		img1 = document.createElement("img");
 		img1.src='././files/images/posts/fmp/layout1.png';
		holderElement.appendChild(img1);
	}
	if(whichToAppend == "2,2"){
		holderElement = document.createElement('div');
		holderElement.className = 'fmp_layouts';
		whereToAppend.appendChild(holderElement);
		img1 = document.createElement("img");
 		img1.src='././files/images/posts/fmp/layout2.png';
		holderElement.appendChild(img1);
	}
	if(whichToAppend == "3,0"){
		holderElement = document.createElement('div');
		holderElement.className = 'fmp_webAds';
		whereToAppend.appendChild(holderElement);
		img1 = document.createElement("img");
 		img1.src='././files/images/posts/fmp/web_sketch.png';
		holderElement.appendChild(img1);
		img2 = document.createElement("img");
 		img2.src='././files/images/posts/fmp/web_full.jpg';
		holderElement.appendChild(img2);
		div1 = document.createElement('div');
		holderElement.appendChild(div1);
		img3 = document.createElement("img");
 		img3.src='././files/images/posts/fmp/web_pc1.jpg';
		div1.appendChild(img3);
		img4 = document.createElement("img");
 		img4.src='././files/images/posts/fmp/web_pc2.jpg';
		div1.appendChild(img4);
	}

	if(whichToAppend == "4,0"){
		holderElement = document.createElement('div');
		holderElement.className = 'fmp_coding';
		whereToAppend.appendChild(holderElement);
		img1 = document.createElement("img");
 		img1.src='././files/images/posts/fmp/code1a.jpg';
		holderElement.appendChild(img1);
		img2 = document.createElement("img");
 		img2.src='././files/images/posts/fmp/code1b.jpg';
		holderElement.appendChild(img2);
		img3 = document.createElement("img");
 		img3.src='././files/images/posts/fmp/code2.jpg';
		holderElement.appendChild(img3);
	}
	
	if(whichToAppend == "5,1" || whichToAppend == "5,2" || whichToAppend == "5,3"){
		holderElement = document.createElement('div');
		holderElement.className = 'fmp_logos';
		whereToAppend.appendChild(holderElement);
		img1 = document.createElement("img");
		logoNum = 1;
		if(whichToAppend == "5,2"){ logoNum = 2;}
		if(whichToAppend == "5,3"){ logoNum = 3;}
 		img1.src='././files/images/posts/fmp/logo'+logoNum+'.jpg';
		holderElement.appendChild(img1);
	}
	if(whichToAppend == "6,0"){
		holderElement = document.createElement('div');
		holderElement.className = 'fmpoke_holder';
		whereToAppend.appendChild(holderElement);
		div1 = document.createElement('div');
		div1.className = 'fmpoke_1';
		holderElement.appendChild(div1);
		div2 = document.createElement('div');
		div2.className = 'fmpoke_2';
		holderElement.appendChild(div2);
		div3 = document.createElement('div');
		div3.className = 'fmpoke_3';
		holderElement.appendChild(div3);
		div4 = document.createElement('div');
		div4.className = 'fmpoke_4';
		holderElement.appendChild(div4);
		div5 = document.createElement('div');
		div5.className = 'fmpoke_5';
		div5.id = 'fmpPCHolder';
		holderElement.appendChild(div5);
		var div5_SCREEN = document.createElement('div');
		div5_SCREEN.className = 'fmpPC_screen';
		div5_SCREEN.id = 'fmpPC_screen';
		div5.appendChild(div5_SCREEN);
		var div5_SCREENinner = document.createElement('div');
		div5_SCREENinner.className = 'fmpPC_screen_inner';
		div5_SCREEN.appendChild(div5_SCREENinner);
		div6 = document.createElement('div');
		div6.className = 'fmpoke_6';
		holderElement.appendChild(div6);
	}

	if(whichToAppend == "7,0"){
		holderElement = document.createElement('div');
		holderElement.className = 'fmp_mailer';
		whereToAppend.appendChild(holderElement);
		img1 = document.createElement("img");
 		img1.src='././files/images/posts/fmp/febfax.jpg';
		holderElement.appendChild(img1);
		div1 = document.createElement('div');
		holderElement.appendChild(div1);
		img2 = document.createElement("img");
 		img2.src='././files/images/posts/fmp/febfax_illus1.png';
		div1.appendChild(img2);
		img3 = document.createElement("img");
 		img3.src='././files/images/posts/fmp/febfax_illus2.png';
		div1.appendChild(img3);
	}
}

function CheckVS_Status () {
	if(window.innerWidth<=415){
	 	IMGs_hideShow(vs_bHolder, "show");
	 	IMGs_hideShow(vs_pHolder, "show");
		IMGs_hideShow(vs_pHolder2, "show");
	}
	if(window.innerWidth>415){
		// poster or brochure
		if(vs_brochuresButton.className == "vs_selected"){ villageStuioAI("b");
		}else{ villageStuioAI("p"); }
	}
}
function villageStuioAI(whatToDo){
	var vs_brochuresButton = document.getElementById("vs_brochuresButton"),
	vs_postersButton = document.getElementById("vs_postersButton");

	vs_bHolder = document.getElementById("vs_bHolder");
	vs_pHolder = document.getElementById("vs_pHolder");
	vs_pHolder2 = document.getElementById("vs_pHolder2");
	if(whatToDo == "b")
	{	vs_brochuresButton.className = "vs_selected"; 
		vs_postersButton.className = "vs_unselected";
		IMGs_hideShow(vs_bHolder, "show");
		IMGs_hideShow(vs_pHolder, "hide");
		IMGs_hideShow(vs_pHolder2, "hide");
	}
	if(whatToDo == "p")
	{ 	vs_brochuresButton.className = "vs_unselected"; 
		vs_postersButton.className = "vs_selected";
		vs_bHolder.className = "VS_brochureHolder shrinkVS";
		IMGs_hideShow(vs_bHolder, "hide");
		IMGs_hideShow(vs_pHolder, "show");
		IMGs_hideShow(vs_pHolder2, "show");
	}
}


function CheckRA_Status() {
	if(window.innerWidth>700){ if(raAppended){rainbowAlternativeAI("d");} }
	if(window.innerWidth<420){ if(raAppended){rainbowAlternativeAI("d");} }
	raPC_AI();
	raM_AI();
}
function rainbowAlternativeAI(whatToDo){
	var ra_desktopButton = document.getElementById("ra_desktopButton"),
	ra_mobileButton = document.getElementById("ra_mobileButton"),
	raIMGs = document.getElementById("raIMGs");

	if(whatToDo == "d")
	{	ra_desktopButton.className = "ra_selected"; 
		ra_mobileButton.className = "ra_unselected";
		if(raAppended){
			raAppended = false;
			raIMGs.removeChild( raIMGs.children[0] );
			raIMGs.children[0].className = "raPCdisplay";
		}
	}
	if(whatToDo == "m")
	{ 	ra_desktopButton.className = "ra_unselected"; 
		ra_mobileButton.className = "ra_selected";
		if(!raAppended){
			raAppended = true;
			raIMGs.children[0].className = "raPCdisplay ra_hider";
			var cln = raMHolder.cloneNode(true);
  			raIMGs.insertBefore(cln, raIMGs.childNodes[0]);
  			ra_clonedMobile = cln;
  		}
	}
	raPC_AI();
	raM_AI();
}
function raPC_AI(){
	if(!raAppended){
		if(raPCHolder.className == "raPCdisplay"){
			var pcHolderHeight =  getStyle("raPCHolder","height","yes");
			// raPC_screen.style.backgroundColor = "green";
			var screenHeight = (pcHolderHeight - (0.59 * pcHolderHeight))+"px";
			raPC_screen.style.height = screenHeight;
		}
	}
}
function raM_AI(){
	var screenHeight;
	if(!raAppended){
		if(raPCHolder.className == "raPCdisplay"){
			var mHolderHeight =  getStyle("raMHolder","height","yes");
			// raM_screen.style.backgroundColor = "green";
			screenHeight = (mHolderHeight - (0.395 * mHolderHeight))+"px";
			raM_screen.style.height = screenHeight;
		}
	}
	if(raAppended){
		var style_height = window.getComputedStyle(ra_clonedMobile),
		cloned_mHolderHeight = style_height.getPropertyValue("height");
 		cloned_mHolderHeight = parseInt(cloned_mHolderHeight, 10);
		screenHeight = (cloned_mHolderHeight - (0.395 * cloned_mHolderHeight))+"px";
		ra_clonedMobile.firstElementChild.style.height = screenHeight;
	}
}


function web_ui_AI(whatToDo, el){
	if(whatToDo == "w" || whatToDo == "u" ){
		var web_or_ui_WEB = document.getElementById("web_or_ui_WEB"),
		web_or_ui_UI = document.getElementById("web_or_ui_UI"),
		webMenu1 = web_or_ui_WEB.parentElement.parentElement.children[1],
		webMenu2 = web_or_ui_WEB.parentElement.parentElement.children[2];

		if(whatToDo == "w" && web_or_ui_WEB.className != "active"){
			web_or_ui_WEB.className = "active"; webMenu1.className ="web_or_ui_menu1";
			web_or_ui_UI.className = ""; webMenu2.className ="web_or_ui_menu2 web_or_ui_HIDEMENU";
		}
		if(whatToDo == "u" && web_or_ui_UI.className != "active"){
			web_or_ui_WEB.className = ""; webMenu1.className ="web_or_ui_menu1 web_or_ui_HIDEMENU";
			web_or_ui_UI.className = "active"; webMenu2.className ="web_or_ui_menu2";
		}
	}
	if(whatToDo == "sW" || whatToDo == "sU"){
		if(el.className !="active"){
			var elParent = el.parentElement,
			children = elParent.children,
			elParent_Sibling = el.parentElement.nextElementSibling,
			children2 = elParent_Sibling.children,
			work1 = document.getElementById("web_or_ui_work1"),
			work2 = document.getElementById("web_or_ui_work2");

			if(whatToDo == "sU"){
				elParent_Sibling = el.parentElement.previousElementSibling;
				children2 = elParent_Sibling.children;
			}
			for ( i = 0; i < children.length; i+=1) { if(children[i].className =="active"){ children[i].className = ""; } }
			for ( j = 0; j < children2.length; j+=1) { if(children2[j].className =="active"){ children2[j].className = ""; } }

			el.className = "active";
			
			var sentFrom = "";
			if(whatToDo == "sW" ){ sentFrom = "w"; }
			else if(whatToDo == "sU" ){ sentFrom = "u"; }
			var grabThis = (sentFrom + el.innerHTML);

			if(web_ui_menuPosition == 0){
				web_ui_menuPosition += 1;
				work1.className = "web_or_ui_work slideOUT";
				//put new piece into this second menu BEFORE YOU SLIDE IT IN
				work2.getElementsByTagName('p')[0].innerHTML = returnWebUI_Infotext(grabThis, 0);
				work2.getElementsByTagName('p')[1].innerHTML = returnWebUI_Infotext(grabThis, 1);
				web_ui_AppendWork(work2, grabThis);
				work2.className = "web_or_ui_work wNu_onRight";
				work2.className = "web_or_ui_work slideIN";
			}else if(web_ui_menuPosition == 1){
				web_ui_menuPosition =0;
				//put new piece into this first menu BEFORE YOU SLIDE IT IN
				work1.getElementsByTagName('p')[0].innerHTML = returnWebUI_Infotext(grabThis, 0);
				work1.getElementsByTagName('p')[1].innerHTML = returnWebUI_Infotext(grabThis, 1);
				web_ui_AppendWork(work1, grabThis);
				work1.className = "web_or_ui_work slideIN";
				work2.className = "web_or_ui_work slideOUT";
			}
		}
	}
}


function returnWebUI_Infotext(whichToGrab, whichPartToReturn){
	var title = "Why is this not a title?";
	var info = "Some info should be here.";

	if(whichToGrab == "w1"){
		title = "Junk In The Trunk LLC";
		info = "I was commissioned to design wireframes, mockup website pages, and a scheduling application for Junk In The Trunk, a New Jersey company specializing in junk removal.";
	}
	if(whichToGrab == "w2"){
		title = "Sounds of Sandstorm";
		info = "A digital landing page design I designed for the musical group Sounds of Sandstorm. This site uses social media feeds to keep fans involved and embedded apps to play music and videos.";
	}
	if(whichToGrab == "w3"){
		title = "Brothers of the Head";
		info = "An album specific website designed for the band Brothers of the Head and their album 'C'mon Now'.";
	}
	if(whichToGrab == "w4"){
		title = "I Have Been Floated";
		info = "During the summer of 2012 I recorded “COAT”, a nine track music album with my band, I Have Been Floated. When the album was finished in August I worked with the group and created packaging, merchandise, and a website to promote the album.";
	}
	if(whichToGrab == "w5"){
		title = "Party Cops";
		info = "This min-site for the band Party Cops was built to look like a manila folder containing a police cold case file.";
	}
	if(whichToGrab == "w6"){
		title = "jQuery Scroll Bars";
		info = "While working on a project I needed to control a 'target' scroll bar with a 'source' scroll bar. I decided to share the source code because of my own dificutly finding a solution anywhere online.";
	}

	if(whichToGrab == "u1"){
		title = "TZ-101";
		info = "A mockup layout & design for a digital synthesizer application, the TZ(teenzombie)-101.";
	}
	if(whichToGrab == "u2"){
		title = "In App Purchase";
		info = "I was asked to sketch, then design a minimal one time pop up offer for a video game.";
	}
	if(whichToGrab == "u3"){
		title = "In App Purchase";
		info = "An In-App-Purchase screen I was asked to design, complete with the sketches and wireframes I did to show some of my process.";
	}
	if(whichToGrab == "u4"){
		title = "Digital Synth UI";
		info = "A mockup synthesizer UI design and details. It was constructed specifically to fit size dimensions of an iPad.";
	}
	returnThis = "";
	if(whichPartToReturn == 0){ returnThis = title; }
	if(whichPartToReturn == 1){ returnThis = info; }

	currentWebUI = whichToGrab;

	return returnThis;
}

function web_ui_AppendWork(whereToAppend, whichToAppend){
	var searchDIV = whereToAppend.children;
	for( i = 0; i < searchDIV.length; i+=1) {
	    if(searchDIV[i].tagName != 'P'){ searchDIV[i].parentNode.removeChild(searchDIV[i]); }
	}
	window.setTimeout(CheckWebUI_Status, 1);
	var holderElement,
	img1,img2,img3,img4,img5,img6,img7,img8,
	div1,div2,div3;
	if(whichToAppend == "w1"){
		holderElement = document.createElement('div');
		holderElement.className = 'junkInTheTrunk';
		whereToAppend.appendChild(holderElement);
		img1 = document.createElement("img");
 		img1.src='././files/images/posts/Web_n_UI/jitt1.jpg';
		holderElement.appendChild(img1);
		div1 = document.createElement('div'); holderElement.appendChild(div1);
		img2 = document.createElement("img"); img2.src='././files/images/posts/Web_n_UI/jitt2.png'; div1.appendChild(img2);
		img3 = document.createElement("img"); img3.src='././files/images/posts/Web_n_UI/jitt3.png'; div1.appendChild(img3);
		img4 = document.createElement("img"); img4.src='././files/images/posts/Web_n_UI/jitt4.png'; div1.appendChild(img4);
		div2 = document.createElement('div'); holderElement.appendChild(div2);
		img5 = document.createElement("img"); img5.src='././files/images/posts/Web_n_UI/jitt5.png'; div2.appendChild(img5);
		img6 = document.createElement("img"); img6.src='././files/images/posts/Web_n_UI/jitt6.jpg'; div2.appendChild(img6);
		div3 = document.createElement('div'); holderElement.appendChild(div3);
		img7 = document.createElement("img"); img7.src='././files/images/posts/Web_n_UI/jitt7.jpg'; div3.appendChild(img7);
		img8 = document.createElement("img"); img8.src='././files/images/posts/Web_n_UI/jitt8.jpg'; div3.appendChild(img8);
	}
	if(whichToAppend == "w2"){
		holderElement = document.createElement('div');
		holderElement.className = 'sos';
		holderElement.id = 'sos_div';
		whereToAppend.appendChild(holderElement);
		div1 = document.createElement('div');
		div1.className = 'sos_screen';
		div1.id = 'screen_sos';
		div1.addEventListener("onresize",function(){webUI_pcDisplays();});
		holderElement.appendChild(div1);
		div2 = document.createElement('div');
		div2.className = 'sos_screen_inner';
		div2.id = 'screen_sos';
		div1.appendChild(div2);
		img1 = document.createElement("img");
 		img1.src='././files/images/posts/Web_n_UI/sos_pc.png';
 		img1.id = 'sos_pcIMG';
		holderElement.appendChild(img1);
		webUI_pcDisplays();
		window.setTimeout(CheckWebUI_Status, 1);
	}
	if(whichToAppend == "w3"){
		holderElement = document.createElement('div');
		holderElement.className = 'brothersOTH';
		holderElement.id = 'brothersOTH_div';
		whereToAppend.appendChild(holderElement);
		div1 = document.createElement('div');
		div1.className = 'brothersOTH_screen';
		div1.id = 'brothersOTH_sos';
		div1.addEventListener("onresize",function(){webUI_pcDisplays();});
		holderElement.appendChild(div1);
		div2 = document.createElement('div');
		div2.className = 'brothersOTH_screen_inner';
		div2.id = 'screen_brothersOTH';
		div1.appendChild(div2);
		img1 = document.createElement("img");
 		img1.src='././files/images/posts/Web_n_UI/brotherOTH_pc.png';
 		img1.id = 'brothersOTH_pcIMG';
		holderElement.appendChild(img1);
		webUI_pcDisplays();
		window.setTimeout(CheckWebUI_Status, 1);
	}
	if(whichToAppend == "w4"){
		holderElement = document.createElement('div');
		holderElement.className = 'ihbf_coat';
		whereToAppend.appendChild(holderElement);
		img1 = document.createElement("img");
 		img1.src='././files/images/posts/Web_n_UI/ihbf1.jpg';
		holderElement.appendChild(img1);
		div1 = document.createElement('div'); holderElement.appendChild(div1);
		img2 = document.createElement("img"); img2.src='././files/images/posts/Web_n_UI/ihbf2.jpg'; div1.appendChild(img2);
		img3 = document.createElement("img"); img3.src='././files/images/posts/Web_n_UI/ihbf3.jpg'; div1.appendChild(img3);
		img4 = document.createElement("img"); img4.src='././files/images/posts/Web_n_UI/ihbf4.jpg'; div1.appendChild(img4);
		img5 = document.createElement("img");
 		img5.src='././files/images/posts/Web_n_UI/ihbf5.png';
		holderElement.appendChild(img5);
	}
	if(whichToAppend == "w5"){
		holderElement = document.createElement('div');
		holderElement.className = 'partyCops';
		holderElement.id = 'partyCops_div';
		whereToAppend.appendChild(holderElement);
		div1 = document.createElement('div');
		div1.className = 'partyCops_screen';
		div1.id = 'partyCops_sos';
		div1.addEventListener("onresize",function(){webUI_pcDisplays();});
		holderElement.appendChild(div1);
		div2 = document.createElement('div');
		div2.className = 'partyCops_screen_inner';
		div2.id = 'screen_partyCops';
		div1.appendChild(div2);
		img1 = document.createElement("img");
 		img1.src='././files/images/posts/Web_n_UI/partyCops_pc.png';
 		img1.id = 'partyCops_pcIMG';
		holderElement.appendChild(img1);
		webUI_pcDisplays();
		window.setTimeout(CheckWebUI_Status, 1);
	}
	if(whichToAppend == "w6"){
		holderElement = document.createElement('div');
		holderElement.className = 'jq_scrollBars';
		whereToAppend.appendChild(holderElement);
		img1 = document.createElement("img");
 		img1.src='././files/images/posts/Web_n_UI/scrollBars1.gif';
		holderElement.appendChild(img1);
		img2 = document.createElement("img");
 		img2.src='././files/images/posts/Web_n_UI/scrollBars2.gif';
		holderElement.appendChild(img2);
		img3 = document.createElement("img");
 		img3.src='././files/images/posts/Web_n_UI/scrollBars3.gif';
		holderElement.appendChild(img3);
	}
	if(whichToAppend == "u1"){
		holderElement = document.createElement('div');
		holderElement.className = 'tz101';
		whereToAppend.appendChild(holderElement);
		img1 = document.createElement("img");
 		img1.src='././files/images/posts/Web_n_UI/tz101_1.jpg';
		holderElement.appendChild(img1);
		img2 = document.createElement("img");
 		img2.src='././files/images/posts/Web_n_UI/tz101_2.jpg';
		holderElement.appendChild(img2);
	}
	if(whichToAppend == "u2"){
		holderElement = document.createElement('div');
		holderElement.className = 'inapp1';
		whereToAppend.appendChild(holderElement);
		img1 = document.createElement("img");
 		img1.src='././files/images/posts/Web_n_UI/inapp1_1.jpg';
		holderElement.appendChild(img1);
		img2 = document.createElement("img");
 		img2.src='././files/images/posts/Web_n_UI/inapp1_2.png';
		holderElement.appendChild(img2);
		img3 = document.createElement("img");
 		img3.src='././files/images/posts/Web_n_UI/inapp1_3.jpg';
		holderElement.appendChild(img3);
		img4 = document.createElement("img");
 		img4.src='././files/images/posts/Web_n_UI/inapp1_4.png';
		holderElement.appendChild(img4);
	}

	if(whichToAppend == "u3"){
		holderElement = document.createElement('div');
		holderElement.className = 'inapp2';
		whereToAppend.appendChild(holderElement);
		img1 = document.createElement("img");
 		img1.src='././files/images/posts/Web_n_UI/inapp2_1.png';
		holderElement.appendChild(img1);
		div1 = document.createElement('div'); holderElement.appendChild(div1);
		img2 = document.createElement("img");
 		img2.src='././files/images/posts/Web_n_UI/inapp2_2.jpg';
		div1.appendChild(img2);		
		img3 = document.createElement("img");
 		img3.src='././files/images/posts/Web_n_UI/inapp2_3.png';
		div1.appendChild(img3);
	}

	if(whichToAppend == "u4"){
		holderElement = document.createElement('div');
		holderElement.className = '	synthUI';
		whereToAppend.appendChild(holderElement);
		img1 = document.createElement("img");
 		img1.src='././files/images/posts/Web_n_UI/synth1.jpg';
		holderElement.appendChild(img1);
		div1 = document.createElement('div'); holderElement.appendChild(div1);
		img2 = document.createElement("img");
 		img2.src='././files/images/posts/Web_n_UI/synth2.jpg';
		div1.appendChild(img2);		
		img3 = document.createElement("img");
 		img3.src='././files/images/posts/Web_n_UI/synth3.jpg';
		div1.appendChild(img3);
		img4 = document.createElement("img");
 		img4.src='././files/images/posts/Web_n_UI/synth4.jpg';
		div1.appendChild(img4);
	}
}

function CheckWebUI_Status(){
	if(webUI.className == "post pshow"){
		if(currentWebUI == "w2" || currentWebUI == "w3" || currentWebUI == "w5"){
		 webUI_pcDisplays(); }
	}
}
function webUI_pcDisplays(override){
	whichIMG = "sos_pcIMG";
	whichScreen = "screen_sos";
	var screenClipAMT = 0.59;
	if(currentWebUI == "w2"){ whichIMG = "sos_pcIMG"; whichScreen = "screen_sos";}
	if(currentWebUI == "w3"){ whichIMG = "brothersOTH_pcIMG"; whichScreen = "screen_brothersOTH"; screenClipAMT = 0.53;}
	if(currentWebUI == "w5"){ whichIMG = "partyCops_pcIMG"; whichScreen = "screen_partyCops";}
	var pcHolderHeight =  getStyle(whichIMG,"height","yes");
	var theScreen = document.getElementById(whichScreen);
	theScreen.style.backgroundColor = "green";
	var screenHeight = (pcHolderHeight - (screenClipAMT * pcHolderHeight))+"px";
	theScreen.style.height = screenHeight;
}



function IMGs_hideShow(el, whatToDo){
	NodeList.prototype.forEach = Array.prototype.forEach;
	var children = el.childNodes;
	children.forEach(function(item){
		if(el == vs_bHolder){
		    if(item.className == "showVS" || item.className == "hideVS"){
			   	if(whatToDo == "hide"){ item.className = "hideVS";  }
			    if(whatToDo == "show"){ item.className = "showVS"; }
			}
		}
		if(el == vs_pHolder || el == vs_pHolder2){
			if(whatToDo == "hide"){ el.className = "VS_posterHolder hideVS"; }
			if(whatToDo == "show"){ el.className = "VS_posterHolder showVS"; }
		}
	});
}


function ProjectsAI(whatToDo){
	var	projects = document.getElementById("projects"),
	projectsButton = document.getElementById("viewProjects"),
	menuStatus = projectsButton.title;
	if(whatToDo == "toggle"){
		if (menuStatus =="off") {
			projectsButton.innerHTML = "&#9830;";
			setTimeout(function(){ projectsButton.innerHTML = "&#9660;"; }, 80);
			projectsButton.title = "on";
			projects.className = "articleWrapper articleWrapper_open";
		}else if(menuStatus == "on"){
			projectsButton.innerHTML = "&#9830;";
			setTimeout(function(){ projectsButton.innerHTML = "&#9650;"; }, 80);
			projectsButton.title = "off";
			projects.className = "articleWrapper articleWrapper_closed";
			// switch off open posts
			for (p = 0; p < allPosts.length; p+=1) { 
				if(allPosts[p].className == "post pshow"){ allPosts[p].className = "post phide"; } }
		}
	}
	if(whatToDo == "turn off"){
		projectsButton.innerHTML = "&#9830;";
		setTimeout(function(){ projectsButton.innerHTML = "&#9650;"; }, 80);
		projectsButton.title = "off";
		projects.className = "articleWrapper articleWrapper_closed";
		// switch off open posts
		for (p = 0; p < allPosts.length; p+=1) {	
			if(allPosts[p].className == "post pshow"){ allPosts[p].className = "post phide"; } }
	}
}




function CheckTopBarStatus(){
	//check window width
	 var topBar_currentWidth = getStyle("topBar","width","yes");
	 var topBar_currenOpacity= getStyle("topBar","opacity");
	 if(topBar_currentWidth<551 || topBar_currentWidth>999){
		if(topBar_currenOpacity<1){
	 		TopBarMenuAI("open");
	 	}
	 }
}

function TopBarMenuAI(whatToDo){
	if(whatToDo == "close"){
		topBar_Menu.style.top = "-600px";
		topBar_Menu.style.opacity = "0";
		topBar_MenuOpenButton.style.top = "220px";
		topBar_MenuOpenButton.style.opacity = "1";
		ProjectsAI("turn off");
	}
	if(whatToDo == "open"){
		topBar_Menu.style.top = "0px";
		topBar_Menu.style.opacity = "1";
		topBar_MenuOpenButton.style.top = "-200px";
		topBar_MenuOpenButton.style.opacity = "0";
	}
	if(whatToDo == "hide_CloseButton"){
		topBar_MenuCloseButton.style.display = "none";
	}
	if(whatToDo == "show_CloseButton"){
		topBar_MenuCloseButton.style.display = "block";
	}
}



function logoBG_Movement(imgName){
	BG_position+=1;
	var logoBG_mask = document.getElementById("logoBG_mask");
	//create holder
	var holderElement = document.createElement('div');
	logoBG_mask.appendChild(holderElement);
	holderElement.className = 'logoBG_img_Holder';
	holderElement.id = 'logoBG_img_Holder'; 
	//create img
	var BGimg = document.createElement("img");
 	BGimg.src = '././files/images/logo_BG/' + imgName;
 	// WAS 	if(BGimg.onError){}else{ holderElement.appendChild(BGimg); }
	if(BGimg.onload){ holderElement.appendChild(BGimg); }
	holderElement.className = "logoBG_img_Holder logoBG_move";

	// setInterval(function(){ BGimg.style.opacity = "0"; }, 14000);
	removeCurrentBG_img = setTimeout(function(){
			holderElement.remove(); 
	},15000);
	
	createNewBG_img = setTimeout(function(){ 
		if(BG_position ==1){ 
			logoBG_Movement('logoBG-1.jpg');
		}else if(BG_position ==2){ 
			logoBG_Movement('logoBG-2.png');
		}else if(BG_position ==3){
			BG_position =0; 
			logoBG_Movement('logoBG-3.jpg');
		}
	},10000);
}

function getStyle(el, which, parsed_OR_not){
	var grabEl = document.getElementById(el),
	style = window.getComputedStyle(grabEl),
	grabStyle = style.getPropertyValue(which);
	if(parsed_OR_not == "y" || parsed_OR_not == "yes"){
 		grabStyle = parseInt(grabStyle, 10);
	} return grabStyle;
}

function scrollToItem(item, nextORprevious) {
	var elements = document.getElementsByClassName("articleHolder");
	if(item == "APLC"){
		if(nextORprevious == "next"){ item = elements[1]; } 
	}
	if(item == "FMP"){
		if(nextORprevious == "previous"){ item = elements[0]; }
		if(nextORprevious == "next"){ item = elements[2]; } 
	}
	if(item == "VS"){
		if(nextORprevious == "previous"){ item = elements[1]; }
		if(nextORprevious == "next"){ item = elements[3]; } 
	}
	if(item == "pCDI"){
		if(nextORprevious == "previous"){ item = elements[2]; }
		if(nextORprevious == "next"){ item = elements[4]; } 
	}
	if(item == "RA"){
		if(nextORprevious == "previous"){ item = elements[3]; }
		if(nextORprevious == "next"){ item = elements[6]; } //JUMPS BECAUSE OF TEENZOMBIE being hidden
	}
	if(item == "webUI"){
		if(nextORprevious == "previous"){ item = elements[4]; } //JUMPS BECAUSE OF TEENZOMBIE being hidden
	}
    var diff=(item.offsetTop-window.scrollY)/8;
    if (Math.abs(diff)>1) {
        window.scrollTo(0, (window.scrollY+diff));
        clearTimeout(TO);
        var TO =setTimeout(scrollToItem, 30, item);
    } else {
        window.scrollTo(0, item.offsetTop);
    }
}
var timeOut;
function scrollToTop() {
	if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
		window.scrollBy(0,-50);
		timeOut=setTimeout('scrollToTop()',10);
	}
	else clearTimeout(timeOut);
	// js smooth scroll from https://gist.github.com/ricardozea/ , thanks dude
}
function CheckZoomStatus (e) {
 	var pz_inner = document.getElementById("pz_inner");
	if(pz_inner.className == "pz_inner pz_inner_Cover"){
		var movementStrength = 500;
		var height = movementStrength / screen.height;
		var width = movementStrength / screen.width;
		var pageX = e.clientX - (screen.width / 2);
		var pageY = e.clientY - (screen.height / 2);
		var newvalueX = width * pageX * -1 - 25;
		var newvalueY = height * pageY * -1 - 200;
		pz_inner.style.backgroundPosition = newvalueX+"px "+newvalueY+"px";
	}
}
function checkIMG (clickORhover, path, imgORbg, xM, yM) {
	var pathArray, possibleIMG;
	if(imgORbg == "img"){
		pathArray = path.src.split("/");
		possibleIMG = pathArray[pathArray.length-1];
		// alert(possibleIMG);
	}
	if(possibleIMG == "APLC_1_Notebook.png" || possibleIMG == "APLC_3_book.png"
		|| possibleIMG == "layout1.png" || possibleIMG == "layout2.png" 
		|| possibleIMG == "web_full.jpg" || possibleIMG == "web_pc1.jpg" || possibleIMG == "web_pc2.jpg"
		|| possibleIMG == "code1a.jpg" || possibleIMG == "code1b.jpg" || possibleIMG == "code2.jpg"
		|| possibleIMG == "logo1.jpg" || possibleIMG == "logo2.jpg" || possibleIMG == "logo3.jpg"
		|| possibleIMG == "febfax.jpg"
		|| possibleIMG == "vs1.jpg" || possibleIMG == "vs2.jpg" || possibleIMG == "vs3.jpg" || possibleIMG == "vs4.jpg"
		|| possibleIMG == "vs5.jpg" || possibleIMG == "vs6.jpg" || possibleIMG == "vs7-8.jpg" 
		|| possibleIMG == "poster1.gif" || possibleIMG == "poster2.gif" || possibleIMG == "poster3.jpg" || possibleIMG =="poster4.jpg"
		|| possibleIMG == "dvd_and_case.png"
		|| possibleIMG == "jitt1.jpg"|| possibleIMG == "jitt2.png"|| possibleIMG == "jitt3.png"|| possibleIMG == "jitt4.png"
		|| possibleIMG == "jitt5.png"|| possibleIMG == "jitt6.jpg"|| possibleIMG == "jitt7.jpg"|| possibleIMG == "jitt8.jpg"
		|| possibleIMG == "ihbf1.jpg"|| possibleIMG == "ihbf2.jpg"|| possibleIMG == "ihbf3.jpg"|| possibleIMG == "ihbf4.jpg"|| possibleIMG == "ihbf5.jpg"
		|| possibleIMG == "scrollBars1.gif"|| possibleIMG == "scrollBars2.gif"|| possibleIMG == "scrollBars3.gif"
		|| possibleIMG == "tz101_1.jpg" || possibleIMG == "tz101_2.jpg"
		|| possibleIMG == "inapp1_1.jpg" || possibleIMG == "inapp1_2.png" || possibleIMG == "inapp1_3.jpg" || possibleIMG == "inapp1_4.png"
		|| possibleIMG == "inapp2_1.png" || possibleIMG == "inapp2_2.png" || possibleIMG == "inapp2_3.png"
		|| possibleIMG == "synth1.jpg" || possibleIMG == "synth2.jpg" || possibleIMG == "synth3.jpg" || possibleIMG == "synth4.jpg") {
		if(clickORhover == "click"){ photoZoomAI("open", path.src); }
		if(clickORhover == "hover"){ mouseFollowDiv("zMagic", xM, yM); }
	}


	if(possibleIMG == "febfax_illus1.png" || possibleIMG == "febfax_illus2.png"){
		var faxNameSplit = possibleIMG.split(".");
		if(clickORhover == "click"){ photoZoomAI("open", "././files/images/posts/fmp/"+faxNameSplit[0]+"_whiteBG.jpg"); }
		if(clickORhover == "hover"){ mouseFollowDiv("zMagic", xM, yM);}
	}

	if(possibleIMG == "APLC_2_logo.png"){
		if(clickORhover == "click"){ photoZoomAI("open", "././files/images/posts/APLC/APLC_2_logo_whiteBG.jpg"); }
		if(clickORhover == "hover"){ mouseFollowDiv("zMagic", xM, yM);}
	}

	if(possibleIMG == "rainbowAlternative_pc.png" || imgORbg == "bg" && path.className == "raPC_screen_inner"){
		if(clickORhover == "click"){ photoZoomAI("open", "././files/images/posts/RainbowAlternative/rainbowAlternative_pcFull.png"); }
		if(clickORhover == "hover"){ mouseFollowDiv("zMagic", xM, yM);}
	}
	if(possibleIMG == "rainbowAlternative_iphone.png" || imgORbg == "bg" && path.className == "raM_screen_inner"){
		if(clickORhover == "click"){ photoZoomAI("open", "././files/images/posts/RainbowAlternative/rainbowAlternative_iphoneFull.png"); }
		if(clickORhover == "hover"){ mouseFollowDiv("zMagic", xM, yM);}
	}

	if(possibleIMG == "sos_pc.png" || imgORbg == "bg" && path.className == "sos_screen_inner"){
		if(clickORhover == "click"){ photoZoomAI("open", "././files/images/posts/Web_n_UI/sos_full.png"); }
		if(clickORhover == "hover"){ mouseFollowDiv("zMagic", xM, yM);}
	}
	if(possibleIMG == "brotherOTH_pc.png" || imgORbg == "bg" && path.className == "brothersOTH_screen_inner"){
		if(clickORhover == "click"){ photoZoomAI("open", "././files/images/posts/Web_n_UI/brothersofthehead_site.png"); }
		if(clickORhover == "hover"){ mouseFollowDiv("zMagic", xM, yM);}
	}
	if(possibleIMG == "partyCops_pc.png" || imgORbg == "bg" && path.className == "partyCops_screen_inner"){
		if(clickORhover == "click"){ photoZoomAI("open", "././files/images/posts/Web_n_UI/partyCops_pcFull.png"); }
		if(clickORhover == "hover"){ mouseFollowDiv("zMagic", xM, yM);}
	}

	if(imgORbg == "bg"){
		// console.log(path.className);
		if(path.className == "fmp_productPhoto_ONE"){
			if(clickORhover == "click"){ photoZoomAI("open", "././files/images/posts/fmp/p1.jpg");}
			if(clickORhover == "hover"){ mouseFollowDiv("zMagic", xM, yM);}
		}
		if(path.className == "fmp_productPhoto"){
			if(clickORhover == "click"){ 
				var fmpNum = currentFMPsub.split(",");
				photoZoomAI("open", "././files/images/posts/fmp/p"+fmpNum[1]+".jpg");
			}
			if(clickORhover == "hover"){ mouseFollowDiv("zMagic", xM, yM);}
		}
		if(path.className == "fmpoke_1"){
			if(clickORhover == "click"){ photoZoomAI("open", "././files/images/posts/fmp/fmpoke/1_logo.png");}
			if(clickORhover == "hover"){ mouseFollowDiv("zMagic", xM, yM);}
		}
		if(path.className == "fmpoke_2"){ 
			if(clickORhover == "click"){ photoZoomAI("open", "././files/images/posts/fmp/fmpoke/2_salesSheet.jpg");}
			if(clickORhover == "hover"){ mouseFollowDiv("zMagic", xM, yM);}
		}
		if(path.className == "fmpoke_3"){ 
			if(clickORhover == "click"){ photoZoomAI("open", "././files/images/posts/fmp/fmpoke/3_firstCaught.jpg");}
			if(clickORhover == "hover"){ mouseFollowDiv("zMagic", xM, yM);}
		}
		if(path.className == "fmpoke_4"){
			if(clickORhover == "click"){ photoZoomAI("open", "././files/images/posts/fmp/fmpoke/4_thermoPoster.jpg");}
			if(clickORhover == "hover"){ mouseFollowDiv("zMagic", xM, yM);}
		}
		if(path.className == "fmpPC_screen_inner"){ 
			if(clickORhover == "click"){ photoZoomAI("open", "././files/images/posts/fmp/fmpoke/5_interfaceFull.jpg");}
			if(clickORhover == "hover"){ mouseFollowDiv("zMagic", xM, yM);}
		}
		if(path.className == "fmpoke_6"){ 
			if(clickORhover == "click"){ photoZoomAI("open", "././files/images/posts/fmp/fmpoke/6_icons.jpg");}
			if(clickORhover == "hover"){ mouseFollowDiv("zMagic", xM, yM);}
		}
		
		// if(path.className == "P_CDI_mockupIMG"){ 
		// 	if(clickORhover == "click"){ photoZoomAI("open", "././files/images/posts/P_CDI/DVD_layoutMockup2.jpg");}
		// 	if(clickORhover == "hover"){ mouseFollowDiv("zMagic", xM, yM);}
		// }
	}
}
function photoZoomAI (i, imgPath) {
	var photoZoomHolder = document.getElementById("photoZoom"),
	zoomB = document.getElementById("zoomB"),
	pz_inner = document.getElementById("pz_inner"),
	zoomOUT_img = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQ0lEQVQoU2NkwAT/sYgxMFKiEKYXxWRsJoIUYlgPUggThGlCVgSXR1eIrghuOrJCZH9hOAmbQqzuxmUiyHQUDUQrBAB5AQ4F9B6AMQAAAABJRU5ErkJggg==)",
	zoomIN_img = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAR0lEQVQoU2NkIAz+g5QwYlEHloDKwdh4FSKbwYjPRJhCsBqYQrgVOJwMN5FohSCD0BWjOAuf1RgKkU0CSSIHD9zJOCXQPQUA2X0MCRT+jmwAAAAASUVORK5CYII=)";
	if(i =="open" || i =="close"){
		photoZoomHolder.classList.toggle('pz_closed');
		if(photoZoomHolder.className =="photoZoomHolder pz_closed"){
			if(zoomB.title == "fitB"){
				setTimeout(function(){ 
					zoomB.title = "zoomB"; 
					zoomB.style.backgroundImage = zoomOUT_img;
					pz_inner.classList.toggle('pz_inner_Cover');
					pz_inner.style.backgroundPosition = "";
				},100);
			}
		}
	}
	if(i == "zoom"){
		if(zoomB.title == "zoomB"){ 
			zoomB.title = "fitB"; zoomB.style.backgroundImage = zoomIN_img;
			zoomB.setAttribute('data-content', "fit?");
		}else{
			zoomB.title = "zoomB"; zoomB.style.backgroundImage = zoomOUT_img;
			zoomB.setAttribute('data-content', "stretch?");
			pz_inner.style.backgroundPosition = "";
		}
		pz_inner.classList.toggle('pz_inner_Cover');
	}
	if(i == "open" && imgPath !== ""){
		pz_inner.style.backgroundImage = "url('" +imgPath+ "')";
		var pathSplit = imgPath.split("/"),
		nameSplit = pathSplit[pathSplit.length-1].split("."),
		newTitle = getIMGtitle(nameSplit[0]);
		pz_inner.previousElementSibling.innerHTML = newTitle;
		var zoomMagic = document.getElementById("zMagic");
		zoomMagic.className = "zoomHoverMagic zoomHoverMagic_hidden";
		pz_inner.focus();
	}
}
function zoomMagicAI(mouseX, mouseY){
	var z = document.getElementById("zMagic");
	if(z.className == "zoomHoverMagic"){
		var photoZoomHolder = document.getElementById("photoZoom");
		if(photoZoomHolder.className =="photoZoomHolder"){
			z.className = "zoomHoverMagic zoomHoverMagic_hidden";
		}
		if(!canHoverZoom){ z.className = "zoomHoverMagic zoomHoverMagic_hidden";}
		var position = getPosition(z),
	 	xE = (position.x+50), yE = (position.y+50), xM = mouseX, yM = mouseY;
		var distance_Zoom_to_Mouse = getDistance(xE,yE, xM,yM);
		// console.log(distance_Zoom_to_Mouse);
		if(distance_Zoom_to_Mouse >= 6){ z.className = "zoomHoverMagic zoomHoverMagic_hidden"; }
	}
}
function getIMGtitle (given) {
	var returnThis = given;
	if(given == "APLC_1_Notebook"){ returnThis = "APLC Logo Idea Sketches"; }
	if(given == "APLC_2_logo_whiteBG"){ returnThis = ""; }
	if(given == "APLC_3_book"){ returnThis = "APLC Logo Standards Book"; }
	if(given == "p1"){ returnThis = "Various Product Bin Shots"; }
	if(given == "p2"){ returnThis = "Gear";}
	if(given == "p3"){ returnThis = "Electronic Thermometer";}
	if(given == "p4"){ returnThis = "Juice Press";}
	if(given == "p5"){ returnThis = "Electric Fan";}
	if(given == "p6"){ returnThis = "Caster";}
	if(given == "p7"){ returnThis = "Glass Holder";}
	if(given == "p8"){ returnThis = "Tray Holder";}
	if(given == "p9"){ returnThis = "Pusher Blocks";}
	if(given == "p10"){ returnThis = "Light Fixture";}
	if(given == "p11"){ returnThis = "Spring";}
	if(given == "p12"){ returnThis = "Knife and Sharperner";}
	if(given == "p13"){ returnThis = "Timer";}
	if(given == "p14"){ returnThis = "Cutlery Magnet";}
	if(given == "layout1"){ returnThis = "Catalog Layout Design 1";}
	if(given == "layout2"){ returnThis = "Catalog Layout Design 2";}
	if(given == "web_full"){ returnThis = "Web Banner Design";}
	if(given == "web_pc1"){ returnThis = "Web Banner (on website)";}
	if(given == "web_pc2"){ returnThis = "Web Banner Design 2";}
	if(given == "code1a" || given == "code1b"){ returnThis = "ScriptUI Image Exporter";}
	if(given == "code2"){ returnThis = "Image-Existence Checker";}
	if(given == "logo1"){ returnThis = "Restaurant Distibuter Logo";}
	if(given == "logo2"){ returnThis = "Parts Distibuter Logo";}
	if(given == "logo3"){ returnThis = "Restaurant Management Logo";}
	if(given == "1_logo"){ returnThis = "Contest Cross-Over Logo";}
	if(given == "2_salesSheet"){ returnThis = "Contest Mark-off Sheet";}
	if(given == "3_firstCaught"){ returnThis = "Brand Seller Sheet";}
	if(given == "4_thermoPoster"){ returnThis = "Themed Thermometer Chart";}
	if(given == "5_interfaceFull"){ returnThis = "HTML Soundboard";}
	if(given == "6_icons"){ returnThis = "Class Specific Icons";}
	if(given == "febfax"){ returnThis = "Air Dryer Fax/Mailer";}
	if(given == "febfax_illus1_whiteBG"){ returnThis = "Air Dryer Illustration";}
	if(given == "febfax_illus2_whiteBG"){ returnThis = "Air Dryer Illustration";}
	if(given == "vs1"){ returnThis = "Cover Illustration";}
	if(given == "vs2"){ returnThis = "Layout Design";}
	if(given == "vs3"){ returnThis = "Ad Design";}
	if(given == "vs4"){ returnThis = "Layout Design 2";}
	if(given == "vs5"){ returnThis = "Layout Design 3";}
	if(given == "vs6"){ returnThis = "Ad Design2";}
	if(given == "vs7-8"){ returnThis = "Poster Design";}
	if(given == "poster1"){ returnThis = "";}
	if(given == "poster2"){ returnThis = "";}
	if(given == "poster3"){ returnThis = "";}
	if(given == "poster4"){ returnThis = "";}
	if(given == "dvd_and_case"){ returnThis = "";}
	if(given == "rainbowAlternative_pcFull"){ returnThis = "Website Design";}
	if(given == "rainbowAlternative_iphoneFull"){ returnThis = "Responsive Website";}
	if(given == "jitt1"){ returnThis = "Final Website Mockup";}
	if(given == "jitt2" || given == "jitt3" || given == "jitt4"){ returnThis = "Calendar App Element";}
	if(given == "jitt5"){ returnThis = "Website Wireframe";}
	if(given == "jitt6"){ returnThis = "Stage 1 Website Mockup";}
	if(given == "jitt7"){ returnThis = "Stage 2 Website Mockup";}
	if(given == "jitt8"){ returnThis = "Final Mockup Extra Page";}
	if(given == "sos_full"|| given == "brothersofthehead_site"){ returnThis = "Responsive Website Design";}
	if(given == "ihbf1"){ returnThis = "Responsive Website Design"; }
	if(given == "ihbf2"){ returnThis = "Vinyl Sticker Design"; }
	if(given == "ihbf3"|| given == "ihbf4"){ returnThis = "CD Packaging Design"; }
	// ihbf5 SHOULD BE HERE
	if(given == "partyCops_pcFull"){ returnThis = "Responsive Website Design"; }
	if(given == "scrollBars1"){ returnThis = "Javascript Scrollbars"; }
	if(given == "scrollBars2"){ returnThis = "Javascript Scrollbars"; }
	if(given == "scrollBars3"){ returnThis = "Javascript Scrollbars"; }
	if(given == "tz101_1"){ returnThis = "Synthesizer Design"; }
	if(given == "tz101_2"){ returnThis = "Synthesizer Design"; }
	if(given == "inapp1_1"){ returnThis = "Layout Sketch"; }
	if(given == "inapp1_2"){ returnThis = "Design Layout"; }
	if(given == "inapp1_3"){ returnThis = "Design Mockup"; }
	if(given == "inapp1_4"){ returnThis = "Final Design"; }
	if(given == "inapp2_1"){ returnThis = "Layout Design"; }
	if(given == "inapp2_2"){ returnThis = "Layout Sketch"; }
	if(given == "inapp2_3"){ returnThis = "Addional Layout Design"; }
	if(given == "synth1"){ returnThis = "Synthesizer Design"; }
	if(given == "synth2"){ returnThis = "Design Closeup"; }
	if(given == "synth3"){ returnThis = "Design Closeup"; }
	if(given == "synth4"){ returnThis = "Design Closeup"; }
	return returnThis;
}
function getDistance(x1,y1, x2,y2){
	var d = Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
	return d;
}
function mouseFollowDiv(el, x_pos, y_pos) {
	// console.log(x_pos +", "+ y_pos);
	var d = document.getElementById(el);
	d.style.position = "fixed";
  	if(d.className = "zoomHoverMagic zoomHoverMagic_hidden"){ d.className = "zoomHoverMagic"; }
	d.style.left = (x_pos - 50) +'px';
	d.style.top = (y_pos - 50)+'px';
}
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}