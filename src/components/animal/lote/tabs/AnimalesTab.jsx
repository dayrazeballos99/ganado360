import AnimalTable from "../../../AnimalTable";

export default function AnimalesTab({ animales }) {
  return (
    <AnimalTable
      animales={animales}
      onDelete={() => {}}
      onEdit={() => {}}
      onView={() => {}}
    />
  );
}