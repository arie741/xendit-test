function UniversityItem({ name, country, website }) {
  return (
    <a href={website} className="flex flex-col py-4 px-2 rounded shadow-md">
      <div className="text-xl font-bold">{name}</div>
      <div>{country}</div>
      <div className="overflow-hidden">{website}</div>
    </a>
  );
}

export default UniversityItem;
