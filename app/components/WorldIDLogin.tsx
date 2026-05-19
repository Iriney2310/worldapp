'use client'

import { MiniKit } from '@worldcoin/minikit-js'

type Props = {
  onSuccess: (result: any) => void
}

export default function WorldIDLogin({ onSuccess }: Props) {

  const login = async () => {
    try {
      const result = await MiniKit.commands.verify({
        action: 'login',
        app_id: 'app_f5c430fcb277d36cc0c70fbc9e985da5',
      })

      console.log('World ID success:', result)
      onSuccess(result)
    } catch (e) {
      console.error('World ID error:', e)
    }
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
        cursor: 'pointer'
      }}
    >
      🔐 Login con World ID
    </button>
  )
}