import { Component, ElementRef, ViewChild } from '@angular/core';
import Highcharts from 'highcharts';
import { Chart } from '../visitor-analytics/chartconfiguration/chart';
import * as d3 from 'd3';

@Component({
  selector: 'app-clearance',
  templateUrl: './clearance.component.html',
  styleUrl: './clearance.component.css'
})
export class ClearanceComponent {
   gaugemap: any = {};

  constructor() {}

  ngOnInit(): void {
    this.drawGauge();
  }

  drawGauge() {
    const self = this;
  
    const gauge = (container: string, configuration: any) => {
      var config = {
        size: 710,
        clipWidth: 300,
        clipHeight: 110,
        ringInset: 20,
        ringWidth: 20,
  
        pointerWidth: 10,
        pointerTailLength: 5,
        pointerHeadLengthPercent: 0.9,
  
        minValue: 0,
        maxValue: 100,
  
        minAngle: -90,
        maxAngle: 90,
  
        transitionMs: 750,
  
        majorTicks: 5,
        labelFormat: (d: number) => `${d}%`, // Add % sign to the label format
        labelInset: 10,
  
        gaugeValue: 0,
  
        pointerColor: '#000000',
        showMinValue: true,
        showMaxValue: true,
        arcColorFn: d3.interpolateHsl(d3.rgb('#d7efff'), d3.rgb('#007bff')),
      };
  
      let range: number;
      let r: number;
      let pointerHeadLength: number;
  
      let svg: any;
      let arc: any;
      let scale: any;
      let ticks: any;
      let tickData: any;
      let pointer: any;
  
      const deg2rad = (deg: number) => (deg * Math.PI) / 180;
  
      const configure = (configuration: any) => {
        Object.assign(config, configuration);
        range = config.maxAngle - config.minAngle;
        r = config.size / 2;
        pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);
        scale = d3
          .scaleLinear()
          .domain([config.minValue, config.maxValue])
          .range([0, 1]);
        ticks = d3.range(config.minValue, config.maxValue + 1, 20);
        tickData = d3.range(10).map(() => 1 / 10);
  
        arc = d3
          .arc()
          .innerRadius(r - config.ringWidth - config.ringInset)
          .outerRadius(r - config.ringInset)
          .startAngle((d: any, i: number) =>
            deg2rad(config.minAngle + scale(i * 10) * range)
          )
          .endAngle((d: any, i: number) =>
            deg2rad(config.minAngle + scale((i + 1) * 10) * range)
          );
      };
  
      const render = (newValue: number) => {
        svg = d3
          .select(container)
          .append('svg')
          .attr('class', 'gauge')
          .attr('width', config.clipWidth)
          .attr('height', config.clipHeight);
  
        const centerTx = `translate(${r}, ${r + 20})`;
  
        const arcs = svg
          .append('g')
          .attr('class', 'arc')
          .attr('transform', centerTx);
  
        arcs
          .selectAll('path')
          .data(tickData)
          .enter()
          .append('path')
          .attr('fill', (d: any, i: any) => config.arcColorFn(d * i))
          .attr('d', arc);
  
        const lg = svg
          .append('g')
          .attr('class', 'label')
          .attr('transform', centerTx);
  
          lg.selectAll("text")
          .data(ticks)
          .enter()
          .append("text")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("font-family", "Source Sans Pro, sans-serif")
          .attr("font-size", "18px")
          .attr("font-weight", "bold")
          .attr("transform", function (d: any) {
            var ratio = scale(d);
            var newAngle = config.minAngle + ratio * range;
            if (d == config.minValue && config.showMinValue) {
              return (
                "translate(" +
                -(r - config.labelInset * 5) +
                ", " +
                2 * config.labelInset +
                ")"
              );
            } else if (d == config.maxValue && config.showMaxValue) {
              return (
                "translate(" +
                (r - config.labelInset * 4) +
                ", " +
                2 * config.labelInset +
                ")"
              );
            } else if (d != config.minValue && d != config.maxValue) {
              return (
                "rotate(" +
                newAngle +
                ") translate(0," +
                (config.labelInset / 2 - r) +
                ")"
              );
            } else {
              return "scale(0)";
            }
          })
          .text(function (d: any) {
            // Add % sign only for min and max values
            return d === config.minValue || d === config.maxValue ? d + "%" : d;
          });
        
  
        const pointerLine = d3
          .line()
          .curve(d3.curveLinear)
          .x((d: any) => d[0])
          .y((d: any) => d[1]);
  
        const lineData = [
          [config.pointerWidth / 2, 0],
          [0, -pointerHeadLength],
          [-(config.pointerWidth / 2), 0],
          [0, config.pointerTailLength],
          [config.pointerWidth / 2, 0],
        ];
  
        const pg = svg
          .append('g')
          .data([lineData])
          .attr('class', 'pointer')
          .attr('transform', centerTx);
  
        pointer = pg
          .append('path')
          .attr('d', pointerLine)
          .attr('transform', `rotate(${config.minAngle})`);
  
        update(newValue === undefined ? 0 : newValue);
      };
  
      const update = (newValue: number) => {
        const ratio = scale(newValue);
        const newAngleValue = config.minAngle + ratio * range;
        pointer
          .transition()
          .duration(config.transitionMs)
          .ease(d3.easeElastic)
          .attr('transform', `rotate(${newAngleValue})`);
      };
  
      configure(configuration);
  
      return {
        render,
        update,
      };
    };
  
    const hygieneGauge = gauge('#hygiene-gauge-container', {
      size: 240,
      clipWidth: 238,
      clipHeight: 200,
      ringWidth: 20,
      maxValue: 100,
      transitionMs: 4000,
    });
  
    hygieneGauge.render(70); // Initial gauge value (e.g., 70%)
  }
  
}
