import React from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
function PageCmdb() {
  return (
    <div className="w-full h-[400px]">
      <ReactFlow
        elements={[]}
        style={{ width: "100%", height: "100vh" }}
        title="CMDB GENERAL"

        nodes={[
          {
            id: "1",
            data: { label: "Tradesur sac" },
            className: "border border-gray-500",
            position: { x: 250, y: 5 },
            
          },
          {
            id: "2",
            data: { label: "Imer Soportes sac" },
            className: "border border-gray-500",
            position: { x: 250, y: 70},
          },
          {
            id:'3',
            data:{label:'Corpalen sac'},
            className:'border border-gray-500',
            position:{x:250,y:140}
          },
          {
            id:'4',
            data:{label:'Bametsa'},
            className:'border border-gray-500',
            position:{x:250,y:210}
          }
        ]}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default PageCmdb;
