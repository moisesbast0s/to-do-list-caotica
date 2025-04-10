import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const cookieStore = cookies()
  cookieStore.delete('token') // remove o token da autenticação

  return NextResponse.json({ message: 'Logout realizado com sucesso' })
}
