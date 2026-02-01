export type StatusProp = {
  status: "loading" | "error" | "success";
};

export function Status({ status }: StatusProp) {
  let message;

  if (status === "loading") {
    message = "Loading...";
  } else if (status === "error") {
    message = "Error fetching data";
  } else if (status === "success") {
    message = "Data fetched successfully";
  }

  return (
    <div>
      <h1>Status</h1>
      <p>{message}</p>
    </div>
  );
}
