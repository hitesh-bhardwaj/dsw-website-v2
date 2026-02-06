import React from "react";

const cardsData = [
  {
    title: "DataOps",
    description:
      "Real-time ingestion, automated validation, lineage tracking, quality checks, and graph-native pipelines with explainability and proactive alerting.",
  },
  {
    title: "AgenticAI Studio",
    description:
      "A complete development environment with fine-tuning, lifecycle control, testing, monitoring, guardrails, and an Agent Dev Kit for production-ready agents along with fully customizable RAG pipelines (connectors, indexing, retrievers, rerankers, caching, evaluation, and deployment controls).",
  },
  {
    title: "AgenticAI Workflow Builder",
    description:
      "Orchestration tools that connect AI models, GenAI agents, and enterprise logic into multi-step workflows, enabling A2A collaboration and MCP style orchestration.",
  },
];


const CardItem = ({ title, description }) => {
  return (
    <div className="relative rounded-[1.5vw] border border-primary-blue p-[2.5vw] w-[28vw] h-[37vw] flex flex-col justify-between">
      <h2 className="text-56 font-light">{title}</h2>

      <p className="text-40  leading-[1.7]">
        {description}
      </p>
    </div>
  );
};


const AgenticCards = () => {
  return (
    <div className="w-full flex flex-row py-[7%] gap-[2vw] justify-center items-stretch">
      {cardsData.map((card, index) => (
        <CardItem
          key={index}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default AgenticCards;
