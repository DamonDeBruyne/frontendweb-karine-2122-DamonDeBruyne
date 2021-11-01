const Group = ({ id, name, image }) => {
  return (
    <div>
      <h2> {name}</h2>
      <image src={image} alt={image}></image>
    </div>
  );
};

export default function Groups({ groups }) {
  return (
    <div>
      {groups
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
        .map((p, i) => (
          <Group key={i} {...p} />
        ))}
    </div>
  );
}
