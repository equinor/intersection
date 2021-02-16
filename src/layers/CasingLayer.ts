import { WellboreBaseComponentLayer } from './WellboreBaseComponentLayer';
import { CasingLayerOptions, Casing } from '..';
import { Point, RENDERER_TYPE } from 'pixi.js';
import { makeTubularPolygon } from '../datautils/wellboreItemShapeGenerator';
import { createNormals, offsetPoint, offsetPoints } from '../utils/vectorUtils';
import { SHOE_LENGTH, SHOE_WIDTH } from '../constants';

export class CasingLayer extends WellboreBaseComponentLayer {
  constructor(id?: string, options?: CasingLayerOptions) {
    super(id, options);
    this.options = {
      ...this.options,
      solidColor: '#dcdcdc',
      lineColor: 0x575757,
      topBottomLineColor: 0x575757,
      exaggerationFactor: 2,
      ...options,
    };
  }

  render(): void {
    const { data }: { data: Casing[] } = this;

    if (!data || !this.rescaleEvent || !this.referenceSystem) {
      return;
    }

    data
      .sort((a: Casing, b: Casing) => b.diameter - a.diameter) // draw smaller casings and holes on top of bigger ones if overlapping
      .forEach((casing: Casing) => this.drawCasing(casing));
  }

  drawCasing = (casing: Casing): void => {
    if (casing == null) {
      return;
    }
    const pctOffset = 0.35;
    const { exaggerationFactor, lineColor, solidColor } = this.options as CasingLayerOptions;

    const diameter = casing.diameter * exaggerationFactor;
    const innerDiameter = casing.innerDiameter * exaggerationFactor;

    const radius = diameter / 2;
    const innerRadius = innerDiameter / 2;
    const texture = this.createTexture(diameter, pctOffset);

    const path = this.getZFactorScaledPathForPoints(casing.start, casing.end, [casing.start, casing.end]);

    const pathPoints = path.map((p) => p.point);
    const normals = createNormals(pathPoints);
    const rightPath = offsetPoints(pathPoints, normals, radius);
    const leftPath = offsetPoints(pathPoints, normals, -radius);

    const polygon = makeTubularPolygon(leftPath, rightPath);

    const casingWallWidth = Math.abs(radius - innerRadius);

    // Pixi.js-legacy handles SimpleRope and advanced render methods poorly
    if (this.renderType() === RENDERER_TYPE.CANVAS) {
      this.drawBigPolygon(polygon, solidColor);
    } else {
      this.drawRope(
        pathPoints.map((p) => new Point(p[0], p[1])),
        texture,
      );
    }

    this.drawLine(polygon, lineColor, casingWallWidth, true);

    if (casing.hasShoe) {
      this.drawShoe(casing.end, radius);
    }
  };

  drawShoe(casingEnd: number, casingRadius: number): void {
    const { exaggerationFactor } = this.options as CasingLayerOptions;

    const shoeWidth = SHOE_WIDTH * exaggerationFactor;
    const shoeLength = SHOE_LENGTH * exaggerationFactor;
    const shoeCoords = this.generateShoe(casingEnd, casingRadius, shoeLength, shoeWidth);
    const shoeCoords2 = this.generateShoe(casingEnd, casingRadius, shoeLength, -shoeWidth);
    this.drawBigPolygon(shoeCoords2);
    this.drawBigPolygon(shoeCoords);
  }

  generateShoe = (casingEnd: number, casingRadius: number, length: number, width: number): Point[] => {
    const start = casingEnd - length;
    const end = casingEnd;
    const path = this.getZFactorScaledPathForPoints(start, end, [start, end]);

    const points = path.map((p) => p.point);
    const normal = createNormals(points);
    const shoeEdge: Point[] = offsetPoints(points, normal, casingRadius * (width < 0 ? -1 : 1));

    const shoeTipPoint = points[points.length - 1];
    const shoeTipNormal = normal[normal.length - 1];
    const shoeTip: Point = offsetPoint(shoeTipPoint, shoeTipNormal, width);

    return [...shoeEdge, shoeTip];
  };
}
