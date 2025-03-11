import TabBar from "./components/TabBar.js";
import Content from "./components/Content.js";
import { request } from "./components/api.js";

export default function App($app) {
  // 상태 관리
  this.state = {
    currentTab: "all",
    photos: [],
  };

  const tabBar = new TabBar({
    $app,
    initialState: "",
    onClick: async (name) => {
      this.setState({
        ...this.state,
        currentTab: name,
        photos: await request(name === "all" ? "" : name),
      });
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

  const init = async () => {
    try {
      const initialPhotos = await request();
      this.setState({
        ...this.state,
        photos: initialPhotos,
      });
    } catch (error) {
      console.log(error);
    }
  };

  init();
}
