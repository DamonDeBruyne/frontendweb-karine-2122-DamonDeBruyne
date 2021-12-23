

const Group = ({ id, name }) => {
  return (
    <link to="/posts" key={id}>
      <div>
        <h2> {name}</h2>
      </div>
    </link>
    
  );
};

export default function Groups({ groups }) {
  return (
    <div>
      {groups
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
        .map((group,id) => (
          <Group {...group} key={id}/>
        ))}
    </div>
  );
};
