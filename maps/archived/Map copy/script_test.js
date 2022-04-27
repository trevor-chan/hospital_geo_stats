let tracts_file = './tracts_topo.json'
let data_file = './census_data.json'

let tracts_data
let chart_data

let canvas = d3.select('#canvas')
let tooltip = d3.select('#tooltip')

var index = '1'
var color = 'g'


function getOption() {
    let e = document.getElementById("datatype")
    output = e.options[e.selectedIndex].text
    console.log(output)
    if(output==='Total Insurance'){
        index = '1'
        color = 'g'
        console.log(index)
        console.log(color)
        updateMap()
        updateMap()
    }else if(output==='Public Insurance'){
        index = '2'
        color = 'g'
        console.log(index)
        console.log(color)
        updateMap()
        updateMap()
    }else if(output==='Private Insurance'){
        index = '3'
        color = 'g'
        console.log(index)
        console.log(color)
        updateMap()
        updateMap()
    }else if(output==='Total Population'){
        index = '4'
        color = 'bk'
        console.log(index)
        console.log(color)
        updateMap()
        updateMap()
    }else if(output==='White (Race)'){
        index = '5'
        color = 'b'
        console.log(index)
        console.log(color)
        updateMap()
        updateMap()
    }else if(output==='Black or African American (Race)'){
        index = '6'
        color = 'b'
        console.log(index)
        console.log(color)
        updateMap()
        updateMap()
    }else if(output==='American Indian and Alaska Native (Race)'){
        index = '7'
        color = 'b3'
        console.log(index)
        console.log(color)
        updateMap()
        updateMap()
    }else if(output==='Asian (Race)'){
        index = '8'
        color = 'b2'
        console.log(index)
        console.log(color)
        updateMap()
        updateMap()
    }else if(output==='Native Hawaiian and Other Pacific Islander (Race)'){
        index = '9'
        color = 'b3'
        console.log(index)
        console.log(color)
        updateMap()
        updateMap()
    }else if(output==='Median income'){
        index = '10'
        color = 'y'
        console.log(index)
        console.log(color)
        updateMap()
        updateMap()
    }else if(output==="Education: Bachelor's degree or higher"){
        index = '11'
        color = 'pu'
        console.log(index)
        console.log(color)
        updateMap()
        updateMap()
    }
}

function colmap(n) {
        if (isNaN(n)){
            return "rgb(170,170,170)"
        }
        if(color==='g'){
            n = parseInt((n-60) * 255 / 40 / 1.5);
            console.log('hi')
            return 'rgb('+n+','+(n*1.5)+','+n+')'; 
        }
        if(color==='b'){
            n = parseInt((n) * 255 / 100 / 1.5);
            return 'rgb('+n+','+n+','+(n*1.5)+')'; 
        }
        if(color==='b2'){
            n = parseInt((n) * 255 / 100 / 1.5 * 2);
            return 'rgb('+n+','+n+','+(n*1.5)+')'; 
        }
        if(color==='b3'){
            n = parseInt((n) * 255 / 100 / 1.5 * 50);
            return 'rgb('+n+','+n+','+(n*1.5)+')'; 
        }
        if(color==='bk'){
            n = parseInt((n) * 255 / 100 / 1.5 / 100);
            console.log('hi')
            return 'rgb('+n+','+n+','+n+')'; 
        }
        if(color==='r'){
            n = n*100
            console.log(n)
            return 'rgb('+(n*1.5)+','+n+','+n+')';
        }
        if(color==='y'){
            n = parseInt((n) * 255 / 100 / 1.5 / 1000);
            return 'rgb('+(n*1.5)+','+(n*1.5)+','+n+')';
        }
        if(color==='pu'){
            n = parseInt((n) * 255 / (100) / 1.5 * 1.3);
            return 'rgb('+(n*1.5)+','+n+','+(n*1.5)+')';
        }
    }

function tooltip_text(tractnum, note) {
        if(color==='g'){
            return 'Tract ' + tractnum + ' - ' + 'Percent Insured: ' + note + '%'
        }
        if(color==='b'){
            return 'Tract ' + tractnum + ' - ' + 'Racial makeup: ' + note + '%'
        }
        if(color==='b2'){
            return 'Tract ' + tractnum + ' - ' + 'Racial makeup: ' + note + '%'
        }
        if(color==='b3'){
            return 'Tract ' + tractnum + ' - ' + 'Racial makeup: ' + note + '%'
        }
        if(color==='bk'){
            return 'Tract ' + tractnum + ' - ' + 'Total Population: ' + note
        }
//         if(color==='r'){
//             n = n*100
//             console.log(n)
//             return 'rgb('+(n*1.5)+','+n+','+n+')';
//         }
        if(color==='y'){
            return 'Tract ' + tractnum + ' - ' + 'Median Household Income: ' + note
        }
        if(color==='pu'){
            return 'Tract ' + tractnum + ' - ' + "Percent attained Bachelor's degree or higher: " + note + '%'
        }
    }

let drawMap = () => {
//     console.log('Drawing Map')
    
    const projection = d3.geoAlbers()
        .fitSize([960, 600], mesh);
    
    canvas.selectAll('path')
            .data(tracts_data)
            .enter()
                .append('path')
                .attr('d', d3.geoPath(projection))
                .attr('class', 'tract')
                .attr('fill', (tracts_data_item) => {
                    let id = tracts_data_item.properties['GEOID']
                    let tract = chart_data.find((item) => {
                        return item['0'] === id
                    })
                    let percentage = parseFloat(tract[index])
                    return colmap(percentage)
                })
    //             .attr('data-fips', (tracts_data_item) => {
    //                 return tracts_data_item.properties['GEOID']
    //             })
                .attr('chart-item-data', (tracts_data_item) => {
                    let id = tracts_data_item.properties['GEOID']
                    let tract = chart_data.find((item) => {
                        return item['0'] === id
                    })
                    let percentage = tract[index]
                    return percentage
                })
    //             .attr('data-fips', (tracts_data_item) => {
    //                 return tracts_data_item.properties['GEOID']
    //             })
                .attr('chart-item-data', (tracts_data_item) => {
                    let id = tracts_data_item.properties['GEOID']
                    let tract = chart_data.find((item) => {
                        return item['0'] === id
                    })
                    let percentage = tract[index]
                    return percentage
                })
            .on('mouseover', (tracts_data_item)=> {
                tooltip.transition()
                    .style('visibility', 'visible')
        
                let id = tracts_data_item.properties['GEOID']
                let tract = chart_data.find((item) => {
                    return item['0'] === id
                })
                
                

                tooltip.text(tooltip_text(tract['0'], tract[index]))

                tooltip.attr('chart-item-data', tract[index] )
            })
            .on('mouseout', (tracts_data_item) => {
                tooltip.transition()
                    .style('visibility', 'hidden')
            })
}



let updateMap = () => {
     console.log('Updating Map')
    
    const projection = d3.geoAlbers()
        .fitSize([960, 600], mesh);
    
    canvas.selectAll('path')
            .remove()
            .data(tracts_data)
            .enter()
                .append('path')
                .attr('d', d3.geoPath(projection))
                .attr('class', 'tract')
                .attr('fill', (tracts_data_item) => {
                    let id = tracts_data_item.properties['GEOID']
                    let tract = chart_data.find((item) => {
                        return item['0'] === id
                    })
                    let percentage = parseFloat(tract[index])
                    return colmap(percentage)
                })
    //             .attr('data-fips', (tracts_data_item) => {
    //                 return tracts_data_item.properties['GEOID']
    //             })
                .attr('chart-item-data', (tracts_data_item) => {
                    let id = tracts_data_item.properties['GEOID']
                    let tract = chart_data.find((item) => {
                        return item['0'] === id
                    })
                    let percentage = tract[index]
                    return percentage
                })
    //             .attr('data-fips', (tracts_data_item) => {
    //                 return tracts_data_item.properties['GEOID']
    //             })
                .attr('chart-item-data', (tracts_data_item) => {
                    let id = tracts_data_item.properties['GEOID']
                    let tract = chart_data.find((item) => {
                        return item['0'] === id
                    })
                    let percentage = tract[index]
                    return percentage
                })
            .on('mouseover', (tracts_data_item)=> {
                tooltip.transition()
                    .style('visibility', 'visible')
        
                let id = tracts_data_item.properties['GEOID']
                let tract = chart_data.find((item) => {
                    return item['0'] === id
                })

                tooltip.text(tooltip_text(tract['0'], tract[index]))

                tooltip.attr('chart-item-data', tract[index] )
            })
            .on('mouseout', (tracts_data_item) => {
                tooltip.transition()
                    .style('visibility', 'hidden')
            })
}



d3.json(tracts_file).then(
    (data, error) => {
        if(error){
            console.log(log)
        }else{
            tracts_data = topojson.feature(data, data.objects.tl_2020_42_tract).features
            mesh = topojson.mesh(data, data.objects.tl_2020_42_tract)
            console.log(tracts_data)

            d3.json(data_file).then(
                (data, error) => {
                    if(error){
                        console.log(error)
                    }else{
                        chart_data = data.data
                        console.log(chart_data)
                        drawMap()
                    }
                }
            )
        }
    }
)