var g_cdb = null;
var g_cvVendor = null;

window.onload = init;

function init()
	{
	var sDeviceID, sVendorID;

	initCardDB();
	
	sDeviceID = getParamValue("DeviceID");
	sVendorID = getParamValue("VendorID");

	if (g_cdb == null)
		return;
	
	if (sDeviceID == null || sVendorID == null)
		{
		addManufacturerChooser();
		return;
		}

	// convert to hexadecimal.
	var sVendorIDHex = parseInt(sVendorID).toString(16);
	var sDeviceIDHex = parseInt(sDeviceID).toString(16);

	while (sVendorIDHex.length < 4)
		sVendorIDHex = "0" + sVendorIDHex;

	while (sDeviceIDHex.length < 4)
		sDeviceIDHex = "0" + sDeviceIDHex;
	

	var cv = g_cdb.FindVendor("0x" + sVendorIDHex);

	if (cv == null)
		{
		addManufacturerChooser();
		return;
		}
	
	var card = cv.FindCard("0x" + sDeviceIDHex);

	if (card != null)
		location.replace(card.Page);
	else if (cv.Page != null)
		location.replace(cv.Page);
	else
		addManufacturerChooser();		
	}

function initCardDB()
	{
	g_cdb = new CardDatabase();
	populateCardDatabase(g_cdb);
	}

function getParamValue(sParam)
	{
	var i, j;
	var sTemp = location.href;
	var sVal;
	
	i = sTemp.lastIndexOf(sParam, "=");
	
	if (i < 0)
		{
		return null;
		}
	else
		{

		j = sTemp.indexOf("&", i+1);
		if (j < 0)
			j = sTemp.length;

		sVal = sTemp.substring(i+sParam.length + 1, j);
		}
	
	return sVal;
	}

function addManufacturerChooser()
	{
	var i=0;
	var sh = "<table>";
	
	sh += "<tr><td>";
	sh += l_sDriverList;
	sh += "</td></tr>";
	sh += "<tr><td>";

	sh += "<table class='InfoCenter'><tr>";
	sh += "<td>" + l_sManufacturer + "</td>";
	sh += "<td><select id='selVendor' onchange='vendorChanged()'>";
	sh += "<option id='none'>" + l_sChooseAManufacturer + "</option>";


	for (i=0; i<g_cdb.Vendors.length; i++)
		{
		var cv = g_cdb.Vendors[i];
		
		if (cv.Cards.length > 0 || cv.Page != null)
			sh += "<option value='" + i + "'>" + cv.Name + "</option>";
		}
	sh += "</select></td>";

	sh += "<td><input id='btnGoCardInfo' onclick='goCardInfo()' type='button' value='" + l_sGo + "' disabled='true'></input></td>";
	
	sh += "</tr></table>";
	sh += "</td></tr></table>";
	document.all.divContentArea.innerHTML = sh;	
	}

function vendorChanged()
	{
	var selVendor = window.document.all.selVendor;
	var i, ia, ja, ib, jb;
	var sx, sCaption, sID;
	var oOption;
	
	if (selVendor.selectedIndex == 0)
		{
		btnGoCardInfo.disabled = true;
		g_cvVendor = null;
		return;
		}

	var iValue = parseInt(selVendor.options[selVendor.selectedIndex].value);
	

	g_cvVendor = g_cdb.Vendors[iValue];

	document.all.btnGoCardInfo.disabled = false;
	}

function goCardInfo()
	{
	if (g_cvVendor == null)
		return;
	location.assign(g_cvVendor.Page);
	}

