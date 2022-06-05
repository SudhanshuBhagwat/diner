import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: animateTransform */

function SvgComponent(props: JSX.IntrinsicAttributes) {
  return (
    <Svg viewBox="0 0 2400 2400" {...props}>
      <G
        strokeWidth={200}
        strokeLinecap="round"
        stroke="currentColor"
        fill="none"
      >
        <Path d="M1200 600L1200 100" />
        <Path opacity={0.5} d="M1200 2300L1200 1800" />
        <Path opacity={0.917} d="M900 680.4L650 247.4" />
        <Path opacity={0.417} d="M1750 2152.6L1500 1719.6" />
        <Path opacity={0.833} d="M680.4 900L247.4 650" />
        <Path opacity={0.333} d="M2152.6 1750L1719.6 1500" />
        <Path opacity={0.75} d="M600 1200L100 1200" />
        <Path opacity={0.25} d="M2300 1200L1800 1200" />
        <Path opacity={0.667} d="M680.4 1500L247.4 1750" />
        <Path opacity={0.167} d="M2152.6 650L1719.6 900" />
        <Path opacity={0.583} d="M900 1719.6L650 2152.6" />
        <Path opacity={0.083} d="M1750 247.4L1500 680.4" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
