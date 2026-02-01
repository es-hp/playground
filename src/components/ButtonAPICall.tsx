import axios from "axios";

export const ButtonAPICall = () => {
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos",
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Welcome</h1>
      <button onClick={fetchTodos}>Fetch Todos</button>
    </>
  );
};
