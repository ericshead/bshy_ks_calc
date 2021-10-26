function calcTotalPledge() {
	/* variable declarations */
	var elem;
	var bgotm = false;
	var shippingIncl = true;
	
	/* calculating the total */
	elem = document.getElementById("Reward");
	var rewardValue = parseInt(elem.options[elem.selectedIndex].value);   /* reward level cost */
	elem = document.getElementById("Shipping");
	var shippingCost = parseInt(elem.options[elem.selectedIndex].value);  /* shipping cost */
	elem = document.getElementById("Discount");
	var bgotmDiscount = parseInt(elem.options[elem.selectedIndex].value);  /* BGotM discount */
	var totalAmount = rewardValue + shippingCost - bgotmDiscount;
	var ksAmount = totalAmount -1;
	
	if (rewardValue <= 35) { 
		document.getElementById("caneuless").style.display = "inline" 
		document.getElementById("ukless").style.display = "inline" 
		document.getElementById("worldless").style.display = "inline" 
		document.getElementById("caneumore").style.display = "none"
		document.getElementById("ukmore").style.display = "none"
		document.getElementById("worldmore").style.display = "none"
	}
	else { 
		document.getElementById("caneuless").style.display = "none" 
		document.getElementById("ukless").style.display = "none" 
		document.getElementById("worldless").style.display = "none" 
		document.getElementById("caneumore").style.display = "inline"
		document.getElementById("ukmore").style.display = "inline"
		document.getElementById("worldmore").style.display = "inline"
	}
	
	if (bgotmDiscount != "0") { bgotm = true; }
	if (rewardValue > 3 && shippingCost == 0) { shippingIncl = false; }  /* PnP shipping tier check */
	if (rewardValue > 35 && shippingCost < 24) { shippingIncl = false; }  /* large order shipping tier check */
	if (rewardValue <= 35 && shippingCost >= 24) { shippingIncl = false; }  /* small order shipping tier check */
	if (shippingCost == 5) { shippingIncl = true; }  /* shipping to US is always $5 */
	
	
	/* displaying the result on the page */
	if (shippingIncl) {		
		document.getElementById("showAmount").innerHTML = "Reward ($"+ rewardValue +") + Shipping ($"+ shippingCost +") - Discount ($"+ bgotmDiscount +") = <br />Total pledge amount = <strong>$"+ totalAmount +".00</strong>";
	
		if (bgotm) {
			document.getElementById("oneDollar").style.marginTop = "0.6em";
			document.getElementById("oneDollar").innerHTML = "$1 Reward Tier \+  &ldquo;Bonus Support&rdquo; = <strong>$"+ ksAmount +".00</strong>";
			// document.getElementById("showDiscount").innerHTML = "Total discount = <strong>$"+ bgotmDiscount +".00</strong>";
		} else {
			document.getElementById("oneDollar").style.marginTop = "0";
			document.getElementById("oneDollar").innerHTML = "";
			document.getElementById("showDiscount").innerHTML = "";
		}
	}
	else {
		document.getElementById("showAmount").innerHTML = "Please select your shipping rate...";
		document.getElementById("Shipping").value = 0;
		document.getElementById("oneDollar").style.marginTop = "0";
		document.getElementById("oneDollar").innerHTML = "";
		document.getElementById("showDiscount").innerHTML = "";
	}
}

function checkPnP () {
	var elem = document.getElementById("Reward");
	if (parseInt(elem.options[elem.selectedIndex].value) == 3) {
		document.getElementById("Shipping").value = 0;
	}
	else if (parseInt(elem.options[elem.selectedIndex].value) == 0) {
		document.getElementById("Shipping").value = 0;
		document.getElementById("oneDollar").innerHTML = "";
		document.getElementById("Discount").value = 0;
		document.getElementById("showDiscount").innerHTML = "";
	}
	calcTotalPledge();
}