import NavBar from "../components/common/NavBar";

export default function Home() {
  return (
    <>
      <NavBar></NavBar>
      <div>
        <h1>Home</h1>
        <p>Home page.</p>
        <p>Route link: /home</p>
        <p>Access: User only</p>
      </div>
    </>
  );
}
