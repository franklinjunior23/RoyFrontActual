function SwitchTogle({name,register}) {
  return (
    <>
      <label className="switch">
        <input type="checkbox" {...register(name)} />
        <span className="slider round" />
      </label>
    </>
  );
}
export default SwitchTogle;
