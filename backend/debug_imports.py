try:
    from langchain.chains import create_retrieval_chain
    print("Found create_retrieval_chain in langchain.chains")
except ImportError as e:
    print(f"Error importing create_retrieval_chain: {e}")

try:
    from langchain.chains import create_stuff_documents_chain
    print("Found create_stuff_documents_chain in langchain.chains")
except ImportError:
    try:
        from langchain.chains.combine_documents import create_stuff_documents_chain
        print("Found create_stuff_documents_chain in langchain.chains.combine_documents")
    except ImportError as e:
        print(f"Error importing create_stuff_documents_chain: {e}")
