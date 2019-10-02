export default {
    colors: [
        '#3f7895',
        '#333422',
        '#b0d533',
        '#FFFFFF',
        '#7798BF'
    ],
    chart: {
        backgroundColor: "white",
        style: {
            fontFamily: 'Dosis, sans-serif'
        },
        borderRadius: "5%"
    },
    title: {
        style: {
            fontSize: '18px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: 'black'
        }
    },
    tooltip: {
        borderWidth: 0,
        backgroundColor: 'rgba(219,219,216,0.8)',
        shadow: false
    },
    legend: {
        backgroundColor: '#F0F0EA',
        itemStyle: {
            fontWeight: 'bold',
            fontSize: '13px'
        }
    },
    xAxis: {
        gridLineWidth: 2,
        labels: {
            style: {
                fontSize: '12px'
            }
        }
    },
    yAxis: {
        minorTickInterval: 'auto',
        title: {
            style: {
                textTransform: 'uppercase'
            }
        },
        labels: {
            style: {
                fontSize: '12px'
            }
        }
    },
    plotOptions: {
        candlestick: {
            lineColor: '#404048'
        }
    }
}
