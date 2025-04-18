export async function PUT(request, { params }) {
  try {
    // Extrai o ID corretamente (sem destruturar se params for uma Promise)
    const id = params.id; // ou params.id?.toString()

    if (!id || isNaN(parseInt(id))) {
      return new Response(
        JSON.stringify({ erro: "ID inválido ou não fornecido" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json" } // Adicione headers
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

    // Retorne a resposta com headers explícitos
    return new Response(JSON.stringify(tarefaAtualizada), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "no-store" // Evite cache
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