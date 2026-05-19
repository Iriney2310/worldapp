'use client'

import { IDKitWidget } from '@worldcoin/idkit'

type Props = {
  onSuccess: (result: any) => void
}

export default function WorldIDLogin({ onSuccess }: Props) {
  return (
    <div style={{ marginTop: 20 }}>
      <IDKitWidget
        app_id="app_f5c430fcb277d36cc0c70fbc9e985da5"
        action="login"
        signal=""
        onSuccess={(result) => {
          console.log('World ID success:', result)
          onSuccess(result)
        }}
      >
        {({ open }) => (
          <button
            onClick={open}
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
            🔐 Login con World ID
          </button>
        )}
      </IDKitWidget>
    </div>
  )
}