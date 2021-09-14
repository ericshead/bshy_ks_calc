function calcTotalPledge() {
	/* variable declarations */
	var elem;
	var bgotm = false;
	var shippingIncl = true;
	var usonlycheck = false;
	
	/* calculating the total */
	elem = document.getElementById("Reward");
	var rewardValue = parseInt(elem.options[elem.selectedIndex].value);   /* reward level cost */
	elem = document.getElementById("Shipping");
	var shippingCost = parseInt(elem.options[elem.selectedIndex].value);  /* shipping cost */
	elem = document.getElementById("Discount");
	var bgotmDiscount = parseInt(elem.options[elem.selectedIndex].value);  /* BGotM discount */
	var totalAmount = rewardValue + shippingCost - bgotmDiscount;
	var ksAmount = totalAmount -1;
	
	if (bgotmDiscount != "0") { bgotm = true; }
	if (rewardValue > 3 && shippingCost == 0) { shippingIncl = false; }  /* PnP shipping tier check */
	
	/* Unsurmountable: if MEGA-fan tier selected; force shipping cost */
	if (rewardValue == 50 && shippingCost != 9) { document.getElementById("Shipping").value = 9; }
	/* Unsurmountable: if MEGA-fan shipping tier selected, but reward level not; force shipping to standard US */
	if (rewardValue != 50 && shippingCost == 9) { document.getElementById("Shipping").value = 5; }
	
	if (rewardValue >= 50) { usonlycheck = true; }  /* checking for MEGA-fan or retail level pledges */
	
	/* displaying the result on the page */
	if (shippingIncl) {
		document.getElementById("showAmount").innerHTML = "Total pledge amount = <strong>$"+ totalAmount +".00</strong>";
	
		if (bgotm) {
			document.getElementById("oneDollar").innerHTML = "$1 Reward Tier \+  &ldquo;Bonus Support&rdquo; = <strong>$"+ ksAmount +".00</strong>";
			document.getElementById("showDiscount").style.marginTop = "0.6em";
			document.getElementById("showDiscount").innerHTML = "Total discount = <strong>$"+ bgotmDiscount +".00</strong>";
		} else {
			document.getElementById("oneDollar").innerHTML = "";
			document.getElementById("showDiscount").style.marginTop = "0";
			document.getElementById("showDiscount").innerHTML = "";
		}
		if (usonlycheck) {
			document.getElementById("usonlywarning").innerHTML = "NOTE: this reward tier can only be shipped within the United States!"
		} else { document.getElementById("usonlywarning").innerHTML = "" }
	}
	else {
		document.getElementById("showAmount").innerHTML = "Please select a shipping destination.";
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
	else if (parseInt(elem.options[elem.selectedIndex].value) >= 50) {
		document.getElementById("Shipping").value = 9;
		document.getElementById("oneDollar").innerHTML = "";
		document.getElementById("Discount").value = 0;
		document.getElementById("showDiscount").innerHTML = "";
	}
	calcTotalPledge();
}