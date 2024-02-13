document.getElementById('calculate-btn').addEventListener('click', function() {
  let funds = document.querySelectorAll('.fund');
  let totalCurrent = 0;
  let mostCriticalFund = null;
  let mostCriticalDifference = 0;

  // Calculate the total current allocation
  funds.forEach(function(fund) {
    let current = parseFloat(fund.querySelector('.current-allocation').value.trim());
    totalCurrent += current;
  });

  let result = document.getElementById('result');
  result.textContent = ""; // Clear any previous results

  funds.forEach(function(fund) {
    let target = parseFloat(fund.querySelector('.target-percentage').value.trim());
    let current = parseFloat(fund.querySelector('.current-allocation').value.trim());

    // Calculate the difference between the current allocation and the target percentage for each fund
    let difference = (target / 100 * totalCurrent) - current;

    // Update the most critical fund if the current fund has a larger difference
    if (difference > mostCriticalDifference) {
      mostCriticalDifference = difference;
      mostCriticalFund = fund;
    }
  });

  if (mostCriticalFund) {
    // Calculate the required investment for the most critical fund
    let target = parseFloat(mostCriticalFund.querySelector('.target-percentage').value.trim());
    let current = parseFloat(mostCriticalFund.querySelector('.current-allocation').value.trim());
    let required = (target / 100 * totalCurrent) - current;
    let fundName = mostCriticalFund.querySelector('.fund-name').value;

    // Display the message indicating the most critical fund that requires additional investment
    result.innerHTML = `This month, invest ${required.toFixed(2)} in the ${fundName} fund. The current allocation percentage is ${(current / totalCurrent * 100).toFixed(2)}% of the portfolio, and you need to invest ${required.toFixed(2)} to reach the target percentage of ${target}%.`;
  } else {
    // If no fund is identified, display an error message
    result.textContent = "Error: Unable to determine the most critical fund for additional investment.";
  }
});
