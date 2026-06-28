const Universe = {
  state: {
    current: "dashboard"
  },

  open(module) {
    this.state.current = module;
    console.log("Universe opened:", module);
  }
};
