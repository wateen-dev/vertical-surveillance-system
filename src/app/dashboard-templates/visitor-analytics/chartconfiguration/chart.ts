function drawArc(ctx: any, centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number, color: string) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();
    ctx.restore();
  }
  
  function drawPieSlice(
    ctx: any,
    centerX: number,
    centerY: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    fillColor: string,
    strokeColor: string,
    shadow?: boolean,
  ) {
    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    console.log(startAngle, endAngle)
    ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
    if (shadow) {
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#666";
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  
  function drawNeedle(ctx: any, cx: number, cy: number, radius: number, radianAngle: number,) {
    ctx.translate(cx, cy);
    ctx.rotate(radianAngle);
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(radius, 0);
    ctx.lineTo(0, 5);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.rotate(-radianAngle);
    ctx.translate(-cx, -cy);
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  
  function drawTooltip(ctx: any, cx: number, cy: number, text: string) {
    ctx.font = "14px Arial";// definig before rect gives exact width of text
    ctx.save();
    // console.log(ctx.canvas.width)
    let width = ctx.measureText(text).width;
  
    if(width > ctx.canvas.width){
      width = ctx.cavas.width - 20;
    }
    ctx.beginPath();
    ctx.translate(-60, 0);
    // ctx.moveTo(-50, -50)
    ctx.roundRect( cx, cy, width + 20, 40, 4, true);
    ctx.fillStyle = "#222";
    ctx.fill();
    ctx.beginPath();
    // ctx.textAlign = "center";
    // ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.fillText(text, cx + 10, cy + 25);
    // ctx.restore();
  }
  export class Chart {
    public options: any;
    private canvas: any;
    private ctx: any;
    private colors: string;
    private titleOptions: any;
    private totalValue: any;
    private radius: any;
    private startAngle: any;
    private sliceAngle: any;
    private slicesEndAngle: any[] = [];
    private padding = 10;
    private legend = true;
    private eleValues: any[] = [];
    public data: any[] = [];
    private selectedPie: any;
    private onPieSliceClick?: (element: any) => (void) = undefined;
    private optionValuesArray: any;
  
    constructor(options: any) {
      this.options = options;
      this.canvas = options.canvas;
      this.ctx = this.canvas.getContext('2d');
      this.colors = options.colors;
      this.titleOptions = options.titleOptions;
      this.legend = options.legend;
      this.optionValuesArray = Object.values(this.options.data)
  
      this.totalValue = [...Object.values(this.options.data)].reduce(
        (a: any, b: any) => a + b,
        0
      );
  
      this.canvas.setAttribute('width', this.canvas.parentNode.clientWidth);
      this.canvas.setAttribute('height', this.canvas.parentNode.clientWidth);
      if (this.options.type == 'gauge') {
        this.canvas.setAttribute('height', (this.canvas.parentNode.clientWidth - this.padding) / 2);
      }
  
      // const dpr = window.devicePixelRatio || 1;
      // const rect = this.canvas.getBoundingClientRect();
      // this.canvas.width = rect.width * dpr;
      // this.canvas.height = rect.height * dpr;
      // // console.log(rect, rect.width, rect.height, dpr)
      // this.ctx.scale(dpr, dpr);
  
      this.radius = this.canvas.width / 2 - this.padding;
      this.data = Object.entries(this.options.data).map((e) => ({ [e[0]]: e[1] }));
      this.onPieSliceClick = options.onPieSliceClick;
    }
  
    drawSlices() {
      let colorIndex = 0;
      const strokeColor = '#fff';
  
      if (this.options.type == 'gauge') {
        this.startAngle = Math.PI;
      } else {
        this.startAngle = -Math.PI / 2;
      }
  
  
      for (const [key, value] of Object.entries(this.options.data)) {
        const val: any = value;
        const name: any = key;
        // if (value !== 0) {
  
          if (this.options.type == 'gauge') {
            this.totalValue = Math.max(...this.optionValuesArray);
            this.sliceAngle = (Math.PI * val) / this.totalValue;
            console.log('total value', this.totalValue, this.sliceAngle)
          } else {
            this.sliceAngle = (2 * Math.PI * val) / this.totalValue;
          }
          if (this.options.type == 'gauge') {
            drawPieSlice(
              this.ctx,
              this.canvas.width / 2,
              this.canvas.height - this.padding / 2,
              this.radius,
              this.startAngle,
              this.startAngle + this.sliceAngle,
              this.colors[colorIndex % this.colors.length],
              strokeColor,
            );
          } else {
            drawPieSlice(
              this.ctx,
              this.canvas.width / 2,
              this.canvas.height / 2,
              this.radius,
              this.startAngle,
              this.startAngle + this.sliceAngle,
              this.colors[colorIndex % this.colors.length],
              strokeColor,
            );
          }
  
          this.slicesEndAngle.push(this.startAngle + this.sliceAngle);
  
          this.eleValues.push({ 'x': this.canvas.width / 2, 'y': this.canvas.height / 2, 'start': this.startAngle, 'end': this.startAngle + this.sliceAngle, 'data': val, name: name, 'radius': this.radius, 'color': this.colors[colorIndex % this.colors.length] })
  
          this.startAngle += this.sliceAngle;
          colorIndex++;
        // }
  
        if (this.options.type == 'doughnut') {
          drawPieSlice(
            this.ctx,
            this.canvas.width / 2,
            this.canvas.height / 2,
            0.5 * this.radius,
            0,
            2 * Math.PI,
            '#FFF',
            strokeColor,
          );
  
          drawArc(
            this.ctx,
            this.canvas.width / 2,
            this.canvas.height / 2,
            0.5 * this.radius,
            0,
            2 * Math.PI,
            '#fff'
          );
        }
        if (this.options.type == 'gauge') {
          drawPieSlice(
            this.ctx,
            this.canvas.width / 2,
            this.canvas.height - this.padding / 2,
            0.5 * this.radius,
            0,
            2 * Math.PI,
            '#FFF',
            strokeColor,
          );
  
          drawArc(
            this.ctx,
            this.canvas.width / 2,
            this.canvas.height - this.padding / 2,
            0.5 * this.radius,
            0,
            2 * Math.PI,
            strokeColor
          );
        }
      }
    }
  
    addNeedle() {
      const data: any[] = [];
      if (this.options.type == 'gauge') {
        drawNeedle(
          this.ctx,
          this.canvas.width / 2 - (this.padding / 2 - Math.PI),
          this.canvas.height - this.padding,
          this.radius,
          this.slicesEndAngle[0]
        );
  
        for (const val in this.options.data) {
          data.push(this.options.data[val]);
        }
        this.ctx.beginPath();
        this.ctx.font = "13px Arial";
        // this.ctx.arc(this.canvas.width / 2 - (this.padding / 2 - Math.PI), this.canvas.height - this.padding, 25, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = "#fff";
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.fillStyle = "#000";
        this.ctx.textAlign = "center";
        // this.ctx.fillText(`${data.toString().replace(',', '/')}`, this.canvas.width / 2 - (this.padding / 2 - Math.PI), this.canvas.height - this.padding - 10);
        this.ctx.fill();
      }
    }
  
    drawLabels() {
      if (this.options.lables != false) {
        if (this.options.type == 'gauge') {
          this.startAngle = Math.PI;
        } else {
          this.startAngle = -Math.PI / 2;
        }
        for (const categ in this.options.data) {
          if (this.options.data[categ] > 0) {
            const val = this.options.data[categ];
  
            if (this.options.type == 'gauge') {
              this.sliceAngle = (Math.PI * val) / this.totalValue;
            } else {
              this.sliceAngle = (2 * Math.PI * val) / this.totalValue;
            }
  
            let labelX = this.canvas.width / 2 + (this.radius / 2) * Math.cos(this.startAngle + this.sliceAngle / 2);
            let labelY = this.canvas.height / 2 + (this.radius / 2) * Math.sin(this.startAngle + this.sliceAngle / 2);
  
            if (this.options.type == 'doughnut') {
              const offset = (this.radius * 0.5) / 2;
              labelX = this.canvas.width / 2 + (offset + this.radius / 2) * Math.cos(this.startAngle + this.sliceAngle / 2);
              labelY = this.canvas.height / 2 + (offset + this.radius / 2) * Math.sin(this.startAngle + this.sliceAngle / 2);
            }
  
            if (this.options.type == 'gauge') {
              const labelX = (this.canvas.width / 2) + (this.radius - this.padding * Math.PI) * Math.cos(this.startAngle + this.sliceAngle / 2);
              const labelY = Number(this.canvas.height - (this.padding * Math.PI)) + (this.radius / 2) * Math.sin(this.startAngle + this.sliceAngle / 2);
              // console.log(labelX, labelY)
            }
  
            // const labelText = Math.round((100 * val) / this.totalValue); To show percentage
            // console.log(labelText)
            const labelText = val;
            this.ctx.fillStyle = this.options.titleOptions.fill ? this.options.titleOptions.fill : '#000';
            this.ctx.font = this.options.titleOptions.font ? this.options.titleOptions.font : '16px Arial';
            this.ctx.fillText(labelText, labelX, labelY);
            this.startAngle += this.sliceAngle;
          }
        }
      }
    }
    removeLegend() {
      const legend = this.canvas.parentNode.children;
      for (let i = 0; i < legend.length; i++) {
        if (legend[i].className === "legendUl") {
          const ele = legend[i];
          ele.remove();
        }
      }
    }
  
    drawLegend() {
      const legend = this.canvas.parentNode;
      this.removeLegend()
      const css = `.legendUl{
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0 0 0;
        gap: 0.5rem;
      }
      .legendUl li{
        list-style: none;
        padding: 5px 5px 5px 20px;
        margin: 0.3rem 0;
        line-height: 1;
        font-family: Arial;
        font-size: 15px;
        position: relative;
      }
      .legendUl li span{
        display: inline-block;
        width: 14px;
        height: 14px;
        borer-raidus: 6px;
        margin: 0 5px 0 0;
        vertical-align:middle;
        position: absolute;
        left: 0;
        top: 6px;
      }
      `;
  
      const style = document.createElement('style');
      style.appendChild(document.createTextNode(css));
  
      if (this.legend || this.legend == undefined) {
        let pIndex = 0;
        const ul = document.createElement('ul');
        ul.classList.add('legendUl')
        legend?.prepend(style, ul);
  
  
        for (const ctg of Object.keys(this.options.data)) {
          const li = document.createElement('li');
          const span = document.createElement('span')
          // li.style.borderLeft =
          //   '20px solid ' + this.colors[pIndex % this.colors.length];
          span.style.backgroundColor = this.colors[pIndex % this.colors.length];
          li.textContent = ctg;
          li.prepend(span)
          ul.append(li);
          pIndex++;
        }
      }
    }
  
    eleClick() {
      this.canvas.addEventListener('click', (event: any) => {
        const arc = this.canvas.getBoundingClientRect();
        const x = Math.round(event.clientX - arc.left);
        const y = Math.round(event.clientY - arc.top);
        this.ctx.reset()
        this.eleValues.forEach((element) => {
          drawPieSlice(this.ctx, element.x, element.y, element.radius, element.start, element.end, element.color, '#fff');
          this.drawLabels()
          if (this.ctx.isPointInPath(x, y)) {
            this.onPieSliceClick?.(element)
            drawPieSlice(this.ctx, element.x, element.y, element.radius, element.start, element.end, element.color, '#fff', true);
            this.drawLabels()
            // selectedEle = element
          }
        });
        // this.rotatePie(selectedEle)
      })
    }
  
    showTooltip() {
      if(this.options.type != "gauge"){
        this.canvas.addEventListener('mousemove', (event: any) => {
          const arc = this.canvas.getBoundingClientRect();
          const x = Math.round(event.clientX - arc.left);
          const y = Math.round(event.clientY - arc.top);
          let selectedSlice:any;
          let labelX:any;
          let labelY:any;
          this.ctx.reset()
          this.eleValues.forEach((element: any) => {
            drawPieSlice(this.ctx, element.x, element.y, element.radius, element.start, element.end, element.color, '#fff');
            this.drawLabels()
            if (this.ctx.isPointInPath(x, y)) {
              selectedSlice = element
              labelX = this.canvas.width / 2 + (this.radius / 2) * Math.cos(element.start + this.sliceAngle / 2);
              labelY = this.canvas.height / 2 + (this.radius / 2) * Math.sin(element.end + this.sliceAngle / 2);
            }
          });
          if(selectedSlice){
            drawTooltip(this.ctx, labelX, labelY, `${selectedSlice.data} | ${selectedSlice.name}`)
          }
        })
      }
    }
  
    rotatePie(selectedEle: any) {
      // const startDiff = selectedEle.radius * (Math.cos(1) - Math.cos(selectedEle.start))
      // const EndDiff = selectedEle.radius * (Math.cos(1) - Math.cos(selectedEle.end))
      // const NSA = (selectedEle.start + (startDiff) / 360);
      // const NEA = (selectedEle.start + (EndDiff) / 360);
  
      const rotateAngle = 36 * Math.PI / (selectedEle.start + selectedEle.end);
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
  
      this.ctx.translate(centerX, centerY);
      this.ctx.rotate(rotateAngle);
      this.ctx.translate(-centerX, -centerY);
      // window.requestAnimationFrame(this.rotatePie);
    }
  
    draw() {
      this.drawSlices();
      this.drawLabels();
      this.drawLegend();
      this.addNeedle();
      if (this.options.clickable) {
        this.eleClick();
      }
      this.showTooltip();
    }
  }
  