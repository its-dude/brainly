import Button from "./components/Button";
import Card from "./components/Card";

function App() {
  return (
    <>
    <div className="flex ">
      <div className="flex flex-col flex-[1] bg-pink-100 p-2 ">sidebar</div>
      <div className="flex flex-[4] p-2 ">
      </div>
    </div>
    <div className="flex ">
      <Card title={"achievement"} type={"twitter"} link={"https://x.com/ilavanyajain/status/1953711698545619113"}/>
      <Card title={"engineereing"} type={"youtube"} link={"https://www.youtube.com/embed/JuIVXT0kgXI?si=2yOqM-33lG-qd5-f"} />
    </div>
    </>
  )
}

export default App
