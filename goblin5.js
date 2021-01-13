var curcontent = new Array();

curcontent["Oplata"] = {
	xhead: 'Пополнение баланса',
	xcon: '<div class="xbox oplata_info"><form onsubmit="return qiwiHandler(event)" id="qiwi-inp-form" method="get" target="_blank" action="https://oplata.qiwi.com/create">\
<div class="qiwi-inp-main">\
	<div class="qiwi-widget-title">Пополнить с QIWI</div>\
	<div class="qiwi-inp-box">\
			<label for="qiwi-donation-amount" class="qiwi-label">Cумма</label>\
			<div class="qiwi-rub">₽</div>\
			<input type="tel" id="qiwi-donation-amount" name="amount" required="" value="">\
			<input type="hidden" id="qiwi-donation-comment" name="comment" value="Пополнение через QIWI для FADE RUST аккаунта. Может занять некоторое время.">\
			<input type="hidden" name="publicKey" value="48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iP6fG2fP54QnbHuVwzgLYNKseQwiNLEL1EQtFSc1b36V6KMNQp2emgxknxdRD7b48PS9LMG8Pg69ZaDD58RHCY2fakh1w1H3T4RLzHMgLGV">\
			<input type="hidden" id="qiwi-donation-account" name="account" value="0">\
			<input type="hidden" name="customFields[themeCode]" value="ALEKSEY-GHm9pjKFDa">\
			<input type="hidden" name="successUrl" value="https://faderust.ru">\
			<div class="qiwi-error-box" id="qiwi-error-box"></div>\
	</div>\
	<div class="qiwi-button-box">\
		<button class="qiwi-submit-main" id="qiwi-submit-main" width="159px" type="submit">Оплатить</button>\
	</div>\
</div>\
</form>\
<a class="qiwi-inp-main qiwi-inp-other" id="qiwi-inp-other">\
	<div class="qiwi-widget-title">Другие способы</div><img class="qiwi-inp-other-img" src="https://pic.moscow.ovh/images/2020/12/24/08a847e9d7f387ec60b4b3c89a8879e9.png">\
</a></div>'
};

function Open(el, usefade = true, zind = false) {
	closepage();
	var div1 = document.createElement("div");
	if(zind) div1.style = 'position: relative;';
	else div1.style = 'position: relative; z-index: 2;';
    div1.id = 'Modal';
	var div2 = document.createElement("div");
	div2.className = 'modal fade';
	if(!usefade) div2.classList.add("show");
	div2.style = 'display: block;';
	div2.id = 'closer';
	//div2.onclick = closepage;
	var div3 = document.createElement("div");
	div3.className = "modal-dialog modal-lg";
	if(el=="block")div3.className+=" modal-lg-block"
	var div4 = document.createElement("div");
	div4.className = "modal-content";
	var div5 = document.createElement("div");
	div5.className = "modal-header";
	div5.innerHTML = '<h4 class="modal-title">'+curcontent[el].xhead+'</h4>';
	var div6 = document.createElement("div");
	div6.className = "modal-body";
	div6.innerHTML = curcontent[el].xcon;
	var div7 = document.createElement("div");
	div7.className = "modal-footer";
	div7.innerHTML = '<center><button class="btn btn-danger" id="closer" onclick="closepage()">Закрыть</button><center>';
	var div8 = document.createElement("div");
	div8.className = "modal-backdrop fade show";
	
	div1.appendChild(div2);
	//div2.appendChild(div2_5);
	div2.appendChild(div3);
	div3.appendChild(div4);
	div4.appendChild(div5);
	div4.appendChild(div6);
	div4.appendChild(div7);
	div1.appendChild(div8);
	if(usefade) setTimeout(()=> div2.classList.add("show"), 0);
	
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(div1);
	body.className = "modal-open";
}


function closepage(){
	var Modal = document.getElementById('Modal');
	var Modalparent = null;
	try{ Modalparent = ((Modal.parentElement) ? Modal.parentElement : ((Modal.parentNode) ? Modal.parentNode : null));}catch (err){return;}
	if(Modalparent == null)return;
	Modalparent.removeChild(Modal);
	document.getElementsByTagName('body')[0].className = "";
}

function search(e){
	if (e.offsetX < 1) { 
		console.log(e.target.innerText + ' | ' + e.clientX);
		if (document.selection) { // IE
			var range = document.body.createTextRange();
			range.moveToElementText(e.target);
			range.select();
		} else if (window.getSelection) {
			var range = document.createRange();
			range.selectNode(e.target);
			window.getSelection().removeAllRanges();
			window.getSelection().addRange(range);
		}
		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('успешно скопирован, нажмите CTRL + V чтобы вставить в консоль F1 в игре.'); 
		  } catch (err) {
			console.log('Oops, unable to copy' + err);
		  }
    }
}


var CustomerSteamId = "0";
var OvhPayUrl = "";

function qiwiHandler(e){
	//e.preventDefault();
	var inputval = document.getElementById('qiwi-donation-amount').value;
	var inputfloat = parseFloat(inputval).toFixed(2);
	if(inputfloat < 1 || inputfloat > 15000 || isNaN(inputfloat)){
		document.getElementById('qiwi-error-box').innerText = "От 1 до 15000 RUB";
		e.preventDefault();
		return false;
	}else{
		document.getElementById('qiwi-error-box').innerText = "";
	}
	document.getElementById('qiwi-donation-amount').value = inputfloat;
	if(CustomerSteamId == "0" || CustomerSteamId == ""){
		document.getElementById('qiwi-error-box').innerText = "Пожалуйста авторизуйтесь в магазине!";
		e.preventDefault();
		return false;
	}
	qiwiFormHandle();
	
	
	
	
	return null;
}

function qiwiFormHandle(){
	var qiwi_comment = document.getElementById('qiwi-donation-comment');
	qiwi_comment.value = "Пополнение баланса в магазине FADE RUST через Qiwi. Может занять некоторое время. Ваш ID: " + CustomerSteamId;
	document.getElementById('qiwi-donation-account').value = CustomerSteamId;
	document.getElementById('qiwi-inp-other').setAttribute("href", OvhPayUrl);
}

function OvhUrlOverrite(){
	var slides = document.getElementsByClassName("nav-link");
	for (var i = 0; i < slides.length; i++) {
		var elelink = slides.item(i);
		var urlelelink = elelink.getAttribute("href");
	   if(urlelelink.startsWith('https://pay.moscow.ovh')){
		   OvhPayUrl = urlelelink;
		   console.log(OvhPayUrl);
		   elelink.setAttribute("href", "javascript:;");
		   elelink.setAttribute("onclick", "OpenOplata()");
	   }
	}
}

function obtainShopSteamId(){
	if(CustomerSteamId != "0" && CustomerSteamId != ""){
		return;
	}
	var xmlHttp = new XMLHttpRequest();

        if(xmlHttp != null)
        {
            xmlHttp.open( "GET", "/api/index.php?modules=users&action=getData", true );
            xmlHttp.send( null );
        }
		xmlHttp.onload = function(gjson) {
			var gjson = JSON.parse(xmlHttp.response);
          console.log(gjson);
			var preSteam = gjson.data.steamID;
			OvhPayUrl = "https://pay.moscow.ovh/?"+gjson.data.pay;
			if(preSteam > 76561100000000000 || !isNaN(preSteam)){
				CustomerSteamId = preSteam.toString();
				//qiwiFormHandle();
				OvhUrlOverrite();
			}else{
				console.log("error obtainShopSteamId! "+ gjson);
			}
		}

}

function OpenOplata(){
	Open('Oplata');
			qiwiFormHandle();
	setTimeout(() => function () {
		try{
			qiwiFormHandle();
		}catch(e){
			console.log('element not found '+ e);
		}
	}, 3000);
}

var DOMReady = function(a,b,c){b=document,c='addEventListener';b[c]?b[c]('DOMContentLoaded',a):window.attachEvent('onload',a)}
window.addEventListener("load",function () {
	try{
		obtainShopSteamId();
	}catch(e){
		console.log('element not found '+ e);
	}
});


DOMReady(function () {
//window.onload = function () {
	
	try{
		setTimeout(() => obtainShopSteamId(), 6000);
	}catch(e){
		console.log('element not found '+ e);
	}
	
	//setTimeout(() => CheckDisCounter(), 5000);
	
	document.body.onclick=function(event)
	{
		if(event.target.id == 'closer')closepage();
		if(event.target.className == 'MsoCommand')search(event);
	}
	
	curcontent["block"].xcon += '</div>\
	<br><i class="fa fa-info-circle"></i> Внимание! Вся эта таблица так же доступна на сервере по команде /block для более подробного ознакомления с оставшимся временем до разблокировки!</div>';
	curcontent["kit-prem"].xcon += '</div></div></div>';
	curcontent["kit-wars"].xcon += '</div></div></div>';
	curcontent["kit-elite"].xcon += '</div></div></div>';

//}
});
