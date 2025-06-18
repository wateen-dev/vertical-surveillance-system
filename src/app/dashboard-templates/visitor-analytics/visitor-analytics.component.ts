import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as d3 from 'd3';
import { AttendanceService } from '../../dashboard/services/attendanceService';

@Component({
  selector: 'app-visitor-analytics',
  templateUrl: './visitor-analytics.component.html',
  styleUrls: ['./visitor-analytics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisitorAnalyticsComponent {
  gaugemap: any = {};
  private currentGauge: any = null;
  value: any;

  constructor(private statisticsService: AttendanceService) {}

  ngOnInit(): void {
    this.statisticsService.getAttendancePercentage().subscribe((percentage) => {
      this.value = percentage;
      this.updateGauge(50);
    });
  }

  updateGauge(value: number) {
    const gaugeContainer = document.getElementById('gauge-container');
    if (gaugeContainer && this.currentGauge) {
      gaugeContainer.innerHTML = '';
      this.currentGauge = null;
    }
    this.drawGauge(value);
  }

  drawGauge(value: number) {
    d3.select('#gauge-container svg').remove();
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
        maxValue: 10,
        minAngle: -90,
        maxAngle: 90,
        transitionMs: 750,
        majorTicks: 5,
        labelFormat: d3.format('d'),
        labelInset: 10,
        gaugeValue: 0,
        pointerColor: '#000000',
        showMinValue: true,
        showMaxValue: true,
        arcColorFn: d3.interpolateHsl(d3.rgb('#e8e2ca'), d3.rgb('#3e6c0a')),
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
        ticks = d3.range(config.minValue, config.maxValue + 1, 10);
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
        
        lg.selectAll('text')
          .data(ticks)
          .enter()
          .append('text')
          .attr('dx', '-.8em')
          .attr('dy', '.15em')
          .attr('font-family', 'Source Sans Pro, sans-serif')
          .attr('font-size', '18px')
          .attr('font-weight', 'bold')
          .attr('transform', function (d: any) {
            const ratio = scale(d);
            const newAngle = config.minAngle + ratio * range;
            if (d == config.minValue && config.showMinValue) {
              return `translate(${-(r - config.labelInset * 5)}, ${
                2 * config.labelInset
              })`;
            } else if (d == config.maxValue && config.showMaxValue) {
              return `translate(${r - config.labelInset * 4}, ${
                2 * config.labelInset
              })`;
            } else if (d != config.minValue && d != config.maxValue) {
              return `rotate(${newAngle}) translate(0,${
                config.labelInset / 2 - r
              })`;
            } else {
              return 'scale(0)';
            }
          })
          .text((d: any) => {
            // Add % only for minValue and maxValue
            if (d === config.minValue) return '0%';
            if (d === config.maxValue) return '100%';
            return config.labelFormat(d);
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
    
    const powerGauge = gauge('#gauge-container', {
      size: 240,
      clipWidth: 238,
      clipHeight: 200,
      ringWidth: 20,
      maxValue: 100,
      transitionMs: 4000,
    });
    powerGauge.render(this.value);
  }
}
