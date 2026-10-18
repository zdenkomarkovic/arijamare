import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/constants'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: '-2px' }}>{SITE_NAME}</div>
      <div style={{ fontSize: 30, color: '#888', marginTop: 20 }}>Online prodavnica</div>
    </div>,
    { ...size },
  )
}
