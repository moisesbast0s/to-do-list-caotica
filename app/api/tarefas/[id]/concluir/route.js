export async function PUT(request, { params }) {
  try {
    
    const id = params.id; 

    if (!id || isNaN(parseInt(id))) {
      return new Response(
        JSON.stringify({ erro: "ID inválido ou não fornecido" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const tarefa = await prisma.tarefa.findUnique({
      where: { id: parseInt(id) },
    });

    if (!tarefa) {
      return new Response(
        JSON.stringify({ erro: "Tarefa não encontrada" }),
        { 
          status: 404, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }

    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id: parseInt(id) },
      data: { concluido: !tarefa.concluido },
    });

  
    return new Response(JSON.stringify(tarefaAtualizada), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "no-store" 
      },
    });

  } catch (error) {
    console.error("Erro no servidor:", error);
    return new Response(
      JSON.stringify({ erro: "Erro interno do servidor" }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}