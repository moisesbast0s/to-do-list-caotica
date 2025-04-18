import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const cookieStore = await cookies() // ✅ usar await

  cookieStore.delete('token') // ✅ remove o token corretamente

  return NextResponse.json({ message: 'Logout realizado com sucesso' })
}
