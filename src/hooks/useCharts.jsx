import React from 'react'
import Chart from 'chart.js/auto'

export const useCharts = () => {

    const drawBars = async (divID, title, label, data) => {
        const chart = new Chart(
          document.getElementById(divID),
            {
                type: 'bar',
                data: {
                    labels: data.map(row => row.label),
                    datasets: [
                        {
                        label,
                        data: data.map(row => row.count)
                        }
                    ]
                },
                options: {
                    plugins: {
                        title: {
                        display: true,
                        text: title,
                        }
                    }
                }
            }
        );

        return chart;
    }

  return {
    drawBars
  }
}
