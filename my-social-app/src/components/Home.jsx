import Sidebar from "./left/Sidebar";
import MiddleBar from './middle/middlebar';
import RightBar from "./right/RightBar";

function Home() {
  return (
    <div className="flex justify-center ">
      {/* Main content wrapper */}
      <div className="w-10/12 flex ">
        {/* Left Sidebar */}
        <div
          className="w-3/12  h-screen flex flex-col items-end "
          style={{
            position: "fixed",
            left: "50px",
            top: 0,
          }}
        >
          <Sidebar />          
        </div>

        {/* Middle Content */}
        <div
          className="w-6/12 ml-auto mr-auto"
          style={{
            marginLeft: "25%",
            marginRight: "25%",
          }}
        >
          <MiddleBar />
        </div>

        {/* Right Sidebar */}
        <div
          className="w-3/12 h-screen"
          style={{
            position: "fixed",
            right: "50px",
            top: 0,
          }}
        >
          <RightBar />
        </div>
      </div>
    </div>
  );
}

export default Home;
