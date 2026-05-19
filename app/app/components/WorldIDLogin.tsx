'use client'

import { IDKitWidget } from '@worldcoin/idkit'

type Props = {
  onSuccess: (result: any) => void
}

type RenderProps = {
  open: () => void
}

export default function WorldIDLogin({ onSuccess }: Props) {
  return (
    <IDKitWidget
      app_id="app_f5c430fcb277d36cc0c70fbc9e985da5"
      action="login"
      onSuccess={onSuccess}
    >
      {({ open }: RenderProps) => (
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
  )
}