function findMinCost(seatsNeeded, carTypes) {

    let dp = Array(seatsNeeded + 1).fill(Infinity);
    dp[0] = 0; // Base case: 0 seats cost 0 PHP


    let combination = Array(seatsNeeded + 1).fill(null);

    for (let seats = 1; seats <= seatsNeeded; seats++) {
        for (let car of carTypes) {
            if (seats >= car.seats) {
                let cost = dp[seats - car.seats] + car.cost;
                if (cost < dp[seats]) {
                    dp[seats] = cost;
                    combination[seats] = car;
                }
            }
        }
    }


    let result = [];
    let seats = seatsNeeded;
    while (seats > 0) {
        let car = combination[seats];
        if (car) {
            result.push(car);
            seats -= car.seats;
        } else {
            break;
        }
    }


    if (dp[seatsNeeded] === Infinity) {
        console.log("No valid car combination found.");
    } else {
        let carCount = {};
        for (let car of result) {
            if (car.name in carCount) {
                carCount[car.name]++;
            } else {
                carCount[car.name] = 1;
            }
        }

        for (let car in carCount) {
            console.log(`${car} x ${carCount[car]}`);
        }
        console.log(`Total = PHP ${dp[seatsNeeded]}`);
    }
}


let carTypes = [
    { name: 'S', seats: 5, cost: 5000 },
    { name: 'M', seats: 10, cost: 8000 },
    { name: 'L', seats: 15, cost: 12000 },
];

let seatsNeeded = parseInt(prompt("Please input number (seat):"));

findMinCost(seatsNeeded, carTypes);