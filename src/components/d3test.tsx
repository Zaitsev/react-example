import * as React from 'react'
import {zoom} from 'd3-zoom';
import {randomNormal} from 'd3-random'
import {select, event as d3event} from 'd3-selection'
import {useCallback, useEffect, useRef} from "react";

export const Chart: React.FC = () => {
    const svgRef = useRef(null);
    const width=200;
    const height = 200;
    const randomX = randomNormal(width / 2, 80);
    const randomY = randomNormal(height / 2, 80);
    const data =  Array.from({length: 2000}, () => [randomX(), randomY()]);

    useEffect(() => {
        if (!svgRef.current) {
            return;
        }
        const svg = select(svgRef.current);

        const circle =  svg.select('.dots')
            .selectAll('circle')
            .data(data)
            .join("circle")
            .attr("transform", d => `translate(${d})`)
            .attr("r", 1.5);

        const zoomed = ()=>{
            const {transform} = d3event;
            circle.attr("transform", d => `translate(${transform.apply(d)})`);
        };
        svg.call(zoom()
            .extent([[0, 0], [width, height]])
            .scaleExtent([1, 8])
            .on("zoom", zoomed));
        return ()=>{

        };

    }, [svgRef.current,data]);

    return (<svg ref={svgRef} width={width} height={height} style={{background: 'steelBlue'}}>
        <rect x={25} y={25} width={width-50} height={height-25} fill={'blue'}/>
        <g className={'dots'} />
    </svg>);
};