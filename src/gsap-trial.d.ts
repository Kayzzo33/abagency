declare module "gsap-trial/SplitText" {
  export class SplitText {
    chars: Element[];
    words: Element[];
    lines: Element[];
    constructor(target: string | Element | (string | Element)[], vars?: object);
    revert(): void;
    split(vars?: object): SplitText;
  }
}

declare module "gsap-trial/ScrollSmoother" {
  export class ScrollSmoother {
    static create(vars?: object): ScrollSmoother;
    static refresh(safe?: boolean): void;
    scrollTop(pos?: number): number;
    paused(val?: boolean): boolean | ScrollSmoother;
    scrollTo(target: string | Element | number, smooth?: boolean, position?: string): void;
  }
}
