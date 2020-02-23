"use strict";
exports.__esModule = true;
var React = require("react");
var react_1 = require("react");
exports.Blob = function (props) {
    var _a = react_1.useState("M118.6,-87.4C166.9,-34.1,228.2,16,219.4,48.4C210.7,80.7,131.8,95.3,67.8,117C3.8,138.7,-45.4,167.6,-91.3,157.7C-137.2,147.9,-179.7,99.3,-182.7,51.6C-185.7,3.9,-149.2,-42.9,-112.1,-93.7C-75.1,-144.5,-37.5,-199.3,-1.2,-198.3C35.2,-197.4,70.4,-140.8,118.6,-87.4Z"), figure = _a[0], setFigure = _a[1];
    var _b = react_1.useState(1), complexity = _b[0], setComplexity = _b[1];
    var _c = react_1.useState(140), contrast = _c[0], setContrast = _c[1];
    var _d = react_1.useState("yellow"), color = _d[0], setColor = _d[1];
    var _e = react_1.useState("100%"), widht = _e[0], setWidth = _e[1];
    var _f = react_1.useState("100%"), height = _f[0], setHeight = _f[1];
    react_1.useEffect(function () {
        var _a;
        if (((_a = props) === null || _a === void 0 ? void 0 : _a.complexity) && props.complexity > 0) {
            setComplexity(props.complexity);
        }
    }, [props.complexity]);
    react_1.useEffect(function () {
        var _a;
        if (((_a = props) === null || _a === void 0 ? void 0 : _a.contrast) && props.contrast > 0) {
            setContrast(props.contrast);
        }
    }, [props.contrast]);
    react_1.useEffect(function () {
        setFigure(createNewFigure(complexity, contrast));
    }, [complexity, contrast]);
    react_1.useEffect(function () {
        if (props.color) {
            setColor(props.color.toString());
        }
        else {
            setColor("yellow");
        }
    }, [props.color]);
    react_1.useEffect(function () {
        if (props.width) {
            setWidth(props.width.toString());
        }
        else {
            setWidth("100%");
        }
    }, [props.width]);
    react_1.useEffect(function () {
        if (props.height) {
            setHeight(props.height.toString());
        }
        else {
            setHeight("100%");
        }
    }, [props.height]);
    var createNewFigure = function (com, cap) {
        if (com) {
            setComplexity(com);
        }
        else {
            setComplexity(1);
        }
        if (cap) {
            setContrast(cap);
        }
        else {
            setContrast(140);
        }
        var path = setMetrics(com, cap);
        return path;
    };
    var setMetrics = function (com, cap) {
        var axis = [];
        for (var num = 0; num < 2 * Math.PI; num += 0.6) {
            var x = (100 + cap * Math.cos(num) + 240) + radomGen(com);
            var y = (100 + cap * Math.sin(num) + 240) + radomGen(com);
            axis.push({ x: x, y: y });
            if (num + 0.6 >= 2 * Math.PI) {
                axis.push(axis[0]);
            }
            ;
        }
        var word = getWordByArray(axis);
        return word;
    };
    var radomGen = function (cap) {
        var num = Math.floor(Math.random() * 10) + 1;
        num *= Math.floor(Math.random() * 4) + 1 === 1 ? cap : -cap;
        return num;
    };
    var getWordByArray = function (arr) {
        if (arr.length === 0) {
            return "";
        }
        var word = "";
        arr.forEach(function (axis, index, array) {
            var position = [];
            if (index === 0) {
                word += "M" + axis.x + "," + axis.y + " ";
                position.push(array[array.length - 3]);
                position.push(array[index]);
                position.push(array[index + 1]);
                position.push(array[index + 2]);
            }
            else if (index === array.length - 2) {
                position.push(array[index - 1]);
                position.push(array[index]);
                position.push(array[index + 1]);
                position.push(array[0]);
            }
            else if (index === array.length - 1) {
                return;
            }
            else {
                position.push(array[index - 1]);
                position.push(array[index]);
                position.push(array[index + 1]);
                position.push(array[index + 2]);
            }
            var path = [];
            path.push({ x: position[1].x, y: position[1].y });
            path.push({ x: ((-position[0].x + 6 * position[1].x + position[2].x) / 6), y: ((-position[0].y + 6 * position[1].y + position[2].y) / 6) });
            path.push({ x: ((position[1].x + 6 * position[2].x - position[3].x) / 6), y: ((position[1].y + 6 * position[2].y - position[3].y) / 6) });
            path.push({ x: position[2].x, y: position[2].y });
            word += "C" + path[1].x + "," + path[1].y + " " + path[2].x + "," + path[2].y + " " + path[3].x + "," + path[3].y + " ";
        });
        return word;
    };
    return (React.createElement("svg", { width: widht, height: height, viewBox: "0 0 480 480", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: figure, fill: color, stroke: "none", "stroke-width": "0" })));
};
