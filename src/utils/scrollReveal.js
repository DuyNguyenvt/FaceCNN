import ScrollReveal from "scrollreveal";

const srConfigs = {
  left: {
    origin: "left",
    duration: 1000,
    distance: "25rem",
    dedelay: 300,
  },
  right: {
    origin: "right",
    duration: 1000,
    distance: "25rem",
    dedelay: 300,
  },
};

export default function sr(element, config) {
  if ((element, config)) {
    ScrollReveal().reveal(element, config);
  }
}

export { srConfigs };
