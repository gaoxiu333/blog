export default function Error({ error, reset }) {
  return (
    <>
      发生了错误：{error}
      <button onClick={() => reset()}>重试</button>
    </>
  );
}
