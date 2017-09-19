/**
 * This is the parametric equation for a circle
 * @param {*} cx Origin in pixels
 * @param {*} cy Origin in pixels
 * @param {*} radius In pixels
 * @param {*} angle In radians (0 to 2PI)
 */
const circleParam = (cx, cy, radius, angle) => ({
  x: cx + radius * Math.cos(angle),
  y: cy + radius * Math.sin(angle)
});

const diameter = 500;
const radius = diameter / 2;
const startAngle = (90 * Math.PI) / 180;
const sectionAngle = (60 * Math.PI) / 180;
const average = 260;

const sections = [{
  id: "NM",
  order: 1,
  level: 90,
  angle: sectionAngle,
  color: "#E1514B",
  label: "5 SEC (NM)",
  lableAngle: -(Math.PI),
  ySpan: -20
}, {
  id: "AC",
  order: 2,
  level: 70,
  angle: sectionAngle,
  color: "#E1514B",
  label: "1 MIN (AC)",
  lableAngle: -(Math.PI/2),
  ySpan: -20
}, {
  id: "MAP",
  order: 3,
  level: 40,
  angle: sectionAngle,
  color: "#E1514B",
  label: "5 MIN (MAP)",
  lableAngle: 0,
  ySpan: -20
}, {
  id: "FTP",
  order: 4,
  level: 65,
  angle: Math.PI,
  color: "#E1514B",
  label: "5 MIN (FTP)",
  lableAngle: -((3 * Math.PI)/2),
  ySpan: -100
}];

const levels = [
  { label: "Needs Improvement" },
  { label: "Good" },
  { label: "Very Good" },
  { label: "Exceptional" }
];

const svg = d3.select("body")
  .append("svg")
  .attr("width", diameter)
  .attr("height", diameter)
  .append("g")
  .attr("transform", "translate(" + radius + "," + radius + ")");

const pie = d3.layout.pie()
  .sort((a, b) => a.order - b.order)
  .value(d => d.angle);

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

sections.forEach((section, idx) => {
  const newOuterRadius = radius - (idx * (radius / 4));
  const outlineArc = d3.svg.arc()
    .outerRadius(newOuterRadius)
    .startAngle(d => d.startAngle - startAngle)
    .endAngle(d => d.endAngle - startAngle);

  svg.selectAll(".outlineArc" + idx)
    .data(pieData)
    .enter()
    .append("path")
    .attr("fill", "none")
    .attr("stroke", d => d.value !== Math.PI ? "white" : undefined)
    .attr("class", "outlineArc")
    .attr("d", outlineArc);

  const { x, y } = circleParam(0, section.ySpan, radius - (radius/4), section.lableAngle);
  svg.append("text")
    .attr("x", x)
    .attr("y", y)
    .attr("text-anchor", "middle")
    .attr("class", "sectionLabel")
    .text(section.label);
});

levels.forEach((level, idx) => {
  const newRadius = (idx + 1) * (radius / 4);
  const { x, y } = circleParam(10, 0, newRadius, -sectionAngle);
  svg.append("text")
    .attr("x", x)
    .attr("y", y)
    .attr("class", "levelLabel")
    .text(level.label);
});

const { x, y } = circleParam(0, -70, radius - (radius/4), -((3 * Math.PI)/2));
svg.append("text")
  .attr("x", x)
  .attr("y", y)
  .attr("text-anchor", "middle")
  .attr("class", "averageLabel")
  .text(average);
