//<script type="module">

function spark(lineData,container,swidth,sheight){
// import {lineData,container,swidth,sheight} from './index.html';
  var parseTime = d3.timeParse("%Y");
  var x = d3.scaleTime()
    .range([0, swidth]) // - Padding.left - Padding.right)])
    .domain(d3.extent(lineData, function(d) {
        if(d.obs != 'null'){
          return parseTime(d.date);
        }
    }));
console.log(x.domain());

  var y = d3.scaleLinear()
      .domain([d3.min(lineData, function(d) {
                      return Math.floor(d.obs);
                    }),
                d3.max(lineData, function(d) {
                  return Math.ceil(d.obs);
                })
              ])
      .range([sheight, 0]);
console.log(y.domain());


      // my interpolator
      var spline = d3.line()
        .defined(function(d) {
          return d.obs != 'null';
        })
        .x(function(d) {
          return x(parseTime(d.date));
        })
        .y(function(d) {
          return y(+d.obs);
        });

        container.append('svg')
                  .attr('width', swidth)
                  .attr('height', sheight)
                  .append('g')
                  .append('path')
                   .style("fill", "none")
                   .style("stroke-width", "2px")
                   .style("stroke", '#206095')
                   //.style('stroke-linecap', 'butt')
                   .style('opacity', 1)
                   .attr('d',spline(d3.values(lineData)));

 }
//</script>
