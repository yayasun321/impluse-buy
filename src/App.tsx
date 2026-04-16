import Box from "./Box";
import Button from "./Button";
function App() {
  return (
    <div>
      <h1 className="Main-Title">Have an impulse?</h1>
      <Button onClick={() => console.log("Clicked")}>My Button</Button>
      <Box />
      <h1 className="Purchased-Title">Purchased:</h1>
    </div>
  );
}

export default App;
