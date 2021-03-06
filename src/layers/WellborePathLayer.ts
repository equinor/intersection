/* eslint-disable no-magic-numbers */
import {
  line,
  curveCatmullRom,
  curveLinear,
  curveBasis,
  curveBasisClosed,
  curveBundle,
  curveCardinal,
  curveMonotoneX,
  curveMonotoneY,
  curveNatural,
  curveStep,
  curveStepAfter,
  curveStepBefore,
} from 'd3-shape';
import { SVGLayer } from './base/SVGLayer';
import { WellborepathLayerOptions, OnUpdateEvent, OnRescaleEvent } from '../interfaces';

export class WellborepathLayer extends SVGLayer {
  rescaleEvent: OnRescaleEvent;

  constructor(id?: string, options?: WellborepathLayerOptions) {
    super(id, options);
    this.options = {
      ...this.options,
      ...options,
    };
    this.render = this.render.bind(this);
  }

  onUpdate(event: OnUpdateEvent): void {
    super.onUpdate(event);
    this.render();
  }

  onRescale(event: OnRescaleEvent): void {
    super.onRescale(event);
    if (!this.elm) {
      return;
    }
    this.rescaleEvent = event;
    this.render();
  }

  render(): void {
    const { strokeWidth, stroke } = this.options as WellborepathLayerOptions;

    if (!this.elm) {
      return;
    }
    this.elm.select('g').remove();

    const data = this.data || (this.referenceSystem && (this.referenceSystem.projectedPath as [number, number][]));
    if (!data || !this.rescaleEvent) {
      return;
    }

    this.elm
      .append('g')
      .attr('class', 'well-path')
      .append('path')
      .attr('d', this.renderWellborePath(data))
      .attr('stroke-width', strokeWidth || '2px')
      .attr('stroke', stroke || 'red')
      .attr('fill', 'none');
  }

  private renderWellborePath(data: [number, number][]): string {
    const { xScale, yScale } = this.rescaleEvent;
    const transformedData: [number, number][] = data.map((d) => [xScale(d[0]), yScale(d[1])]);

    // TODO: Might be a good idea to move something like this to a shared function in a base class
    let curveFactory;
    const { curveType, tension } = this.options as WellborepathLayerOptions;
    switch (curveType) {
      default:
      case 'curveCatmullRom':
        curveFactory = curveCatmullRom.alpha(tension || 0.7);
        break;
      case 'curveLinear':
        curveFactory = curveLinear;
        break;
      case 'curveBasis':
        curveFactory = curveBasis;
        break;
      case 'curveBasisClosed':
        curveFactory = curveBasisClosed;
        break;
      case 'curveBundle':
        curveFactory = curveBundle.beta(tension || 1.0);
        break;
      case 'curveCardinal':
        curveFactory = curveCardinal.tension(tension || 0.9);
        break;
      case 'curveMonotoneX':
        curveFactory = curveMonotoneX;
        break;
      case 'curveMonotoneY':
        curveFactory = curveMonotoneY;
        break;
      case 'curveNatural':
        curveFactory = curveNatural;
        break;
      case 'curveStep':
        curveFactory = curveStep;
        break;
      case 'curveStepAfter':
        curveFactory = curveStepAfter;
        break;
      case 'curveStepBefore':
        curveFactory = curveStepBefore;
        break;
    }

    return line().curve(curveFactory)(transformedData);
  }
}
