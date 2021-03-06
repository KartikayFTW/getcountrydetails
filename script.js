"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const renderError = (msg) => {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

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

const renderCountry = function (data, className = "") {
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies).map((cur) => cur.name);
  let isHindi = data.name.common === "India" ? languages[1] : languages[0];
  const html = `<article class="country ${className} ">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} million</p>
        <p class="country__row"><span>🗣️ </span>  ${isHindi}</p>
        <p class="country__row"><span>💰</span>${currencies.join(`<br/>`)}</p>
      </div>
    </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

// const getCountryNeighbour = function (country) {
//   //Ajax Call 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     //   console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     //Country 1
//     renderCountry(data);
//     //Country 2
//     const [neighbour] = data.borders;
//     //Ajax call 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const [data] = JSON.parse(this.responseText);
//       console.log(data);
//       renderCountry(data, 'neighbour');
//     });

//     if (!neighbour) return;
//   });
// };

// getCountryNeighbour('india');
//Ajax Call 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//Fetch
// const getCountryData = function (country) {
//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`).then(
//     function (response) {
//       console.log(response);
//       return response.json().then(function (data) {
//         console.log(data[0]);
//         renderCountry(data[0]);
//       });
//     }
//   );
// };

const getJSON = function (url, errorMsg = "Something Went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
/*
const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(([data]) => {
      renderCountry(data);
      if (!('borders' in data)) throw new Error('No neighbour found');
      const nb = data.borders[0];

      if (!nb) throw new Error('No neighbour found!');
      //country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/?codes=${nb}`,
        'Country not found'
      );
    })
    .then(([data]) => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}🔥🔥🔥🔥`);
      renderError(`Something went wrong 🔥🔥🔥🔥 ${err.message}`);
    })
    .finally(() => {
      console.warn('finally');
      countriesContainer.style.opacity = 1;
    });
};

// getCountryData('usa');

btn.addEventListener('click', () => {
  getCountryData('india');
});

// btn.addEventListener('click', () => {
//   getCountryData('india');
// });

// const getCountryData = function (country) {
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//       .then(response => response.json())
//       .then(([data]) => {
//         renderCountry(data);
//         const neighbors = data.borders;
//         if (!neighbors) return;
//         neighbors.forEach(cur =>
//           fetch(`https://restcountries.com/v3.1/alpha?codes=${cur}`)
//             .then(response2 => response2.json())
//             .then(([data2]) => renderCountry(data2, 'neighbour'))
//         ); // close forEach
//       });
//   };
/*
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
    }, 3000);
  }, 2000);
}, 1000);

const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 sec pass');
    return wait(2);
  })
  .then(() => {
    console.log('2 sec pass');
    return wait(3);
  })
  .then(() => {
    console.log('3 sec pass');
  });
  */

// Async await

const getCountryData = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!res.ok) throw new Error(`Country not found!! (${res.status})`);

    const [data] = await res.json();

    renderCountry(data);

    if (!("borders" in data)) throw new Error("No neighbour found");
    const nb = data.borders[0];
    const res1 = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${nb}`
    );
    const [data1] = await res1.json();
    console.log(data1);
    renderCountry(data1, "neighbour");
  } catch (err) {
    console.log(err);
    renderError(`Something went wrong!! ${err.message}`);
  }
};

btn.addEventListener("click", () => {
  const countryData = prompt("Enter Country Name");
  const country = countryData.toLowerCase();
  if (country === "india") {
    country === "bharat";
  }
  getCountryData(country);
});

// getCountryData('australia');
