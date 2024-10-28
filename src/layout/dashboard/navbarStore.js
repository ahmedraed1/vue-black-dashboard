const navbarStore = {
  navbarAddedLinks: [],

  addLink(link) {
    this.navbarAddedLinks.push(link);
  },

  removeLink(name) {
    this.navbarAddedLinks = this.navbarAddedLinks.filter(
      (item) => item.name !== name
    );
  },
};

export default navbarStore;
