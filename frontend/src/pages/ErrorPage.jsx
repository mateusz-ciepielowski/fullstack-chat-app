export default function ErrorPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <center>
        <h1>An error occured!</h1>
        <p>
          Go back to <a href="/">home page</a>
        </p>
      </center>
    </div>
  );
}
