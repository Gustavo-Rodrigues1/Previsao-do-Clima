const input: HTMLInputElement | null =
  document.querySelector("#input-location");
const form = document.querySelector("#location-info > form");
const sectionWeatherReport = document.querySelector("#weather-report");
const selectElement = document.getElementById(
  "input-temperature-type"
) as HTMLSelectElement;
let selectedValue = selectElement.value;

// Função pra pegar a temperatura na caixa de select
selectElement.addEventListener("change", () => {
  selectedValue = selectElement.value;
});

// Lógica para mostrar a temperatura de um local por meio de uma Api (OpenWeather)
form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const location = input?.value;

// Verifica se uma localização foi digitada no input
  if (!location || !sectionWeatherReport) {
    alert("Digite uma localização");
    return;
  }
  //Tratamento de erro
  try {
    //Resposta da API
const response = await fetch(
  `http://localhost:3000/weather?q=${location}&units=${selectedValue}`
);

    const data = await response.json();

    //Pega a sigla para a temperatura selecionada
    let temperatureType = "";
    switch (selectedValue) {
      case "metric":
        temperatureType = "°C";
        break;
      case "imperial":
        temperatureType = "°F";
        break;
      case "standard":
        temperatureType = "K";
        break;
    }

    //informção de temperatura, métrica, local e ícone para exibir no HTML
    const infos = {
      temperature: Math.round(data.main.temp),
      temperatureType: temperatureType,
      locate: data.name,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };

    //Exibição no HTML
    sectionWeatherReport.innerHTML = `<h2>Clima</h2>
        <div class="temperature-location-image">
          <span>${infos.temperature}${infos.temperatureType}</span>
          <img src=${infos.icon} />
        </div>
    <h2>${infos.locate}</h2>`;
  } catch (error) {
    console.log("Erro na requisão da API", error);
  }
});
