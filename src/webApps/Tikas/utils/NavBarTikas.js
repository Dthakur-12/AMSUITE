export default class NavBarTikas {
  static appBar;
  static appNavigation;
  static appLoader;

  static setAppBar(appBar) {
    this.appBar = appBar;
  }

  static setAppNavigation(appNavigation) {
    this.appNavigation = appNavigation;
  }

  static setAppLoader(appLoader) {
    this.appLoader = appLoader;
  }
  static showLoader() {
    this.appLoader(true);
  }
  static hideLoader() {
    this.appLoader(false);
  }

  static update() {
    this.appBar.forceUpdate();
  }
}
