
var userAccountBalance;
var contractAddress;
var netURL;
var web3ProviderName;
var abiCode;
var combinedDividends;
var dividends;
var ethUSDPrice;
var eBankUSDBuyPrice;
var eBankUSDSellPrice;
var refreshValue;
var buyPrice;
var sellPrice;

contractAddress = '0xeCADA5A5fEe72E50eEcB170Df2a28Df8cb42a992';
abiCode = [{"constant":true,"inputs":[{"name":"_customerAddress","type":"address"}],"name":"dividendsOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ethereumToSpend","type":"uint256"}],"name":"calculateTokensReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokensToSell","type":"uint256"}],"name":"calculateEthereumReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"onlyAmbassadors","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"sellPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stakingRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ambassadorAddress","type":"address"},{"name":"_amountOfTokens","type":"uint256"}],"name":"payAmbassadorFees","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_includeReferralBonus","type":"bool"}],"name":"myDividends","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalEthereumBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_customerAddress","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"administrators","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amountOfTokens","type":"uint256"}],"name":"setStakingRequirement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"buyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_identifier","type":"address"},{"name":"_status","type":"bool"}],"name":"setAdministrator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"myTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"disableInitialStage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_toAddress","type":"address"},{"name":"_amountOfTokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_symbol","type":"string"}],"name":"setSymbol","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amountOfTokens","type":"uint256"}],"name":"sell","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_referredBy","type":"address"}],"name":"buy","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"reinvest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"incomingEthereum","type":"uint256"},{"indexed":false,"name":"tokensMinted","type":"uint256"},{"indexed":true,"name":"referredBy","type":"address"}],"name":"onTokenPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"tokensBurned","type":"uint256"},{"indexed":false,"name":"ethereumEarned","type":"uint256"}],"name":"onTokenSell","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"ethereumReinvested","type":"uint256"},{"indexed":false,"name":"tokensMinted","type":"uint256"}],"name":"onReinvestment","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"ethereumWithdrawn","type":"uint256"}],"name":"onWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"}]

netURL = 'https://ethshared.bdnodes.net?auth=UI4nTuMQrc0MdsfQoXyaXKnCM0AiSuoUQCGctwA8ops';

function setDefaultProvider()
{
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
    }
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    }
    else {
        web3 = new Web3(new Web3.providers.HttpProvider(netURL));
    }

    web3ProviderName = getWeb3Provider();
}

async function enableWeb3Access() {
    document.getElementById('spnDividends').innerText = 'Unlock';
    document.getElementById('spnCombinedDividends').innerText = 'Unlock';
    document.getElementById('spnReferralDividends').innerText ='Unlock';
    document.getElementById('spnEBANKBalance').innerText = 'Unlock';

    if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
        try {
            await ethereum.enable();
            
	        document.getElementById('hplMetaMask').style.visibility = 'hidden';
	        document.getElementById('hplWalletAddressText').style.visibility = 'visible';
	        document.getElementById('hplWalletAddress').style.visibility = 'visible';
	        document.getElementById('hplReferralAddressText').style.visibility = 'visible';
	        document.getElementById('hplReferralAddress').style.visibility = 'visible';
			
	        document.getElementById('txtBuy').disabled = false;
	        document.getElementById('txtSell').disabled = false;
	        document.getElementById('txtETHAddress').disabled = false;
	        document.getElementById('txtEBANK').disabled = false;
	        document.getElementById('txtEBANK').disabled = false;
		
	        document.getElementById('divBuyToken').setAttribute("style","pointer-events:auto");
	        document.getElementById('divSellToken').setAttribute("style","pointer-events:auto");
	        document.getElementById('divReinvestDividend').setAttribute("style","pointer-events:auto");
	        document.getElementById('divWithdrawDividend').setAttribute("style","pointer-events:auto");
	        document.getElementById('divBuyToken').setAttribute("style","pointer-events:auto");
	        document.getElementById('divTransferTokens').setAttribute("style","pointer-events:auto");

	        document.getElementById('hplWalletAddressText').innerText = 'Wallet Address';
	        document.getElementById('hplReferralAddressText').innerText = 'Referral Address';

	        web3.eth.getAccounts(function(error, accounts) {
	                document.getElementById('hplWalletAddress').innerText = accounts[0];
	                document.getElementById('hplReferralAddress').innerText = 'https://etherbank.app?ref=' + accounts[0];
	                document.getElementById('hplReferralAddress').setAttribute('href','https://etherbank.app?ref=' + accounts[0]);
	                
	                web3.eth.defaultAccount = accounts[0];

	                var etherBankInstance = new web3.eth.Contract(abiCode,contractAddress);

	                etherBankInstance.methods.myDividends(false).call().then(
                        function(val){
                            document.getElementById('spnDividends').innerText = (val/Math.pow(10, 18)).toFixed(6) + ' ETH ($' + ((val/Math.pow(10, 18)).toFixed(6) * ethUSDPrice).toFixed(2) + ')' ;
                            dividends = val/Math.pow(10, 18);
                            document.getElementById('spnReferralDividends').innerText = (combinedDividends - dividends).toFixed(6) + ' ETH ($' + ((combinedDividends - dividends).toFixed(6) * ethUSDPrice).toFixed(2) + ')';
                        });
	                etherBankInstance.methods.myDividends(true).call().then(
                        function(val){
                            document.getElementById('spnCombinedDividends').innerText = (val/Math.pow(10, 18)).toFixed(6) + ' ETH ($' + ((val/Math.pow(10, 18)).toFixed(6) * ethUSDPrice).toFixed(2) + ')';
                            combinedDividends = val/Math.pow(10, 18);
                            document.getElementById('spnReferralDividends').innerText = (combinedDividends - dividends).toFixed(6) + ' ETH ($' + ((combinedDividends - dividends).toFixed(6)*ethUSDPrice).toFixed(2) + ')';
                        });
	                
	                etherBankInstance.methods.myTokens().call().then(
                        function(val){
                            document.getElementById('spnEBANKBalance').innerText = parseInt(val/Math.pow(10, 18)) + ' ($' + (parseInt(val/Math.pow(10, 18)) * eBankUSDSellPrice * ethUSDPrice).toFixed(2) + '/' + (parseInt(val/Math.pow(10, 18)) * eBankUSDSellPrice).toFixed(3) + ' ETH)';
                        });

	                web3.eth.getBalance(web3.eth.defaultAccount, function(err, result) {
	                    if (!err) {
	                        var ethBalance = web3.utils.fromWei(result, "ether");
	                        if (ethBalance > 0.01)
	                        {
	                            document.getElementById('txtBuy').value = ethBalance - 0.005;
	                        }
	                    }
	                });
	            });

	        document.getElementById('hplWalletAddress').style.visibility = 'visible';
	        document.getElementById('hplWalletAddressText').style.visibility = 'visible';
	        document.getElementById('hplReferralAddressText').style.visibility = 'visible';
	        document.getElementById('hplReferralAddress').style.visibility = 'visible';
	    }
		catch (error) {
	        console.log(error);
		}
        		
    }
    else if (window.web3) {
        
        window.web3 = new Web3(web3.currentProvider);
        document.getElementById('hplMetaMask').style.visibility = 'hidden';
		document.getElementById('hplWalletAddressText').style.visibility = 'visible';
		document.getElementById('hplWalletAddress').style.visibility = 'visible';
		document.getElementById('hplReferralAddressText').style.visibility = 'visible';
		document.getElementById('hplReferralAddress').style.visibility = 'visible';
			
		document.getElementById('txtBuy').disabled = false;
		document.getElementById('txtSell').disabled = false;
		document.getElementById('txtETHAddress').disabled = false;
		document.getElementById('txtEBANK').disabled = false;
		document.getElementById('txtEBANK').disabled = false;
		
		document.getElementById('divBuyToken').setAttribute("style","pointer-events:auto");
		document.getElementById('divSellToken').setAttribute("style","pointer-events:auto");
		document.getElementById('divReinvestDividend').setAttribute("style","pointer-events:auto");
		document.getElementById('divWithdrawDividend').setAttribute("style","pointer-events:auto");
		document.getElementById('divBuyToken').setAttribute("style","pointer-events:auto");
		document.getElementById('divTransferTokens').setAttribute("style","pointer-events:auto");
		
		document.getElementById('hplWalletAddressText').innerText = 'Wallet Address';
		document.getElementById('hplReferralAddressText').innerText = 'Referral Address';

		web3.eth.getAccounts(function(error, accounts) {
		    document.getElementById('hplWalletAddress').innerText = accounts[0];
		    document.getElementById('hplReferralAddress').innerText = 'https://etherbank.app?ref=' + accounts[0];
		    document.getElementById('hplReferralAddress').setAttribute('href','https://etherbank.app?ref=' + accounts[0]);
		    
		    web3.eth.defaultAccount = accounts[0];

		    var etherBankInstance = new web3.eth.Contract(abiCode,contractAddress);

		    etherBankInstance.methods.myDividends(false).call().then(
                function(val){
                    document.getElementById('spnDividends').innerText = (val/Math.pow(10, 18)).toFixed(6) + ' ETH ($' + ((val/Math.pow(10, 18)).toFixed(6) * ethUSDPrice).toFixed(2) + ')' ;
                    dividends = val/Math.pow(10, 18);
                    document.getElementById('spnReferralDividends').innerText = (combinedDividends - dividends).toFixed(6) + ' ETH ($' + ((combinedDividends - dividends).toFixed(6) * ethUSDPrice).toFixed(2) + ')';
                });

		    etherBankInstance.methods.myDividends(true).call().then(
                function(val){
                    document.getElementById('spnCombinedDividends').innerText = (val/Math.pow(10, 18)).toFixed(6) + ' ETH ($' + ((val/Math.pow(10, 18)).toFixed(6) * ethUSDPrice).toFixed(2) + ')';
                    combinedDividends = val/Math.pow(10, 18);
                    document.getElementById('spnReferralDividends').innerText = (combinedDividends - dividends).toFixed(6) + ' ETH ($' + ((combinedDividends - dividends).toFixed(6)*ethUSDPrice).toFixed(2) + ')';
                });

		    etherBankInstance.methods.myTokens().call().then(
                function(val){
                    document.getElementById('spnEBANKBalance').innerText = parseInt(val/Math.pow(10, 18)) + ' ($' + (parseInt(val/Math.pow(10, 18)) * eBankUSDSellPrice * ethUSDPrice).toFixed(2) + '/' + (parseInt(val/Math.pow(10, 18)) * eBankUSDSellPrice).toFixed(3) + ' ETH)';
                });

		    web3.eth.getBalance(web3.eth.defaultAccount, function(err, result) {
		        if (!err) {
		            var ethBalance = web3.utils.fromWei(result, "ether");
		            if (ethBalance > 0.01)
		            {
		                document.getElementById('txtBuy').value = ethBalance - 0.005;
		            }
		        }
		    });

		});

		document.getElementById('hplWalletAddress').style.visibility = 'visible';
		document.getElementById('hplWalletAddressText').style.visibility = 'visible';
		document.getElementById('hplReferralAddressText').style.visibility = 'visible';
		document.getElementById('hplReferralAddress').style.visibility = 'visible';

    }
    else {
        web3 = new Web3(new Web3.providers.HttpProvider(netURL));
        document.getElementById('spnDividends').innerText = 'Unlock';
        document.getElementById('spnCombinedDividends').innerText = 'Unlock';
        document.getElementById('spnReferralDividends').innerText ='Unlock';
        document.getElementById('spnEBANKBalance').innerText = 'Unlock';
    }
    getContractDetails();
	refreshPage();
}

function pageLoad()
{
	document.getElementById('hplWalletAddressText').style.visibility = 'hidden';
    document.getElementById('hplWalletAddress').style.visibility = 'hidden';
	document.getElementById('hplReferralAddressText').style.visibility = 'hidden';
	document.getElementById('hplReferralAddress').style.visibility = 'hidden';
		
	document.getElementById('txtBuy').disabled = true;
	document.getElementById('txtSell').disabled = true;
	document.getElementById('txtETHAddress').disabled = true;
	document.getElementById('txtEBANK').disabled = true;
	document.getElementById('txtEBANK').disabled = true;
	
	document.getElementById('divBuyToken').setAttribute("style","pointer-events:none");
	document.getElementById('divSellToken').setAttribute("style","pointer-events:none");
	document.getElementById('divReinvestDividend').setAttribute("style","pointer-events:none");
	document.getElementById('divWithdrawDividend').setAttribute("style","pointer-events:none");
	document.getElementById('divBuyToken').setAttribute("style","pointer-events:none");
	document.getElementById('divTransferTokens').setAttribute("style","pointer-events:none");

	var json = new XMLHttpRequest();
	json.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) { // if HTTP header 200 - ok
	        var object = JSON.parse(this.responseText); // set the variable 'object' to whatever we get back, in our case it is an array of 10 different arrays
	        for(var i=0;i<object.length;i++){   // looping through json

	            var item = object[i];
	            if(item["symbol"] == "eth"){   // finding when symbol is ETH
	                ethUSDPrice = item["current_price"];    // Fetching price_usd value
	            }
	        }
	    }
	};

	json.open("GET","https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum", false);
	json.send();
	enableWeb3Access();
}


function refreshPage()
{
	refreshValue = setInterval(function(){
		getContractDetails();
		web3.eth.getAccounts(function(error, accounts) {
			
			var etherBankInstance = new web3.eth.Contract(abiCode,contractAddress);

			etherBankInstance.methods.myDividends(false).call().then(
			function(val){
				document.getElementById('spnDividends').innerText = (val/Math.pow(10, 18)).toFixed(6) + ' ETH ($' + ((val/Math.pow(10, 18)).toFixed(6) * ethUSDPrice).toFixed(2) + ')' ;
				dividends = val/Math.pow(10, 18);
                document.getElementById('spnReferralDividends').innerText = (combinedDividends - dividends).toFixed(6) + ' ETH ($' + ((combinedDividends - dividends).toFixed(6) * ethUSDPrice).toFixed(2) + ')';
			});

			etherBankInstance.methods.myDividends(true).call().then(
			function(val){
				document.getElementById('spnCombinedDividends').innerText = (val/Math.pow(10, 18)).toFixed(6) + ' ETH ($' + ((val/Math.pow(10, 18)).toFixed(6) * ethUSDPrice).toFixed(2) + ')';
					combinedDividends = val/Math.pow(10, 18);
					document.getElementById('spnReferralDividends').innerText = (combinedDividends - dividends).toFixed(6) + ' ETH ($' + ((combinedDividends - dividends).toFixed(6)*ethUSDPrice).toFixed(2) + ')';
			});
	                
			etherBankInstance.methods.myTokens().call().then(
			function(val){
				document.getElementById('spnEBANKBalance').innerText = parseInt(val/Math.pow(10, 18)) + ' ($' + (parseInt(val/Math.pow(10, 18)) * eBankUSDSellPrice * ethUSDPrice).toFixed(2) + '/' + (parseInt(val/Math.pow(10, 18)) * eBankUSDSellPrice).toFixed(3) + ' ETH)';
            });
			
			var buyValue = parseFloat(document.getElementById('txtBuy').value);
			if (buyValue != '' || buyValue != 0)
			{
				document.getElementById("spnBuy").innerHTML = ' Buy Token ( ~' + (parseFloat(buyValue / buyPrice)).toFixed(4) + ' EBANK)';
			}
			
			var sellValue = parseFloat(document.getElementById('txtSell').value);
			if (sellValue != '' || sellValue != 0)
			{
				document.getElementById("spnSell").innerHTML = ' Sell Token ( ~' + (parseFloat(sellValue * sellPrice)).toFixed(4) + ' ETH)';
			}
			
		})
		}, 5000);
}

function changetxtBuy()
{
	var buyValue = parseFloat(document.getElementById('txtBuy').value);
	if (buyValue != '' || buyValue != 0)
	{
		document.getElementById("spnBuy").innerHTML = ' Buy Token ( ~' + (parseFloat(buyValue / buyPrice)).toFixed(4) + ' EBANK)';
	}
}

function changetxtSell()
{
	var sellValue = parseFloat(document.getElementById('txtSell').value);
	if (sellValue != '' || sellValue != 0)
	{
		document.getElementById("spnSell").innerHTML = ' Sell Token ( ~' + (parseFloat(sellValue * sellPrice)).toFixed(4) + ' ETH)';
	}
}

function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 
      && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function getWeb3Provider()
{
    require('web3');
    if (window.web3.currentProvider.isMetaMask)
        return 'MetaMask';

    if (window.web3.currentProvider.isTrust)
        return 'Trust';

    if (window.web3.currentProvider.isToshi)
        return 'Coinbase';

    if (typeof window.__CIPHER__ !== 'undefined')
        return 'Cipher';

    if (window.web3.currentProvider.constructor.name === 'EthereumProvider')
        return 'Mist';

    if (window.web3.currentProvider.constructor.name === 'Web3FrameProvider')
        return 'Parity';

    if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('localhost') !== -1)
        return 'Localhost';

    return 'Unknown';
}

function getWeb3DefaultAccount()
{
    return web3.eth.defaultAccount;
}

async function getContractDetails()
{
    var etherBankInstance = new web3.eth.Contract(abiCode,contractAddress);

    
    etherBankInstance.methods.totalEthereumBalance().call().then(
    function(val){
        document.getElementById('spnContractBalance').innerText = parseFloat(web3.utils.fromWei(val,'ether')).toFixed(2) + ' ETH ($' + (parseFloat(web3.utils.fromWei(val,'ether')).toFixed(6) * ethUSDPrice).toFixed(0) + ')' ;
    });
    etherBankInstance.methods.totalSupply().call().then(
    function(val){
        document.getElementById('spnTotalEBANK').innerText =parseInt(val/Math.pow(10, 18));
    });
    etherBankInstance.methods.buyPrice().call().then(
    function(val){
        document.getElementById('spnBuyPrice').innerText = parseFloat(web3.utils.fromWei(val,'ether')).toFixed(6) + ' ETH ($' + (parseFloat(web3.utils.fromWei(val,'ether')).toFixed(6) * ethUSDPrice).toFixed(2) + ')';
        eBankUSDBuyPrice = parseFloat(web3.utils.fromWei(val,'ether')).toFixed(6);
		buyPrice = parseFloat(web3.utils.fromWei(val,'ether'));
    });
    etherBankInstance.methods.sellPrice().call().then(
    function(val){
        document.getElementById('spnSellPrice').innerText = parseFloat(web3.utils.fromWei(val,'ether')).toFixed(6) + ' ETH ($' + (parseFloat(web3.utils.fromWei(val,'ether')).toFixed(6) * ethUSDPrice).toFixed(2) + ')';
        eBankUSDSellPrice = parseFloat(web3.utils.fromWei(val,'ether')).toFixed(6);
		sellPrice = parseFloat(web3.utils.fromWei(val,'ether'));
    });

}

async function buyToken()
{
    var amount;
    var ref;

    amount = parseFloat(document.getElementById("txtBuy").value);
    if(isNaN(amount)){ amount=0; }

    if(amount <= 0)
    {
        document.getElementById("txtBuy").value = '';
        document.getElementById("txtBuy").style.border="1px solid red";
        document.getElementById("txtBuy").setAttribute('placeholder','Amount Must Be Greater Than 0 ETH');
        document.getElementById("txtBuy").focus();
        return;
    }
    else
    {
        document.getElementById("txtBuy").style.border="1px solid #ced4da";
        document.getElementById("txtBuy").setAttribute('placeholder','Amount in ETH');


        ref = getQueryVariable('ref')
        if (ref==false || web3.utils.isAddress(ref)==false)
        {   
            ref='0x0000000000000000000000000000000000000000';   
        }
        
        var etherBankInstance = new web3.eth.Contract(abiCode,contractAddress);
        
        etherBankInstance.methods.buy(ref).send({from: web3.eth.defaultAccount ,value: web3.utils.toWei((amount.toString()),'ether'), gasPrice:'80000000000'});
    }
}


async function sellToken()
{
    var amount;

    amount = parseFloat(document.getElementById("txtSell").value);
    if(isNaN(amount)){ amount=0; }

    if(amount <= 0 || amount > parseInt(document.getElementById("spnEBANKBalance").innerText))
    {
        document.getElementById("txtSell").value = '';
        document.getElementById("txtSell").style.border="1px solid red";
        document.getElementById("txtSell").setAttribute('placeholder','Amount Must Be Between 0 & ' + parseInt(document.getElementById("spnEBANKBalance").innerText) + ' EBANK');
        if (parseInt(document.getElementById("spnEBANKBalance").innerText) == 0)
        {
            document.getElementById("txtSell").setAttribute('placeholder',' Your EBANK Balance is 0');
        }
        document.getElementById("txtSell").focus();
        return;
    }
    else
    {
        document.getElementById("txtSell").style.border="1px solid #ced4da";
        document.getElementById("txtSell").setAttribute('placeholder','Amount in EBANK Token');
        
        var etherBankInstance = new web3.eth.Contract(abiCode,contractAddress);
        amount= amount * Math.pow(10, 18);
        
        etherBankInstance.methods.sell(new BigNumber(amount)).send({from: web3.eth.defaultAccount, gasPrice:'80000000000'});
    }
}

async function withdraw()
{    
    var etherBankInstance = new web3.eth.Contract(abiCode,contractAddress);
    etherBankInstance.methods.withdraw().send({from: web3.eth.defaultAccount, gasPrice:'80000000000'});
}

async function reinvest()
{    
    var etherBankInstance = new web3.eth.Contract(abiCode,contractAddress);
    etherBankInstance.methods.reinvest().send({from: web3.eth.defaultAccount, gasPrice:'80000000000'});
}

async function transferToken()
{
    var amount;

    amount = parseFloat(document.getElementById("txtEBANK").value);
    if(isNaN(amount)){ amount=0; }

    if (web3.utils.isAddress(document.getElementById("txtETHAddress").value) == false)
    {
        document.getElementById("txtETHAddress").value = '';
        document.getElementById("txtETHAddress").style.border="1px solid red";
        document.getElementById("txtETHAddress").setAttribute('placeholder','Please Enter Valid ETH Address');
        document.getElementById("txtETHAddress").focus();
        return;
    }

    if(amount <= 0 || amount > parseInt(document.getElementById("spnEBANKBalance").innerText))
    {
        document.getElementById("txtEBANK").value = '';
        document.getElementById("txtEBANK").style.border="1px solid red";
        document.getElementById("txtEBANK").setAttribute('placeholder','Amount Must Be Between 0 & ' + parseInt(document.getElementById("spnEBANKBalance").innerText) + ' EBANK');
        if (parseInt(document.getElementById("spnEBANKBalance").innerText) == 0)
        {
            document.getElementById("txtEBANK").setAttribute('placeholder',' Your EBANK Balance is 0');
        }
        document.getElementById("txtEBANK").focus();
        return;
    }
    else
    {
        document.getElementById("txtEBANK").style.border="1px solid #ced4da";
        document.getElementById("txtEBANK").setAttribute('placeholder','Amount in EBANK Token');

        document.getElementById("txtETHAddress").style.border="1px solid #ced4da";
        document.getElementById("txtETHAddress").setAttribute('placeholder','Ethereum Address');
        
        var etherBankInstance = new web3.eth.Contract(abiCode,contractAddress);
        amount= amount * Math.pow(10, 18);
        
        etherBankInstance.methods.transfer(document.getElementById("txtETHAddress").value, new BigNumber(amount)).send({from: web3.eth.defaultAccount, gasPrice:'80000000000'});
    }
}


function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}