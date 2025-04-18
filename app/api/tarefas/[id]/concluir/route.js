export async function PUT(_, { params }) {
  const { id } = params;

  const tarefa = await prisma.tarefa.findUnique({
    where: { id: parseInt(id) },
  });

  if (!tarefa) {
    return new Response(JSON.stringify({ erro: 'Tarefa não encontrada' }), {
      status: 404,
    });
  }

  const tarefaAtualizada = await prisma.tarefa.update({
    where: { id: parseInt(id) },
    data: { concluido: !tarefa.concluido },
  });

  return new Response(JSON.stringify(tarefaAtualizada), {
    status: 200,
  });
}
