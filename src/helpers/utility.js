const BREAKPOINT = 767.98;

export const isMobile = () => window.innerWidth <= BREAKPOINT;
export const parseData = data => JSON.parse(JSON.stringify(data))