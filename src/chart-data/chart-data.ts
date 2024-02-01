export const lineChart = {
    type: "line",
    data: {
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [{
            label: ['label1', 'label2', 'label3'],
            data: [],
            fill: false,
            borderColor: '#0096F2',
            tension: 0.5,
            pointRadius: 0,
        }]
    },
    options: {
        legend: {
            display: false
        },
        scales: {
            responsive: true,
            // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
            maintainAspectRatio: false,
            ticks: {
            },
            xAxes: [
                {
                    display: false,
                }
            ],
            yAxes: [
                {
                    display: false,
                }
            ]
        }
    }
}
