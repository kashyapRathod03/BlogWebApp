import React from "react";
import {
  FiCpu,
  FiGlobe,
  FiSmartphone,
  FiLayers,
  FiLink,
  FiTarget,
  FiCode,
  FiShield,
  FiZap,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

const ICONS = {
  cpu: FiCpu,
  sparkles: HiOutlineSparkles,
  globe: FiGlobe,
  smartphone: FiSmartphone,
  layers: FiLayers,
  link: FiLink,
  target: FiTarget,
  code: FiCode,
  shield: FiShield,
  zap: FiZap,
};

const IconResolver = ({ name, size = 20 }) => {
  const IconComp = ICONS[name] || FiCpu;
  return <IconComp size={size} aria-hidden="true" />;
};

export default IconResolver;
