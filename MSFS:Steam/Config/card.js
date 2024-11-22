function CardDatabase()
	{
	this.Vendors = null;
	this.FindVendor = cdbFindVendor;
	}

function cdbFindVendor(sVendorID)
	{
	var i, j;
	var cv = null;
	var cvTemp;
	var card = null;
	var cardTemp = null;

	sVendorID = sVendorID.toLowerCase();
	
	for (i=0; i<this.Vendors.length && cv == null; i++)
		{
		cvTemp = this.Vendors[i];

		for (j=0; j<cvTemp.VendorIDs.length && cv == null; j++)
			{
			if (cvTemp.VendorIDs[j].toLowerCase() == sVendorID)
				cv = cvTemp;
			}

		}
	
	return cv;
	}

function CardVendor()
	{
	this.VendorIDs = null;
	this.Cards = null;
	this.Name = null;
	this.FindCard = cdvFindCard;
	}

function cdvFindCard(sDeviceID)
	{
	var i, j;
	var card = null;
	var cardTemp = null;

	sDeviceID = sDeviceID.toLowerCase();

	for (i=0; i<this.Cards.length && card == null; i++)
		{
		cardTemp = this.Cards[i];

		for (j=0; j<cardTemp.DeviceIDs.length && card == null; j++)
			{
			if (cardTemp.DeviceIDs[j].toLowerCase() == sDeviceID)
				card = cardTemp;
			}

		}

	return card;
	}

function Card()
	{
	this.DeviceIDs = null;
	this.Name = null;
	this.Page = null;
	}

