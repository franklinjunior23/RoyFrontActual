import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Field from "./Field";
import { useState } from "react";
import { boardTypes } from "./index.d";

function Board() {
  const [columns, setColumns] = useState({
    pendienteBoard: {
      title: "Pendientes",
      data: [
        {
          id: "3313",
          title: "Titutlo numero 1",
          day: "Lunes 23 23:30",
          users: [
            { name: "User", lastName: "Roy" },
           
          ],
        },
      ],
    },
    progressBoard: {
      title: "En Progreso",
      data: [
        {
          id: "33113",
          title: "example",
          day: "Lunes 23 23:30",
          users: [
            { name: "User", lastName: "Roy" },
            { name: "User", lastName: "Roy" },
            { name: "User", lastName: "Roy" },
            { name: "User", lastName: "Roy" },
          ],
        },
      ],
    },
  });

  const handleDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.data];
      const destItems = [...destColumn.data];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          data: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          data: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.data];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          data: copiedItems,
        },
      });
    }
  };

  return (
    <main className="grid lg:grid-cols-[repeat(3,minmax(340px,340px))] h-full mt-5 gap-5">
      <DragDropContext
        onDragEnd={(result) => handleDragEnd(result, columns, setColumns)}
      >
        {Object.keys(columns).map((key, data, index) => {
          const column = columns[key];
          const id = index[data];

          return (
            <Droppable droppableId={id} key={key}>
              {(provided, snapshot) => {
                return (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Field name={column.title} id={id} data={column.data} />
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          );
        })}

        {/* <Field name={"Pendientes"} id={"pendientes"} data={dataPendientes} />
        <Field name={"En Progreso"} id={"progress"} data={dataProgres} /> */}
      </DragDropContext>
    </main>
  );
}

export default Board;
