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
    const [complexity, setComplexity] = useState<number>(1);
    const [contrast, setContrast] = useState<number>(140);
    const [color,setColor] = useState<string>("yellow");
    const [widht,setWidth] = useState<string>("100%")
    const [height,setHeight] = useState<string>("100%")

    useEffect(() => {
        let path:string;
        if(props.complexity || props.contrast){
            path = createNewFigure(props.complexity, props.contrast)
        }else{
            path = createNewFigure(1, 140)
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
            setComplexity(1)
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

        for (let num = 0; num < 2 * Math.PI; num += 0.6) {
            let x = (200 * Math.cos(num) + 240) + radomGen(com);
            let y = (200 * Math.sin(num) + 240) + radomGen(com);
            axis.push({ x, y });
            if (num + 0.6 >= 2 * Math.PI) {
                axis.push(axis[0])
            };
        }
        let word: string = getWordByArray(axis)
        return word
    }

    const radomGen = (cap: number): number => {
        let num = Math.floor(Math.random() * 10) + 1;
        num *= Math.floor(Math.random() * 4) + 1 === 1 ? cap : -cap;
        return num
    }

    const getWordByArray = (arr: { x: number, y: number }[]): string => {
        if (arr.length === 0) {
            return ""
        }

        let word: string = "";
        arr.forEach((axis, index, array) => {
            let position = [];
            if (index === 0) {
                word += `M${axis.x},${axis.y} `;
                position.push(array[array.length - 3]);
                position.push(array[index]);
                position.push(array[index + 1]);
                position.push(array[index + 2]);
            } else if (index === array.length - 2) {
                position.push(array[index - 1]);
                position.push(array[index]);
                position.push(array[index + 1]);
                position.push(array[0]);
            } else if (index === array.length - 1) {
                return
            } else {
                position.push(array[index - 1]);
                position.push(array[index]);
                position.push(array[index + 1]);
                position.push(array[index + 2]);
            }
            let path = [];
            path.push({ x: position[1].x, y: position[1].y });
            path.push({ x: ((-position[0].x + 6 * position[1].x + position[2].x) / 6), y: ((-position[0].y + 6 * position[1].y + position[2].y) / 6) });
            path.push({ x: ((position[1].x + 6 * position[2].x - position[3].x) / 6), y: ((position[1].y + 6 * position[2].y - position[3].y) / 6) });
            path.push({ x: position[2].x, y: position[2].y });
            word += "C" + path[1].x + "," + path[1].y + " " + path[2].x + "," + path[2].y + " " + path[3].x + "," + path[3].y + " ";
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