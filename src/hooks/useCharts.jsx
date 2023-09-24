import React from 'react'
import Chart from 'chart.js/auto'

export const useCharts = () => {

    const dymanicColors = (data) => {
        const colors = [];
        const borders = [];
        for( let i=0 ; i < data.length; i++ ) {
            const color1 = Math.floor(Math.random() * 255);
            const color2 = Math.floor(Math.random() * 255);
            const color3 = Math.floor(Math.random() * 255);

            colors.push(`rgba( ${ color1 }, ${ color2 }, ${ color3 }, 0.2 )`);
            borders.push(`rgb( ${ color1 }, ${ color2 }, ${ color3 })`);
        }

        return [colors, borders];
    }

    const pluginText = {
        id: 'pluginText',
        beforeDraw(chart, args, options) {
            // Get ctx from string
            const ctx = chart.ctx;
    
            // Get options from the center object in options
            const centerConfig = chart.config.options.elements.center;
            const fontStyle = centerConfig.fontStyle || 'Arial';
            const txt = centerConfig.text;
            const color = centerConfig.color || '#000';
            const maxFontSize = centerConfig.maxFontSize || 75;
            const sidePadding = centerConfig.sidePadding || 20;
            const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
            // Start with a base font of 30px
            ctx.font = "18px " + fontStyle;
    
            // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            const stringWidth = ctx.measureText(txt).width;
            const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
    
            // Find out how much the font can grow in width.
            const widthRatio = elementWidth / stringWidth;
            const newFontSize = Math.floor(30 * widthRatio);
            const elementHeight = (chart.innerRadius * 2);
    
            // Pick a new font size so it will not be larger than the height of label.
            let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
            let minFontSize = centerConfig.minFontSize;
            const lineHeight = centerConfig.lineHeight || 25;
            let wrapText = false;
    
            if (minFontSize === undefined) {
                minFontSize = 20;
            }
    
            if (minFontSize && fontSizeToUse < minFontSize) {
                fontSizeToUse = minFontSize;
                wrapText = true;
            }
    
            // Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            let centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            let centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.font = fontSizeToUse + "px " + fontStyle;
            ctx.fillStyle = color;
    
            if (!wrapText) {
                ctx.fillText(txt, centerX, centerY);
                return;
            }
    
            const words = txt.split(' ');
            let line = '';
            const lines = [];
    
            // Break words up into multiple lines if necessary
            for (const n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;
                if (testWidth > elementWidth && n > 0) {
                    lines.push(line);
                    line = words[n] + ' ';
                } else {
                    line = testLine;
                }
            }
    
            // Move the center up depending on line height and number of lines
            centerY -= (lines.length / 2) * lineHeight;
    
            for (const n = 0; n < lines.length; n++) {
                ctx.fillText(lines[n], centerX, centerY);
                centerY += lineHeight;
            }
            //Draw text in center
            ctx.fillText(line, centerX, centerY);
        }
    }

    const drawBars = async (divID, indexAxis = 'y', title, label, data) => {
        const colors = dymanicColors( data );

        const chart = new Chart(
            document.getElementById(divID),
            {
                type: 'bar',
                data: {
                    labels: data.map(row => row.label),
                    datasets: [
                        {
                            label,
                            data: data.map(row => row.count),
                            backgroundColor: colors[0],
                            borderColor: colors[1],
                            borderWidth: 1,
                        }
                    ]
                },
                options: {
                    indexAxis,
                    responsive: true,
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

    const drawDonuts = async(divID, title, total, label, data) => {
        const colors = dymanicColors( data );

        const chart = new Chart(
            document.getElementById(divID),
            {
                type: 'doughnut',
                data: {
                    labels: data.map(row => row.label),
                    datasets: [
                        {
                            label,
                            data: data.map(row => row.count),
                            backgroundColor: colors[0],
                            borderColor: colors[1],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    cutout: 40,
                    responsive: true,
                    elements: {
                        center: {
                          text: total,
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: title
                        }
                    }
                },
                plugins: [pluginText]
            } 
        )

        return chart;
    }

  return {
    drawBars,
    drawDonuts
  }
}
