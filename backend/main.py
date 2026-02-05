import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

from langgraph.graph import StateGraph, END

# -------------------------------------------------------------------
# Setup
# -------------------------------------------------------------------
load_dotenv()
app = FastAPI(title="Startup Success Predictor - Multi Agent")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY not set")

llm = ChatOpenAI(
    model="gpt-4o",
    api_key=OPENAI_API_KEY,
    temperature=0.3
)

embeddings = OpenAIEmbeddings(api_key=OPENAI_API_KEY)

# -------------------------------------------------------------------
# Shared RAG Utilities
# -------------------------------------------------------------------
def build_retriever(content: str):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )

    docs = [Document(page_content=content)]
    chunks = splitter.split_documents(docs)

    vector_store = Chroma.from_documents(chunks, embeddings)
    return vector_store.as_retriever()


def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


# -------------------------------------------------------------------
# Agent Prompt Templates
# -------------------------------------------------------------------
def agent_prompt(role: str, focus: str):
    return ChatPromptTemplate.from_messages([
        ("system", f"""
You are a {role}.

Rules:
- Be concise and factual
- DO NOT use conversational phrases
- DO NOT say: "Certainly", "Here is", "Here's", "In conclusion"
- DO NOT add introductions or summaries
- Use short bullet points only
- Max 5 bullets per section
- No filler text

Analyze ONLY the following aspects:
{focus}

Context:
{{context}}
"""),
        ("human", "Provide your analysis.")
    ])




FINANCIAL_PROMPT = agent_prompt(
    "Financial Analyst",
    "- Revenue model\n- Cost structure\n- Financial viability\n- Forecasts\n- ROI potential"
)

VC_PROMPT = agent_prompt(
    "Venture Capitalist",
    "- Investment readiness\n- Scalability\n- Market traction\n- Risk factors\n- Exit potential"
)

CTO_PROMPT = agent_prompt(
    "Chief Technology Officer",
    "- Technical feasibility\n- Architecture\n- Innovation\n- Scalability\n- Technical risks"
)

MARKETING_PROMPT = agent_prompt(
    "Marketing Specialist",
    "- Target market\n- Go-to-market strategy\n- Brand positioning\n- Customer acquisition\n- Competitive landscape"
)

PRODUCT_PROMPT = agent_prompt(
    "Product Analyst",
    "- Product-market fit\n- User needs\n- Feature set\n- Differentiation\n- Adoption barriers"
)


# -------------------------------------------------------------------
# Agent Nodes
# -------------------------------------------------------------------
async def financial_agent(state):
    retriever = state["retriever"]
    chain = (
        {"context": retriever | format_docs}
        | FINANCIAL_PROMPT
        | llm
        | StrOutputParser()
    )
    return {"financial": await chain.ainvoke("")}


async def vc_agent(state):
    retriever = state["retriever"]
    chain = (
        {"context": retriever | format_docs}
        | VC_PROMPT
        | llm
        | StrOutputParser()
    )
    return {"vc": await chain.ainvoke("")}


async def cto_agent(state):
    retriever = state["retriever"]
    chain = (
        {"context": retriever | format_docs}
        | CTO_PROMPT
        | llm
        | StrOutputParser()
    )
    return {"cto": await chain.ainvoke("")}


async def marketing_agent(state):
    retriever = state["retriever"]
    chain = (
        {"context": retriever | format_docs}
        | MARKETING_PROMPT
        | llm
        | StrOutputParser()
    )
    return {"marketing": await chain.ainvoke("")}


async def product_agent(state):
    retriever = state["retriever"]
    chain = (
        {"context": retriever | format_docs}
        | PRODUCT_PROMPT
        | llm
        | StrOutputParser()
    )
    return {"product": await chain.ainvoke("")}


# -------------------------------------------------------------------
# LangGraph Definition (Parallel Agents)
# -------------------------------------------------------------------
class GraphState(dict):
    retriever: any
    financial: str
    vc: str
    cto: str
    marketing: str
    product: str


graph = StateGraph(GraphState)

graph.add_node("financial_agent", financial_agent)
graph.add_node("vc_agent", vc_agent)
graph.add_node("cto_agent", cto_agent)
graph.add_node("marketing_agent", marketing_agent)
graph.add_node("product_agent", product_agent)

# Parallel execution
graph.set_entry_point("financial_agent")

graph.add_edge("financial_agent", "vc_agent")
graph.add_edge("financial_agent", "cto_agent")
graph.add_edge("financial_agent", "marketing_agent")
graph.add_edge("financial_agent", "product_agent")

graph.add_edge("financial_agent", END)
graph.add_edge("vc_agent", END)
graph.add_edge("cto_agent", END)
graph.add_edge("marketing_agent", END)
graph.add_edge("product_agent", END)

app_graph = graph.compile()


# -------------------------------------------------------------------
# API Schema
# -------------------------------------------------------------------
class StartupRequest(BaseModel):
    prompt: str

# -------------------------------------------------------------------
# API Endpoint
# -------------------------------------------------------------------
@app.post("/view")
async def view_analysis(request: StartupRequest):
    if not request.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")

    result = await app_graph.ainvoke({
        "retriever": build_retriever(request.prompt)
    })

    return {
        "financial_analysis": result.get("financial"),
        "vc_analysis": result.get("vc"),
        "cto_analysis": result.get("cto"),
        "marketing_analysis": result.get("marketing"),
        "product_analysis": result.get("product")
    }



# -------------------------------------------------------------------
# Run Server
# -------------------------------------------------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
