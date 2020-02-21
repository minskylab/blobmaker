
import  * as React from 'react';
import { useState, useEffect } from 'react';

interface Values {
    complexity?: number;
    contrast?: number;
    width?: string;
    height?: string;
    color?: string;
}

export const Blob: React.FunctionComponent<Values> = (props: Values) => {

    const [figure, setFigure] = useState("M118.6,-87.4C166.9,-34.1,228.2,16,219.4,48.4C210.7,80.7,131.8,95.3,67.8,117C3.8,138.7,-45.4,167.6,-91.3,157.7C-137.2,147.9,-179.7,99.3,-182.7,51.6C-185.7,3.9,-149.2,-42.9,-112.1,-93.7C-75.1,-144.5,-37.5,-199.3,-1.2,-198.3C35.2,-197.4,70.4,-140.8,118.6,-87.4Z")
    const [complexity, setComplexity] = useState<number>(0.6);
    const [contrast, setContrast] = useState<number>(140);
    const [color,setColor] = useState<string>("yellow");
    const [widht,setWidth] = useState<string>("100%")
    const [height,setHeight] = useState<string>("100%")

    useEffect(() => {
        let path:string;
        if(props.complexity || props.contrast){
            path = createNewFigure(props.complexity, props.contrast)
        }else{
            path = createNewFigure(0.6, 140)
        }
        
        setFigure(path)
    }, [props.complexity,props.contrast])

    useEffect(() => {
        if(props.color){
            setColor(props.color.toString())
        }else{
            setColor("yellow")
        }
    }, [props.color])

    useEffect(() => {
        if(props.width){
            setWidth(props.width.toString())
        }else{
            setWidth("100%")
        }
    }, [props.width])

    useEffect(() => {
        if(props.height){
            setHeight(props.height.toString())
        }else{
            setHeight("100%")
        }
    }, [props.height])


    const createNewFigure = (com: number | undefined, cap: number | undefined): string => {

        if (com) {
            setComplexity(com);
        } else {
            setComplexity(0.6)
        }
        if (cap) {
            setContrast(cap);
        } else {
            setContrast(140)
        }

        let path = setMetrics(complexity, contrast)
        return path
    }


    const setMetrics = (com: number, cap: number): string => {

        let axis: { x: number, y: number }[] = [];
        let lastSum: number = 1;

        if (com !== 0 && com >= 1) {
            lastSum = com * 0.1;
        } else {
            lastSum = 0.6;
        }
        for (let num = 0; num < 2 * Math.PI; num += lastSum) {
            let x = (cap * Math.cos(num) + 240) + radomGen();
            let y = (cap * Math.sin(num) + 240) + radomGen();
            axis.push({ x, y });
            if (num + lastSum >= 2 * Math.PI) {
                axis.push(axis[0])
            };
        }
        let word: string = getWordByArray(axis)
        return word
    }

    const radomGen = (): number => {
        let num = Math.floor(Math.random() * 12) + 8;
        num *= Math.floor(Math.random() * 4) + 1 === 1 ? 1 : -1;
        return num
    }

    const getWordByArray = (arr: { x: number, y: number }[]): string => {
        if (arr.length === 0) {
            return ""
        }

        let word: string = "";
        arr.forEach((coord, index, array) => {
            let p = [];
            if (index === 0) {
                word += `M${coord.x},${coord.y} `;
                p.push(array[array.length - 3]);
                p.push(array[index]);
                p.push(array[index + 1]);
                p.push(array[index + 2]);
            } else if (index === array.length - 2) {
                p.push(array[index - 1]);
                p.push(array[index]);
                p.push(array[index + 1]);
                p.push(array[0]);
            } else if (index === array.length - 1) {
                return
            } else {
                p.push(array[index - 1]);
                p.push(array[index]);
                p.push(array[index + 1]);
                p.push(array[index + 2]);
            }
            let bp = [];
            bp.push({ x: p[1].x, y: p[1].y });
            bp.push({ x: ((-p[0].x + 6 * p[1].x + p[2].x) / 6), y: ((-p[0].y + 6 * p[1].y + p[2].y) / 6) });
            bp.push({ x: ((p[1].x + 6 * p[2].x - p[3].x) / 6), y: ((p[1].y + 6 * p[2].y - p[3].y) / 6) });
            bp.push({ x: p[2].x, y: p[2].y });
            word += "C" + bp[1].x + "," + bp[1].y + " " + bp[2].x + "," + bp[2].y + " " + bp[3].x + "," + bp[3].y + " ";
        })
        return word
    }

    return (
        <svg width={widht} height={height} viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
            <path d={figure} fill={color} stroke="none" stroke-width="0">
            </path>
        </svg>
    );
}