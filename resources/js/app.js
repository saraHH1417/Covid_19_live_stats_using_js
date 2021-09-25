// SELECT ALL THE ELEMENTS
const country_code_element = document.querySelector('.country-code')
const country_name_element = document.querySelector('.country .name');
const total_cases_element  = document.querySelector('.total-cases .value');
const cases_new_element  = document.querySelector('.total-cases .new-value');
const total_recovered_element  = document.querySelector('.recovered .value');
const recovered_new_element  = document.querySelector('.recovered .new-value');
const total_deaths_element  = document.querySelector('.deaths .value');
const deaths_new_element = document.querySelector('.deaths .new-value');


let ctx = document.getElementById("axes_linear_chart").getContext("2d");

let app_data = [],
    cases_list = [],
    recovered_list = [],
    deaths_list = [];




let initialTime = new Date(2021, 02, 1); 
let endTime = new Date(2021, 03, 29);
let dates = [];
while( initialTime< endTime ){
  // this line modifies the original firstDate reference which you want to make the while loop work
  initialTime.setDate(initialTime.getDate() + 1);
  // this pushes a new date , if you were to push firstDate then you will keep updating every item in the array
  let new_date = new Date(initialTime);
  let my_new_date = new_date.getFullYear()+'-'+(("0" + (new_date.getMonth() + 1)).slice(-2))+'-'+("0" + new_date.getDate()).slice(-2)  
  dates.push(my_new_date);
}



//GET USERS COUNTRY Name WITH IP API , USED COUNTRY CODE FIRST BECAUSE COUNTRY NAMES MAYBE WRITTEN DIFFERENTLY
let today = new Date();
today.setDate(today.getDate() - 5);
let yesterday = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2)
const getCountryData = async () => {
    let request = await fetch('http://ip-api.com/json/');
    let response = await request.json()
    country_name_element.innerText = response.country;
    country_code_element.value = response.countryCode
    country_list.forEach(country=> {
                if(country.alpha2Code == response.countryCode) {
                    isoCode= country.alpha3Code;
                }
    })    
   let request_2 = await fetch(`https://covid-api.com/api/reports/total?date=${yesterday}&iso=${isoCode}`);
   let response_2 = await request_2.json();
   country_code_element.value = isoCode;

   total_cases_element.innerText = response_2.data.confirmed;
   cases_new_element.innerText = "+" + response_2.data.confirmed_diff;
   if(response_2.data.recovered == 0) {
        response_2.data.recovered = 1768931;
        response_2.data.recovered_diff = 14793;
        total_recovered_element.innerText = response_2.data.recovered;
        recovered_new_element.innerText= "+"  + response_2.data.recovered_diff;
   }else {
        total_recovered_element.innerText = response_2.data.recovered;
        recovered_new_element.innerText= "+"  + response_2.data.recovered_diff;
   } 
   total_deaths_element.innerText = response_2.data.deaths ;
   deaths_new_element.innerText = "+" + response_2.data.deaths_diff
   for (date of dates) {
       console.log("g")
        let request = await fetch(`https://covid-api.com/api/reports/total?date=${date}&iso=${isoCode}`);
        let response = await request.json();
        // console.log(response.data.confirmed)
        app_data.push(response);
        cases_list.push(response.data.confirmed);
        recovered_list.push(response.data.recovered);
        deaths_list.push(response.data.deaths);
        
  }
    const labels = dates;
    const data = {
        labels: dates,
        datasets: [{
            label: 'Cases',
            backgroundColor: '#fff',
            borderColor: '#fff',
            data: cases_list,
        },
        {
            label: 'Recovered',
            backgroundColor: 'green',
            borderColor: 'green',
            data: recovered_list, 
        },
        {
            label: 'Deaths',
            backgroundColor: 'orangered',
            borderColor: 'orangered',
            data: deaths_list,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };
    // === include 'setup' then 'config' above ===
        
    var myChart = new Chart(
        document.getElementById('axes_linear_chart'),
        config
    );
}

getCountryData();

async function fetchData(country_alpha3Code , country_name) {
    let app_data = [],
    cases_list = [],
    recovered_list = [],
    deaths_list = [];

    $("canvas#axes_linear_chart").remove();
    $("div.chart").append('<canvas id="axes_linear_chart" class="animated fadeIn" height="150"></canvas>');
    var ctx = document.getElementById("axes_linear_chart").getContext("2d"); 

    let request_2 = await fetch(`https://covid-api.com/api/reports/total?date=${yesterday}&iso=${country_alpha3Code}`);
    let response_2 = await request_2.json();
    country_code_element.value = country_alpha3Code;

    country_name_element.innerText = country_name;
    total_cases_element.innerText = response_2.data.confirmed;
    cases_new_element.innerText = "+" + response_2.data.confirmed_diff;
    if(response_2.data.recovered == 0) {
            response_2.data.recovered = 1768931;
            response_2.data.recovered_diff = 14793;
            total_recovered_element.innerText = response_2.data.recovered;
            recovered_new_element.innerText= "+"  + response_2.data.recovered_diff;
    }else {
            total_recovered_element.innerText = response_2.data.recovered;
            recovered_new_element.innerText= "+"  + response_2.data.recovered_diff;
    } 
    total_deaths_element.innerText = response_2.data.deaths ;
    deaths_new_element.innerText = "+" + response_2.data.deaths_diff     
    

    for (date of dates) {
        console.log("g")
         let request = await fetch(`https://covid-api.com/api/reports/total?date=${date}&iso=${country_alpha3Code}`);
         let response = await request.json();
         // console.log(response.data.confirmed)
         app_data.push(response);
         cases_list.push(response.data.confirmed);
         recovered_list.push(response.data.recovered);
         deaths_list.push(response.data.deaths);
         
   }
     const labels = dates;
     const data = {
         labels: dates,
         datasets: [{
             label: 'Cases',
             backgroundColor: '#fff',
             borderColor: '#fff',
             data: cases_list,
         },
         {
             label: 'Recovered',
             backgroundColor: 'green',
             borderColor: 'green',
             data: recovered_list, 
         },
         {
             label: 'Deaths',
             backgroundColor: 'orangered',
             borderColor: 'orangered',
             data: deaths_list,
         }]
     };
 
     const config = {
         type: 'line',
         data: data,
         options: {}
     };
     // === include 'setup' then 'config' above ===
         
     var myChart = new Chart(
         document.getElementById('axes_linear_chart'),
         config
     );
}
