// https://observablehq.com/@floledermann/drawing-maps-from-geodata-in-d3@729
import define1 from "./4e81386f5bb728cb@193.js";

function _1(md){return(
md`# Drawing maps from geodata with D3 & Observable
`
)}

function _2(md){return(
md`*A basic tutorial for complete newcomers that gets you started with drawing geodata as SVG, using D3. There is also a [condensed version](https://beta.observablehq.com/@floledermann/drawing-maps-from-geodata-in-d3-condensed-version) if you want only the code.*`
)}

function _3(md){return(
md`
## Step 1: Defining the map geometry

To draw a map, you first need to make up your mind about the size you want it to have. You may also want to define a margin, to avoid drawing right up to the edges of the map.

Usually the map's geometry is defined as a set of parameters at the top of our program:`
)}

function _width(html){return(
html`<input type="number" value="400" min="120" max="800" step="20" style="width: 5em">`
)}

function _height(html){return(
html`<input type="number" value="400" min="100" max="600" step="20" style="width: 5em">`
)}

function _margin(html,width,height){return(
html`<input type="number" value="15" min="0" max="${Math.min(width, height)/4}" step="5" style="width: 5em">`
)}

function _7(md){return(
md`We can use these parameters to sketch out our map surface. You can also change these parameters and see how the map geometry updates in real time! (Try this by entering different numbers in the boxes above, or by using the up/down arrows next to the numbers)

So this is a sketch of what our map will look like:`
)}

function _8(d3,DOM,width,height,margin)
{
  
  // create SVG element
  let svg = d3.select(DOM.svg(width, height))
  
  if (margin) {
    // add dashed outline
    svg.append('rect')
      .attr('fill', 'none')
      .attr('stroke', '#999999')
      .attr('stroke-width', '1')
      .attr('stroke-dasharray', '8 5')
      .attr('x', margin)
      .attr('y', margin)
      .attr('width', width - 2*margin)
      .attr('height', height - 2*margin)
  
    // add text
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 3)
      .attr('font-size', 12)
      .attr('text-anchor','middle')
      .attr('fill', '#999999')
      .text("(The map's margin)")
  } 
    
  // add text
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height / 2)
    .attr('dy', 7)
    .attr('text-anchor','middle')
    .attr('fill', '#999999')
    .text(margin ? "A Map" : "A map without margin")

  // pass to Observable to represent this block
  return svg.node()
  
}


function _9(html){return(
html`<hr>`
)}

function _10(md){return(
md`
## Step 2: Loading geodata

Next, we need to load the geodata we want to show on the map. The format natively supported by D3 is [GeoJSON](http://geojson.org/), so I'll use a GeoJSON file containing all the streets of Vienna (my hometown in Austria) I extracted from [OpenStreetMap](https://www.openstreetmap.org/) using the [Overpass API](https://overpass-turbo.eu/). You can load the file using the regular \`d3.json()\` function.

The GeoJSON file contains a single \`FeatureCollection\` object. Its \`features\` property contains the Array of individual street geometries - explore the object hierarchy to get a feel for the structure of the data and the information it contains: `
)}

function _streets(d3){return(
d3.json('tl_2020_42_tract_simple.json')
)}

function _12(md){return(
md`
(I am hosting this file on GitHub - see [this tutorial](https://beta.observablehq.com/@mbostock/introduction-to-data) on how to host and load data in Observable)

If you want to draw a single feature (=street) from the collection, you need to locate it in the \`features\` Array. I am using [\`Array.filter()\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) here to extract a single street that has a specific \`name\` property:`
)}

function _street(streets){return(
streets.features.filter(street => street.properties.name == "Billrothstraße")[0]
)}

function _14(html){return(
html`<hr>`
)}

function _15(md){return(
md`
## Step 3: Setting up a map projection

To draw objects with geographic coordinates to a map, we need to apply a [map projection](https://en.wikipedia.org/wiki/Map_projection). 

You can choose one of the available [D3 projections](https://github.com/d3/d3-geo#projections) and set it up in a way that your geometry will neatly cover the available map space. Use the [\`fitExtent()\`](https://github.com/d3/d3-geo#projection_fitExtent)  method to do so:`
)}

function _projection(d3,margin,width,height,street){return(
d3.geoMercator().fitExtent([[margin, margin], [width - margin, height - margin]], street)
)}

function _17(md){return(
md`The projection transforms points in geographic space into coordinates on our map. Note that D3 as well as GeoJSON expect geographic coordinates as an Array containing the sequence \`[<longitude>, <latitude>]\` !

To test our projection, let's define a single geographic point. (I took one of the points of the selected street's geometry to make sure it is a point visible on the map)`
)}

function _lonLatPoint(){return(
[16.34636, 48.24332]
)}

function _19(md){return(
md`The \`projection\` is simply a function, taking a longitude/latitude point as a parameter and returning an x/y point on the map:`
)}

function _projectedPoint(projection,lonLatPoint){return(
projection(lonLatPoint)
)}

function _21(md){return(
md`We can use these x/y map coordinates to plot the point to the map:`
)}

function _pointMap(d3,DOM,width,height,projectedPoint,lonLatPoint)
{
  
  // create SVG element
  let svg = d3.select(DOM.svg(width, height))
  
  // construct the element
  svg.append('circle')
    .attr('cx', projectedPoint[0])
    .attr('cy', projectedPoint[1])
    .attr('r', 2.5)
    .attr('fill', '#000000')
    .attr('stroke', 'none')
    
  svg.append('text')
    .attr('x',  projectedPoint[0] + 6)
    .attr('y',  projectedPoint[1])
    .attr('dy', 2)
    .attr('font-size', '9')
    .text(lonLatPoint)
  
  // pass to Observable to represent this block
  return svg.node()
  
}


function _23(html){return(
html`<hr>`
)}

function _24(md){return(
md`
## Step 4: Using a path generator to project geometry onto the map

Instead of individual points, we want to project the objects in the GeoJSON data onto the map.

To do so, we can use the projection to set up a D3 *[path generator](https://github.com/d3/d3-geo#paths)*:`
)}

function _pathGenerator(d3,projection){return(
d3.geoPath().projection(projection)
)}

function _26(md){return(
md`The path generator is a function that takes a GeoJSON object as argument and transforms its geometry into an [SVG path expression](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) representing the projected geometry:`
)}

function _mapPath(pathGenerator,street){return(
pathGenerator(street)
)}

function _28(md){return(
md`All you need to do is assign the output of the path generator to the \`d\` attribute of an SVG \`path\` element.

The code below constructs an SVG element for our map (using the \`width\` and \`height\` parameters set up [above](#width), which you can still modify to adjust the map's size), adds a path element to the SVG, “binds” a single GeoJSON object to the element using D3's [\`datum()\`](https://github.com/d3/d3-selection#selection_datum) function, and uses the path generator to construct its \`d\` attribute.

For assigning the \`d\` attribute, D3 will call the pathGenerator with the bound datum -- in this case the street object.`
)}

function _streetMap(d3,DOM,width,height,street,pathGenerator)
{
  
  // create SVG element
  let svg = d3.select(DOM.svg(width, height))
  
  // construct the element
  svg.append('path')
    .datum(street)
    .attr('d', pathGenerator)
    .attr('fill', 'none')
    .attr('stroke', '#999999')
    .attr('stroke-width', '2')
  
  // pass to Observable to draw this block
  return svg.node()
  
}


function _30(md){return(
md`Usually we don't want to draw only a single object, but a collection of objects (in this case the streets of Vienna). To draw all the streets to the map, use [D3's data join](https://bost.ocks.org/mike/join/) mechanism -- the core of the “magic” of D3. The array of streets is joined with the \`path\`s on the map using the [\`data()\`](https://github.com/d3/d3-selection#selection_data) function, and the missing elements are created and intialized using the path generator.

We need to use a different projection (and path generator) for this map, as we want to fit the whole city, and not only a single street.`
)}

function _viennaProjection(d3,margin,width,height,streets){return(
d3.geoMercator().fitExtent([[margin, margin], [width - margin, height - margin]], streets)
)}

function _viennaPathGenerator(d3,viennaProjection){return(
d3.geoPath().projection(viennaProjection)
)}

function _streetsMap(d3,DOM,width,height,streets,viennaPathGenerator)
{
  
  let svg = d3.select(DOM.svg(width, height))
  
  // construct the path elements using the D3 data join
  svg.selectAll('path')
    // data() expects an Array, so make sure to pass the features entry of our FeatureCollection
    .data(streets.features)
    // select all data items that are not represented on the map yet, and add them
  .enter()
    .append('path')
    // assign attributes to those new elements
    .attr('d', viennaPathGenerator)
    .attr('fill', 'none')
    .attr('stroke', '#999999')
    .attr('stroke-width', '0.5')
  
  // pass to Observable to draw this block
  return svg.node()
  
}


function _34(md){return(
md`(Note that above code doesn't make use of the complete [D3 General Update Pattern](https://bl.ocks.org/mbostock/3808218), as we only create a static map and do not deal with data updates or modifications.)`
)}

function _35(md){return(
md`----`
)}

function _36(md){return(
md`## Step 5: Symbolization based on feature properties`
)}

function _37(md){return(
md`Drawing all the streets in an identical style is fine, but usually we want to draw things on a map differently based on some attribute(s) of the data.

Looking at the data for a single street, we can see that it contains a \`geometry\` entry (defining the coordinates of its vertices in geographic space) and an (optional) \`properties\` entry, defining some properties of the street:`
)}

function _38(helpers,streets){return(
helpers.JSONView(streets.features[4])
)}

function _39(md){return(
md`In our dataset, the \`w\` property contains the *weight* (or relevance) of the street, ranging from 0 (for alleys and paths) to 5 (for major roads).

To construct a visualization based on data properties, it is good practice to construct a [D3 scale](https://github.com/d3/d3-scale#api-reference) and define the *domain* (the valid data values) and the *range* (the desired output values) of the property. D3 comes with [many different types of scales](https://github.com/d3/d3-scale#api-reference) that use different methods of mapping data values to outputs – in our case we want a simple linear interpolation, and we can set that up like so:`
)}

function _widthScale(d3){return(
d3.scaleLinear()
  .domain([0,5])   // input values will be between 0 and 5
  .range([0.3,4])
)}

function _41(md){return(
md`Note that the scale is a simple JavaScript function, taking an input value (within its domain) as parameter and returning the appropriate value from the range:`
)}

function _42(widthScale){return(
widthScale(2)
)}

function _43(md){return(
md`We can now use D3's mechanism for dynamically assigning attributes to elements – by specifying a callback function as the attribute value (instead of a constant value), the callback will be called *for each element of the data* to calculate the value.`
)}

function _streetsMapDynamic(d3,DOM,width,height,streets,viennaPathGenerator,widthScale)
{
   
  let svg = d3.select(DOM.svg(width, height))
  
  svg.selectAll('path')
    .data(streets.features)
  .enter()
    .append('path')
    .attr('d', viennaPathGenerator)
    .attr('fill', 'none')
    .attr('stroke', '#999999')
    // use a callback function to calculate the stroke width based on the 'w' property
    .attr('stroke-width', function(d) {
      // access the 'w' property and use our scale to calculate the correct width
      return widthScale(d.properties.w);
    })
  
  return svg.node()
  
}


function _45(md){return(
md`You can try to modify above code – for example, try to use different *colors* to indicate street weight, or go crazy and map the length of the street name to the stroke width... The [D3 scale API reference](https://github.com/d3/d3-scale#api-reference) will help you to figure out how to do that.`
)}

function _46(md){return(
md`----`
)}

function _47(md){return(
md`See my [other tutorial](https://beta.observablehq.com/d/b6c566a3b3a914d8) for how to animate the geometry drawn to the map.

There's also a [condensed version of this tutorial](https://beta.observablehq.com/@floledermann/drawing-maps-from-geodata-in-d3-condensed-version) if you want to fork it without the explanations for your own projects.`
)}

function _48(helpers){return(
helpers.signature
)}

function _49(md,tweet){return(
md`Share this tutorial: ${tweet('999907407663808514')}`
)}

function _50(html){return(
html`<hr>`
)}

function _51(md){return(
md`#### Libraries:`
)}

function _d3(require){return(
require("https://d3js.org/d3.v5.min.js")
)}

function _55(md){return(
md`#### Custom CSS:`
)}

function _56(helpers){return(
helpers.defaultCSS
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof width")).define("viewof width", ["html"], _width);
  main.variable(observer("width")).define("width", ["Generators", "viewof width"], (G, _) => G.input(_));
  main.variable(observer("viewof height")).define("viewof height", ["html"], _height);
  main.variable(observer("height")).define("height", ["Generators", "viewof height"], (G, _) => G.input(_));
  main.variable(observer("viewof margin")).define("viewof margin", ["html","width","height"], _margin);
  main.variable(observer("margin")).define("margin", ["Generators", "viewof margin"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["d3","DOM","width","height","margin"], _8);
  main.variable(observer()).define(["html"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("streets")).define("streets", ["d3"], _streets);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("street")).define("street", ["streets"], _street);
  main.variable(observer()).define(["html"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("projection")).define("projection", ["d3","margin","width","height","street"], _projection);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("lonLatPoint")).define("lonLatPoint", _lonLatPoint);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("projectedPoint")).define("projectedPoint", ["projection","lonLatPoint"], _projectedPoint);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("pointMap")).define("pointMap", ["d3","DOM","width","height","projectedPoint","lonLatPoint"], _pointMap);
  main.variable(observer()).define(["html"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("pathGenerator")).define("pathGenerator", ["d3","projection"], _pathGenerator);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("mapPath")).define("mapPath", ["pathGenerator","street"], _mapPath);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("streetMap")).define("streetMap", ["d3","DOM","width","height","street","pathGenerator"], _streetMap);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("viennaProjection")).define("viennaProjection", ["d3","margin","width","height","streets"], _viennaProjection);
  main.variable(observer("viennaPathGenerator")).define("viennaPathGenerator", ["d3","viennaProjection"], _viennaPathGenerator);
  main.variable(observer("streetsMap")).define("streetsMap", ["d3","DOM","width","height","streets","viennaPathGenerator"], _streetsMap);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer()).define(["helpers","streets"], _38);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("widthScale")).define("widthScale", ["d3"], _widthScale);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer()).define(["widthScale"], _42);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("streetsMapDynamic")).define("streetsMapDynamic", ["d3","DOM","width","height","streets","viennaPathGenerator","widthScale"], _streetsMapDynamic);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["helpers"], _48);
  main.variable(observer()).define(["md","tweet"], _49);
  main.variable(observer()).define(["html"], _50);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("helpers", child1);
  const child2 = runtime.module(define1);
  main.import("tweet", child2);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer()).define(["helpers"], _56);
  return main;
}
