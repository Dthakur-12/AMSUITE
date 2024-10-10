export default class AmSuiteNavBar {
  static appBar;
  static appNavigation;

  static setAppBar(appBar) {
    this.appBar = appBar;
  }

  static setAppNavigation(appNavigation) {
    this.appNavigation = appNavigation;
  }

  static update() {
    this.appBar.forceUpdate();
  }
}
