import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 100,
          background: '#2D5A27',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D4A017',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          borderRadius: '20px',
        }}
      >
        A
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
