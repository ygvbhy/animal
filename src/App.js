import TabBar from "./components/TabBar.js";
import Content from "./components/Content.js";
import { request } from "./components/api.js";

export default function App($app) {
  // 상태 관리
  this.state = {
    currentTab: window.location.pathname.split("/").pop() || "all",
    photos: [],
  };

  this.updateContent = async (tabName) => {
    try {
      const currentTab = tabName === "all" ? "" : tabName;
      const photos = await request(currentTab);
      this.setState({
        ...this.state,
        currentTab: tabName,
        photos,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const tabBar = new TabBar({
    $app,
    initialState: "",
    onClick: async (name) => {
      history.pushState(null, `${name} 사진`, name);
      this.updateContent(name);
    },
  });

  const content = new Content({
    $app,
    initialState: [],
  });

  // 상태 변경
  this.setState = (newState) => {
    this.state = newState;
    tabBar.setState(this.state.currentTab);
    content.setState(this.state.photos);
  };

  window.addEventListener("popstate", async () => {
    this.updateContent(window.location.pathname.split("/").pop() || "all");
  });

  const init = async () => {
    this.updateContent(this.state.currentTab);
  };

  init();
}
