const inputs = { a: 0, b: 0 };
const circuit = [0, 0, 0, 0];
const truthTable = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [1, 0, 0, 0],
  [1, 1, 0, 0]
];

const inputRows = document.querySelectorAll(".input-row");
const truthTableBody = document.getElementById("truth-table-body");

function calculate() {
  circuit[0] = inputs.a;
  circuit[1] = inputs.b;
  circuit[2] = circuit[0] ^ circuit[1];
  circuit[3] = circuit[0] & circuit[1];

  truthTable.forEach((row) => {
    row[2] = row[0] ^ row[1];
    row[3] = row[0] & row[1];
  });

  render();
}

function renderTruthTable() {
  const activeRow = inputs.a * 2 + inputs.b;
  truthTableBody.innerHTML = truthTable.map((row, index) => `
    <tr class="${index === activeRow ? "active-row" : ""}"${index === activeRow ? ' aria-current="true"' : ""}>
      ${row.map((value) => `<td>${value}</td>`).join("")}
    </tr>
  `).join("");
}

function render() {
  document.getElementById("sum-output").textContent = circuit[2];
  document.getElementById("carry-output").textContent = circuit[3];

  circuit.forEach((value, index) => {
    const cell = document.querySelector(`[data-cell="${index}"]`);
    cell.querySelector(".memory-value").textContent = value;
    cell.classList.toggle("is-one", value === 1);
    cell.setAttribute("aria-label", `circuit[${index}]: ${cell.querySelector(".memory-label").textContent} = ${value}`);
  });

  document.getElementById("svg-a").textContent = circuit[0];
  document.getElementById("svg-b").textContent = circuit[1];
  document.getElementById("svg-sum").textContent = circuit[2];
  document.getElementById("svg-carry").textContent = circuit[3];

  document.querySelectorAll("[data-signal]").forEach((element) => {
    const value = circuit[{ a: 0, b: 1, sum: 2, carry: 3 }[element.dataset.signal]];
    element.classList.toggle("is-one", value === 1);
  });

  renderTruthTable();
}

inputRows.forEach((row) => {
  row.querySelectorAll(".bit-button").forEach((button) => {
    button.addEventListener("click", () => {
      inputs[row.dataset.input] = Number(button.dataset.bit);
      row.querySelectorAll(".bit-button").forEach((choice) => {
        const selected = choice === button;
        choice.classList.toggle("is-selected", selected);
        choice.setAttribute("aria-pressed", String(selected));
      });
      calculate();
    });
  });
});

document.getElementById("calculate-button").addEventListener("click", calculate);

document.getElementById("reset-button").addEventListener("click", () => {
  inputs.a = 0;
  inputs.b = 0;
  inputRows.forEach((row) => {
    row.querySelectorAll(".bit-button").forEach((button) => {
      const selected = button.dataset.bit === "0";
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  });
  calculate();
});

calculate();
