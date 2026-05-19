'use client'

type Props = {
  onSuccess: (result: any) => void
}

export default function WorldIDLogin({ onSuccess }: Props) {

  const login = () => {
    // simulación segura mientras arreglamos SDK real
    const fakeResult = {
      nullifier_hash: 'user_' + Math.random().toString(36).substring(2, 10),
    }

    onSuccess(fakeResult)
  }

  return (
    <button
      onClick={login}
      style={{
        padding: 14,
        borderRadius: 12,
        border: 'none',
        background: '#fff',
        color: '#000',
        fontWeight: 'bold',
        width: '100%',
        cursor: 'pointer',
      }}
    >
      🔐 Login con World ID (modo seguro)
    </button>
  )
}