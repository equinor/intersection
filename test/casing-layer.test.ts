import { scaleLinear } from 'd3-scale';
import { zoomIdentity } from 'd3-zoom';
import { CasingLayer, IntersectionReferenceSystem } from '../src/index';

describe('CasingLayer', () => {
  let elm: HTMLElement;
  const wp = [
    [30, 40, 0],
    [40, 70, 600],
    [45, 100, 800],
    [50, 110, 1000],
  ];

  beforeEach(() => {
    elm = document.createElement('div');
  });
  afterEach(() => {
    elm.remove();
  });
  describe('when setting reference system', () => {
    const data = [{ casingId: '1', diameter: 30, end: 202, hasShoe: true, innerDiameter: 28, start: 139.7 }];
    const xBounds = [0, 1000] as [number, number];
    const yBounds = [0, 1000] as [number, number];
    const layerEvent = {
      xBounds,
      yBounds,
      zFactor: 1,
      viewportRatio: 1,
      xRatio: 1,
      yRatio: 1,
      width: 1,
      height: 1,
      transform: zoomIdentity,
      xScale: scaleLinear().domain(xBounds).range([0, 1]),
      yScale: scaleLinear().domain(yBounds).range([0, 1]),
    };

    it('should render when reference system is set in constructor', () => {
      // Arrange
      const referenceSystem = new IntersectionReferenceSystem(wp);
      const layer = new CasingLayer('casing-layer', { referenceSystem });
      layer.onMount({ elm });
      layer.onUpdate({});
      layer.onRescale(layerEvent);

      // Act
      layer.data = data;

      // Assert
      expect(layer.ctx.stage.addChild).toHaveBeenCalled();
    });

    it('should render when reference system is set after constructor', () => {
      // Arrange
      const layer = new CasingLayer('casing-layer', {});
      const referenceSystem = new IntersectionReferenceSystem(wp);
      layer.referenceSystem = referenceSystem;
      layer.onMount({ elm });
      layer.onUpdate({});
      layer.onRescale(layerEvent);

      // Act
      layer.data = data;

      // Assert
      expect(layer.ctx.stage.addChild).toHaveBeenCalled();
    });

    it('should not throw exception when setting data without reference system', () => {
      // Arrange
      const layer = new CasingLayer('casing-layer', {});
      layer.onMount({ elm });
      layer.onUpdate({});
      layer.onRescale(layerEvent);

      // Act
      // Assert
      expect(() => {
        layer.data = data;
      }).not.toThrow();
    });
  });
});
