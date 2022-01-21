export const template = ({ title }) => `<div class="clock">
  <h3>${title}</h3>
  <p class="date">00.00.0000</p>
  <p class="time">00:00:00</p>
  <button class="btn btn-light stop">Stop</button>
  <button class="btn btn-success start">Start</button>
</div>`