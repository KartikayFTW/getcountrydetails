'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// const getCountry = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     //   console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const languages = Object.values(data.languages);
//     const currencies = Object.values(data.currencies);
//     let isHindi = data.name.common === 'India' ? languages[1] : languages[0];
//     const html = `<article class="country">
//     <img class="country__img" src="${data.flags.png}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name.common}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} million</p>
//       <p class="country__row"><span>🗣️   ${isHindi}</span></p>
//       <p class="country__row"><span>💰</span>${currencies[0].name}</p>
//     </div>
//   </article>`;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// const data = prompt('Enter Country Name');
// const country = data.toLowerCase();
// console.log(country);
// getCountryData(country);
// getCountryData('portugal');

const renderCountry = function (data, className = '') {
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies);
  let isHindi = data.name.common === 'India' ? languages[1] : languages[0];
  const html = `<article class="country ${className} ">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} million</p>
        <p class="country__row"><span>🗣️   ${isHindi}</span></p>
        <p class="country__row"><span>💰</span>${currencies[0].name}</p>
      </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryNeighbour = function (country) {
  //Ajax Call 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //   console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //Country 1
    renderCountry(data);
    //Country 2
    const [neighbour] = data.borders;
    //Ajax call 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
      renderCountry(data, 'neighbour');
    });

    if (!neighbour) return;
  });
};

getCountryNeighbour('india');
