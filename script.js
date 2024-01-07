const dropDown= document.querySelector(".dropDown")
const dropItems= document.querySelector(".dropItems")
const region= document.querySelectorAll(".region")
const search= document.querySelector(".search")
const toggle= document.querySelector(".toggle")
const moon= document.querySelector(".moon")
document.addEventListener('DOMContentLoaded', function(){
    const countryList = document.getElementById('countryList');

     fetch('data.json')
     .then(response => response.json())
     .then(data => {
         data.forEach(country => {
          const listItem = document.createElement('li');
          listItem.innerHTML = 
          `<div class="country">
          <div class="country-img"><img src="${country.flags.png}" alt="${country.name}"></div>
          <div class="country-info">
          <div class="countryName"><h2>${country.name}</h2></div>
          <p>Population: ${country.population}</p>
          <div class="regionName"><p>Region: ${country.region}</p></div>
          <p>Capital: ${country.capital}</p></div>
         </div>`;
         countryList.appendChild(listItem);
         listItem.addEventListener("click", () =>{
            showCountryDetail(country)
         })
         });
     })
     .catch(error => console.error('Error fetching data:', error));
 });

function borderBtnFunc(borderName){
    fetch ('https://restcountries.com/v3.1/name/' + borderName)
    .then (response => response.json())
    .then (countryData => {
        showCountryDetail(countryData)
    })
    .catch (error => {
        console.error("error fetching data: ", error)
    })
}

 function showCountryDetail(element){
    const countryModel = document.querySelector(".countryModel");
    countryModel.classList.toggle("show");
    const languages = element.languages.map((language) => language.name);
    countryModel.innerHTML = ` <button class="backButton"><i class="fa fa-long-arrow-left"></i>Back</button>
        <div class="model">
        <img src="${element.flags.svg}">
        <div class="leftModel">
        <h1 class="name">${element.name}</h1>
        <p>Native Name: ${element.nativeName} </p>
        <p>Population: ${element.population}</p>
        <p>Region: ${element.region}</p>
        <p>Sub Region: ${element.subregion}</p>
        <p>Capital: ${element.capital}</p>
            <div class="borderCountries">Border Countries:
            </div>
        </div>
    <div class="rightModel">
        <p>Top Level Domain: ${element.topLevelDomain} </p>
        <p>Currencies: ${element.currencies[0].name} </p>
        <p>Languages: ${languages} </p>
    </div>
</div>`;

const borderCountries= document.querySelector(".borderCountries");
(element.borders) ? element.borders.map((border) => fetch('https://restcountries.com/v3.1/alpha/' + border)
                                                                                    .then(response => response.json())
                                                                                    .then(data => {
                                                                                        borderCountries.innerHTML += `
                                                                                        <button class="borderBtn">${data[0].name.common}</button>
                                                                                        `;
                                                                                        const button = document.querySelector(".borderBtn")
                                                                                        console.log(button.innerText)
                                                                                    })                                                                              
): borderCountries.innerHTML += " none";
const back= document.querySelector(".backButton")
back.addEventListener("click", ()=>{
    countryModel.classList.toggle("show");
})
//const borderButtons= document.querySelectorAll(".borderBtn");
//console.log(borderButtons.)

if(borderCountries.innerHtml != "Border Countries: none"){

    /*borderButtons.map((button) => {
        console.log(button.innerText)
        button.addEventListener("click", ()=>{
            fetch('https://restcountries.com/v3.1/name/' + button.innerText)
          })
        })*/
}

 }

 /* get data after fetching*/
 const regionName = document.getElementsByClassName("regionName")
 const countryName = document.getElementsByClassName("countryName")

 dropDown.addEventListener("click", ()=>{
    dropItems.classList.toggle("hideDropDown");
 })


 region.forEach(element =>{
     element.addEventListener("click", ()=>{
         Array.from(regionName).forEach(elem => {
             if(elem.innerText.includes(element.innerText) || element.innerText =="All"){
                 elem.parentElement.parentElement.style.display ="grid";
             }
             else{
                 elem.parentElement.parentElement.style.display="none";
             }
         })
     })
 })
search.addEventListener("input", ()=>{
    console.log(search.value.toUpperCase());
    Array.from(countryName).forEach(element =>{
        if(element.innerText.toUpperCase().includes(search.value.toUpperCase())){
            element.parentElement.parentElement.style.display= "grid";
        }else{
            element.parentElement.parentElement.style.display= "none";
        }
        
    })
})

toggle.addEventListener("click", ()=>{
    document.body.classList.toggle("dark");
    moon.classList.toggle("fas");
})