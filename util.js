export const randomX = function(min, max) {
	return Math.floor(Math.random() * max + min);
}


//判断点是否在多边形范围内
export const queryPtInPolygon = function(point, polygon) {
	let p1, p2, p3, p4;
	p1 = point;
	p2 = {
		x: 1000000000000,
		y: point.y
	};
	let count = 0;
	//对每条边都和射线作对比
	for (let i = 0; i < polygon.length - 1; i++) {
		p3 = polygon[i];
		p4 = polygon[i + 1];
		if (checkCross(p1, p2, p3, p4)) {
			count++;
		}
	}
	p3 = polygon[polygon.length - 1];
	p4 = polygon[0];
	if (checkCross(p1, p2, p3, p4)) {
		count++;
	}
	return (count % 2 === 0) ? false : true;
}

//判断两条线段是否相交
function checkCross(p1, p2, p3, p4) {
	let v1 = {
		x: p1.x - p3.x,
		y: p1.y - p3.y
	};
	let v2 = {
		x: p2.x - p3.x,
		y: p2.y - p3.y
	};
	let v3 = {
		x: p4.x - p3.x,
		y: p4.y - p3.y
	};
	let v = crossMul(v1, v3) * crossMul(v2, v3);
	v1 = {
		x: p3.x - p1.x,
		y: p3.y - p1.y
	};
	v2 = {
		x: p4.x - p1.x,
		y: p4.y - p1.y
	};
	v3 = {
		x: p2.x - p1.x,
		y: p2.y - p1.y
	};
	return (v <= 0 && crossMul(v1, v3) * crossMul(v2, v3) <= 0) ? true : false;
}

//计算向量叉乘
function crossMul(v1, v2) {
	return v1.x * v2.y - v1.y * v2.x;
}


export const getDistance = (p1, p2) => {
	return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}
