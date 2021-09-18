import { useEffect, useRef, useState, useCallback } from "react"

const GameComponent = () => {
  const el = useRef()

  const [isDoodling, setIsDoodling] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const getCoordinates = (event) => {
    if (!el.current) return
    const canvas = el.current
    return {x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop}
  };

  const startDoodle = useCallback((event) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsDoodling(true);
      setPos(coordinates);
    }
  }, []);

  useEffect(() => {
    if (!el.current) return

    const canvas = el.current
    canvas.addEventListener('mousedown', startDoodle)
    return () => {
      canvas.removeEventListener('mousedown', startDoodle)
    }
  }, [startDoodle])

  const drawLine = (originalMousePosition, newMousePosition) => {
    if (!el.current) return
    const canvas = el.current
    const context = canvas.getContext('2d')
    if (context) {
      context.strokeStyle = 'black'
      context.lineJoin = 'round'
      context.lineWidth = 5

      context.beginPath()
      context.moveTo(originalMousePosition.x, originalMousePosition.y)
      context.lineTo(newMousePosition.x, newMousePosition.y)
      context.closePath()

      context.stroke()
    }
  };

  const doodle = useCallback(
    (event) => {
      if (isDoodling) {
        const newMousePosition = getCoordinates(event)
        if (pos && newMousePosition) {
          drawLine(pos, newMousePosition)
          setPos(newMousePosition)
        }
      }
    },
    [isDoodling, pos]
  );

  useEffect(() => {
    if (!el.current) return
    const canvas = el.current
    canvas.addEventListener('mousemove', doodle)
    return () => {
      canvas.removeEventListener('mousemove', doodle)
    }
  }, [doodle])

  const exitDoodle = useCallback(() => {
    setIsDoodling(false)
  }, [])

  useEffect(() => {
    if (!el.current) return
    const canvas = el.current
    canvas.addEventListener('mouseup', exitDoodle)
    canvas.addEventListener('mouseleave', exitDoodle)
    return () => {
      canvas.removeEventListener('mouseup', exitDoodle)
      canvas.removeEventListener('mouseleave', exitDoodle)
    }
  }, [exitDoodle])

  return (
    <canvas className='bg-white' ref={el} width={500} height={500} />
  )
}

export default GameComponent