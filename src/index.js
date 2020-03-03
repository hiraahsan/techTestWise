import './styles/styles.scss';


const app = {}

app.firstName = document.getElementById("firstName");
app.lastName = document.getElementById("lastName");
app.email = document.getElementById("email");
app.symbol = "";

let msft = document.getElementById("microsoftStocks");
let btc = document.getElementById("bitcoinStocks");
let google = document.getElementById("googleStocks");

let msftStatus = document.getElementById("msftStatus");
let bitcoinStatus = document.getElementById("bitcoinStatus");
let googleStatus = document.getElementById("googleStatus");

document.getElementById("subscribe").addEventListener("submit", (event) => {
    event.preventDefault()
    if (app.firstName.value === "" || app.lastName.value === "") {
        alert("Please enter in your name!")
    } else if (app.lastName.value === "") {
        alert("Please enter in your name!")
    } else if (app.email === "") {
        alert("Please enter in your email!")
    } else if (document.getElementById('homeOwnerYes').checked == false && document.getElementById('homeOwnerNo').checked == false) {
        alert("Please enter in home owner status")
    } else {
        alert("your form has been submitted!")
    }
  });

  const callApi = () => {
    $.ajax({
        url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=JQ1LE8WZCWJRAMXL_",
        dataType: 'json',
        contentType: "application/json",
    })
    .then( (result) => {
        app.lastRefreshed = result['Meta Data']['3. Last Refreshed']
        const regex = /\d{2}:\d{2}:\d{2}/g;
        const replace = ``;
        const updatedDate = app.lastRefreshed.replace(regex, replace)
        let newUpdatedDate = updatedDate.replace(/\s/g, '')
        console.log(newUpdatedDate)
        console.log(result['Time Series (Daily)']);
        app.symbol = result['Meta Data']['2. Symbol'];
        app.closingPrice = result['Time Series (Daily)'][newUpdatedDate]['4. close']
        app.openingPrice = result['Time Series (Daily)'][newUpdatedDate]['1. open']

        msft.append(`${app.symbol} ${app.closingPrice}`)
        if (app.closingPrice - app.openingPrice >= 0) {
            msftStatus.append("↑")
            $("#msftStatus").css("color", "green");

        } else {
            msftStatus.append("↓")
            $("#msftStatus").css("color", "red");

        }
    })
    .catch( (error) => {
        console.log(error)
    })
}

const callApiGoogle = () => {
    $.ajax({
        url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GOOGL&apikey=JQ1LE8WZCWJRAMXL_",
        dataType: 'json',
        contentType: "application/json",
    })
    .then( (result) => {
        app.lastRefreshed = result['Meta Data']['3. Last Refreshed']
        const regex = /\d{2}:\d{2}:\d{2}/g;
        const replace = ``;
        const updatedDate = app.lastRefreshed.replace(regex, replace)
        let newUpdatedDate = updatedDate.replace(/\s/g, '')
        console.log(newUpdatedDate)
        console.log(result['Time Series (Daily)']);
        app.symbol = result['Meta Data']['2. Symbol'];
        app.closingPrice = result['Time Series (Daily)'][newUpdatedDate]['4. close']
        app.openingPrice = result['Time Series (Daily)'][newUpdatedDate]['1. open']

        google.append(`${app.symbol} ${app.closingPrice}`)

        if (app.closingPrice - app.openingPrice >= 0) {
            googleStatus.append("↑")
            $("#googleStatus").css("color", "green");

        } else {
            googleStatus.append("↓")
            $("#googleStatus").css("color", "red");

        }
    })
    .catch( (error) => {
        console.log(error)
    })
}


const callApiBitcoin = () => {
    $.ajax({
        url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BTCUSD&apikey=JQ1LE8WZCWJRAMXL_",
        dataType: 'json',
        contentType: "application/json",
    })
    .then( (result) => {
        app.lastRefreshed = result['Meta Data']['3. Last Refreshed']
        console.log(app.lastRefreshed)
        const regex = /\d{2}:\d{2}:\d{2}/g;
        const replace = ``;
        const updatedDate = app.lastRefreshed.replace(regex, replace)
        let newUpdatedDate = updatedDate.replace(/\s/g, '')
        console.log(newUpdatedDate)
        console.log(result['Time Series (Daily)']);
        app.symbol = result['Meta Data']['2. Symbol'];
        app.closingPrice = result['Time Series (Daily)'][app.lastRefreshed]['4. close']
        app.openingPrice = result['Time Series (Daily)'][app.lastRefreshed]['1. open']

        btc.append(`${app.symbol} ${app.closingPrice}`)

        if (app.closingPrice - app.openingPrice >= 0) {
            bitcoinStatus.append("↑")
            $("#bitcoinStatus").css("color", "green");
        } else {
            bitcoinStatus.append("↓")
            $("#bitcoinStatus").css("color", "red");

        }
    })
    .catch( (error) => {
        console.log(error)
    })
}

callApiBitcoin();

callApiGoogle()

callApi();

$('form').submit( (e) => {
    e.preventDefault();
    let formData = $(this).serializeArray();
    $.get('php/echo-input-fields.php', formData)
  });