import React from 'react';
import {SvgXml} from 'react-native-svg';

export const Home = ({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: string;
}) => {
  const icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.46924 10.4694C2.46924 9.51048 2.92767 8.60932 3.70275 8.04466L10.8223 2.85795C11.5241 2.34663 12.4758 2.34663 13.1776 2.85795L20.2972 8.04466C21.0722 8.60932 21.5307 9.51048 21.5307 10.4694V20C21.5307 21.1046 20.6352 22 19.5307 22H4.46924C3.36467 22 2.46924 21.1046 2.46924 20V10.4694Z" stroke="${color}" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M8.81812 17.0002C8.81812 15.2429 10.2427 13.8184 11.9999 13.8184C13.7572 13.8184 15.1818 15.2429 15.1818 17.0002V22.0002H8.81812V17.0002Z" fill="${color}" stroke="${color}" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M10 9.66211H14" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  return <SvgXml xml={icon} width={width} height={height} color={color} />;
};
