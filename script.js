const inputs = { a: 0, b: 0 };
const inputRows = document.querySelectorAll(".input-row");
const truthTableBody = document.getElementById("truth-table-body");
const truthTable = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1]
];

function renderTruthTable() {
  const activeRow = truthTable.findIndex(([a, b]) => a === inputs.a && b === inputs.b);
  truthTableBody.innerHTML = truthTable.map(([a, b], index) => {
    const sum = a ^ b;
    const carry = a & b;
    const active = index === activeRow;
    return `<tr class="${active ? "active-row" : ""}"${active ? ' aria-current="true"' : ""}>
      <td>${a}</td><td>${b}</td><td>${sum}</td><td>${carry}</td>
    </tr>`;
  }).join("");
}

function calculate() {
  const sum = inputs.a ^ inputs.b;
  const carry = inputs.a & inputs.b;

  document.getElementById("sum-output").textContent = sum;
  document.getElementById("carry-output").textContent = carry;
  document.getElementById("calculation-status").textContent =
    `${inputs.a}${inputs.b} \u2192 ${sum}${carry}`;
  renderTruthTable();
}

inputRows.forEach((row) => {
  row.querySelectorAll(".bit-button").forEach((button) => {
    button.addEventListener("click", () => {
      const inputName = row.dataset.input;
      const value = Number(button.dataset.bit);
      inputs[inputName] = value;

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
