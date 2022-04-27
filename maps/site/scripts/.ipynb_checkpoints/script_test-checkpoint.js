let tracts_file = './datafiles/tracts_topo.json'
let data_file = './datafiles/census_data.json'
let hospital_file = './datafiles/cms_data.json'

let tracts_data
let chart_data
let hosp_data

let canvas = d3.select('#canvas')
let tooltip = d3.select('#tooltip')

var index = '1'
var hosp = '1'
var color = 'g'


function getOption() {
    //update hospital
    let h = document.getElementById("hospstat")
    output = h.options[h.selectedIndex].text
    console.log(output)
    if(output==='Infection Ratio'){
        hosp = '1'
        console.log(hosp)
    }else if(output==='Emergency Department Waiting Time'){
        hosp = '2'
        console.log(hosp)
    }else if(output==='Outpatient Imaging Score'){
        hosp = '3'
        console.log(hosp)
    }else if(output==='30 Day Mortality'){
        hosp = '4'
        console.log(hosp)
    }else if(output==='Average Medicare Payment'){
        hosp = '5'
        console.log(hosp)
    }else if(output==='Hospital Patient Revenue'){
        hosp = '6'
        console.log(hosp)
    }else if(output==='Total Inpatient Discharges'){
        hosp = '7'
        console.log(hosp)
    }else if(output==='Revenue per Discharge'){
        hosp = '8'
        console.log(hosp)
    }
    
    
    let e = document.getElementById("datatype")
    output = e.options[e.selectedIndex].text
    console.log(output)
    if(output==='Total Insurance'){
        index = '1'
        color = 'g'
        console.log(index)
        console.log(color)
    }else if(output==='Public Insurance'){
        index = '2'
        color = 'g'
        console.log(index)
        console.log(color)
    }else if(output==='Private Insurance'){
        index = '3'
        color = 'g'
        console.log(index)
        console.log(color)
    }else if(output==='Total Population'){
        index = '4'
        color = 'bk'
        console.log(index)
        console.log(color)
    }else if(output==='White (Race)'){
        index = '5'
        color = 'b'
        console.log(index)
        console.log(color)
    }else if(output==='Black or African American (Race)'){
        index = '6'
        color = 'b'
        console.log(index)
        console.log(color)
    }else if(output==='American Indian and Alaska Native (Race)'){
        index = '7'
        color = 'b3'
        console.log(index)
        console.log(color)
    }else if(output==='Asian (Race)'){
        index = '8'
        color = 'b2'
        console.log(index)
        console.log(color)
    }else if(output==='Native Hawaiian and Other Pacific Islander (Race)'){
        index = '9'
        color = 'b3'
        console.log(index)
        console.log(color)
    }else if(output==='Median income'){
        index = '10'
        color = 'y'
        console.log(index)
        console.log(color)
    }else if(output==="Education: Bachelor's degree or higher"){
        index = '11'
        color = 'pu'
        console.log(index)
        console.log(color)
    }
    updateMap()
}


// function getOption2() {
//     let e = document.getElementById("hospstat")
//     output = e.options[e.selectedIndex].text
//     console.log(output)
//     if(output==='Infection Ratio'){
//         hosp = '1'
//         console.log(hosp)
//     }else if(output==='Emergency Department Waiting Time'){
//         hosp = '2'
//         console.log(hosp)
//     }else if(output==='Outpatient Imaging Score'){
//         hosp = '3'
//         console.log(hosp)
//     }else if(output==='30 Day Mortality'){
//         hosp = '4'
//         console.log(hosp)
//     }else if(output==='Average Medicare Payment'){
//         hosp = '5'
//         console.log(hosp)
//     }
// }

function colmap(n) {
        if (isNaN(n)){
            return "rgb(170,170,170)"
        }
        if(color==='g'){
            n = parseInt((n-60) * 255 / 40 / 1.5);
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

function hosp_att(data) {
    var radius = 10.0
    var stroke = 'rgb(256,256,256)'
    var strokewidth = .5
    const fillopacity = 0.5
    const fill = 'rgb(255,50,50)'
    
    if(hosp === '1'){
        if(data['infection_ratio_zscore']===null){
            var returns = [5, stroke, strokewidth, 0.2, 'rgb(50,50,50)']
            return returns
        }
        radius = (parseFloat(data['infection_ratio_zscore'])+3)*3
    }else if (hosp === '2'){
        if(data['emergency_wait_time_zscore']===null){
            var returns = [5, stroke, strokewidth, 0.2, 'rgb(50,50,50)']
            return returns
        }
        radius = (parseFloat(data['emergency_wait_time_zscore'])+3)*3
    }else if (hosp === '3'){
        if(data['imaging_efficiency_zscore']===null){
            var returns = [5, stroke, strokewidth, 0.2, 'rgb(50,50,50)']
            return returns
        }
        radius = (parseFloat(data['imaging_efficiency_zscore'])+3)*3
    }else if (hosp === '4'){
        if(data['mortality_30_zscore']===null){
            var returns = [5, stroke, strokewidth, 0.2, 'rgb(50,50,50)']
            return returns
        }
        radius = (parseFloat(data['mortality_30_zscore'])+3)*3
    }else if (hosp === '5'){
        if(data['avg_medicare_payment_zscore']===null){
            var returns = [5, stroke, strokewidth, 0.2, 'rgb(50,50,50)']
            return returns
        }
        radius = (parseFloat(data['avg_medicare_payment_zscore'])+3)*3
    }else if (hosp === '6'){
        if(data['revenue_zscore']===null){
            var returns = [5, stroke, strokewidth, 0.2, 'rgb(50,50,50)']
            return returns
        }
        console.log(data['revenue_zscore'])
        radius = (parseFloat(data['revenue_zscore'])+2)*4
    }else if (hosp === '7'){
        if(data['total_discharges_zscore']===null){
            var returns = [5, stroke, strokewidth, 0.2, 'rgb(50,50,50)']
            return returns
        }
        radius = (parseFloat(data['total_discharges_zscore'])+3)*3
    }else if (hosp === '8'){
        if(data['revenue_per_discharge_zscore']===null){
            var returns = [5, stroke, strokewidth, 0.2, 'rgb(50,50,50)']
            return returns
        }
        radius = (parseFloat(data['revenue_per_discharge_zscore'])+3)*3
     }
    
    var returns = [radius*1.5, stroke, strokewidth, fillopacity, fill]
    return returns
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
    
    
    for (let i = 0; i < 16; i++){
        canvas.append("circle")
            .attr("cx", projection([hosp_data[i].lon,hosp_data[i].lat])[0] )
            .attr("cy", projection([hosp_data[i].lon,hosp_data[i].lat])[1] )
            .attr("r", hosp_att(hosp_data[i])[0])
            .attr("fill", hosp_att(hosp_data[i])[4])
            .attr("stroke", hosp_att(hosp_data[i])[1])
            .attr("stroke-width", hosp_att(hosp_data[i])[2])
            .attr("fill-opacity", hosp_att(hosp_data[i])[3])
            .on('mouseover', (circle_item)=> {
                tooltip.transition()
                    .style('visibility', 'visible')
                
                if(hosp==='1'){
                    tooltip.text(hosp_data[i]['Facility Name'] + ' - Care-associated infection score: ' 
                                 + hosp_data[i]['infection_ratio'])
                }
                if(hosp==='2'){
                    tooltip.text(hosp_data[i]['Facility Name'] + ' - Emergency Department average wait: ' 
                                 + hosp_data[i]['emergency_wait_time'] + ' minutes')
                }
                if(hosp==='3'){
                    tooltip.text(hosp_data[i]['Facility Name'] + ' - Outpatient imaging score: ' 
                                 + hosp_data[i]['imaging_efficiency'])
                }
                if(hosp==='4'){
                    tooltip.text(hosp_data[i]['Facility Name'] + ' - 30 day mortality score: ' 
                                 + hosp_data[i]['mortality_30'])
                }
                if(hosp==='5'){
                    tooltip.text(hosp_data[i]['Facility Name'] + ' - average medicare payment across common operations: ' 
                                 + hosp_data[i]['avg_medicare_payment'])
                }
                if(hosp==='6'){
                    tooltip.text(hosp_data[i]['Facility Name'] + ' - total hospital revenue: ' 
                                 + hosp_data[i]['revenue'])
                }
                if(hosp==='7'){
                    tooltip.text(hosp_data[i]['Facility Name'] + ' - total inpatient discharges: ' 
                                 + hosp_data[i]['total_discharges'])
                }
                if(hosp==='8'){
                    tooltip.text(hosp_data[i]['Facility Name'] + ' - hospital revenue per inpatient discharge: ' 
                                 + hosp_data[i]['revenue_per_discharge'])
                }
                
            })
            .on('mouseout', (circle_item) => {
                tooltip.transition()
                    .style('visibility', 'hidden')
            })
    }
}



let updateMap = () => {
     console.log('Updating Map')
    
    const projection = d3.geoAlbers()
        .fitSize([960, 600], mesh);
    
    const t = d3.transition()
            .duration(1500)
            .ease(d3.easeLinear);
    
    canvas.selectAll('path').transition(t)
//             .remove()
//             .data(tracts_data)
//             .enter()
//             .append('path')
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
    
    canvas.selectAll("circle")
        .remove()
    for (let i = 0; i < 16; i++){
        canvas.append("circle")
            .attr("cx", projection([hosp_data[i].lon,hosp_data[i].lat])[0] )
            .attr("cy", projection([hosp_data[i].lon,hosp_data[i].lat])[1] )
            .attr("r", hosp_att(hosp_data[i])[0])
            .attr("fill", hosp_att(hosp_data[i])[4])
            .attr("stroke", hosp_att(hosp_data[i])[1])
            .attr("stroke-width", hosp_att(hosp_data[i])[2])
            .attr("fill-opacity", hosp_att(hosp_data[i])[3])
            .on('mouseover', (circle_item)=> {
                tooltip.transition()
                    .style('visibility', 'visible')
                
                if(hosp==='1'){
                    tooltip.text(hosp_data[i]['Facility Name'] + ' - Care-associated infection score: ' 
                                 + hosp_data[i]['infection_ratio'])
                }
                if(hosp==='2'){
                    tooltip.text(hosp_data[i]['Facility Name'] + ' - Emergency Department average wait: ' 
                                 + hosp_data[i]['emergency_wait_time'] + ' minutes')
                }
                if(hosp==='3'){
                    tooltip.text(hosp_data[i]['Facility Name'] + ' - Outpatient imaging score: ' 
                                 + hosp_data[i]['imaging_efficiency'])
                }
                if(hosp==='4'){
                    tooltip.text(hosp_data[i]['Facility Name'] + ' - 30 day mortality score: ' 
                                 + hosp_data[i]['mortality_30'])
                }
                if(hosp==='5'){
                    tooltip.text(hosp_data[i]['Facility Name'] + ' - average medicare payment across common operations: ' 
                                 + hosp_data[i]['avg_medicare_payment'])
                }
                if(hosp==='6'){
                    tooltip.text(hosp_data[i]['Facility Name'] + ' - total hospital revenue: ' 
                                 + hosp_data[i]['revenue'])
                }
                if(hosp==='7'){
                    tooltip.text(hosp_data[i]['Facility Name'] + ' - total inpatient discharges: ' 
                                 + hosp_data[i]['total_discharges'])
                }
                if(hosp==='8'){
                    tooltip.text(hosp_data[i]['Facility Name'] + ' - hospital revenue per inpatient discharge: ' 
                                 + hosp_data[i]['revenue_per_discharge'])
                }
                
            })
            .on('mouseout', (circle_item) => {
                tooltip.transition()
                    .style('visibility', 'hidden')
            })
    }
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
                        
                        d3.json(hospital_file).then(
                            (data, error) => {
                                if(error){
                                    console.log(error)
                                }else{
                                    hosp_data = data
                                    console.log(hosp_data)
                                    
                                    drawMap()
                                }
                            }
                        )
                    }
                }
            )
        }
    }
)