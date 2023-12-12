import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      backgroundLight: string;
      primary: string;
      grey: string;
      black: string;
    };
    fontFamilies: { heading: string; body: string };
    horizontalPadding: string;
  }
}
