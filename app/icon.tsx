import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: '#2D5A27',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D4A017',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
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
