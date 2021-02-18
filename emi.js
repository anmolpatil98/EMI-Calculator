const principleInput = document.getElementById("principle");
const rateInput = document.getElementById("rate");
const timeInput = document.getElementById("time");

const principleSlider = document.getElementById("principle-slider");
const rateSlider = document.getElementById("rate-slider");
const timeSlider = document.getElementById("time-slider");

const updateValue = () => {
  let p_slider = parseFloat(principleSlider.value);
  let r_slider = parseFloat(rateSlider.value);
  let t_slider = parseFloat(timeSlider.value);
  principleInput.value = p_slider;
  rateInput.value = r_slider;
  timeInput.value = t_slider;
  // updatepie();
};

const updatepie = () => {
  const totalMonths = timeInput.value * 12;
  const monthlyRate = rateInput.value / (12 * 100);
  const numerator = Math.pow(1 + monthlyRate, totalMonths);
  const denominator = numerator - 1;
  const totalemi = (
    principleInput.value *
    monthlyRate *
    (numerator / denominator)
  ).toPrecision(5);
  const totalAmount = totalMonths * parseFloat(totalemi);
  const totalInterest = Math.floor(totalAmount - principleInput.value);

  const payEmi = document.querySelector(".emi");
  const payAmount = document.querySelector(".totalAmount");
  const payInterest = document.querySelector(".totalInterest");

  payEmi.innerHTML = parseFloat(totalemi);
  payAmount.innerHTML = parseFloat(totalAmount);
  payInterest.innerHTML = parseFloat(totalInterest);

  /*---------------------------PIE Chart--------------------------*/
  var pieTotal = parseFloat(totalInterest) + parseFloat(principleInput.value);
  var pieTotalInterest = (
    (parseFloat(totalInterest) / pieTotal) *
    360 *
    0.277777
  ).toPrecision(3);

  var pieprincipleInput = (
    (parseFloat(principleInput.value) / pieTotal) *
    360 *
    0.277777
  ).toPrecision(3);

  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    animationEnabled: true,
    type: "pie",

    data: {
      labels: ["PayableInterest", "Principle"],
      datasets: [
        {
          fill: true,
          backgroundColor: ["purple", "lightgreen"],
          data: [pieTotalInterest, pieprincipleInput],
          borderWidth: [5, 5],
        },
      ],
    },
  });
};

const updateSlider = () => {
  let p = parseFloat(principleInput.value);
  let r = parseFloat(rateInput.value);
  let t = parseFloat(timeInput.value);
  principleSlider.value = p;
  rateSlider.value = r;
  timeSlider.value = t;
  // updatepie();
};

const findbtn = document.querySelector("#find");
findbtn.addEventListener("click", (e) => {
  e.preventDefault(); //prevents page from reloading
  updatepie();
});
