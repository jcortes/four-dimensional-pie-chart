const startAngle = (90 * Math.PI) / 180;
const sectionAngle = (60 * Math.PI) / 180;
const sections = [{
  id: "NM",
  order: 1,
  level: 90,
  radians: sectionAngle,
  color: "#E1514B",
  label: "5 SEC (NM)"
}, {
  id: "AC",
  order: 2,
  level: 70,
  radians: sectionAngle,
  color: "#E1514B",
  label: "1 MIN (AC)"
}, {
  id: "MAP",
  order: 3,
  level: 40,
  radians: sectionAngle,
  color: "#E1514B",
  label: "5 MIN (MAP)"
}, {
  id: "FTP",
  order: 4,
  level: 65,
  radians: Math.PI,
  color: "#E1514B",
  label: "5 MIN (FTP)"
}];

const width = 500;
const height = 500;
const radius = Math.min(width, height) / 2;

const svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

const pie = d3.layout.pie()
  .sort((a, b) => a.order - b.order)
  .value(d => d.radians);

const pieData = pie(sections);
console.log("[pieData]", pieData);

const arc = d3.svg.arc()
  .outerRadius(d => radius * (d.data.level / 100.0))
  .startAngle(d => d.startAngle - startAngle)
  .endAngle(d => d.endAngle - startAngle);

const arcs = svg.selectAll(".solidArc")
  .data(pieData)
  .enter()
  .append("path")
  .attr("fill", d => d.data.color)
  .attr("class", "solidArc")
  .attr("stroke", "gray")
  .attr("d", arc);

[0, 1, 2, 3].forEach(n => {
  const newOuterRadius = radius - (n * (radius / 4));
  const outlineArc = d3.svg.arc()
    .outerRadius(newOuterRadius)
    .startAngle(d => d.startAngle - startAngle)
    .endAngle(d => d.endAngle - startAngle);

  svg.selectAll(".outlineArc" + n)
    .data(pieData)
    .enter()
    .append("path")
    .attr("fill", "none")
    .attr("stroke", d => d.value !== Math.PI ? "gray" : undefined)
    .attr("class", "outlineArc")
    .attr("d", outlineArc);
});